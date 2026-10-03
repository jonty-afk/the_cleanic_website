// Sends the customer a short "we've received your request" email from the
// business mailbox after a form is submitted. Runs as a Vercel function.
//
// Needs two environment variables in Vercel (Project → Settings → Environment Variables):
//   ZOHO_SMTP_USER  the mailbox address, e.g. info@thecleanic.co.nz
//   ZOHO_SMTP_PASS  an app password for that mailbox (Zoho Accounts → Security)
// Without them the function answers "not_configured" and the forms carry on as normal.
//
// The email text is fixed — nothing a visitor types is sent on, apart from their first
// name — so the endpoint can't be used to send arbitrary messages.
import tls from 'node:tls';
import { randomUUID } from 'node:crypto';
import { site } from '../src/data/site.mjs';

const ALLOWED_HOSTS = new Set(['thecleanic.co.nz', 'www.thecleanic.co.nz', 'the-cleanic-website.vercel.app']);
const WINDOW_MS = 10 * 60 * 1000;
const recent = new Map(); // best-effort throttle, per warm instance

function throttled(key, max) {
  const now = Date.now();
  const hits = (recent.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= max) { recent.set(key, hits); return true; }
  hits.push(now); recent.set(key, hits);
  if (recent.size > 500) for (const [k, v] of recent) if (!v.some((t) => now - t < WINDOW_MS)) recent.delete(k);
  return false;
}

const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
const wrap = (s) => s.replace(/(.{76})/g, '$1\r\n');
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function firstName(raw) {
  const word = String(raw || '').trim().split(/\s+/)[0] || '';
  const clean = word.replace(/[^\p{L}'’-]/gu, '').slice(0, 30);
  return clean || 'there';
}

function buildMessage({ from, to, name }) {
  const hours = site.hours.map((h) => `${h.days.replace(/\s*–\s*/g, ' to ')}, ${h.time.replace(/\s*–\s*/g, '–')}`).join(', and ');
  const text = [
    `Hi ${name},`,
    '',
    'Thank you for contacting The Cleanic. We have received your request and will be in touch shortly.',
    '',
    `Our business hours are ${hours}. For urgent requests, please call ${site.phone.display}.`,
    '',
    'Kind regards,',
    'The Cleanic',
    'Airbnb, home & commercial cleaning · Auckland',
    site.url.replace('https://', ''),
    '',
    'This is an automated confirmation. Replies to this email will reach our team.',
  ].join('\r\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1B2026;max-width:560px">
<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for contacting The Cleanic. We have received your request and will be in touch shortly.</p>
<p>Our business hours are ${escapeHtml(hours)}. For urgent requests, please call <a href="tel:${site.phone.tel}" style="color:#0B4F7C;text-decoration:none">${site.phone.display}</a>.</p>
<p>Kind regards,</p>
<p style="margin-top:20px;padding-top:16px;border-top:1px solid #DDD5C7">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:19px">The Cleanic</span><br>
<span style="font-size:12px;color:#65696D">Airbnb, home &amp; commercial cleaning · Auckland</span><br>
<a href="${site.url}" style="font-size:13px;color:#0B4F7C;text-decoration:none;font-weight:bold">${site.url.replace('https://', '')}</a></p>
<p style="font-size:12px;color:#65696D">This is an automated confirmation. Replies to this email will reach our team.</p>
</div>`;
  const boundary = `b_${randomUUID().replace(/-/g, '')}`;
  return [
    `From: The Cleanic <${from}>`,
    `To: <${to}>`,
    `Reply-To: <${from}>`,
    'Subject: Your request has been received - The Cleanic',
    `Date: ${new Date().toUTCString().replace('GMT', '+0000')}`,
    `Message-ID: <${randomUUID()}@${from.split('@')[1]}>`,
    'MIME-Version: 1.0',
    'Auto-Submitted: auto-replied',
    'X-Auto-Response-Suppress: All',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(text)),
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(html)),
    `--${boundary}--`,
    '',
  ].join('\r\n');
}

/** Minimal SMTP-over-TLS client (AUTH LOGIN). Resolves when the message is accepted. */
function sendMail({ host, port, user, pass, to, message }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host });
    const steps = [
      [null, 220, 'greeting'],
      [`EHLO ${user.split('@')[1]}`, 250, 'ehlo'],
      ['AUTH LOGIN', 334, 'auth'],
      [b64(user), 334, 'auth_user'],
      [b64(pass), 235, 'auth_pass'],
      [`MAIL FROM:<${user}>`, 250, 'mail_from'],
      [`RCPT TO:<${to}>`, 250, 'rcpt_to'],
      ['DATA', 354, 'data'],
      [`${message.replace(/\r\n\./g, '\r\n..')}\r\n.`, 250, 'message'],
      ['QUIT', 221, 'quit'],
    ];
    let i = 0;
    let buffer = '';
    let settled = false;
    const finish = (err) => { if (settled) return; settled = true; socket.destroy(); err ? reject(err) : resolve(); };
    socket.setEncoding('utf8');
    socket.setTimeout(12000, () => finish(Object.assign(new Error('timeout'), { stage: steps[i]?.[2] })));
    socket.on('error', (e) => finish(Object.assign(e, { stage: steps[i]?.[2] || 'connect' })));
    socket.on('data', (chunk) => {
      buffer += chunk;
      let m;
      // a reply ends with a line of the form "250 text" (a space after the code)
      while ((m = buffer.match(/^(?:\d{3}-[^\r\n]*\r?\n)*(\d{3}) [^\r\n]*\r?\n/))) {
        buffer = buffer.slice(m[0].length);
        const code = Number(m[1]);
        const [, expected, stage] = steps[i];
        if (code !== expected && !(stage === 'rcpt_to' && code === 251)) {
          if (stage === 'quit') return finish();
          return finish(Object.assign(new Error(`smtp_${code}`), { stage }));
        }
        if (stage === 'message') { i += 1; socket.write('QUIT\r\n'); return finish(); }
        i += 1;
        socket.write(`${steps[i][0]}\r\n`);
      }
    });
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }

  let host = '';
  try { host = new URL(req.headers.origin || req.headers.referer || '').hostname; } catch { /* no origin */ }
  if (!ALLOWED_HOSTS.has(host)) return res.status(403).json({ ok: false, error: 'origin' });

  let body = {};
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); } catch { return res.status(400).json({ ok: false, error: 'body' }); }
  if (body.botcheck) return res.status(200).json({ ok: true }); // spam trap: pretend success

  const email = String(body.email || '').trim();
  if (email.length > 254 || !/^[^\s@<>"',;:\\]+@[^\s@<>"',;:\\]+\.[A-Za-z]{2,}$/.test(email)) return res.status(400).json({ ok: false, error: 'email' });

  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) return res.status(503).json({ ok: false, error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (throttled(`ip:${ip}`, 5) || throttled(`to:${email.toLowerCase()}`, 1)) return res.status(429).json({ ok: false, error: 'rate' });

  try {
    await sendMail({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com.au',
      port: Number(process.env.ZOHO_SMTP_PORT) || 465,
      user, pass, to: email,
      message: buildMessage({ from: user, to: email, name: firstName(body.name) }),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('acknowledge failed', err.stage || '', err.message);
    return res.status(502).json({ ok: false, error: 'send', stage: err.stage || 'unknown', detail: /^smtp_\d{3}$/.test(err.message) ? err.message : undefined });
  }
}

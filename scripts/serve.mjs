// Tiny local server that mirrors Vercel's cleanUrls behaviour (/about -> about.html).
// Usage: npm run dev  (then open http://localhost:3000)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.mp4': 'video/mp4',
};

const isFile = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path === '/' ? 'index.html' : path);
  if (!(await isFile(file)) && (await isFile(file + '.html'))) file += '.html';
  if (!(await isFile(file))) {
    res.writeHead(404, { 'content-type': types['.html'] });
    return res.end(await readFile(join(root, '404.html')));
  }
  const body = await readFile(file);
  const type = types[extname(file)] || 'application/octet-stream';
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (range) { // byte ranges, so video seeking works locally
    const start = Number(range[1] || 0), end = range[2] ? Number(range[2]) : body.length - 1;
    res.writeHead(206, { 'content-type': type, 'accept-ranges': 'bytes', 'content-range': `bytes ${start}-${end}/${body.length}`, 'content-length': end - start + 1 });
    return res.end(body.subarray(start, end + 1));
  }
  res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes' });
  res.end(body);
}).listen(port, () => console.log(`The Cleanic running at http://localhost:${port}`));

// Single source of truth for business facts used across the site.
// Only facts that appear on the original website are included here.
// See NOTES in the project README for items awaiting confirmation.

import { airbnbFrom } from './pricing.mjs';

export const site = {
  name: 'The Cleanic',
  url: 'https://the-cleanic-website.vercel.app',
  area: 'Auckland',
  phone: { display: '021 0260 6025', tel: '+642102606025', schema: '+64 21 0260 6025' },
  email: 'thecleanicnz@gmail.com',
  hours: [
    { days: 'Monday – Friday', short: 'Mon–Fri', time: '8am – 6pm', schema: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' } },
    { days: 'Saturday – Sunday', short: 'Sat–Sun', time: '9am – 3pm', schema: { days: ['Saturday', 'Sunday'], opens: '09:00', closes: '15:00' } },
  ],
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/the_cleanic23' },
    { name: 'Facebook', url: 'https://www.facebook.com/the.cleanic.2023' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@thecleanicnz5' },
  ],
  payment: ['Visa', 'Mastercard', 'American Express'],
  // Getform endpoints — both kept exactly as wired on the original site.
  forms: {
    quote: 'https://getform.io/f/bxoykmza', // original homepage popup + quote page
    contact: 'https://getform.io/f/bmdmrdga', // original contact page + other popups
  },
  airbnbFrom, // from ./pricing.mjs
};

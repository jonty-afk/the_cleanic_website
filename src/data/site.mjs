// Single source of truth for business facts used across the site.
// Only facts that appear on the original website are included here.
// See NOTES in the project README for items awaiting confirmation.

import { airbnbFrom } from './pricing.mjs';

export const site = {
  name: 'The Cleanic',
  url: 'https://thecleanic.co.nz',
  area: 'Auckland',
  phone: { display: '021 0260 6025', tel: '+642102606025', schema: '+64 21 0260 6025' },
  phone2: { display: '022 379 1794', tel: '+64223791794', schema: '+64 22 379 1794' },
  email: 'info@thecleanic.co.nz',
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
  // Forms are sent to Web3Forms, which emails each submission to the address the
  // access key was created for (info@thecleanic.co.nz). The key is safe to publish.
  forms: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '93a5601a-18b0-4254-8626-0e5b188f05c0',
  },
  airbnbFrom, // from ./pricing.mjs
};

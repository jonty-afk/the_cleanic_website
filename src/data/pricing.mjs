// Single source of truth for all public prices. Change a number here and rebuild
// (`npm run build`) — every page, description, FAQ and structured-data entry updates.
// `from: null` means "Quote on request". Prices are cleaning-service starting prices.

export const pricing = {
  airbnb: {
    tiers: [
      { label: 'Studio / 1 bedroom', from: 120 },
      { label: '2 bedroom', from: 145 },
      { label: '3 bedroom', from: 175 },
      { label: '4 bedroom', from: 205 },
      { label: '5+ bedroom', from: null },
    ],
  },
  regular: { from: 55, unit: 'hour' },
  oneOff: { from: 65, unit: 'hour' },
  deep: { from: 180 },
  endOfTenancy: { from: 220 },
  builders: { from: 300 },
  carpet: { from: 90, note: 'Final pricing depends on the number of rooms, carpet condition and the size of the job.' },
  window: { from: 50, note: 'Final pricing depends on window count, size, access and scope.' },
  laundry: { from: 25, unit: 'load' },
  afterParty: { from: 150, note: 'Final pricing depends on property size, condition and scope.' },
  commercial: { from: null, note: 'Every workplace is quoted individually, based on size, frequency, scope and hours.' },
  emergency: { from: null, note: 'Every job is quoted individually — we’ll confirm the price with you before we start.' },
};

export const PRICE_NOTE = 'Starting prices. Final pricing depends on property size, condition, access and cleaning scope.';
export const AIRBNB_SCOPE_NOTE = 'Prices are for the cleaning service only. They don’t include supplying or laundering linen, or restocking consumables.';
export const QUOTE = 'Quote on request';

export const money = (n) => `$${n}`;

/** "From $55/hour", "From $180", or "Quote on request". */
export const price = (key) => {
  const p = key === 'airbnb' ? { from: pricing.airbnb.tiers[0].from } : pricing[key];
  if (!p) throw new Error(`Unknown price key: ${key}`);
  if (p.from == null) return QUOTE;
  return `From ${money(p.from)}${p.unit ? `/${p.unit}` : ''}`;
};

/** Lowest numeric price for structured data, or undefined for quote-only services. */
export const minPrice = (key) => (key === 'airbnb' ? pricing.airbnb.tiers[0].from : pricing[key].from ?? undefined);

export const priceNote = (key) => pricing[key]?.note || PRICE_NOTE;

export const airbnbFrom = money(pricing.airbnb.tiers[0].from);

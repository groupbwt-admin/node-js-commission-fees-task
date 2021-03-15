export default {
  cash_in: {
    natural: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
    juridical: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
  },
  cash_out: {
    natural: { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } },
    juridical: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
  },
};

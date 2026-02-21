import { InsuranceQuote } from '@/types';

/**
 * Mock insurance quotes based on vehicle price and type.
 * Returns 3 quotes simulating Acko, HDFC Ergo (via PolicyBazaar), and New India Assurance.
 *
 * Rates are approximate market averages for UP; replace with live API calls in production.
 */
export function getInsuranceQuotes(
  exShowroomPrice: number,
  vehicleType: 'car' | 'two_wheeler',
  fuelType: string
): InsuranceQuote[] {
  // IDV ≈ ex-showroom price (first year; typically 85-100%)
  const idv = Math.round(exShowroomPrice * 0.95);

  // Base premium rates differ by vehicle type
  const isEV = fuelType === 'electric';

  let rates: { low: number; mid: number; high: number };
  if (vehicleType === 'two_wheeler') {
    rates = { low: 0.024, mid: 0.030, high: 0.036 };
  } else {
    rates = { low: 0.022, mid: 0.028, high: 0.035 };
  }

  // EV discount (~15%) or surcharge for diesel (+5%)
  const fuelMultiplier = isEV ? 0.85 : fuelType === 'diesel' ? 1.05 : 1.0;

  const lowPremium = Math.max(
    Math.round(idv * rates.low * fuelMultiplier),
    vehicleType === 'two_wheeler' ? 1800 : 8000
  );
  const midPremium = Math.max(
    Math.round(idv * rates.mid * fuelMultiplier),
    vehicleType === 'two_wheeler' ? 2400 : 12000
  );
  const highPremium = Math.max(
    Math.round(idv * rates.high * fuelMultiplier),
    vehicleType === 'two_wheeler' ? 3000 : 16000
  );

  const quotes: InsuranceQuote[] = [
    {
      provider: 'Acko',
      plan: 'Basic Comprehensive',
      annualPremium: lowPremium,
      idv,
      coverageHighlights: [
        'Own damage cover',
        'Third-party liability',
        'Zero paperwork',
        'Digital-first claims',
      ],
      isRecommended: false,
    },
    {
      provider: 'HDFC Ergo',
      plan: 'Smart Comprehensive',
      annualPremium: midPremium,
      idv,
      coverageHighlights: [
        'Own damage + TP cover',
        'Roadside assistance',
        'Engine protection',
        '5000+ cashless garages',
      ],
      isRecommended: true,
    },
    {
      provider: 'New India Assurance',
      plan: 'Premium Comprehensive',
      annualPremium: highPremium,
      idv,
      coverageHighlights: [
        'Full comprehensive cover',
        'Zero depreciation add-on',
        'Personal accident cover',
        'Consumables cover',
      ],
      isRecommended: false,
    },
  ];

  return quotes;
}

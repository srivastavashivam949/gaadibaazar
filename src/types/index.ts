export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  variant: string;
  exShowroomPrice: number;
  vehicleType: 'car' | 'two_wheeler';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'cng';
  slug: string;
}

export interface RTOCalculation {
  taxableAmount: number;
  ratePercent: number;
  rtoTax: number;
  slab: string;
}

export interface InsuranceQuote {
  provider: string;
  plan: string;
  annualPremium: number;
  coverageHighlights: string[];
  idv: number;
  isRecommended?: boolean;
}

export interface PriceReport {
  vehicle: Vehicle;
  city: string;
  exShowroomPrice: number;
  rtoCalculation: RTOCalculation;
  insuranceQuotes: InsuranceQuote[];
  handlingCharges: number;
  registrationFee: number;
  onRoadTotal: number;
  typicalDealerMarkup: { min: number; max: number };
}

export const UP_CITIES = [
  'Lucknow',
  'Kanpur',
  'Varanasi',
  'Agra',
  'Prayagraj',
] as const;

export type UPCity = (typeof UP_CITIES)[number];

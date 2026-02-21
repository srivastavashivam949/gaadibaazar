import { Vehicle, PriceReport } from '@/types';
import { calculateRTO, getHandlingCharges, getRegistrationFee } from './rto';
import { getInsuranceQuotes } from './insurance';

export function buildPriceReport(vehicle: Vehicle, city: string): PriceReport {
  const rtoCalc = calculateRTO(vehicle.exShowroomPrice, vehicle.vehicleType);
  const insuranceQuotes = getInsuranceQuotes(
    vehicle.exShowroomPrice,
    vehicle.vehicleType,
    vehicle.fuelType
  );
  const lowestInsurance = Math.min(...insuranceQuotes.map((q) => q.annualPremium));
  const handling = getHandlingCharges(vehicle.vehicleType);
  const registration = getRegistrationFee(vehicle.vehicleType);

  const onRoadTotal =
    vehicle.exShowroomPrice + rtoCalc.rtoTax + lowestInsurance + handling + registration;

  const markup =
    vehicle.vehicleType === 'two_wheeler'
      ? { min: 3000, max: 10000 }
      : vehicle.exShowroomPrice < 1000000
      ? { min: 10000, max: 25000 }
      : vehicle.exShowroomPrice < 2000000
      ? { min: 15000, max: 40000 }
      : { min: 30000, max: 80000 };

  return {
    vehicle,
    city,
    exShowroomPrice: vehicle.exShowroomPrice,
    rtoCalculation: rtoCalc,
    insuranceQuotes,
    handlingCharges: handling,
    registrationFee: registration,
    onRoadTotal,
    typicalDealerMarkup: markup,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINRShort(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

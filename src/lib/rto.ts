import { RTOCalculation } from '@/types';

/**
 * Uttar Pradesh Road Tax Slabs (hardcoded per spec)
 *
 * Two-wheelers:
 *   Up to ₹2L      → 6%
 *   ₹2L – ₹6L      → 8%
 *   Above ₹6L       → 10%
 *
 * Cars:
 *   Up to ₹10L     → 8%
 *   ₹10L – ₹20L   → 10%
 *   ₹20L – ₹40L   → 12%
 *   Above ₹40L     → 14%
 */

const TWO_WHEELER_SLABS = [
  { max: 200000, rate: 6, label: 'Up to ₹2 Lakh' },
  { max: 600000, rate: 8, label: '₹2 Lakh – ₹6 Lakh' },
  { max: Infinity, rate: 10, label: 'Above ₹6 Lakh' },
];

const CAR_SLABS = [
  { max: 1000000, rate: 8, label: 'Up to ₹10 Lakh' },
  { max: 2000000, rate: 10, label: '₹10 Lakh – ₹20 Lakh' },
  { max: 4000000, rate: 12, label: '₹20 Lakh – ₹40 Lakh' },
  { max: Infinity, rate: 14, label: 'Above ₹40 Lakh' },
];

export function calculateRTO(
  exShowroomPrice: number,
  vehicleType: 'car' | 'two_wheeler'
): RTOCalculation {
  const slabs = vehicleType === 'two_wheeler' ? TWO_WHEELER_SLABS : CAR_SLABS;

  const slab = slabs.find((s) => exShowroomPrice <= s.max)!;
  const rtoTax = Math.round((exShowroomPrice * slab.rate) / 100);

  return {
    taxableAmount: exShowroomPrice,
    ratePercent: slab.rate,
    rtoTax,
    slab: slab.label,
  };
}

/**
 * Handling + Registration flat estimates by vehicle type
 */
export function getHandlingCharges(vehicleType: 'car' | 'two_wheeler'): number {
  return vehicleType === 'two_wheeler' ? 7500 : 12000;
}

export function getRegistrationFee(vehicleType: 'car' | 'two_wheeler'): number {
  return vehicleType === 'two_wheeler' ? 1500 : 5000;
}

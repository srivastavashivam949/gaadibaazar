import { Vehicle } from '@/types';

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeSlug(brand: string, model: string, variant: string): string {
  return `${toSlug(brand)}-${toSlug(model)}-${toSlug(variant)}`;
}

type RawVehicle = Omit<Vehicle, 'id' | 'slug'>;

const rawVehicles: RawVehicle[] = [
  // ── Maruti Suzuki ──────────────────────────────────────────
  { brand: 'Maruti Suzuki', model: 'Swift', variant: 'LXi', exShowroomPrice: 649000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Swift', variant: 'VXi', exShowroomPrice: 714000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Swift', variant: 'ZXi', exShowroomPrice: 899000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Swift', variant: 'ZXi+', exShowroomPrice: 985000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Baleno', variant: 'Sigma', exShowroomPrice: 661000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Baleno', variant: 'Delta', exShowroomPrice: 745000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Baleno', variant: 'Zeta', exShowroomPrice: 860000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Baleno', variant: 'Alpha', exShowroomPrice: 949000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Brezza', variant: 'LXi', exShowroomPrice: 829000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Brezza', variant: 'VXi', exShowroomPrice: 1000000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Brezza', variant: 'ZXi', exShowroomPrice: 1220000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Brezza', variant: 'ZXi+', exShowroomPrice: 1327000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'WagonR', variant: 'LXI 1.0', exShowroomPrice: 554000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'WagonR', variant: 'VXI 1.0', exShowroomPrice: 611000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'WagonR', variant: 'VXI 1.2', exShowroomPrice: 660000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Ertiga', variant: 'VXI', exShowroomPrice: 940000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Maruti Suzuki', model: 'Ertiga', variant: 'ZXI', exShowroomPrice: 1131000, vehicleType: 'car', fuelType: 'petrol' },
  // ── Hyundai ────────────────────────────────────────────────
  { brand: 'Hyundai', model: 'Creta', variant: 'E', exShowroomPrice: 1100000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Creta', variant: 'EX', exShowroomPrice: 1236000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Creta', variant: 'S', exShowroomPrice: 1400000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Creta', variant: 'S(O)', exShowroomPrice: 1530000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Creta', variant: 'SX', exShowroomPrice: 1800000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Creta', variant: 'SX(O)', exShowroomPrice: 1990000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'i20', variant: 'Era', exShowroomPrice: 704000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'i20', variant: 'Magna', exShowroomPrice: 821000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'i20', variant: 'Sportz', exShowroomPrice: 1010000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'i20', variant: 'Asta', exShowroomPrice: 1145000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Venue', variant: 'E', exShowroomPrice: 795000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Venue', variant: 'S', exShowroomPrice: 1000000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Hyundai', model: 'Venue', variant: 'SX', exShowroomPrice: 1249000, vehicleType: 'car', fuelType: 'petrol' },
  // ── Honda ──────────────────────────────────────────────────
  { brand: 'Honda', model: 'City', variant: 'V', exShowroomPrice: 1189000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'City', variant: 'VX', exShowroomPrice: 1359000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'City', variant: 'ZX', exShowroomPrice: 1599000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'Amaze', variant: 'E CVT', exShowroomPrice: 830000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'Amaze', variant: 'V CVT', exShowroomPrice: 997000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'Elevate', variant: 'V', exShowroomPrice: 1149000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Honda', model: 'Elevate', variant: 'VX', exShowroomPrice: 1449000, vehicleType: 'car', fuelType: 'petrol' },
  // ── Tata ───────────────────────────────────────────────────
  { brand: 'Tata', model: 'Nexon', variant: 'Smart', exShowroomPrice: 810000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Nexon', variant: 'Pure', exShowroomPrice: 949000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Nexon', variant: 'Creative', exShowroomPrice: 1350000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Nexon', variant: 'Creative+', exShowroomPrice: 1499000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Punch', variant: 'Pure', exShowroomPrice: 600000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Punch', variant: 'Adventure', exShowroomPrice: 813000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Punch', variant: 'Accomplished', exShowroomPrice: 940000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Tiago', variant: 'XE', exShowroomPrice: 531000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Tiago', variant: 'XM', exShowroomPrice: 614000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Tiago', variant: 'XT', exShowroomPrice: 703000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Tata', model: 'Nexon EV', variant: 'Creative', exShowroomPrice: 1449000, vehicleType: 'car', fuelType: 'electric' },
  { brand: 'Tata', model: 'Nexon EV', variant: 'Fearless', exShowroomPrice: 1799000, vehicleType: 'car', fuelType: 'electric' },
  // ── Kia ────────────────────────────────────────────────────
  { brand: 'Kia', model: 'Seltos', variant: 'HTE', exShowroomPrice: 1069000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Kia', model: 'Seltos', variant: 'HTK', exShowroomPrice: 1249000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Kia', model: 'Seltos', variant: 'HTX', exShowroomPrice: 1469000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Kia', model: 'Seltos', variant: 'GTX+', exShowroomPrice: 2050000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Kia', model: 'Sonet', variant: 'HTE', exShowroomPrice: 799000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Kia', model: 'Sonet', variant: 'HTX', exShowroomPrice: 1199000, vehicleType: 'car', fuelType: 'petrol' },
  // ── Toyota ─────────────────────────────────────────────────
  { brand: 'Toyota', model: 'Fortuner', variant: '4x2 AT', exShowroomPrice: 3343000, vehicleType: 'car', fuelType: 'diesel' },
  { brand: 'Toyota', model: 'Fortuner', variant: '4x4 MT', exShowroomPrice: 3649000, vehicleType: 'car', fuelType: 'diesel' },
  { brand: 'Toyota', model: 'Innova Crysta', variant: '2.4 G MT', exShowroomPrice: 1977000, vehicleType: 'car', fuelType: 'diesel' },
  { brand: 'Toyota', model: 'Innova Crysta', variant: '2.4 GX MT', exShowroomPrice: 2152000, vehicleType: 'car', fuelType: 'diesel' },
  { brand: 'Toyota', model: 'Urban Cruiser Hyryder', variant: 'E', exShowroomPrice: 1088000, vehicleType: 'car', fuelType: 'petrol' },
  { brand: 'Toyota', model: 'Urban Cruiser Hyryder', variant: 'S', exShowroomPrice: 1399000, vehicleType: 'car', fuelType: 'petrol' },
  // ── Hero ───────────────────────────────────────────────────
  { brand: 'Hero', model: 'Splendor Plus', variant: 'Kick Start', exShowroomPrice: 75290, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Hero', model: 'Splendor Plus', variant: 'Self Start', exShowroomPrice: 80290, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Hero', model: 'HF Deluxe', variant: 'Kick Start', exShowroomPrice: 64628, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Hero', model: 'HF Deluxe', variant: 'Self Start', exShowroomPrice: 69628, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Hero', model: 'Glamour', variant: 'Standard', exShowroomPrice: 84370, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Hero', model: 'Vida V1', variant: 'Plus', exShowroomPrice: 145490, vehicleType: 'two_wheeler', fuelType: 'electric' },
  // ── Honda (Two-wheelers) ────────────────────────────────────
  { brand: 'Honda', model: 'Activa 6G', variant: 'Standard', exShowroomPrice: 74535, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Honda', model: 'Activa 6G', variant: 'Deluxe', exShowroomPrice: 77035, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Honda', model: 'CB Shine', variant: 'Standard', exShowroomPrice: 83490, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Honda', model: 'SP 125', variant: 'Standard', exShowroomPrice: 96393, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  // ── TVS ────────────────────────────────────────────────────
  { brand: 'TVS', model: 'Jupiter', variant: 'Standard', exShowroomPrice: 72990, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'TVS', model: 'Jupiter', variant: 'ZX', exShowroomPrice: 78490, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'TVS', model: 'Jupiter', variant: 'Classic', exShowroomPrice: 90000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'TVS', model: 'Apache RTR 160', variant: '4V Single Disc', exShowroomPrice: 111000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'TVS', model: 'Apache RTR 200', variant: '4V', exShowroomPrice: 148000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'TVS', model: 'iQube', variant: 'Standard', exShowroomPrice: 99900, vehicleType: 'two_wheeler', fuelType: 'electric' },
  // ── Bajaj ──────────────────────────────────────────────────
  { brand: 'Bajaj', model: 'Pulsar 150', variant: 'Single Disc', exShowroomPrice: 101640, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Bajaj', model: 'Pulsar NS160', variant: 'Standard', exShowroomPrice: 133000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Bajaj', model: 'Pulsar NS200', variant: 'Standard', exShowroomPrice: 153000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Bajaj', model: 'Pulsar 220F', variant: 'Standard', exShowroomPrice: 140000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Bajaj', model: 'Platina 110', variant: 'Kick Start', exShowroomPrice: 68000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  // ── Royal Enfield ──────────────────────────────────────────
  { brand: 'Royal Enfield', model: 'Classic 350', variant: 'Halcyon', exShowroomPrice: 193000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Classic 350', variant: 'Signals', exShowroomPrice: 209500, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Classic 350', variant: 'Chrome', exShowroomPrice: 224500, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Bullet 350', variant: 'Standard', exShowroomPrice: 174000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Meteor 350', variant: 'Fireball', exShowroomPrice: 210000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Meteor 350', variant: 'Stellar', exShowroomPrice: 235000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Hunter 350', variant: 'Dapper', exShowroomPrice: 166000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Royal Enfield', model: 'Himalayan 450', variant: 'Standard', exShowroomPrice: 285000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  // ── Yamaha ─────────────────────────────────────────────────
  { brand: 'Yamaha', model: 'FZ-S V3', variant: 'Fi', exShowroomPrice: 112900, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Yamaha', model: 'FZ 25', variant: 'Standard', exShowroomPrice: 153400, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Yamaha', model: 'R15 V4', variant: 'Standard', exShowroomPrice: 179000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  // ── Suzuki ─────────────────────────────────────────────────
  { brand: 'Suzuki', model: 'Access 125', variant: 'CBS', exShowroomPrice: 87200, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  { brand: 'Suzuki', model: 'Gixxer 150', variant: 'Standard', exShowroomPrice: 129000, vehicleType: 'two_wheeler', fuelType: 'petrol' },
  // ── Electric Scooters ──────────────────────────────────────
  { brand: 'Ather', model: '450X', variant: 'Pro', exShowroomPrice: 146000, vehicleType: 'two_wheeler', fuelType: 'electric' },
  { brand: 'Ola', model: 'S1 Pro', variant: 'Gen 2', exShowroomPrice: 147499, vehicleType: 'two_wheeler', fuelType: 'electric' },
  { brand: 'Ola', model: 'S1 Air', variant: 'Standard', exShowroomPrice: 109999, vehicleType: 'two_wheeler', fuelType: 'electric' },
];

function buildVehicles(): Vehicle[] {
  // First pass: count how many times each base slug appears
  const baseSlugs = rawVehicles.map((v) => makeSlug(v.brand, v.model, v.variant));
  const freq: Record<string, number> = {};
  baseSlugs.forEach((s) => { freq[s] = (freq[s] ?? 0) + 1; });

  // Second pass: assign de-duplicated slugs
  const cursor: Record<string, number> = {};
  return rawVehicles.map((v, i) => {
    const base = baseSlugs[i];
    let slug: string;
    if (freq[base] === 1) {
      slug = base;
    } else {
      cursor[base] = (cursor[base] ?? 0) + 1;
      slug = `${base}-v${cursor[base]}`;
    }
    return { ...v, id: `vehicle-${i + 1}`, slug };
  });
}

export const vehicles: Vehicle[] = buildVehicles();

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getBrands(): string[] {
  return [...new Set(vehicles.map((v) => v.brand))].sort();
}

export function getModelsByBrand(brand: string): string[] {
  return [...new Set(vehicles.filter((v) => v.brand === brand).map((v) => v.model))].sort();
}

export function getVariantsByBrandModel(brand: string, model: string): Vehicle[] {
  return vehicles.filter((v) => v.brand === brand && v.model === model);
}

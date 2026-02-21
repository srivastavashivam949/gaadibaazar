import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVehicleBySlug } from '@/lib/vehicles';
import { buildPriceReport, formatINR } from '@/lib/report';
import PriceReportView from '@/components/PriceReportView';
import { UP_CITIES } from '@/types';

interface Props {
  params: { vehicleSlug: string; city: string };
}

// Capitalise "lucknow" → "Lucknow"
function normaliseCity(raw: string): string {
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = getVehicleBySlug(params.vehicleSlug);
  if (!vehicle) return { title: 'Not found' };
  const city = normaliseCity(params.city);
  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.variant} On-Road Price in ${city} — GaadiBaazar`,
    description: `Get the exact on-road price for ${vehicle.brand} ${vehicle.model} ${vehicle.variant} in ${city}, UP. Includes RTO tax, insurance and handling.`,
  };
}

export default function PriceReportPage({ params }: Props) {
  const vehicle = getVehicleBySlug(params.vehicleSlug);

  if (!vehicle) {
    notFound();
  }

  const city = normaliseCity(params.city);
  if (!UP_CITIES.includes(city as typeof UP_CITIES[number])) {
    notFound();
  }

  const report = buildPriceReport(vehicle, city);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Breadcrumb */}
      <nav className="py-4 text-sm text-gray-500">
        <a href="/" className="hover:text-saffron-600 transition">
          Home
        </a>{' '}
        / Price Report
      </nav>

      {/* Vehicle header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
            {vehicle.vehicleType === 'two_wheeler' ? 'Two-wheeler' : 'Car'}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
            {vehicle.fuelType}
          </span>
          <span className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-medium text-saffron-700">
            📍 {city}, UP
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {vehicle.brand} {vehicle.model}{' '}
          <span className="text-saffron-500">{vehicle.variant}</span>
        </h1>
        <p className="mt-1 text-gray-500">
          Ex-showroom:{' '}
          <strong className="text-gray-700">{formatINR(vehicle.exShowroomPrice)}</strong>
          &nbsp;· On-road from{' '}
          <strong className="text-saffron-600">{formatINR(report.onRoadTotal)}</strong>
        </p>
      </div>

      <PriceReportView report={report} />

      {/* Back link */}
      <div className="mt-8 text-center">
        <a href="/" className="text-sm text-saffron-600 hover:underline">
          ← Check another vehicle
        </a>
      </div>
    </div>
  );
}

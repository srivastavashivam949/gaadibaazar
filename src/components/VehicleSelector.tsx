'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, UP_CITIES, UPCity } from '@/types';

export default function VehicleSelector() {
  const router = useRouter();

  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [variants, setVariants] = useState<Vehicle[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedCity, setSelectedCity] = useState<UPCity>('Lucknow');
  const [loading, setLoading] = useState(false);

  // Load brands on mount
  useEffect(() => {
    fetch('/api/vehicles?action=brands')
      .then((r) => r.json())
      .then(setBrands);
  }, []);

  // Load models when brand changes
  useEffect(() => {
    if (!selectedBrand) return;
    setSelectedModel('');
    setSelectedVariant('');
    setVariants([]);
    fetch(`/api/vehicles?action=models&brand=${encodeURIComponent(selectedBrand)}`)
      .then((r) => r.json())
      .then(setModels);
  }, [selectedBrand]);

  // Load variants when model changes
  useEffect(() => {
    if (!selectedBrand || !selectedModel) return;
    setSelectedVariant('');
    fetch(
      `/api/vehicles?action=variants&brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}`
    )
      .then((r) => r.json())
      .then(setVariants);
  }, [selectedBrand, selectedModel]);

  const selectedVehicle = variants.find((v) => v.slug === selectedVariant);
  const canSubmit = !!selectedVariant && !!selectedCity;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    router.push(`/price-report/${selectedVariant}/${selectedCity.toLowerCase()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Brand */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand</label>
        <select
          className="select-field"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Select brand…</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Model</label>
        <select
          className="select-field"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedBrand}
        >
          <option value="">Select model…</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Variant */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Variant</label>
        <select
          className="select-field"
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          disabled={!selectedModel}
        >
          <option value="">Select variant…</option>
          {variants.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.variant}{' '}
              {v.fuelType !== 'petrol'
                ? `(${v.fuelType.charAt(0).toUpperCase() + v.fuelType.slice(1)})`
                : ''}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
        <select
          className="select-field"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value as UPCity)}
        >
          {UP_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Price preview */}
      {selectedVehicle && (
        <div className="rounded-xl bg-saffron-50 px-4 py-3 text-sm">
          <span className="text-gray-600">Ex-showroom price: </span>
          <span className="font-bold text-saffron-700">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(selectedVehicle.exShowroomPrice)}
          </span>
        </div>
      )}

      <button type="submit" disabled={!canSubmit || loading} className="btn-primary w-full text-base">
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating…
          </>
        ) : (
          'Get My Price Report →'
        )}
      </button>
    </form>
  );
}

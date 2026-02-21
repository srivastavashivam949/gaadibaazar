'use client';

import { useState } from 'react';

const BENEFITS = [
  'Expert calls your dealer to negotiate on your behalf',
  'Identify & remove forced add-ons saving ₹15,000+',
  'Best insurance deal locked in before delivery',
  'Finance rate negotiation (if applicable)',
  'Pre-delivery inspection checklist',
  'Report any discrepancies to GaadiBaazar team',
];

export default function BookConsultationPage() {
  const [step, setStep] = useState<'landing' | 'form' | 'success'>('landing');
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', city: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate Razorpay checkout + API call
    await new Promise((r) => setTimeout(r, 1500));
    setStep('success');
    setSubmitting(false);
  }

  if (step === 'success') {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Booking Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Hi <strong>{form.name}</strong>, our expert will call you within 2 hours on{' '}
          <strong>{form.phone}</strong>.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          We&apos;ll negotiate the best possible deal for your{' '}
          <strong>{form.vehicle || 'vehicle'}</strong> in{' '}
          <strong>{form.city || 'your city'}</strong>.
        </p>
        <a href="/" className="btn-primary mt-6">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-saffron-100 px-4 py-1 text-sm font-semibold text-saffron-700">
          Expert Negotiation Service
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Let Us Negotiate For You
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Our certified experts handle the entire negotiation with your dealer — saving you time,
          stress, and typically{' '}
          <span className="font-semibold text-saffron-600">₹15,000 – ₹80,000</span>.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Benefits */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">What You Get for ₹499</h2>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">
                  ✓
                </span>
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-saffron-50 p-4">
            <p className="text-sm font-semibold text-saffron-800">Average customer saving: ₹22,000</p>
            <p className="mt-1 text-xs text-saffron-700">
              Our fee pays for itself 44× over on an average car purchase.
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-700">⭐ 4.8 / 5 · 340+ happy customers in UP</p>
            <div className="mt-3 space-y-2">
              {[
                { quote: '"Saved ₹34,000 on my Creta SX. Absolutely worth it!"', name: '— Rahul, Lucknow' },
                { quote: '"They removed 3 forced accessories the dealer tried to add."', name: '— Priya, Kanpur' },
              ].map((t) => (
                <div key={t.name} className="rounded-lg bg-white px-3 py-2 shadow-sm">
                  <p className="text-sm italic text-gray-600">{t.quote}</p>
                  <p className="mt-1 text-xs text-gray-400">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking form */}
        <div>
          {step === 'landing' ? (
            <div className="card space-y-6">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-saffron-500">₹499</p>
                <p className="text-sm text-gray-500">One-time expert negotiation fee</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-green-500">✓</span> 100% money-back if we can&apos;t save you money</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Expert calls within 2 hours</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Valid for any UP city</li>
              </ul>
              <button onClick={() => setStep('form')} className="btn-primary w-full text-base">
                Book Expert Help — ₹499
              </button>
              <p className="text-center text-xs text-gray-400">
                Secure checkout via Razorpay · UPI / Card / Net Banking
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-4">
              <h3 className="font-bold text-gray-800">Your Details</h3>
              {[
                { name: 'name', label: 'Full Name', placeholder: 'Rahul Gupta', type: 'text' },
                { name: 'phone', label: 'WhatsApp Number', placeholder: '98765 43210', type: 'tel' },
                { name: 'vehicle', label: 'Vehicle (e.g. Hyundai Creta SX)', placeholder: 'Hyundai Creta SX', type: 'text' },
                { name: 'city', label: 'City', placeholder: 'Lucknow', type: 'text' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleChange}
                    className="select-field"
                  />
                </div>
              ))}

              <div className="rounded-xl bg-saffron-50 p-3 text-center">
                <p className="font-bold text-saffron-700">Total: ₹499</p>
                <p className="text-xs text-saffron-600">Razorpay secure checkout will open next</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base"
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing payment…
                  </>
                ) : (
                  'Pay ₹499 & Book Now'
                )}
              </button>
              <button type="button" onClick={() => setStep('landing')} className="w-full text-center text-sm text-gray-400 hover:text-gray-600">
                ← Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { PriceReport } from '@/types';
import { formatINR, formatINRShort } from '@/lib/report';
import { useCallback } from 'react';

interface Props {
  report: PriceReport;
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${
        highlight ? 'rounded-xl bg-saffron-50 px-3' : 'border-b border-gray-50'
      }`}
    >
      <span className={`text-sm ${highlight ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
        {label}
      </span>
      <span className={`font-semibold ${highlight ? 'text-saffron-600 text-base' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}

export default function PriceReportView({ report }: Props) {
  const { vehicle, city, rtoCalculation, insuranceQuotes, handlingCharges, registrationFee, onRoadTotal, typicalDealerMarkup } = report;

  const lowestInsurance = Math.min(...insuranceQuotes.map((q) => q.annualPremium));

  const whatsappText = encodeURIComponent(
    `🚗 *GaadiBaazar Price Report*\n\n` +
    `*Vehicle:* ${vehicle.brand} ${vehicle.model} ${vehicle.variant}\n` +
    `*City:* ${city}\n\n` +
    `Ex-showroom: ${formatINR(vehicle.exShowroomPrice)}\n` +
    `RTO Tax (${rtoCalculation.ratePercent}%): ${formatINR(rtoCalculation.rtoTax)}\n` +
    `Insurance: ${formatINR(lowestInsurance)}\n` +
    `Handling & Registration: ${formatINR(handlingCharges + registrationFee)}\n\n` +
    `*✅ Fair On-Road Price: ${formatINR(onRoadTotal)}*\n\n` +
    `⚠️ Dealers typically add ${formatINR(typicalDealerMarkup.min)}–${formatINR(typicalDealerMarkup.max)} in extras.\n\n` +
    `Generated via GaadiBaazar`
  );

  const handleDownloadPDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const primaryColor: [number, number, number] = [249, 124, 0];
    const darkColor: [number, number, number] = [17, 24, 39];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('GaadiBaazar', 14, 20);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Price Transparency Report — Uttar Pradesh', 14, 30);

    // Vehicle title
    doc.setTextColor(...darkColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${vehicle.brand} ${vehicle.model} ${vehicle.variant}`, 14, 55);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`City: ${city} | Fuel: ${vehicle.fuelType} | Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 63);

    // Price breakdown table
    doc.setTextColor(...darkColor);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Price Breakdown', 14, 78);

    const rows = [
      ['Ex-showroom Price', formatINR(vehicle.exShowroomPrice)],
      [`RTO Tax (UP — ${rtoCalculation.slab} @ ${rtoCalculation.ratePercent}%)`, formatINR(rtoCalculation.rtoTax)],
      ['1st Year Insurance (lowest quote)', formatINR(lowestInsurance)],
      ['Handling Charges', formatINR(handlingCharges)],
      ['Registration Fee', formatINR(registrationFee)],
    ];

    let y = 85;
    doc.setFontSize(10);
    rows.forEach(([label, value], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(249, 250, 251);
        doc.rect(14, y - 4, 182, 9, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(75, 85, 99);
      doc.text(label, 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(value, 196 - doc.getTextWidth(value), y);
      y += 10;
    });

    // Total
    doc.setFillColor(...primaryColor);
    doc.rect(14, y - 2, 182, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Fair On-Road Price (Total)', 18, y + 6);
    doc.text(formatINR(onRoadTotal), 196 - doc.getTextWidth(formatINR(onRoadTotal)), y + 6);
    y += 20;

    // Dealer markup warning
    doc.setTextColor(185, 28, 28);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('⚠ Dealer Markup Alert', 14, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text(
      `Dealers in ${city} typically add ${formatINR(typicalDealerMarkup.min)}–${formatINR(typicalDealerMarkup.max)} in forced add-ons.`,
      14,
      y + 13
    );
    doc.text('Use this report to negotiate or book expert help at GaadiBaazar.', 14, y + 20);

    doc.save(`GaadiBaazar-${vehicle.brand}-${vehicle.model}-${vehicle.variant}.pdf`);
  }, [report, city, vehicle, rtoCalculation, lowestInsurance, handlingCharges, registrationFee, onRoadTotal, typicalDealerMarkup]);

  return (
    <div className="space-y-6">
      {/* Price Breakdown Card */}
      <div className="card">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Price Breakdown</h2>
        <div className="space-y-0.5">
          <Row label="Ex-showroom Price" value={formatINR(vehicle.exShowroomPrice)} />
          <Row
            label={`RTO Tax — ${rtoCalculation.slab} (${rtoCalculation.ratePercent}%)`}
            value={formatINR(rtoCalculation.rtoTax)}
          />
          <Row label="1st Year Insurance (lowest quote)" value={formatINR(lowestInsurance)} />
          <Row label="Handling Charges" value={formatINR(handlingCharges)} />
          <Row label="Registration Fee" value={formatINR(registrationFee)} />
        </div>
        <div className="mt-4">
          <Row label="✅ Fair On-Road Price" value={formatINR(onRoadTotal)} highlight />
        </div>
      </div>

      {/* RTO Detail */}
      <div className="card bg-blue-50 ring-blue-100">
        <h3 className="mb-2 font-semibold text-blue-800">UP RTO Tax Calculation</h3>
        <p className="text-sm text-blue-700">
          Vehicle type: <strong>{vehicle.vehicleType === 'two_wheeler' ? 'Two-wheeler' : 'Car'}</strong> ·
          Applicable slab: <strong>{rtoCalculation.slab}</strong> ·
          Tax rate: <strong>{rtoCalculation.ratePercent}%</strong>
        </p>
        <p className="mt-1 text-sm text-blue-700">
          {formatINR(rtoCalculation.taxableAmount)} × {rtoCalculation.ratePercent}% ={' '}
          <strong>{formatINR(rtoCalculation.rtoTax)}</strong>
        </p>
      </div>

      {/* Insurance Quotes */}
      <div className="card">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Insurance Quotes (1st Year)</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {insuranceQuotes.map((q) => (
            <div
              key={q.provider}
              className={`relative rounded-xl p-4 ring-1 transition ${
                q.isRecommended
                  ? 'bg-saffron-50 ring-saffron-300 shadow-md'
                  : 'bg-gray-50 ring-gray-200'
              }`}
            >
              {q.isRecommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-saffron-500 px-3 py-0.5 text-xs font-bold text-white">
                  Recommended
                </span>
              )}
              <p className="font-bold text-gray-800">{q.provider}</p>
              <p className="text-xs text-gray-500">{q.plan}</p>
              <p className="mt-2 text-2xl font-extrabold text-saffron-600">
                {formatINRShort(q.annualPremium)}
                <span className="text-sm font-normal text-gray-500">/yr</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">IDV: {formatINR(q.idv)}</p>
              <ul className="mt-3 space-y-1">
                {q.coverageHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="mt-0.5 text-green-500">✓</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          * Estimates only. Final premium depends on NCB, add-ons, and insurer approval. Compare quotes on Acko / PolicyBazaar for exact pricing.
        </p>
      </div>

      {/* Dealer Markup Alert */}
      <div className="rounded-2xl border-l-4 border-red-400 bg-red-50 p-5">
        <p className="font-bold text-red-700">⚠ Dealer Markup Alert</p>
        <p className="mt-1 text-sm text-red-600">
          Dealers in <strong>{city}</strong> typically add{' '}
          <strong>
            {formatINR(typicalDealerMarkup.min)} – {formatINR(typicalDealerMarkup.max)}
          </strong>{' '}
          in forced add-ons (extended warranty, accessories, insurance upsell, "dealer fees"). Use
          this report to push back.
        </p>
      </div>

      {/* CTA Module */}
      <div className="card bg-gray-900 text-white">
        <p className="text-center text-xl font-bold">
          Take this report to your dealer — or let us negotiate for you
        </p>
        <p className="mt-2 text-center text-sm text-gray-400">
          Our experts have helped buyers save an average of ₹22,000 on their vehicle purchase.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share Report on WhatsApp
          </a>
          <button
            onClick={handleDownloadPDF}
            className="btn-outline border-white text-white hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Report
          </button>
          <a href="/book-consultation" className="btn-primary">
            Book Expert Help — ₹499
          </a>
        </div>
      </div>
    </div>
  );
}

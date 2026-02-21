import VehicleSelector from '@/components/VehicleSelector';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-8 text-center sm:pt-20">
        <span className="inline-block rounded-full bg-saffron-100 px-4 py-1 text-sm font-semibold text-saffron-700">
          100% Free · Updated Monthly
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Know Your Vehicle&apos;s{' '}
          <span className="text-saffron-500">Real On-Road Price</span> in UP
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Get an accurate breakdown — Ex-showroom, RTO tax, insurance & handling — so you never
          overpay at the dealership.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Selector card */}
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="mb-5 text-lg font-bold text-gray-800">Select Your Vehicle</h2>
            <VehicleSelector />
          </div>
        </div>

        {/* Value props */}
        <aside className="lg:col-span-2 space-y-4">
          {[
            {
              icon: '📊',
              title: 'RTO Tax Calculator',
              desc: 'Exact UP state road tax slabs applied automatically.',
            },
            {
              icon: '🛡️',
              title: '3 Insurance Quotes',
              desc: 'Compare Acko, HDFC Ergo & New India Assurance side-by-side.',
            },
            {
              icon: '📄',
              title: 'Shareable PDF Report',
              desc: 'Download or WhatsApp the report straight to your dealer.',
            },
            {
              icon: '🤝',
              title: 'Expert Negotiation',
              desc: 'Book a ₹499 consultation — we negotiate on your behalf.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Social proof */}
      <section className="mt-12 rounded-2xl bg-saffron-500 p-8 text-center text-white">
        <p className="text-2xl font-bold">Dealers in UP add ₹15,000–₹80,000 in hidden charges.</p>
        <p className="mt-2 text-saffron-100">
          Know the fair price before you walk in. Our report shows exactly what you should pay.
        </p>
      </section>
    </div>
  );
}

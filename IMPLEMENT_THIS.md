### SOLUTION 1 SPEC — GaadiBaazar Price Transparency Tool

**Page Structure:**
```
/ (Home — vehicle selector form)
/price-report/:vehicleSlug/:city (Results page)
/book-consultation (CTA landing — Razorpay checkout)
```

**Functional Requirements:**

1. **Vehicle Selector (Step 1)**
   - Dropdown: Brand → Model → Variant (cascading, pre-seeded database)
   - City selector defaulting to Lucknow (with other UP cities: Kanpur, Varanasi, Agra, Prayagraj)
   - "Get My Price Report" CTA button

2. **Price Report Page (Results)**
   - Display: Ex-showroom price (static, updated monthly from manufacturer sites)
   - UP RTO Calculation Engine:
     - Two-wheeler: Up to ₹2L → 6%, ₹2L–₹6L → 8%, above ₹6L → 10%
     - Cars: Up to ₹10L → 8%, ₹10L–₹20L → 10%, ₹20L–₹40L → 12%, above ₹40L → 14%
     - (These are the actual UP state road tax slabs — hardcode them)
   - Insurance Estimate: Call PolicyBazaar / Acko API (or scrape their calculators) — return 3 quotes
   - Handling + Registration: Flat estimate ₹7,000–₹15,000 based on vehicle type
   - Total Fair On-Road Price: Sum of above
   - "Dealer Markup Alert" banner: Show typical markup dealers add (e.g., "Dealers in Lucknow typically add ₹15,000–₹40,000 in forced add-ons")
   - Shareable report (generate PDF / WhatsApp share link)

3. **CTA Module** (bottom of report):
   - Headline: "Take this report to your dealer — or let us negotiate for you"
   - Two buttons: [Share Report on WhatsApp] [Book Expert Help — ₹499]

**Database Schema:**
```sql
Table: vehicles
  id UUID PK
  brand VARCHAR
  model VARCHAR
  variant VARCHAR
  ex_showroom_price INTEGER
  vehicle_type ENUM('car', 'two_wheeler')
  fuel_type ENUM('petrol', 'diesel', 'electric', 'cng')
  last_updated TIMESTAMP

Table: rto_slabs
  id UUID PK
  state VARCHAR
  vehicle_type ENUM
  min_price INTEGER
  max_price INTEGER
  rate_percent DECIMAL

Table: price_reports
  id UUID PK
  vehicle_id UUID FK
  city VARCHAR
  generated_at TIMESTAMP
  on_road_total INTEGER
  shared_count INTEGER
  ```
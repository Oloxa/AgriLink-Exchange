# AgriLink Exchange 🌾

> **Global B2B Agricultural Trade Portal & Exporter Directory**  
> Direct farm-gate sourcing connecting verified African and international agricultural commodity exporters with global procurement desks, food manufacturers, and industrial mills.

---

## 📋 Project Overview

**AgriLink Exchange** is an institutional-grade B2B web portal engineered for international agricultural trade. It solves the fragmentation and verification gap in cross-border bulk sourcing by providing an audited directory of origin exporters across 48 countries (including Nigeria, Ghana, Kenya, South Africa, Egypt, Brazil, India, Vietnam, Indonesia, Peru, Côte d'Ivoire, and Colombia). 

Buyers can search by crop and port, filter by certifications (GlobalG.A.P, USDA Organic, HACCP, Fairtrade, ISO 22000, Rainforest Alliance), check 12-month harvest calendars, broadcast standardized multi-supplier Requests for Quotation (RFQs) under Incoterms® 2020 rules, negotiate offers, and track pre-shipment quality assay timelines.

---

## ✨ Key Features

### 1. Mandatory Authentication Gate & Tester Access
- **Institutional Login Gate:** Starts at the login interface before granting access to the directory or dashboard.
- **Witty Feedback on Regular Login:** Enter any work email and password to trigger humorous animated feedback conveying that the user is not found in the agricultural database, encouraging the evaluator to use instant demo access.
- **⚡ Instant Tester Login:** One-click demo authentication as **Marcus Vance** (Chief Agricultural Procurement Officer at *EuroAgrar Commodity Sourcing GmbH, Hamburg*).
- **Code-Splitting & Lazy Loading:** Lazy loading with Suspense skeleton screens between login and core application modules.

### 2. High-Impact Editorial Landing Page
- **Hero & Search Engine:** Instant crop + country origin search bar leading into the directory.
- **Trust Counters:** 1,200+ Audited Exporters, 48 Origin Countries, $2.4B+ Export Volume Traded, 99.4% On-time discharge.
- **Commodity Categories:** 8 core sectors (Grains, Cocoa & Coffee, Fruits, Vegetables, Nuts & Oilseeds, Spices, Tubers, Livestock Feed).
- **3-Step Workflow:** Transparent guide on finding exporters, multi-supplier RFQ tendering, and escrow closing.
- **Featured Exporters & Testimonials:** Real endorsements from procurement leaders in Rotterdam, Paris, Alexandria, and Melbourne.

### 3. Exporter Directory (Core Marketplace)
- **40 Realistic Mock Exporters:** Full dataset with company backgrounds, processing capacities, primary departure ports, and review counts.
- **Multi-Faceted Filters:** Product category, origin country, certification, minimum order quantity (MOQ) range slider, response time threshold, and verified-only toggle.
- **Mobile Bottom-Sheet:** Seamless drawer filter experience on smartphones and tablets.
- **Sorting & View Modes:** Relevance, highest rating, fastest response, and lowest MOQ; toggle between grid and list views.
- **Simulated Loading Shimmer:** 450ms skeleton loader when filtering or sorting.

### 4. Detailed Supplier Profile
- **Processing Overview:** Annual metric ton capacity, years in trade, and departure ports.
- **12-Month Seasonal Availability Matrix:** Interactive calendar showing harvest windows and off-season silo availability for each catalog crop.
- **Verified Buyer Reviews:** Real transaction ratings, buyer company titles, and trade dates.
- **Sticky Quotation Side Panel:** Quick configuration for instant quotation dispatch.

### 5. Multi-Step RFQ Builder
- **Step 1 (Commodity):** Product name, category, purity/moisture grade, quantity, and unit.
- **Step 2 (Logistics):** Destination country, port of discharge, Incoterms® 2020 rules (CIF, FOB, CFR, DAP, EXW), and target delivery date.
- **Step 3 (Quality & Packaging):** Bag types (PP, Jute, Big Bags, Reefers), third-party inspection (SGS, Bureau Veritas), and EUDR GPS polygon requirements.
- **Step 4 (Review & Broadcast):** Select multiple shortlisted exporters or broadcast to matching facilities.
- **Inline Validation:** Strict validation per step with accessible error labels.
- **Simulated Real-Time Quote:** Automated arrival of an exporter quotation after submission.

### 6. Buyer Procurement Dashboard
- **Metric Cards:** RFQs Sent, Binding Quotes Received, Shortlisted Exporters, Quoted Tonnage.
- **Tender Register:** Searchable list with status pills (*Sent, Viewed, Quoted, Negotiating, Closed*).
- **Interactive Negotiation Drawer:** Review binding quotations, accept deals to initiate contracts, or submit counter-offers with live simulated responses.
- **Trade Notification System:** Top bell icon with badge counter and direct links to updated tenders.

### 7. Side-by-Side Exporter Comparison
- Compare up to 4 shortlisted exporters simultaneously across MOQ, price range, response speed, rating, certifications, and port infrastructure.
- Automated badges highlighting **Lowest MOQ**, **Fastest Desk Response**, **Top Rating**, and **Highest Capacity**.

### 8. Exporter Accreditation & Contact
- **"List Your Business":** Exporter onboarding form for cooperative and processing plant verification.
- **Contact Trade Desk:** Direct support channels for chartering, dispute arbitration, and assay verification.

---

## 🖼️ Screenshots Placeholder

```
+-------------------------------------------------------------+
|                     AgriLink Exchange                       |
|   [ Hero with Direct Farm-Gate Procurement & Search Engine] |
+-------------------------------------------------------------+
|   [ 40+ Exporter Directory with Filters & Availability ]    |
+-------------------------------------------------------------+
|   [ Multi-Step RFQ Tender Builder & Incoterms Selector ]    |
+-------------------------------------------------------------+
|   [ Buyer Procurement Dashboard & Negotiation Timeline ]    |
+-------------------------------------------------------------+
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8 + TypeScript
- **Styling:** Tailwind CSS v4 with custom tokens:
  - Cream Background: `#FAF7F0`
  - Deep Leaf Green (Primary): `#1F5C3A`
  - Harvest Amber (Accent): `#E8A33D`
  - Soft Sage (Surfaces): `#E6EFE3`
  - Charcoal (Text): `#23302A`
- **Typography:** Fraunces (Serif Headings) & Plus Jakarta Sans (Body)
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom` v7
- **Animations & Effects:** `canvas-confetti` + Tailwind CSS keyframes
- **Persistence:** Browser `localStorage` for authentication, shortlist, RFQs, and notifications.

---

## 📂 Project Folder Structure

```
├── public/
│   └── favicon.svg           # Custom SVG leaf sprout favicon & apple-touch icon
├── src/
│   ├── components/
│   │   ├── Footer.tsx        # Global footer with trade assurance & newsletter
│   │   ├── Navbar.tsx        # Sticky navigation with notification bell & user pill
│   │   ├── SkeletonLoader.tsx# Card and table row loading skeletons
│   │   └── ToastContainer.tsx# Floating real-time alert system
│   ├── context/
│   │   └── AppContext.tsx    # Global state (Auth, Shortlist, RFQs, Notifications, Toasts)
│   ├── data/
│   │   ├── initialRfqs.ts    # Seed RFQs, quotes, and notification events
│   │   └── suppliers.ts      # 40 realistic mock exporters across 12 countries
│   ├── pages/
│   │   ├── AboutPage.tsx     # Mission and trade integrity standards
│   │   ├── ComparePage.tsx   # Up to 4 exporters side-by-side matrix
│   │   ├── ContactPage.tsx   # Validated trade desk inquiry form
│   │   ├── DashboardPage.tsx # Buyer procurement tracker & negotiation timeline
│   │   ├── DirectoryPage.tsx # Exporter directory with 8 filters & mobile sheet
│   │   ├── LandingPage.tsx   # Hero, categories, how it works, and testimonials
│   │   ├── LoginPage.tsx     # Gated login with funny wobble error & Tester login
│   │   ├── NotFoundPage.tsx  # Farm-themed 404 page
│   │   ├── RegisterExporterPage.tsx # "List Your Business" onboarding form
│   │   └── SupplierDetailPage.tsx   # Detailed exporter profile & 12-mo calendar
│   ├── types/
│   │   └── index.ts          # Strongly typed domain models
│   ├── utils/
│   │   ├── tradeLogic.ts     # Decoupled filtering, sorting, comparison & RFQ logic
│   │   └── tradeLogic.test.ts# Automated unit tests using node:test
│   ├── App.tsx               # Root component with auth routing & Suspense lazy loading
│   ├── index.css             # Tailwind theme variables, fonts & wobble animations
│   └── main.tsx              # React DOM entry point
├── index.html                # App entry with meta, OpenGraph & Google Fonts
├── metadata.json             # AI Studio applet metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Run Unit Tests
The core calculations (filtering, sorting, comparison matrix best-value rules, RFQ step validation, reference ID format) are decoupled and unit-tested:
```bash
npx --yes tsx --test src/utils/tradeLogic.test.ts
```

### 4. Build for Production
```bash
npm run build
```

---

## 💾 How the Mock Data Layer Works

- **Typed Exporters (`src/data/suppliers.ts`):** 40 realistic exporters modeled after real processing plants in West Africa, East Africa, South America, and Asia. Each entry includes certifications, departure ports, response speed, MOQ, and a 12-month seasonal availability calendar.
- **State Persistence (`src/context/AppContext.tsx`):**
  - `agrilink_auth` & `agrilink_user`: Persists authenticated session.
  - `agrilink_shortlist`: Persists selected supplier IDs.
  - `agrilink_rfqs`: Stores active RFQs, received quotations, and negotiation message events.
  - `agrilink_notifications`: Manages unread and read trade desk alerts.
- **Simulation Engine:** When an RFQ is submitted, a realistic supplier quote response arrives after a few seconds, accompanied by an interactive notification and audio/toast feedback.

---

## 🔮 Future Roadmap

1. **Production Backend & Database:** Provision a relational Cloud SQL (PostgreSQL) or Firebase Firestore instance for multi-tenant data storage.
2. **Real Multi-Role RBAC:** Role-based access control separating International Buyers, Origin Exporters, and Inspection Agents (SGS / BV).
3. **Escrow & Multi-Currency Settlement:** Integration with Stripe Treasury or specialized B2B trade escrow APIs (T/T, Irrevocable Letters of Credit, CAD).
4. **IoT Reefer & Vessel Tracking:** AIS vessel live telemetry and temperature datalogger integration for refrigerated containers.
5. **Multilingual Localization:** French (West Africa), Portuguese (Brazil), Spanish (Peru/Colombia), Arabic (Egypt), and Vietnamese.
6. **EUDR Automated Verification:** Automated GeoJSON polygon validation against EU deforestation satellite registries.

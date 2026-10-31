import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  Heart, 
  Star, 
  Scale, 
  Globe2, 
  Building2, 
  ChevronRight,
  Wheat,
  Coffee,
  Apple,
  Carrot,
  Nut,
  Flame,
  Sprout,
  Beef
} from 'lucide-react';
import { ALL_CATEGORIES } from '../data/suppliers';
import { ProductCategory } from '../types';

export const LandingPage: React.FC = () => {
  const { suppliers, toggleShortlist, isShortlisted } = useApp();
  const navigate = useNavigate();

  const [searchProduct, setSearchProduct] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchProduct.trim()) params.set('search', searchProduct.trim());
    if (selectedCountry !== 'All') params.set('country', selectedCountry);
    navigate(`/directory?${params.toString()}`);
  };

  const getCategoryIcon = (category: ProductCategory) => {
    switch (category) {
      case 'Grains': return <Wheat className="w-6 h-6 text-[#1F5C3A]" />;
      case 'Cocoa & Coffee': return <Coffee className="w-6 h-6 text-[#9E6510]" />;
      case 'Fruits': return <Apple className="w-6 h-6 text-red-600" />;
      case 'Vegetables': return <Carrot className="w-6 h-6 text-orange-600" />;
      case 'Nuts & Oilseeds': return <Nut className="w-6 h-6 text-amber-700" />;
      case 'Spices': return <Flame className="w-6 h-6 text-amber-600" />;
      case 'Tubers': return <Sprout className="w-6 h-6 text-[#1F5C3A]" />;
      case 'Livestock Feed': return <Beef className="w-6 h-6 text-emerald-700" />;
      default: return <Wheat className="w-6 h-6 text-[#1F5C3A]" />;
    }
  };

  const featuredSuppliers = suppliers.slice(0, 6);

  const countries = ['All', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Brazil', 'India', 'Vietnam', 'Peru', 'Côte d\'Ivoire'];

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#FAF7F0] to-[#E6EFE3]/30">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E6EFE3]/70 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB] text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
              <span>Institutional B2B Harvest Marketplace • Incoterms® 2020</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#153F28] leading-[1.12]">
              Source verified African and global harvests, directly from the farm gate.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-[#5B6E64] max-w-2xl mx-auto leading-relaxed font-normal">
              Skip intermediaries. Discover audited agricultural exporters across 48 countries, request standardized quotations, and transact with third-party SGS inspection and escrow.
            </p>

            {/* Quick Search Bar */}
            <div className="pt-4 max-w-3xl mx-auto">
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#CFE0CB] shadow-xl flex flex-col sm:flex-row gap-2 sm:gap-3"
              >
                {/* Product input */}
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#CFE0CB]/60">
                  <Search className="w-5 h-5 text-[#1F5C3A] shrink-0" />
                  <input
                    type="text"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder="Search crop (e.g. Sesame, Cocoa, Avocado, Quinoa)..."
                    className="w-full bg-transparent text-sm text-[#23302A] placeholder-[#5B6E64]/60 focus:outline-none font-medium"
                  />
                </div>

                {/* Country select */}
                <div className="sm:w-48 flex items-center gap-2 px-3 py-2 bg-[#FAF7F0] rounded-xl border border-[#CFE0CB]/60">
                  <MapPin className="w-5 h-5 text-[#E8A33D] shrink-0" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#23302A] focus:outline-none font-medium cursor-pointer"
                  >
                    <option value="All">All Origins</option>
                    {countries.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Search submit button */}
                <button
                  type="submit"
                  className="bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
                >
                  <span>Search Exporters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick trend tags */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs text-[#5B6E64]">
                <span className="font-semibold text-[#153F28]">Popular Inquiries:</span>
                <Link to="/directory?search=Sesame" className="hover:text-[#1F5C3A] hover:underline">Nigerian Sesame</Link>
                <span>•</span>
                <Link to="/directory?search=Cocoa" className="hover:text-[#1F5C3A] hover:underline">Ghanaian Fairtrade Cocoa</Link>
                <span>•</span>
                <Link to="/directory?search=Avocado" className="hover:text-[#1F5C3A] hover:underline">Kenyan Hass Avocados</Link>
                <span>•</span>
                <Link to="/directory?search=Coffee" className="hover:text-[#1F5C3A] hover:underline">Ethiopian Specialty Arabica</Link>
              </div>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#CFE0CB] shadow-sm">
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#153F28]">1,200+</div>
                <div className="text-xs font-semibold text-[#5B6E64] mt-0.5">Verified Exporters</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#CFE0CB] shadow-sm">
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#153F28]">48</div>
                <div className="text-xs font-semibold text-[#5B6E64] mt-0.5">Origin Countries</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#CFE0CB] shadow-sm">
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#153F28]">$2.4B+</div>
                <div className="text-xs font-semibold text-[#5B6E64] mt-0.5">Export Volume Traded</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#CFE0CB] shadow-sm">
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#153F28]">99.4%</div>
                <div className="text-xs font-semibold text-[#5B6E64] mt-0.5">On-Time Discharge</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E6510]">
              Wholesale Sectors
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28] mt-1">
              Explore Agricultural Sectors
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
              From tropical oilseeds and tree nuts to bulk feed grains and fresh horticultural produce.
            </p>
          </div>
          <Link
            to="/directory"
            className="text-xs sm:text-sm font-bold text-[#1F5C3A] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_CATEGORIES.map((category) => {
            const count = suppliers.filter((s) => s.categories.includes(category)).length;
            return (
              <Link
                key={category}
                to={`/directory?category=${encodeURIComponent(category)}`}
                className="group bg-white p-5 rounded-2xl border border-[#CFE0CB] hover:border-[#1F5C3A] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E6EFE3] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(category)}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#5B6E64] group-hover:text-[#1F5C3A] group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#23302A] group-hover:text-[#1F5C3A] transition-colors">
                    {category}
                  </h3>
                  <p className="text-xs text-[#5B6E64] mt-0.5">
                    {count} verified exporters
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="bg-[#FAF7F0] py-16 border-y border-[#CFE0CB]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E6510]">
              Transparent Execution
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#153F28] mt-1">
              How AgriLink Direct Trade Works
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6E64] mt-2">
              Procure international agricultural commodities with standardized Incoterms and inspection protocols in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-[#1F5C3A] text-white font-serif font-bold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#153F28] mb-2">
                Discover Verified Exporters
              </h3>
              <p className="text-xs text-[#5B6E64] leading-relaxed">
                Filter 40+ origin exporters by crop grade, certification (GlobalG.A.P, Organic, HACCP), port of origin, and minimum order tonnage. View transparent facility capacities and seasonal harvest calendars.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-[#E8A33D] text-[#153F28] font-serif font-bold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#153F28] mb-2">
                Request Multi-Supplier Quotes
              </h3>
              <p className="text-xs text-[#5B6E64] leading-relaxed">
                Use our interactive 4-step RFQ wizard to broadcast your specifications (tonnage, target price, packaging, Incoterm CIF/FOB) to multiple shortlisted exporters simultaneously.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-[#153F28] text-white font-serif font-bold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-[#153F28] mb-2">
                Compare, Audit & Close Deal
              </h3>
              <p className="text-xs text-[#5B6E64] leading-relaxed">
                Review binding offers side-by-side in your dashboard. Counter-offer, track timeline events, review pre-shipment SGS assay certificates, and release escrow upon vessel loading.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED VERIFIED SUPPLIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E6510]">
              Audited Exporters
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28] mt-1">
              Featured Origin Suppliers
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
              Top-rated processing houses and farmer cooperatives with active export shipping slots.
            </p>
          </div>
          <Link
            to="/directory"
            className="text-xs sm:text-sm font-bold text-[#1F5C3A] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All 40 Exporters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-2xl border border-[#CFE0CB] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E6EFE3] text-[#1F5C3A] font-serif font-bold text-base flex items-center justify-center shrink-0 border border-[#CFE0CB]">
                      {supplier.logoUrl}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Link
                          to={`/supplier/${supplier.id}`}
                          className="font-bold text-sm text-[#23302A] hover:text-[#1F5C3A] transition-colors"
                        >
                          {supplier.name}
                        </Link>
                        {supplier.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#1F5C3A] bg-[#E6EFE3] px-1.5 py-0.2 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-[#1F5C3A]" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#5B6E64] mt-0.5">
                        <span>{supplier.flagEmoji} {supplier.country}</span>
                        <span>•</span>
                        <span>{supplier.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shortlist toggle button */}
                  <button
                    onClick={() => toggleShortlist(supplier.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isShortlisted(supplier.id)
                        ? 'bg-red-50 text-red-600'
                        : 'bg-[#FAF7F0] text-[#5B6E64] hover:text-red-500 hover:bg-red-50'
                    }`}
                    aria-label={`Shortlist ${supplier.name}`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isShortlisted(supplier.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-[#5B6E64] line-clamp-2 mb-3">
                  {supplier.tagline}
                </p>

                {/* Main Products Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {supplier.mainProducts.slice(0, 3).map((prod, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-md text-[11px] font-medium text-[#23302A]"
                    >
                      {prod}
                    </span>
                  ))}
                </div>

                {/* Certifications badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {supplier.certifications.slice(0, 3).map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#E6EFE3] text-[#1F5C3A] rounded-full text-[10px] font-semibold"
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom footer: MOQ, Rating & Action */}
              <div className="pt-3 border-t border-[#F2ECE0] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#23302A]">MOQ: {supplier.minOrderQuantityMT} MT</div>
                  <div className="flex items-center gap-1 text-[#5B6E64] text-[11px]">
                    <Star className="w-3.5 h-3.5 text-[#E8A33D] fill-[#E8A33D]" />
                    <span className="font-bold text-[#23302A]">{supplier.rating}</span>
                    <span>({supplier.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/rfq-builder?supplierId=${supplier.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Quote</span>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS STRIP */}
      <section className="bg-[#E6EFE3]/50 py-16 border-y border-[#CFE0CB]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E6510]">
              Buyer Endorsements
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28] mt-1">
              Trusted by Global Commodity Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm">
              <div className="flex items-center gap-1 text-[#E8A33D] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8A33D]" />
                ))}
              </div>
              <p className="text-xs text-[#23302A] italic leading-relaxed mb-4">
                "AgriLink resolved our West African sesame sourcing hurdles. We contracted 240 MT directly through AfroHarvest in Lagos with clean SGS moisture and purity assay reports."
              </p>
              <div>
                <div className="font-bold text-xs text-[#153F28]">Dirk van der Meer</div>
                <div className="text-[11px] text-[#5B6E64]">Chief Procurement Officer, Zeeland Agri B.V. (Rotterdam)</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm">
              <div className="flex items-center gap-1 text-[#E8A33D] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8A33D]" />
                ))}
              </div>
              <p className="text-xs text-[#23302A] italic leading-relaxed mb-4">
                "The EU Deforestation Regulation traceability was seamless with GoldCoast Cocoa. They provided accurate GPS polygons for all farms directly alongside the bill of lading."
              </p>
              <div>
                <div className="font-bold text-xs text-[#153F28]">François Bernard</div>
                <div className="text-[11px] text-[#5B6E64]">Raw Materials Director, Chocolaterie Parisienne (France)</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CFE0CB] shadow-sm">
              <div className="flex items-center gap-1 text-[#E8A33D] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8A33D]" />
                ))}
              </div>
              <p className="text-xs text-[#23302A] italic leading-relaxed mb-4">
                "We procured 35,000 MT Brazilian yellow corn via Panamax charter with Cerrado MegaGrain. Real-time updates and standardized Incoterms contracts made execution flawless."
              </p>
              <div>
                <div className="font-bold text-xs text-[#153F28]">Ahmed El-Sayed</div>
                <div className="text-[11px] text-[#5B6E64]">Managing Director, Nile Milling & Feed Industries (Alexandria)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5B6E64]">
            International Audit & Quality Standards Accepted
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <Award className="w-5 h-5 text-[#1F5C3A]" />
            <span>GlobalG.A.P. Certified</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>USDA Organic &amp; EU Bio</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <ShieldCheck className="w-5 h-5 text-[#1F5C3A]" />
            <span>HACCP Food Safety</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <Scale className="w-5 h-5 text-[#E8A33D]" />
            <span>Fairtrade Certified</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <CheckCircle2 className="w-5 h-5 text-[#1F5C3A]" />
            <span>ISO 22000 / FSSC</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-[#1F5C3A] bg-white px-4 py-2.5 rounded-xl border border-[#CFE0CB]">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>Rainforest Alliance</span>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#153F28] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#E8A33D]/20 text-[#E8A33D] text-xs font-bold uppercase tracking-wider inline-block">
              Start Sourcing Now
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to streamline your global agricultural commodity procurement?
            </h2>
            <p className="text-xs sm:text-sm text-[#E6EFE3]/80 leading-relaxed">
              Create your multi-supplier tender in minutes. Compare verified FOB and CIF prices from origin exporters with guaranteed third-party quality assay.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/directory"
                className="bg-[#E8A33D] hover:bg-[#D7922D] text-[#153F28] font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-md"
              >
                <span>Browse Exporter Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rfq-builder"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3 rounded-xl border border-white/20 transition-colors"
              >
                <span>Create Multi-Supplier RFQ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

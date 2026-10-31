import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Star, 
  Send, 
  Heart, 
  Anchor, 
  Clock, 
  Calendar, 
  Building2, 
  Award, 
  Scale, 
  CheckCircle2, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const SupplierDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { suppliers, toggleShortlist, isShortlisted, addToast } = useApp();

  const supplier = suppliers.find((s) => s.id === id);

  // Quick RFQ state on side panel
  const [quickQty, setQuickQty] = useState<number>(supplier?.minOrderQuantityMT || 20);
  const [quickProduct, setQuickProduct] = useState<string>(supplier?.mainProducts[0] || '');

  if (!supplier) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#153F28]">Exporter Not Found</h2>
        <p className="text-xs text-[#5B6E64]">The requested supplier does not exist in our directory.</p>
        <Link to="/directory" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F5C3A] text-white rounded-xl text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  const isFav = isShortlisted(supplier.id);

  const similarSuppliers = suppliers
    .filter((s) => s.id !== supplier.id && s.categories.some((c) => supplier.categories.includes(c)))
    .slice(0, 3);

  const handleStartQuote = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/rfq-builder?supplierId=${supplier.id}&product=${encodeURIComponent(quickProduct)}&quantity=${quickQty}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/directory"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B6E64] hover:text-[#1F5C3A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Exporter Directory</span>
      </Link>

      {/* Main Profile Header Banner Card */}
      <div className="bg-white rounded-3xl border border-[#CFE0CB] overflow-hidden shadow-sm">
        
        {/* Banner Top Strip */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-[#1F5C3A] via-[#153F28] to-[#2A794E] relative p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-white/90">
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
              Registration No: CAC/EX-{supplier.countryCode}-{supplier.establishedYear}
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-[#E8A33D] text-[#153F28] px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                Incoterms 2020 Validated
              </span>
            </div>
          </div>
        </div>

        {/* Header content below banner */}
        <div className="px-6 pb-6 pt-4 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            
            {/* Logo and Titles */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#E6EFE3] text-[#1F5C3A] font-serif font-extrabold text-2xl sm:text-3xl flex items-center justify-center border-2 border-[#CFE0CB] shadow-md shrink-0">
                {supplier.logoUrl}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28]">
                    {supplier.name}
                  </h1>
                  {supplier.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1F5C3A] bg-[#E6EFE3] px-2.5 py-0.5 rounded-full border border-[#CFE0CB]">
                      <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
                      Audited Facility
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#5B6E64] flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E8A33D]" />
                    {supplier.city}, {supplier.country} {supplier.flagEmoji}
                  </span>
                  <span>•</span>
                  <span>Est. {supplier.establishedYear} ({new Date().getFullYear() - supplier.establishedYear} yrs in trade)</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-[#23302A]">
                    <Star className="w-3.5 h-3.5 fill-[#E8A33D] text-[#E8A33D]" />
                    {supplier.rating} ({supplier.reviewCount} buyer reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => toggleShortlist(supplier.id)}
                className={`p-3 rounded-2xl border transition-colors flex items-center gap-2 text-xs font-bold ${
                  isFav
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white text-[#23302A] border-[#CFE0CB] hover:bg-[#FAF7F0]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                <span>{isFav ? 'Shortlisted' : 'Add to Shortlist'}</span>
              </button>

              <Link
                to={`/rfq-builder?supplierId=${supplier.id}`}
                className="px-5 py-3 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Formal Quotation</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#F2ECE0]">
            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#CFE0CB]/60">
              <div className="text-[11px] text-[#5B6E64] font-medium">Annual Capacity</div>
              <div className="font-serif font-bold text-base text-[#153F28] mt-0.5">
                {supplier.annualCapacityMT.toLocaleString()} MT / year
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#CFE0CB]/60">
              <div className="text-[11px] text-[#5B6E64] font-medium">Primary Departure Port</div>
              <div className="font-bold text-xs text-[#23302A] mt-1 flex items-center gap-1 truncate">
                <Anchor className="w-3.5 h-3.5 text-[#1F5C3A] shrink-0" />
                <span className="truncate">{supplier.ports[0]}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#CFE0CB]/60">
              <div className="text-[11px] text-[#5B6E64] font-medium">Quotation Response Speed</div>
              <div className="font-bold text-xs text-[#23302A] mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E8A33D] shrink-0" />
                <span>Under {supplier.responseTimeHours}h ({supplier.responseRatePercent}%)</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#CFE0CB]/60">
              <div className="text-[11px] text-[#5B6E64] font-medium">Minimum Order (MOQ)</div>
              <div className="font-serif font-bold text-base text-[#153F28] mt-0.5">
                {supplier.minOrderQuantityMT} Metric Tons
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Layout: Main Body + Sticky RFQ Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Overview, Product Catalog, Calendar, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Company Overview */}
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#153F28]">
              Exporter Overview &amp; Processing Standards
            </h2>
            <p className="text-xs sm:text-sm text-[#23302A] leading-relaxed">
              {supplier.description}
            </p>

            {/* Certifications Row with Details */}
            <div className="pt-3 border-t border-[#F2ECE0]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6510] mb-3">
                Verified Quality &amp; Sustainability Accreditations
              </h3>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6EFE3] text-[#1F5C3A] text-xs font-bold border border-[#CFE0CB]"
                  >
                    <Award className="w-3.5 h-3.5 text-[#1F5C3A]" />
                    <span>{cert} Certified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Ports & Destinations */}
            <div className="pt-3 border-t border-[#F2ECE0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#23302A] block mb-1">Ports of Dispatch:</span>
                <ul className="text-[#5B6E64] space-y-0.5">
                  {supplier.ports.map((port, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Anchor className="w-3 h-3 text-[#1F5C3A]" /> {port}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold text-[#23302A] block mb-1">Key Global Discharge Terminals:</span>
                <p className="text-[#5B6E64]">
                  {supplier.exportDestinations.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* PRODUCT CATALOG WITH 12-MONTH SEASONAL CALENDAR */}
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#153F28]">
                  Export Product Catalog &amp; Seasonality Matrix
                </h2>
                <p className="text-xs text-[#5B6E64] mt-0.5">
                  Live indicative FOB/CIF baseline rates and peak harvest shipping windows.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {supplier.catalog.map((product) => (
                <div
                  key={product.id}
                  className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#CFE0CB] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#153F28]">{product.name}</h3>
                        <span className="text-[10px] font-bold bg-[#E6EFE3] text-[#1F5C3A] px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#5B6E64] mt-1">{product.grade}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-serif font-bold text-base text-[#153F28]">
                        ${product.pricePerMT.min.toLocaleString()} - ${product.pricePerMT.max.toLocaleString()} / MT
                      </div>
                      <div className="text-[11px] text-[#5B6E64]">MOQ: {product.moqMT} MT</div>
                    </div>
                  </div>

                  {/* 12-Month Availability Matrix */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5B6E64] mb-1.5 font-medium">
                      <span className="flex items-center gap-1 font-bold text-[#23302A]">
                        <Calendar className="w-3.5 h-3.5 text-[#1F5C3A]" />
                        12-Month Harvest &amp; Shipping Availability:
                      </span>
                      <span>Peak: {product.harvestWindow}</span>
                    </div>

                    <div className="grid grid-cols-12 gap-1 text-center">
                      {MONTHS.map((month, mIdx) => {
                        const isAvail = product.seasonCalendar[mIdx];
                        return (
                          <div
                            key={month}
                            className={`py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                              isAvail
                                ? 'bg-[#1F5C3A] text-white shadow-sm'
                                : 'bg-[#E6EFE3]/50 text-[#5B6E64]/60'
                            }`}
                            title={`${month}: ${isAvail ? 'Harvest / Shipping Active' : 'Off-Season / Limited Silo Stock'}`}
                          >
                            {month}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="pt-2 border-t border-[#CFE0CB]/60 flex flex-wrap gap-4 text-[11px]">
                    {Object.entries(product.specs).map(([specKey, specVal]) => (
                      <div key={specKey} className="text-[#5B6E64]">
                        <span className="font-semibold text-[#23302A]">{specKey}:</span> {specVal}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUYER REVIEWS SECTION */}
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0]">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#153F28]">
                  Verified Buyer Reviews ({supplier.reviewCount})
                </h2>
                <p className="text-xs text-[#5B6E64] mt-0.5">
                  Assay evaluations and trade performance reports from international purchasers.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#153F28] bg-[#E6EFE3] px-3 py-1.5 rounded-xl">
                <Star className="w-4 h-4 fill-[#E8A33D] text-[#E8A33D]" />
                <span>{supplier.rating} / 5.0</span>
              </div>
            </div>

            <div className="divide-y divide-[#F2ECE0] space-y-4">
              {supplier.reviews.map((rev) => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#23302A]">{rev.buyerName}</span>
                        {rev.verifiedTransaction && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-[#1F5C3A] font-semibold bg-[#E6EFE3] px-1.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Verified Trade
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#5B6E64]">
                        {rev.buyerCompany} ({rev.buyerCountry})
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E8A33D] text-[#E8A33D]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#23302A] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-[#5B6E64]">
                    Trade completed: {rev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIMILAR SUPPLIERS SECTION */}
          {similarSuppliers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#153F28]">
                Similar Verified Commodity Exporters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarSuppliers.map((sim) => (
                  <Link
                    key={sim.id}
                    to={`/supplier/${sim.id}`}
                    className="bg-white p-4 rounded-2xl border border-[#CFE0CB] hover:border-[#1F5C3A] shadow-sm hover:shadow transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#23302A] line-clamp-1">{sim.name}</div>
                      <div className="text-[11px] text-[#5B6E64]">{sim.flagEmoji} {sim.country}</div>
                      <div className="text-[10px] text-[#5B6E64] mt-1 line-clamp-1">
                        {sim.mainProducts.join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#F2ECE0]">
                      <span className="font-bold text-[#1F5C3A]">MOQ: {sim.minOrderQuantityMT} MT</span>
                      <span className="text-[#E8A33D] font-bold">★ {sim.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sticky Quotation Side Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 shadow-lg sticky top-28 space-y-6">
            
            <div className="pb-3 border-b border-[#F2ECE0]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E6510]">
                Direct Procurement Desk
              </span>
              <h3 className="font-serif text-xl font-bold text-[#153F28] mt-0.5">
                Request Quick Quotation
              </h3>
              <p className="text-xs text-[#5B6E64] mt-1">
                Direct transmission to {supplier.name} export desk. Average response: under {supplier.responseTimeHours}h.
              </p>
            </div>

            <form onSubmit={handleStartQuote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#23302A] mb-1">
                  Select Target Commodity
                </label>
                <select
                  value={quickProduct}
                  onChange={(e) => setQuickProduct(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                >
                  {supplier.catalog.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-[#23302A]">
                    Tonnage Required (MT)
                  </label>
                  <span className="text-[11px] text-[#5B6E64]">
                    Min: {supplier.minOrderQuantityMT} MT
                  </span>
                </div>
                <input
                  type="number"
                  min={supplier.minOrderQuantityMT}
                  max={50000}
                  value={quickQty}
                  onChange={(e) => setQuickQty(Number(e.target.value))}
                  className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[#E6EFE3]/80 border border-[#CFE0CB] space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#153F28] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
                  <span>Guaranteed Trade Safeguards</span>
                </div>
                <p className="text-[11px] text-[#5B6E64] leading-snug">
                  All quotations include SGS/Bureau Veritas assay rights and Incoterms 2020 legal provisions.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Configure Full Multi-Step RFQ</span>
              </button>
            </form>

            <div className="pt-3 border-t border-[#F2ECE0] space-y-2 text-xs text-[#5B6E64]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1F5C3A]" />
                <span className="truncate">{supplier.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1F5C3A]" />
                <span>{supplier.contactPhone}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  Check, 
  ShieldCheck, 
  Star, 
  Send, 
  Heart, 
  ChevronDown, 
  RotateCcw, 
  ArrowUpDown, 
  MapPin, 
  Anchor, 
  Clock, 
  Layers
} from 'lucide-react';
import { SupplierCardSkeleton, TableRowSkeleton } from '../components/SkeletonLoader';
import { filterSuppliers, sortSuppliers } from '../utils/tradeLogic';
import { DirectoryFilters, ProductCategory, Supplier } from '../types';
import { ALL_CATEGORIES, ALL_CERTIFICATIONS } from '../data/suppliers';

export const DirectoryPage: React.FC = () => {
  const { suppliers, toggleShortlist, isShortlisted } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState<ProductCategory | 'All'>(
    (searchParams.get('category') as ProductCategory) || 'All'
  );
  const [country, setCountry] = useState(searchParams.get('country') || 'All');
  const [certification, setCertification] = useState(searchParams.get('certification') || 'All');
  const [maxMoq, setMaxMoq] = useState<number>(Number(searchParams.get('maxMoq')) || 0);
  const [port, setPort] = useState(searchParams.get('port') || 'All');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [maxResponseHours, setMaxResponseHours] = useState<number>(
    Number(searchParams.get('maxResponseHours')) || 0
  );
  const [sortBy, setSortBy] = useState<DirectoryFilters['sortBy']>(
    (searchParams.get('sortBy') as any) || 'relevance'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Simulated loading state for 500ms on filter changes
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(12);

  // Unique ports list from dataset
  const allPorts = useMemo(() => {
    const set = new Set<string>();
    suppliers.forEach((s) => s.ports.forEach((p) => set.add(p)));
    return ['All', ...Array.from(set)];
  }, [suppliers]);

  // Unique countries list
  const allCountries = useMemo(() => {
    const set = new Set<string>();
    suppliers.forEach((s) => set.add(s.country));
    return ['All', ...Array.from(set).sort()];
  }, [suppliers]);

  // Trigger brief skeleton simulation on filter adjustment
  const triggerLoading = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    triggerLoading();
    setVisibleCount(12);
  }, [searchQuery, category, country, certification, maxMoq, port, verifiedOnly, maxResponseHours, sortBy]);

  // Filtered & sorted suppliers
  const filteredSuppliers = useMemo(() => {
    const filtered = filterSuppliers(suppliers, {
      searchQuery,
      category,
      country,
      certification,
      maxMoq,
      port,
      verifiedOnly,
      maxResponseHours,
    });
    return sortSuppliers(filtered, sortBy);
  }, [suppliers, searchQuery, category, country, certification, maxMoq, port, verifiedOnly, maxResponseHours, sortBy]);

  const displayedSuppliers = filteredSuppliers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSuppliers.length;

  const resetAllFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setCountry('All');
    setCertification('All');
    setMaxMoq(0);
    setPort('All');
    setVerifiedOnly(false);
    setMaxResponseHours(0);
    setSortBy('relevance');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    category !== 'All' ||
    country !== 'All' ||
    certification !== 'All' ||
    maxMoq > 0 ||
    port !== 'All' ||
    verifiedOnly ||
    maxResponseHours > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#CFE0CB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6510]">
            <span>Verified Origin Directory</span>
            <span>•</span>
            <span>40+ Audited Facilities</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28] mt-1">
            Agricultural Exporter Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
            Direct farm-gate aggregation and processing hubs across West Africa, East Africa, South America, and Asia.
          </p>
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5B6E64] font-medium hidden sm:block">
            Showing <strong className="text-[#23302A]">{filteredSuppliers.length}</strong> exporters
          </div>
          <div className="flex items-center bg-white border border-[#CFE0CB] rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#1F5C3A] text-white' : 'text-[#5B6E64] hover:text-[#23302A]'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#1F5C3A] text-white' : 'text-[#5B6E64] hover:text-[#23302A]'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-[#CFE0CB] p-5 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0]">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-[#153F28]">
                <Filter className="w-4 h-4 text-[#1F5C3A]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#E6EFE3]/70 border border-[#CFE0CB]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
                <span className="text-xs font-bold text-[#153F28]">Verified Only</span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-[#1F5C3A] rounded cursor-pointer"
              />
            </div>

            {/* Product Category Filter */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-2 uppercase tracking-wide">
                Commodity Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              >
                <option value="All">All Categories ({suppliers.length})</option>
                {ALL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Country of Origin Filter */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-2 uppercase tracking-wide">
                Origin Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              >
                {allCountries.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Origins' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Certifications Filter */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-2 uppercase tracking-wide">
                Required Certification
              </label>
              <select
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              >
                <option value="All">Any Certification</option>
                {ALL_CERTIFICATIONS.map((cert) => (
                  <option key={cert} value={cert}>
                    {cert}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Order Quantity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#23302A] uppercase tracking-wide">
                  Max Order MOQ
                </label>
                <span className="text-xs font-bold text-[#1F5C3A]">
                  {maxMoq === 0 ? 'Any MOQ' : `Up to ${maxMoq} MT`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="5"
                value={maxMoq}
                onChange={(e) => setMaxMoq(Number(e.target.value))}
                className="w-full accent-[#1F5C3A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5B6E64] mt-1 font-medium">
                <span>0 MT</span>
                <span>50 MT</span>
                <span>250+ MT</span>
              </div>
            </div>

            {/* Response Time Filter */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-2 uppercase tracking-wide">
                Desk Response Speed
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Any', value: 0 },
                  { label: '< 2 hrs', value: 2 },
                  { label: '< 6 hrs', value: 6 },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setMaxResponseHours(item.value)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-colors ${
                      maxResponseHours === item.value
                        ? 'bg-[#1F5C3A] text-white border-[#1F5C3A]'
                        : 'bg-[#FAF7F0] text-[#23302A] border-[#CFE0CB] hover:bg-[#E6EFE3]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Port of Origin Filter */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-2 uppercase tracking-wide">
                Departure Port
              </label>
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl px-3 py-2 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              >
                {allPorts.map((p) => (
                  <option key={p} value={p}>
                    {p === 'All' ? 'All Shipping Ports' : p}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </aside>

        {/* MAIN RESULTS COLUMN */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Search bar & Sort Controls Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-[#1F5C3A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by commodity, exporter name, city, port, or grade..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#CFE0CB] rounded-2xl text-xs sm:text-sm text-[#23302A] placeholder-[#5B6E64]/70 focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6E64] hover:text-[#23302A]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#CFE0CB] rounded-2xl text-xs font-bold text-[#1F5C3A] shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="sm:w-56">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-white border border-[#CFE0CB] rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] shadow-sm cursor-pointer appearance-none pr-8"
                >
                  <option value="relevance">Sort: Relevance &amp; Trust</option>
                  <option value="rating">Sort: Highest Rating</option>
                  <option value="fastest_response">Sort: Fastest Desk Response</option>
                  <option value="lowest_moq">Sort: Lowest Minimum Order</option>
                  <option value="newest">Sort: Established Year</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#5B6E64] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#5B6E64]">Active Filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {category !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Category: {category}
                  <button onClick={() => setCategory('All')}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {country !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Origin: {country}
                  <button onClick={() => setCountry('All')}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {certification !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Cert: {certification}
                  <button onClick={() => setCertification('All')}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1F5C3A] text-white">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3 text-white hover:text-amber-200" /></button>
                </span>
              )}
              {maxMoq > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  MOQ ≤ {maxMoq} MT
                  <button onClick={() => setMaxMoq(0)}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {maxResponseHours > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Response &lt; {maxResponseHours}h
                  <button onClick={() => setMaxResponseHours(0)}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}
              {port !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                  Port: {port}
                  <button onClick={() => setPort('All')}><X className="w-3 h-3 hover:text-black" /></button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-xs text-red-600 font-bold hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* SUPPLIERS LIST / GRID DISPLAY */}
          {isLoading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
              {[...Array(6)].map((_, i) => (
                <SupplierCardSkeleton key={i} />
              ))}
            </div>
          ) : displayedSuppliers.length === 0 ? (
            /* Friendly Empty State */
            <div className="bg-white rounded-3xl border border-[#CFE0CB] p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#E6EFE3] flex items-center justify-center text-[#1F5C3A] mx-auto text-2xl font-serif">
                🌾
              </div>
              <h3 className="font-serif text-xl font-bold text-[#153F28]">
                No Exporters Match Your Criteria
              </h3>
              <p className="text-xs text-[#5B6E64] leading-relaxed">
                We couldn't find any audited exporters matching that combination of filters. Try broadening your commodity category, adjusting minimum order tonnage, or resetting your search.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F5C3A] text-white font-bold text-xs hover:bg-[#153F28] transition-colors shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-2xl border border-[#CFE0CB] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
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
                            <span>Est. {supplier.establishedYear}</span>
                          </div>
                        </div>
                      </div>

                      {/* Shortlist Heart Button */}
                      <button
                        onClick={() => toggleShortlist(supplier.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isShortlisted(supplier.id)
                            ? 'bg-red-50 text-red-600'
                            : 'bg-[#FAF7F0] text-[#5B6E64] hover:text-red-500 hover:bg-red-50'
                        }`}
                        aria-label={`Shortlist ${supplier.name}`}
                        title="Shortlist for quotation"
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

                    {/* Products tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {supplier.mainProducts.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-md text-[11px] font-medium text-[#23302A]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Certifications badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {supplier.certifications.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#E6EFE3] text-[#1F5C3A] rounded-full text-[10px] font-semibold"
                        >
                          ✓ {c}
                        </span>
                      ))}
                    </div>

                    {/* Extra specs row */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5B6E64] pb-3 mb-3 border-b border-[#F2ECE0]">
                      <div className="flex items-center gap-1.5">
                        <Anchor className="w-3.5 h-3.5 text-[#1F5C3A]" />
                        <span className="truncate">{supplier.ports[0] || 'Origin Port'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E8A33D]" />
                        <span>Responds &lt; {supplier.responseTimeHours}h ({supplier.responseRatePercent}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <div className="font-bold text-[#153F28]">
                        MOQ: {supplier.minOrderQuantityMT} MT
                      </div>
                      <div className="flex items-center gap-1 text-[#5B6E64] text-[11px]">
                        <Star className="w-3.5 h-3.5 text-[#E8A33D] fill-[#E8A33D]" />
                        <span className="font-bold text-[#23302A]">{supplier.rating}</span>
                        <span>({supplier.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/supplier/${supplier.id}`}
                        className="px-3 py-1.5 rounded-xl border border-[#CFE0CB] hover:bg-[#FAF7F0] text-[#23302A] font-semibold text-xs transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to={`/rfq-builder?supplierId=${supplier.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Send className="w-3 h-3" />
                        <span>Quote</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-[#CFE0CB] divide-y divide-[#F2ECE0] shadow-sm overflow-hidden">
              {displayedSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="p-5 hover:bg-[#FAF7F0] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E6EFE3] text-[#1F5C3A] font-serif font-bold text-base flex items-center justify-center shrink-0 border border-[#CFE0CB]">
                      {supplier.logoUrl}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          to={`/supplier/${supplier.id}`}
                          className="font-bold text-sm text-[#23302A] hover:text-[#1F5C3A]"
                        >
                          {supplier.name}
                        </Link>
                        {supplier.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#1F5C3A] bg-[#E6EFE3] px-1.5 py-0.2 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-[#1F5C3A]" />
                            Verified
                          </span>
                        )}
                        <span className="text-xs text-[#5B6E64]">{supplier.flagEmoji} {supplier.country}</span>
                      </div>
                      <p className="text-xs text-[#5B6E64] line-clamp-1 mt-0.5">
                        {supplier.tagline}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {supplier.mainProducts.slice(0, 3).map((p, idx) => (
                          <span key={idx} className="text-[11px] bg-white border border-[#CFE0CB] px-2 py-0.5 rounded text-[#23302A]">
                            {p}
                          </span>
                        ))}
                        <span className="text-xs text-[#5B6E64]">• Port: {supplier.ports[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F2ECE0]">
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#153F28]">MOQ: {supplier.minOrderQuantityMT} MT</div>
                      <div className="flex items-center justify-end gap-1 text-[11px] text-[#5B6E64]">
                        <Star className="w-3 h-3 text-[#E8A33D] fill-[#E8A33D]" />
                        <span>{supplier.rating} ({supplier.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleShortlist(supplier.id)}
                        className={`p-2 rounded-xl border border-[#CFE0CB] transition-colors ${
                          isShortlisted(supplier.id) ? 'bg-red-50 text-red-600' : 'bg-white text-[#5B6E64]'
                        }`}
                        aria-label="Shortlist"
                      >
                        <Heart className={`w-4 h-4 ${isShortlisted(supplier.id) ? 'fill-red-500' : ''}`} />
                      </button>
                      <Link
                        to={`/rfq-builder?supplierId=${supplier.id}`}
                        className="px-4 py-2 rounded-xl bg-[#1F5C3A] text-white font-bold text-xs hover:bg-[#153F28] transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Quote</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-6 py-3 rounded-2xl bg-white border border-[#CFE0CB] hover:border-[#1F5C3A] text-[#1F5C3A] font-bold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Load More Exporters ({filteredSuppliers.length - visibleCount} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MOBILE BOTTOM SHEET FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0]">
              <h3 className="font-serif font-bold text-lg text-[#153F28]">Filter Exporters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#5B6E64] hover:bg-[#FAF7F0]"
                aria-label="Close filters"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Verified toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#E6EFE3] border border-[#CFE0CB]">
              <span className="text-xs font-bold text-[#153F28]">Verified Exporters Only</span>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-5 h-5 accent-[#1F5C3A]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl p-2.5 text-xs font-semibold"
              >
                <option value="All">All Categories</option>
                {ALL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-1">Origin Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl p-2.5 text-xs font-semibold"
              >
                {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-xs font-bold text-[#23302A] mb-1">Certification</label>
              <select
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl p-2.5 text-xs font-semibold"
              >
                <option value="All">Any Certification</option>
                {ALL_CERTIFICATIONS.map((cert) => <option key={cert} value={cert}>{cert}</option>)}
              </select>
            </div>

            {/* Max MOQ */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Maximum Order MOQ</span>
                <span className="text-[#1F5C3A]">{maxMoq === 0 ? 'Any MOQ' : `${maxMoq} MT`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="5"
                value={maxMoq}
                onChange={(e) => setMaxMoq(Number(e.target.value))}
                className="w-full accent-[#1F5C3A]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 rounded-xl border border-[#CFE0CB] text-xs font-bold text-[#5B6E64]"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#1F5C3A] text-white text-xs font-bold"
              >
                Apply ({filteredSuppliers.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

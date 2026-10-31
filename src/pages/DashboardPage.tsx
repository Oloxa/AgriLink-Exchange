import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Search, 
  X, 
  Filter, 
  Scale, 
  Anchor, 
  Building2, 
  ShieldCheck, 
  RotateCcw,
  DollarSign
} from 'lucide-react';
import { RFQ, RfqStatus, QuoteItem } from '../types';

export const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { 
    rfqs, 
    suppliers, 
    shortlist, 
    acceptQuote, 
    counterOfferQuote, 
    triggerSupplierQuoteSimulation, 
    addToast 
  } = useApp();

  const [selectedRfqId, setSelectedRfqId] = useState<string | null>(
    searchParams.get('rfqId') || (rfqs.length > 0 ? rfqs[0].id : null)
  );

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Counter-offer modal / prompt state
  const [counterQuoteId, setCounterQuoteId] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(1700);

  // Sync param if it changes
  useEffect(() => {
    const paramId = searchParams.get('rfqId');
    if (paramId) {
      setSelectedRfqId(paramId);
    }
  }, [searchParams]);

  const activeRfq = rfqs.find((r) => r.id === selectedRfqId) || rfqs[0];

  // Metric totals
  const totalSent = rfqs.length;
  const quotesCount = rfqs.reduce((acc, r) => acc + r.quotesReceived.length, 0);
  const totalVolumeQuoted = rfqs.reduce((acc, r) => acc + (r.quotesReceived.length > 0 ? r.quantity : 0), 0);

  // Filtered RFQs list
  const filteredRfqs = rfqs.filter((rfq) => {
    if (statusFilter !== 'All' && rfq.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchProduct = rfq.product.toLowerCase().includes(q);
      const matchRef = rfq.referenceNo.toLowerCase().includes(q);
      const matchPort = rfq.destinationPort.toLowerCase().includes(q);
      if (!matchProduct && !matchRef && !matchPort) return false;
    }
    return true;
  });

  const getStatusBadge = (status: RfqStatus) => {
    switch (status) {
      case 'Closed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">Closed / Won</span>;
      case 'Quoted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F0] text-[#153F28] border border-[#E8A33D] ring-2 ring-[#E8A33D]/20">Quoted ({activeRfq?.quotesReceived.length || 1})</span>;
      case 'Negotiating':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">Negotiating</span>;
      case 'Viewed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">Viewed by Exporter</span>;
      case 'Sent':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">Transmitted</span>;
    }
  };

  const handleSendCounter = (quoteId: string) => {
    if (!activeRfq || counterPriceInput <= 0) return;
    counterOfferQuote(activeRfq.id, quoteId, counterPriceInput);
    setCounterQuoteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#CFE0CB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6510]">
            <span>Procurement Command Center</span>
            <span>•</span>
            <span>Live Quotation Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28] mt-1">
            Buyer Procurement Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
            Track active tenders, compare binding exporter quotations, and review pre-shipment assay timelines.
          </p>
        </div>

        <Link
          to="/rfq-builder"
          className="px-5 py-2.5 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>New Multi-Supplier RFQ</span>
        </Link>
      </div>

      {/* OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#CFE0CB] shadow-sm">
          <div className="flex items-center justify-between text-[#5B6E64] mb-2">
            <span className="text-xs font-semibold">Active RFQs Sent</span>
            <Send className="w-4 h-4 text-[#1F5C3A]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#153F28]">{totalSent}</div>
          <div className="text-[11px] text-[#5B6E64] mt-1">Transmitted tenders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CFE0CB] shadow-sm">
          <div className="flex items-center justify-between text-[#5B6E64] mb-2">
            <span className="text-xs font-semibold">Binding Quotes Received</span>
            <Sparkles className="w-4 h-4 text-[#E8A33D]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#153F28]">{quotesCount}</div>
          <div className="text-[11px] text-[#5B6E64] mt-1">Origin exporter offers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CFE0CB] shadow-sm">
          <div className="flex items-center justify-between text-[#5B6E64] mb-2">
            <span className="text-xs font-semibold">Shortlisted Exporters</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#153F28]">{shortlist.length}</div>
          <div className="text-[11px] text-[#5B6E64] mt-1">
            <Link to="/compare" className="text-[#1F5C3A] hover:underline font-semibold">
              Compare side-by-side →
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#CFE0CB] shadow-sm">
          <div className="flex items-center justify-between text-[#5B6E64] mb-2">
            <span className="text-xs font-semibold">Total Tonnage Quoted</span>
            <Scale className="w-4 h-4 text-[#1F5C3A]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#153F28]">
            {totalVolumeQuoted.toLocaleString()} MT
          </div>
          <div className="text-[11px] text-[#5B6E64] mt-1">Contract value in pipeline</div>
        </div>
      </div>

      {/* TWO COLUMN INTERACTIVE LAYOUT: Tracker Table + Detailed Timeline Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: RFQ Tracker Table (5 cols on large) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-5 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#153F28]">Tender Register</h2>
              <span className="text-xs font-semibold text-[#5B6E64]">{filteredRfqs.length} tenders</span>
            </div>

            {/* Search within tenders */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#5B6E64] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference, commodity, port..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {['All', 'Quoted', 'Negotiating', 'Sent', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                    statusFilter === st
                      ? 'bg-[#1F5C3A] text-white shadow-sm'
                      : 'bg-[#FAF7F0] text-[#5B6E64] hover:bg-[#E6EFE3]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* RFQs List */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredRfqs.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5B6E64] space-y-2">
                  <p>No RFQs found matching that status or search.</p>
                </div>
              ) : (
                filteredRfqs.map((rfq) => {
                  const isSelected = selectedRfqId === rfq.id;
                  return (
                    <div
                      key={rfq.id}
                      onClick={() => setSelectedRfqId(rfq.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FAF7F0] border-[#1F5C3A] shadow-md ring-1 ring-[#1F5C3A]'
                          : 'bg-white border-[#CFE0CB] hover:bg-[#FAF7F0]/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#9E6510]">
                          {rfq.referenceNo}
                        </span>
                        {getStatusBadge(rfq.status)}
                      </div>

                      <h3 className="font-bold text-xs text-[#23302A] line-clamp-1">
                        {rfq.quantity} {rfq.unit} {rfq.product}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] text-[#5B6E64] mt-2 pt-2 border-t border-[#F2ECE0]">
                        <span className="flex items-center gap-1">
                          <Anchor className="w-3 h-3 text-[#1F5C3A]" />
                          {rfq.incoterm} {rfq.destinationPort}
                        </span>
                        <span className="font-semibold text-[#153F28]">
                          Target: ${rfq.targetPricePerMT}/MT
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: RFQ Detail, Quote Negotiation & Timeline (7 cols) */}
        <div className="lg:col-span-7">
          {activeRfq ? (
            <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 shadow-sm space-y-6">
              
              {/* Header with Reference & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F2ECE0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#9E6510] bg-[#FAF7F0] px-2.5 py-0.5 rounded-md border border-[#CFE0CB]">
                      {activeRfq.referenceNo}
                    </span>
                    {getStatusBadge(activeRfq.status)}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#153F28] mt-1">
                    {activeRfq.quantity} {activeRfq.unit} {activeRfq.product}
                  </h2>
                  <p className="text-xs text-[#5B6E64] mt-0.5">
                    Dispatched on {new Date(activeRfq.createdAt).toLocaleDateString()} to {activeRfq.supplierIds.length} exporter(s)
                  </p>
                </div>

                {/* Instant Quote Simulation Button */}
                <button
                  onClick={() => triggerSupplierQuoteSimulation(activeRfq.id)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB] text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                  title="Simulate another exporter submitting an export quotation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8A33D]" />
                  <span>Simulate Exporter Response</span>
                </button>
              </div>

              {/* Order Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF7F0] border border-[#CFE0CB] text-xs">
                <div>
                  <span className="text-[10px] text-[#5B6E64] block">Incoterm &amp; Port</span>
                  <strong className="text-[#23302A]">{activeRfq.incoterm} • {activeRfq.destinationPort}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6E64] block">Target Delivery</span>
                  <strong className="text-[#23302A]">{activeRfq.targetDeliveryDate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6E64] block">Packaging</span>
                  <strong className="text-[#23302A] truncate block">{activeRfq.packagingType}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6E64] block">Inspection Protocol</span>
                  <strong className="text-[#23302A] truncate block">{activeRfq.inspectionRequired}</strong>
                </div>
              </div>

              {/* RECEIVED QUOTATIONS SECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#153F28] flex items-center gap-2">
                    <span>Exporter Quotations Received</span>
                    <span className="text-xs font-bold bg-[#E6EFE3] text-[#1F5C3A] px-2 py-0.5 rounded-full">
                      {activeRfq.quotesReceived.length}
                    </span>
                  </h3>
                </div>

                {activeRfq.quotesReceived.length === 0 ? (
                  <div className="p-6 rounded-2xl border border-dashed border-[#CFE0CB] text-center space-y-2 bg-[#FAF7F0]/60">
                    <Clock className="w-8 h-8 text-[#E8A33D] mx-auto animate-pulse" />
                    <h4 className="font-bold text-xs text-[#23302A]">Awaiting Exporter Quotations</h4>
                    <p className="text-xs text-[#5B6E64] max-w-sm mx-auto">
                      Your tender has been received by the origin trading desks. Quotes typically arrive within 2-4 hours. Click <strong>"Simulate Exporter Response"</strong> above to test right now!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeRfq.quotesReceived.map((quote) => (
                      <div
                        key={quote.id}
                        className="p-5 rounded-2xl border border-[#CFE0CB] bg-[#FAF7F0] space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{quote.supplierFlag}</span>
                              <span className="font-bold text-sm text-[#153F28]">{quote.supplierName}</span>
                              <span className="text-[10px] bg-[#E6EFE3] text-[#1F5C3A] font-bold px-2 py-0.5 rounded">
                                {quote.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#5B6E64] mt-1 leading-relaxed">
                              {quote.notes}
                            </p>
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <div className="font-serif text-2xl font-bold text-[#153F28]">
                              ${quote.offeredPricePerMT.toLocaleString()} <span className="text-xs font-normal text-[#5B6E64]">/ MT</span>
                            </div>
                            <div className="text-[11px] text-[#5B6E64]">
                              Origin: {quote.shippingOriginPort} • Lead: {quote.leadTimeDays} days
                            </div>
                          </div>
                        </div>

                        {/* Payment & Validity strip */}
                        <div className="p-3 bg-white rounded-xl border border-[#CFE0CB] text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-[#5B6E64] block">Payment Terms:</span>
                            <span className="font-semibold text-[#23302A]">{quote.paymentTerms}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#5B6E64] block">Offer Valid Until:</span>
                            <span className="font-semibold text-[#23302A]">{quote.validUntil}</span>
                          </div>
                        </div>

                        {/* Interactive Acceptance / Counter Actions */}
                        {quote.status !== 'Accepted' && (
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                              onClick={() => acceptQuote(activeRfq.id, quote.id)}
                              className="px-5 py-2.5 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Accept Quote &amp; Request Contract</span>
                            </button>

                            <button
                              onClick={() => {
                                setCounterQuoteId(quote.id);
                                setCounterPriceInput(quote.offeredPricePerMT - 40);
                              }}
                              className="px-4 py-2.5 rounded-xl border border-[#CFE0CB] hover:bg-white text-xs font-bold text-[#23302A] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <DollarSign className="w-4 h-4 text-[#E8A33D]" />
                              <span>Submit Counter-Offer</span>
                            </button>
                          </div>
                        )}

                        {/* Counter-offer inline dialog */}
                        {counterQuoteId === quote.id && (
                          <div className="p-4 bg-white rounded-2xl border-2 border-[#E8A33D] space-y-3 animate-in zoom-in-95 duration-150">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#153F28]">Submit Counter-Offer (USD / MT)</span>
                              <button onClick={() => setCounterQuoteId(null)}>
                                <X className="w-4 h-4 text-[#5B6E64]" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={counterPriceInput}
                                onChange={(e) => setCounterPriceInput(Number(e.target.value))}
                                className="w-40 px-3 py-2 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-bold text-[#23302A]"
                              />
                              <button
                                onClick={() => handleSendCounter(quote.id)}
                                className="px-4 py-2 bg-[#E8A33D] hover:bg-[#D7922D] text-[#153F28] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                              >
                                Send Counter-Offer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CONVERSATION & AUDIT TIMELINE */}
              <div className="space-y-4 pt-4 border-t border-[#F2ECE0]">
                <h3 className="font-serif text-lg font-bold text-[#153F28]">
                  Tender Negotiation Timeline
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#CFE0CB]">
                  {activeRfq.timeline.map((event) => {
                    const isBuyer = event.sender === 'buyer';
                    return (
                      <div key={event.id} className="relative">
                        <div
                          className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 ${
                            isBuyer ? 'bg-[#1F5C3A] ring-[#1F5C3A]' : 'bg-[#E8A33D] ring-[#E8A33D]'
                          }`}
                        />
                        <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#CFE0CB]/80 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#153F28]">{event.title}</span>
                            <span className="text-[10px] text-[#5B6E64]">{event.date}</span>
                          </div>
                          <p className="text-xs text-[#5B6E64]">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#CFE0CB] p-12 text-center text-[#5B6E64]">
              Select an RFQ from the left to view timeline and quotations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

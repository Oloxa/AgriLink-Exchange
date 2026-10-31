import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  Package, 
  Anchor, 
  Scale, 
  AlertCircle, 
  Check, 
  Sparkles, 
  Layers, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { validateRfqStep } from '../utils/tradeLogic';
import { Incoterm, ProductCategory, RFQ } from '../types';
import { ALL_CATEGORIES, ALL_CERTIFICATIONS } from '../data/suppliers';

const INCOTERMS: { code: Incoterm; name: string; desc: string }[] = [
  { code: 'CIF', name: 'Cost, Insurance & Freight', desc: 'Exporter pays freight and marine insurance to buyer destination port (Recommended)' },
  { code: 'FOB', name: 'Free on Board', desc: 'Exporter loads onto vessel at origin port; buyer handles ocean carriage' },
  { code: 'CFR', name: 'Cost & Freight', desc: 'Exporter covers freight to destination port; buyer procures marine insurance' },
  { code: 'DAP', name: 'Delivered at Place', desc: 'Exporter delivers to specified inland warehouse address' },
  { code: 'EXW', name: 'Ex Works', desc: 'Buyer assumes all shipping and loading from exporter farm/silo' },
];

export const RfqBuilderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { suppliers, shortlist, createRfq, addToast } = useApp();

  const preselectedSupplierId = searchParams.get('supplierId');
  const preselectedProduct = searchParams.get('product') || '';
  const preselectedQty = Number(searchParams.get('quantity')) || 50;

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedRfq, setSubmittedRfq] = useState<RFQ | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    product: preselectedProduct,
    category: (suppliers.find((s) => s.id === preselectedSupplierId)?.categories[0] as ProductCategory) || 'Grains',
    grade: 'Export Grade 1, Machine Cleaned & Sorted (Purity 99%+)',
    quantity: preselectedQty,
    unit: 'Metric Ton',
    targetPricePerMT: 1800,
    destinationCountry: 'Netherlands',
    destinationPort: 'Port of Rotterdam',
    incoterm: 'CIF' as Incoterm,
    targetDeliveryDate: '2026-12-15',
    packagingType: '50kg PP Woven Bags on Heat-Treated Pallets',
    requiredCertifications: ['ISO 22000'],
    inspectionRequired: 'SGS Pre-Shipment Quality, Weight & Aflatoxin Assay',
    specialNotes: 'Require clean on-board marine bill of lading, phyto cert, and certificate of origin EUR.1/Form A.',
    supplierIds: preselectedSupplierId
      ? [preselectedSupplierId]
      : shortlist.length > 0
      ? shortlist
      : ['sup-1'],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-populate commodity name if empty and preselected supplier changes
  useEffect(() => {
    if (preselectedSupplierId) {
      const sup = suppliers.find((s) => s.id === preselectedSupplierId);
      if (sup && !formData.product) {
        setFormData((prev) => ({
          ...prev,
          product: sup.mainProducts[0] || 'Sesame Seeds',
          category: sup.categories[0] || 'Nuts & Oilseeds',
          targetPricePerMT: sup.priceRangeUSD.min,
        }));
      }
    }
  }, [preselectedSupplierId, suppliers]);

  const handleNextStep = () => {
    const validation = validateRfqStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      addToast('Please complete the required fields marked in red.', 'error');
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleToggleCert = (cert: string) => {
    setFormData((prev) => {
      const exists = prev.requiredCertifications.includes(cert);
      return {
        ...prev,
        requiredCertifications: exists
          ? prev.requiredCertifications.filter((c) => c !== cert)
          : [...prev.requiredCertifications, cert],
      };
    });
  };

  const handleToggleSupplier = (id: string) => {
    setFormData((prev) => {
      const exists = prev.supplierIds.includes(id);
      if (exists) {
        if (prev.supplierIds.length <= 1) {
          addToast('At least one supplier recipient is required', 'warning');
          return prev;
        }
        return { ...prev, supplierIds: prev.supplierIds.filter((sId) => sId !== id) };
      } else {
        return { ...prev, supplierIds: [...prev.supplierIds, id] };
      }
    });
  };

  const handleSelectAllShortlist = () => {
    if (shortlist.length === 0) {
      addToast('Your shortlist is currently empty. Add suppliers from the directory!', 'info');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      supplierIds: Array.from(new Set([...prev.supplierIds, ...shortlist])),
    }));
    addToast(`Added ${shortlist.length} shortlisted exporters as recipients`, 'success');
  };

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRfqStep(4, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      addToast('Please select at least one recipient supplier.', 'error');
      return;
    }

    const created = createRfq({
      product: formData.product,
      category: formData.category,
      grade: formData.grade,
      quantity: formData.quantity,
      unit: formData.unit,
      targetPricePerMT: formData.targetPricePerMT,
      destinationCountry: formData.destinationCountry,
      destinationPort: formData.destinationPort,
      incoterm: formData.incoterm,
      targetDeliveryDate: formData.targetDeliveryDate,
      packagingType: formData.packagingType,
      requiredCertifications: formData.requiredCertifications,
      inspectionRequired: formData.inspectionRequired,
      specialNotes: formData.specialNotes,
      supplierIds: formData.supplierIds,
    });

    setSubmittedRfq(created);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1F5C3A', '#E8A33D', '#E6EFE3'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6510]">
          <span>Procurement Tender</span>
          <span>•</span>
          <span>Incoterms® 2020 Standardized</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28] mt-1">
          Request for Quotation (RFQ) Builder
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
          Broadcast your commercial commodity tender directly to verified exporter trading desks simultaneously.
        </p>
      </div>

      {/* SUCCESS SCREEN */}
      {submittedRfq ? (
        <div className="bg-white rounded-3xl border-2 border-[#1F5C3A]/30 p-8 sm:p-12 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center mx-auto text-3xl shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-[#1F5C3A]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#E6EFE3] text-[#1F5C3A] text-xs font-bold uppercase tracking-wider">
              Tender Active &amp; Dispatched
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28]">
              RFQ Successfully Transmitted!
            </h2>
            <div className="font-mono text-base font-bold text-[#9E6510] bg-[#FAF7F0] inline-block px-4 py-1.5 rounded-xl border border-[#CFE0CB]">
              Reference No: {submittedRfq.referenceNo}
            </div>
            <p className="text-xs sm:text-sm text-[#5B6E64] max-w-lg mx-auto leading-relaxed pt-2">
              Your quotation tender for <strong>{submittedRfq.quantity} MT of {submittedRfq.product}</strong> has been transmitted to {submittedRfq.supplierIds.length} verified exporter desk(s).
            </p>
          </div>

          {/* Real-time simulation notice */}
          <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#CFE0CB] max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#153F28]">
              <Clock className="w-4 h-4 text-[#E8A33D] animate-spin" />
              <span>Simulating Live Exporter Response...</span>
            </div>
            <p className="text-[11px] text-[#5B6E64]">
              A formal export quotation response from the origin processing desk is simulated to arrive in your <strong>Buyer Dashboard</strong> in about 5 seconds!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to={`/dashboard?rfqId=${submittedRfq.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Track in Buyer Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setSubmittedRfq(null);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-[#CFE0CB] hover:bg-[#FAF7F0] text-[#23302A] font-bold text-xs transition-colors"
            >
              Create Another RFQ
            </button>
          </div>
        </div>
      ) : (
        /* MULTI-STEP WIZARD FORM */
        <div className="bg-white rounded-3xl border border-[#CFE0CB] shadow-sm overflow-hidden">
          
          {/* Progress Steps Header */}
          <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#CFE0CB] grid grid-cols-4 gap-2">
            {[
              { step: 1, label: 'Commodity' },
              { step: 2, label: 'Logistics' },
              { step: 3, label: 'Quality & Specs' },
              { step: 4, label: 'Recipients & Submit' },
            ].map((s) => {
              const isCurrent = currentStep === s.step;
              const isDone = currentStep > s.step;
              return (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                      isDone
                        ? 'bg-[#1F5C3A] text-white'
                        : isCurrent
                        ? 'bg-[#E8A33D] text-[#153F28] ring-4 ring-[#E8A33D]/25'
                        : 'bg-[#E6EFE3] text-[#5B6E64]'
                    }`}
                  >
                    {isDone ? '✓' : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-semibold hidden sm:block ${
                      isCurrent ? 'text-[#153F28] font-bold' : 'text-[#5B6E64]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmitRfq} className="p-6 sm:p-8 space-y-6">
            
            {/* STEP 1: Commodity Specifications */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#F2ECE0] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#153F28]">
                    Step 1: Agricultural Commodity &amp; Volume
                  </h2>
                  <p className="text-xs text-[#5B6E64]">Specify the required crop, purity grade, and contracted tonnage.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Commodity Name *
                    </label>
                    <input
                      type="text"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder="e.g. Cleaned Natural Whitish Sesame Seeds"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                        errors.product ? 'border-red-500' : 'border-[#CFE0CB]'
                      }`}
                    />
                    {errors.product && <p className="text-[11px] text-red-600 mt-1">{errors.product}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Commodity Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                    >
                      {ALL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Grade &amp; Chemical / Physical Parameters *
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="e.g. Export Grade 1, Moisture < 6%, Purity 99.5%, FFA < 1.5%"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                      errors.grade ? 'border-red-500' : 'border-[#CFE0CB]'
                    }`}
                  />
                  {errors.grade && <p className="text-[11px] text-red-600 mt-1">{errors.grade}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Contracted Quantity *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        className={`flex-1 px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-bold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                          errors.quantity ? 'border-red-500' : 'border-[#CFE0CB]'
                        }`}
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-36 px-2.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A]"
                      >
                        <option value="Metric Ton">Metric Tons (MT)</option>
                        <option value="50kg Bags">50kg Bags</option>
                        <option value="20ft Containers">20ft Containers (FCL)</option>
                        <option value="40ft Containers">40ft Containers (HC)</option>
                      </select>
                    </div>
                    {errors.quantity && <p className="text-[11px] text-red-600 mt-1">{errors.quantity}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Indicative Target Price (USD / MT)
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="50000"
                      value={formData.targetPricePerMT}
                      onChange={(e) => setFormData({ ...formData, targetPricePerMT: Number(e.target.value) })}
                      placeholder="e.g. 1750"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-bold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                    />
                    <p className="text-[10px] text-[#5B6E64] mt-1">Leave as guidance for suppliers to submit their best binding quote.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Destination & Incoterms */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#F2ECE0] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#153F28]">
                    Step 2: Shipping Destination &amp; Incoterms 2020
                  </h2>
                  <p className="text-xs text-[#5B6E64]">Set discharge port, contractual terms, and target arrival deadline.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      value={formData.destinationCountry}
                      onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                      placeholder="e.g. Netherlands, Germany, UAE, China"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                        errors.destinationCountry ? 'border-red-500' : 'border-[#CFE0CB]'
                      }`}
                    />
                    {errors.destinationCountry && <p className="text-[11px] text-red-600 mt-1">{errors.destinationCountry}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                      Port of Discharge or Delivery Point *
                    </label>
                    <input
                      type="text"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      placeholder="e.g. Port of Rotterdam, Hamburg, Jebel Ali"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                        errors.destinationPort ? 'border-red-500' : 'border-[#CFE0CB]'
                      }`}
                    />
                    {errors.destinationPort && <p className="text-[11px] text-red-600 mt-1">{errors.destinationPort}</p>}
                  </div>
                </div>

                {/* Incoterms Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-2">
                    Incoterm 2020 Rule *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INCOTERMS.map((term) => (
                      <div
                        key={term.code}
                        onClick={() => setFormData({ ...formData, incoterm: term.code })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.incoterm === term.code
                            ? 'bg-[#E6EFE3] border-[#1F5C3A] shadow-sm ring-1 ring-[#1F5C3A]'
                            : 'bg-[#FAF7F0] border-[#CFE0CB] hover:bg-[#FAF7F0]/80'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#153F28]">{term.code} — {term.name}</span>
                          {formData.incoterm === term.code && <Check className="w-4 h-4 text-[#1F5C3A]" />}
                        </div>
                        <p className="text-[11px] text-[#5B6E64]">{term.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Target Delivery / Discharge Date *
                  </label>
                  <input
                    type="date"
                    value={formData.targetDeliveryDate}
                    onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                    className="w-full sm:w-64 px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Quality, Packaging & Inspection */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#F2ECE0] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#153F28]">
                    Step 3: Packaging, Certification &amp; Assay Requirements
                  </h2>
                  <p className="text-xs text-[#5B6E64]">Specify bag types, third-party laboratory inspections, and notes.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Packaging Specification *
                  </label>
                  <select
                    value={formData.packagingType}
                    onChange={(e) => setFormData({ ...formData, packagingType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  >
                    <option value="50kg PP Woven Bags on Heat-Treated Pallets">50kg PP Woven Bags on Heat-Treated Pallets</option>
                    <option value="60kg Export Jute Bags with GrainPro Hermetic Liner">60kg Export Jute Bags with GrainPro Hermetic Liner</option>
                    <option value="25kg Multi-Wall Kraft Paper Valve Bags">25kg Multi-Wall Kraft Paper Valve Bags</option>
                    <option value="1,000kg Big Bags (Jumbo FIBC Bulk Bags)">1,000kg Big Bags (Jumbo FIBC Bulk Bags)</option>
                    <option value="Controlled Atmosphere Cold Storage Reefers (4kg Cartons)">Controlled Atmosphere Cold Storage Reefers (4kg Cartons)</option>
                    <option value="Bulk Vessel Grain Hold">Bulk Vessel Grain Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-2">
                    Required Quality Certifications
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CERTIFICATIONS.map((cert) => {
                      const isSelected = formData.requiredCertifications.includes(cert);
                      return (
                        <button
                          key={cert}
                          type="button"
                          onClick={() => handleToggleCert(cert)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#1F5C3A] text-white border-[#1F5C3A]'
                              : 'bg-[#FAF7F0] text-[#23302A] border-[#CFE0CB] hover:bg-[#E6EFE3]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          <span>{cert}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Pre-Shipment Inspection Protocol
                  </label>
                  <input
                    type="text"
                    value={formData.inspectionRequired}
                    onChange={(e) => setFormData({ ...formData, inspectionRequired: e.target.value })}
                    placeholder="e.g. SGS / Bureau Veritas Pre-Shipment Purity, Aflatoxin & Heavy Metals Certificate"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Special Cargo Instructions &amp; Contract Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Additional terms, phytosanitary requirements, EU Deforestation GPS polygons, etc."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold text-[#23302A] focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Recipient Selection & Review */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#F2ECE0] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#153F28]">
                    Step 4: Select Recipient Exporters &amp; Confirm Tender
                  </h2>
                  <p className="text-xs text-[#5B6E64]">Select the audited exporter desks that will receive this tender.</p>
                </div>

                {/* Exporter selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#23302A]">
                      Recipient Exporters ({formData.supplierIds.length} Selected)
                    </label>
                    {shortlist.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSelectAllShortlist}
                        className="text-xs font-bold text-[#1F5C3A] hover:underline flex items-center gap-1"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Add All Shortlisted Exporters ({shortlist.length})</span>
                      </button>
                    )}
                  </div>

                  {errors.supplierIds && (
                    <p className="text-xs text-red-600 font-bold">{errors.supplierIds}</p>
                  )}

                  <div className="max-h-56 overflow-y-auto divide-y divide-[#F2ECE0] border border-[#CFE0CB] rounded-2xl bg-[#FAF7F0] p-2">
                    {suppliers.map((s) => {
                      const selected = formData.supplierIds.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleToggleSupplier(s.id)}
                          className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                            selected ? 'bg-[#E6EFE3]' : 'hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => {}} // handled by parent onClick
                              className="w-4 h-4 accent-[#1F5C3A] cursor-pointer"
                            />
                            <div>
                              <div className="text-xs font-bold text-[#23302A] flex items-center gap-1">
                                <span>{s.name}</span>
                                {s.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#1F5C3A]" />}
                              </div>
                              <div className="text-[11px] text-[#5B6E64]">
                                {s.flagEmoji} {s.country} • MOQ: {s.minOrderQuantityMT} MT • Desk speed: &lt;{s.responseTimeHours}h
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[11px] font-bold text-[#1F5C3A]">
                              ★ {s.rating}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tender Summary Review Box */}
                <div className="p-4 rounded-2xl bg-[#E6EFE3]/70 border border-[#CFE0CB] space-y-2 text-xs">
                  <div className="font-bold text-sm text-[#153F28]">Summary of Tender Specification</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[#23302A]">
                    <div>
                      <span className="text-[10px] text-[#5B6E64] block">Product:</span>
                      <strong>{formData.product}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5B6E64] block">Tonnage:</span>
                      <strong>{formData.quantity} {formData.unit}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5B6E64] block">Incoterm / Destination:</span>
                      <strong>{formData.incoterm} {formData.destinationPort}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5B6E64] block">Target Price:</span>
                      <strong>${formData.targetPricePerMT} / MT</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-[#F2ECE0] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl border border-[#CFE0CB] hover:bg-[#FAF7F0] text-xs font-bold text-[#23302A] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast RFQ Tender Now</span>
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

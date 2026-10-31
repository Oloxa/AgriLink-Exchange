import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Building2, UploadCloud, CheckCircle2, ArrowRight, Anchor, Award } from 'lucide-react';
import { ALL_CATEGORIES, ALL_CERTIFICATIONS } from '../data/suppliers';

export const RegisterExporterPage: React.FC = () => {
  const { addToast } = useApp();

  const [form, setForm] = useState({
    companyName: '',
    registrationNumber: '',
    country: 'Nigeria',
    city: '',
    establishedYear: 2018,
    annualCapacityMT: 25000,
    ports: 'Apapa Port (Lagos)',
    selectedCategories: ['Nuts & Oilseeds'],
    selectedCertifications: ['HACCP'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleToggleCat = (cat: string) => {
    setForm((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((c) => c !== cat)
          : [...prev.selectedCategories, cat],
      };
    });
  };

  const handleToggleCert = (cert: string) => {
    setForm((prev) => {
      const exists = prev.selectedCertifications.includes(cert);
      return {
        ...prev,
        selectedCertifications: exists
          ? prev.selectedCertifications.filter((c) => c !== cert)
          : [...prev.selectedCertifications, cert],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.contactEmail.trim()) {
      addToast('Please complete required company and contact information', 'error');
      return;
    }
    const accId = `ACC-EXP-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedId(accId);
    addToast('Exporter onboarding application submitted! Audit desk notified.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6510]">
          <span>Origin Accreditation</span>
          <span>•</span>
          <span>Exporter Onboarding</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28] mt-1">
          List Your Exporter Business on AgriLink
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
          Join over 1,200 audited origin exporters. Connect directly with institutional procurement teams from Europe, North America, the Middle East, and Asia.
        </p>
      </div>

      {submittedId ? (
        <div className="bg-white rounded-3xl border border-[#CFE0CB] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center mx-auto text-3xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#E6EFE3] text-[#1F5C3A] text-xs font-bold uppercase tracking-wider">
              Verification Audit Pending
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28]">
              Application Received for {form.companyName}
            </h2>
            <div className="font-mono text-sm font-bold text-[#9E6510] bg-[#FAF7F0] inline-block px-4 py-1.5 rounded-xl border border-[#CFE0CB]">
              Application ID: {submittedId}
            </div>
            <p className="text-xs text-[#5B6E64] max-w-md mx-auto leading-relaxed pt-2">
              Our regional origin verification desk in {form.country} has received your documents. An auditor will schedule your warehouse and optical grading machine inspection within 3 business days.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Legal Entity */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#153F28] pb-2 border-b border-[#F2ECE0]">
                1. Corporate &amp; Processing Facility Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Registered Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Savannah Commodity Mills Ltd"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">
                    Tax / Corporate Registration No. (CAC/CNPJ/Tax ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.registrationNumber}
                    onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
                    placeholder="e.g. RC-894102-NG"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Origin Country *</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Brazil">Brazil</option>
                    <option value="India">India</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Peru">Peru</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Processing City / Hub *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Kano, Kumasi, Nairobi"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Annual Capacity (MT) *</label>
                  <input
                    type="number"
                    min="100"
                    max="1000000"
                    value={form.annualCapacityMT}
                    onChange={(e) => setForm({ ...form, annualCapacityMT: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23302A] mb-1.5">Primary Departure Port(s) *</label>
                <input
                  type="text"
                  required
                  value={form.ports}
                  onChange={(e) => setForm({ ...form, ports: e.target.value })}
                  placeholder="e.g. Apapa Port (Lagos), Tin Can Island"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                />
              </div>
            </div>

            {/* Section 2: Commodity Categories */}
            <div className="space-y-4 pt-4 border-t border-[#F2ECE0]">
              <h3 className="font-serif font-bold text-lg text-[#153F28]">
                2. Export Commodities &amp; Certifications
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#23302A] mb-2">
                  Select Export Sectors (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map((cat) => {
                    const isSelected = form.selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleToggleCat(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-[#1F5C3A] text-white border-[#1F5C3A]'
                            : 'bg-[#FAF7F0] text-[#23302A] border-[#CFE0CB] hover:bg-[#E6EFE3]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#23302A] mb-2">
                  Active Accreditations &amp; Quality Standards
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_CERTIFICATIONS.map((cert) => {
                    const isSelected = form.selectedCertifications.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => handleToggleCert(cert)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-[#E8A33D] text-[#153F28] border-[#E8A33D]'
                            : 'bg-[#FAF7F0] text-[#23302A] border-[#CFE0CB] hover:bg-[#FAF7F0]/60'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {cert}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Commercial Contact */}
            <div className="space-y-4 pt-4 border-t border-[#F2ECE0]">
              <h3 className="font-serif font-bold text-lg text-[#153F28]">
                3. Primary Export Desk Officer Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Officer Name *</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Ibrahim Dangote"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    placeholder="e.g. export@savannahagro.ng"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    placeholder="e.g. +234 803 123 4567"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2ECE0]">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Exporter Accreditation Dossier</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

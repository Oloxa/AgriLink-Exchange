import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    inquiryType: 'Procurement / Buyer Inquiry',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formData.subject.trim()) errs.subject = 'Subject required';
    if (!formData.message.trim()) errs.message = 'Please provide details of your inquiry';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      addToast('Please complete required fields.', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Message received! Our trade desk will respond within 2 business hours.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9E6510]">
          Institutional Support
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28]">
          Contact Global Commodity Trade Desk
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6E64]">
          Reach our commodity specialists for trade arbitration, custom high-volume vessel charters, or exporter verification queries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact info cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#CFE0CB] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#153F28]">Trade Desk Despatches</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#23302A]">Inquiries &amp; Quotations</div>
                  <div className="text-[#5B6E64]">tradedesk@agrilinkexchange.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#23302A]">Direct Vessel Line</div>
                  <div className="text-[#5B6E64]">+44 20 7946 0912 / +234 1 295 4400</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#23302A]">Operating Desks</div>
                  <div className="text-[#5B6E64]">Rotterdam (CET) • Lagos (WAT) • Singapore (SGT)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#23302A]">European Headquarters</div>
                  <div className="text-[#5B6E64]">Westhaven Commodity Terminal, 1042 AA Amsterdam, Netherlands</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#153F28] text-white p-6 rounded-3xl space-y-3 shadow-md">
            <h4 className="font-serif font-bold text-base text-[#FAF7F0]">Exporter Verification Hotline</h4>
            <p className="text-xs text-[#E6EFE3]/80 leading-relaxed">
              Are you an agricultural processing conglomerate seeking verification on AgriLink? Submit an onboarding application directly via our portal.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-[#CFE0CB] p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center mx-auto text-2xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#153F28]">
                  Inquiry Dispatched to Trade Desk
                </h3>
                <p className="text-xs text-[#5B6E64] max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. An agricultural trade officer assigned to your commodity corridor will review your note and reply to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      company: '',
                      inquiryType: 'Procurement / Buyer Inquiry',
                      subject: '',
                      message: '',
                    });
                  }}
                  className="px-5 py-2.5 bg-[#1F5C3A] text-white rounded-xl text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                        errors.fullName ? 'border-red-500' : 'border-[#CFE0CB]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">Corporate Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. buyer@commodityfirm.com"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                        errors.email ? 'border-red-500' : 'border-[#CFE0CB]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">Company / Firm Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Baltic Grain Mills SIA"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23302A] mb-1.5">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
                    >
                      <option value="Procurement / Buyer Inquiry">Procurement / Buyer Tender</option>
                      <option value="Exporter Accreditation">Exporter Accreditation &amp; Audit</option>
                      <option value="SGS / Quality Assay Dispute">SGS / Quality Assay Verification</option>
                      <option value="High-Volume Vessel Chartering">Bulk Panamax/Handymax Chartering</option>
                      <option value="Escrow Settlement">Escrow &amp; Payment Facilitation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiring regarding annual tender for 2,000 MT Nigerian Sesame"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                      errors.subject ? 'border-red-500' : 'border-[#CFE0CB]'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23302A] mb-1.5">Message Specification *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding commodities, expected monthly volumes, target ports, and certifications needed..."
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F0] border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] ${
                      errors.message ? 'border-red-500' : 'border-[#CFE0CB]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Trade Desk</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

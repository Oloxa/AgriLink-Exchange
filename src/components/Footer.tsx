import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sprout, ShieldCheck, Mail, ArrowRight, CheckCircle2, Globe, Scale, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid business email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed to AgriLink Global Harvest & Trade Bulletin!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#153F28] text-[#FAF7F0] pt-16 pb-12 border-t border-[#1F5C3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Assurance Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#2A794E]/40">
          <div className="flex items-center gap-4 bg-[#1F5C3A]/50 p-4 rounded-2xl border border-[#2A794E]/30">
            <ShieldCheck className="w-8 h-8 text-[#E8A33D] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-[#FAF7F0]">Verified Exporter Audits</h4>
              <p className="text-xs text-[#E6EFE3]/80">Physical packhouse, legal CAC/tax & port inspection clearance.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#1F5C3A]/50 p-4 rounded-2xl border border-[#2A794E]/30">
            <Scale className="w-8 h-8 text-[#E8A33D] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-[#FAF7F0]">Incoterms 2020 & SGS Ready</h4>
              <p className="text-xs text-[#E6EFE3]/80">FOB, CIF, CFR standard documentation with third-party assay.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#1F5C3A]/50 p-4 rounded-2xl border border-[#2A794E]/30">
            <Lock className="w-8 h-8 text-[#E8A33D] shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-[#FAF7F0]">Traceability & EUDR Compliant</h4>
              <p className="text-xs text-[#E6EFE3]/80">GPS polygon origin farm mapping and phyto certification.</p>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8A33D] flex items-center justify-center text-[#153F28] font-bold shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F0]">
                AgriLink Exchange
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#E6EFE3]/80 max-w-sm">
              The premier institutional B2B agricultural commodity trade portal. Connecting global food manufacturers, mills, and traders with certified origin exporters across Africa, Latin America, and Asia.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-2">
                Commodity Export Price Index
              </h5>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter procurement email..."
                  className="flex-1 bg-[#1F5C3A] text-white placeholder-[#E6EFE3]/50 text-xs px-3.5 py-2.5 rounded-xl border border-[#2A794E] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                  aria-label="Procurement email for newsletter"
                />
                <button
                  type="submit"
                  className="bg-[#E8A33D] hover:bg-[#D7922D] text-[#153F28] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[11px] text-[#E6EFE3]/60 mt-1.5">
                Bi-weekly origin harvest windows, FOB port prices, and demurrage advisories.
              </p>
            </div>
          </div>

          {/* Commodity Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-4">
              Commodity Sectors
            </h5>
            <ul className="space-y-2 text-xs text-[#E6EFE3]/90">
              <li><Link to="/directory?category=Grains" className="hover:text-white transition-colors">Grains & Cereal Crops</Link></li>
              <li><Link to="/directory?category=Cocoa+%26+Coffee" className="hover:text-white transition-colors">Cocoa & Specialty Coffee</Link></li>
              <li><Link to="/directory?category=Nuts+%26+Oilseeds" className="hover:text-white transition-colors">Sesame, Cashew & Oilseeds</Link></li>
              <li><Link to="/directory?category=Spices" className="hover:text-white transition-colors">Cloves, Ginger & Spices</Link></li>
              <li><Link to="/directory?category=Fruits" className="hover:text-white transition-colors">Hass Avocados & Citrus</Link></li>
              <li><Link to="/directory?category=Tubers" className="hover:text-white transition-colors">Cassava, Yam & Tapioca</Link></li>
              <li><Link to="/directory?category=Livestock+Feed" className="hover:text-white transition-colors">Soy Meal & Alfalfa Feed</Link></li>
            </ul>
          </div>

          {/* Origin Corridors */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-4">
              Origin Corridors
            </h5>
            <ul className="space-y-2 text-xs text-[#E6EFE3]/90">
              <li><Link to="/directory?country=Nigeria" className="hover:text-white transition-colors">Nigeria (Apapa / Tin Can)</Link></li>
              <li><Link to="/directory?country=Ghana" className="hover:text-white transition-colors">Ghana (Tema / Takoradi)</Link></li>
              <li><Link to="/directory?country=Kenya" className="hover:text-white transition-colors">Kenya (Mombasa / JKIA)</Link></li>
              <li><Link to="/directory?country=South+Africa" className="hover:text-white transition-colors">South Africa (Durban / Cape Town)</Link></li>
              <li><Link to="/directory?country=Egypt" className="hover:text-white transition-colors">Egypt (Alexandria / Damietta)</Link></li>
              <li><Link to="/directory?country=Brazil" className="hover:text-white transition-colors">Brazil (Santos / Paranaguá)</Link></li>
              <li><Link to="/directory?country=Vietnam" className="hover:text-white transition-colors">Vietnam (Cat Lai / Cai Mep)</Link></li>
              <li><Link to="/directory?country=Peru" className="hover:text-white transition-colors">Peru (Callao Port)</Link></li>
            </ul>
          </div>

          {/* Trade Links & Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#E8A33D] mb-4">
              Platform & Legal
            </h5>
            <ul className="space-y-2 text-xs text-[#E6EFE3]/90">
              <li><Link to="/directory" className="hover:text-white transition-colors">Directory Search</Link></li>
              <li><Link to="/rfq-builder" className="hover:text-white transition-colors">Create Multi-Supplier RFQ</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Supplier Comparison Matrix</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Buyer Dashboard</Link></li>
              <li><Link to="/register-exporter" className="hover:text-white transition-colors">Exporter Accreditation</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About AgriLink Protocol</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Trade Desk</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#1F5C3A] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E6EFE3]/60 gap-4">
          <p>© {new Date().getFullYear()} AgriLink Exchange Ltd. All rights reserved. Global trade facilitation platform.</p>
          <div className="flex items-center gap-6">
            <span>Incoterms® 2020 Standardized</span>
            <span>GAFTA & FOSFA Contract Compatible</span>
            <span className="flex items-center gap-1 text-[#E8A33D]">
              <Globe className="w-3.5 h-3.5" /> Worldwide Farm-Gate Origin
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

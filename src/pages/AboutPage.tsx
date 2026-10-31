import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Globe, Scale, Users, Building, ArrowRight, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EFE3] text-[#1F5C3A] text-xs font-bold border border-[#CFE0CB]">
          <Sprout className="w-4 h-4" />
          <span>The AgriLink Mission</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#153F28] tracking-tight">
          Modernizing Global Agricultural Commodity Trade
        </h1>
        <p className="text-sm sm:text-base text-[#5B6E64] leading-relaxed">
          AgriLink Exchange was founded to bridge the opacity gap between emerging market farming aggregators and international food processors, commodity desks, and industrial mills.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#CFE0CB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#153F28]">Strict Physical Audits</h3>
          <p className="text-xs text-[#5B6E64] leading-relaxed">
            Every exporter listed on AgriLink undergoes physical verification of processing warehouses, optical sorting machinery, phytosanitary fumigation chambers, and corporate tax standing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#CFE0CB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#153F28]">Incoterms 2020 Standardization</h3>
          <p className="text-xs text-[#5B6E64] leading-relaxed">
            Say goodbye to ambiguous quotations. All RFQs and contracts specify clear Incoterms rules (FOB, CIF, CFR), SGS/Bureau Veritas assay protocols, and standardized demurrage parameters.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#CFE0CB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#153F28]">Deforestation &amp; Traceability</h3>
          <p className="text-xs text-[#5B6E64] leading-relaxed">
            We support European Union Deforestation Regulation (EUDR) compliance with GPS polygon mapping of origin farms, ensuring seamless container clearance at destination ports.
          </p>
        </div>
      </div>

      {/* Leadership & Network Story */}
      <div className="bg-[#153F28] text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8A33D]">Our Global Network</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Operating Across 48 Agricultural Origin Corridors
          </h2>
          <p className="text-xs sm:text-sm text-[#E6EFE3]/80 leading-relaxed">
            From the sesame plains of Northern Nigeria and cocoa groves of Western Ghana to the avocado highlands of Kenya and the soybean savannahs of Brazil's Mato Grosso, AgriLink ensures transparent price discovery and guaranteed trade fulfillment.
          </p>
        </div>

        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#1F5C3A]">
          <div>
            <div className="font-serif text-2xl font-bold text-[#E8A33D]">$2.4B+</div>
            <div className="text-xs text-[#E6EFE3]/70">Commodity Trade Flow</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[#E8A33D]">1,200+</div>
            <div className="text-xs text-[#E6EFE3]/70">Exporters Audited</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[#E8A33D]">99.4%</div>
            <div className="text-xs text-[#E6EFE3]/70">On-Time Discharge</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-[#E8A33D]">Zero</div>
            <div className="text-xs text-[#E6EFE3]/70">Escrow Defaults</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-3xl border border-[#CFE0CB] p-8 text-center space-y-4 shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-[#153F28]">
          Ready to Connect With Verified Agricultural Exporters?
        </h3>
        <p className="text-xs text-[#5B6E64] max-w-md mx-auto">
          Start sourcing bulk agricultural commodities directly from audited origins today.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/directory"
            className="px-6 py-3 rounded-2xl bg-[#1F5C3A] text-white text-xs font-bold hover:bg-[#153F28] transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>Browse Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-5 py-3 rounded-2xl border border-[#CFE0CB] text-[#23302A] text-xs font-bold hover:bg-[#FAF7F0] transition-colors"
          >
            Contact Trade Desk
          </Link>
        </div>
      </div>

    </div>
  );
};

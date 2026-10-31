import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#CFE0CB] p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-[#E6EFE3] text-[#1F5C3A] flex items-center justify-center mx-auto text-4xl">
          🌾
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-[#9E6510] uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#153F28]">
            Harvester Lost in Field
          </h1>
          <p className="text-xs text-[#5B6E64] leading-relaxed">
            The agricultural page or tender you are looking for does not exist or may have been archived.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/directory"
            className="px-5 py-3 rounded-2xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Exporters</span>
          </Link>
          <Link
            to="/"
            className="px-5 py-3 rounded-2xl border border-[#CFE0CB] hover:bg-[#FAF7F0] text-[#23302A] font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

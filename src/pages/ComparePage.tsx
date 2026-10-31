import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Layers, 
  Trash2, 
  Send, 
  Star, 
  ShieldCheck, 
  Anchor, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { compareSuppliers } from '../utils/tradeLogic';

export const ComparePage: React.FC = () => {
  const { suppliers, shortlist, toggleShortlist, clearShortlist } = useApp();

  const shortlistedSuppliers = suppliers.filter((s) => shortlist.includes(s.id)).slice(0, 4);
  const comparisonResults = compareSuppliers(shortlistedSuppliers);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#CFE0CB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E6510]">
            <span>Procurement Evaluation</span>
            <span>•</span>
            <span>Up to 4 Exporters</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153F28] mt-1">
            Shortlist &amp; Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6E64] mt-1">
            Evaluate capacity, origin ports, minimum contract tonnage, and verified credentials side-by-side.
          </p>
        </div>

        {shortlistedSuppliers.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearShortlist}
              className="px-4 py-2.5 rounded-xl border border-[#CFE0CB] hover:bg-red-50 hover:text-red-600 text-xs font-bold text-[#5B6E64] transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Shortlist</span>
            </button>
            <Link
              to="/rfq-builder"
              className="px-5 py-2.5 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast RFQ to All ({shortlistedSuppliers.length})</span>
            </Link>
          </div>
        )}
      </div>

      {/* Empty State */}
      {shortlistedSuppliers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#CFE0CB] p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E6EFE3] flex items-center justify-center text-[#1F5C3A] mx-auto text-3xl">
            🌾
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#153F28]">
            Your Shortlist is Empty
          </h2>
          <p className="text-xs text-[#5B6E64] leading-relaxed">
            You haven't shortlisted any agricultural exporters yet. Explore the directory and tap the heart icon on any supplier card to evaluate them side by side.
          </p>
          <div className="pt-2">
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1F5C3A] text-white text-xs font-bold shadow-md hover:bg-[#153F28] transition-colors"
            >
              <span>Explore 40 Exporters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* COMPARISON MATRIX TABLE */
        <div className="bg-white rounded-3xl border border-[#CFE0CB] shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#CFE0CB] bg-[#FAF7F0]">
                <th className="p-4 text-left font-bold text-xs uppercase tracking-wider text-[#5B6E64] w-48 min-w-[180px]">
                  Comparison Metric
                </th>
                {comparisonResults.map(({ supplier }) => (
                  <th key={supplier.id} className="p-4 text-left min-w-[240px] max-w-[280px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{supplier.flagEmoji}</span>
                          <span className="font-bold text-sm text-[#153F28] line-clamp-1">{supplier.name}</span>
                        </div>
                        <span className="text-[11px] text-[#5B6E64] block">{supplier.city}, {supplier.country}</span>
                      </div>
                      <button
                        onClick={() => toggleShortlist(supplier.id)}
                        className="p-1.5 text-[#5B6E64] hover:text-red-600 rounded-lg"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F2ECE0]">
              
              {/* Highlight Badges Row */}
              <tr className="bg-[#FAF7F0]/40">
                <td className="p-4 font-bold text-[#23302A]">Best-in-Class Value</td>
                {comparisonResults.map(({ supplier, isLowestMoq, isFastestResponse, isHighestRating, isHighestCapacity }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {isLowestMoq && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                          ★ Lowest MOQ
                        </span>
                      )}
                      {isFastestResponse && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8A33D]/20 text-[#9E6510] border border-[#E8A33D]/40">
                          ⚡ Fastest Desk Response
                        </span>
                      )}
                      {isHighestRating && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6EFE3] text-[#1F5C3A] border border-[#CFE0CB]">
                          🏆 Top Rating
                        </span>
                      )}
                      {isHighestCapacity && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#153F28] text-white">
                          ⚓ Highest Annual Capacity
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Minimum Order Quantity (MOQ) */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Minimum Order Quantity (MOQ)</td>
                {comparisonResults.map(({ supplier, isLowestMoq }) => (
                  <td key={supplier.id} className="p-4">
                    <div className={`font-bold text-sm ${isLowestMoq ? 'text-[#1F5C3A]' : 'text-[#23302A]'}`}>
                      {supplier.minOrderQuantityMT} Metric Tons
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price Range */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Indicative Price / MT</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="font-serif font-bold text-sm text-[#153F28]">
                      ${supplier.priceRangeUSD.min.toLocaleString()} - ${supplier.priceRangeUSD.max.toLocaleString()}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Response Speed */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Quotation Speed</td>
                {comparisonResults.map(({ supplier, isFastestResponse }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#23302A]">
                      <Clock className={`w-4 h-4 ${isFastestResponse ? 'text-[#E8A33D]' : 'text-[#5B6E64]'}`} />
                      <span>Under {supplier.responseTimeHours}h ({supplier.responseRatePercent}%)</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating & Reviews */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Buyer Score</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#E8A33D] text-[#E8A33D]" />
                      <span className="font-bold text-sm text-[#23302A]">{supplier.rating}</span>
                      <span className="text-[#5B6E64]">({supplier.reviewCount} audits)</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Primary Ports */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Shipping Ports</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4">
                    <ul className="text-[#5B6E64] space-y-0.5">
                      {supplier.ports.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <Anchor className="w-3 h-3 text-[#1F5C3A]" /> {p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Annual Capacity */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Annual Capacity</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4 font-semibold text-[#23302A]">
                    {supplier.annualCapacityMT.toLocaleString()} MT / year
                  </td>
                ))}
              </tr>

              {/* Certifications */}
              <tr>
                <td className="p-4 font-bold text-[#23302A]">Certifications</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E6EFE3] text-[#1F5C3A]">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Buttons Row */}
              <tr className="bg-[#FAF7F0]/40">
                <td className="p-4 font-bold text-[#23302A]">Direct Action</td>
                {comparisonResults.map(({ supplier }) => (
                  <td key={supplier.id} className="p-4">
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/rfq-builder?supplierId=${supplier.id}`}
                        className="py-2 px-3 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-xs text-center shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Quote Directly</span>
                      </Link>
                      <Link
                        to={`/supplier/${supplier.id}`}
                        className="py-1.5 px-3 rounded-xl border border-[#CFE0CB] hover:bg-white text-xs font-semibold text-center text-[#23302A]"
                      >
                        View Full Profile
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

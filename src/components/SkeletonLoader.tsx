import React from 'react';

export const SupplierCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#CFE0CB]/70 p-5 shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6EFE3] shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-[#E6EFE3] rounded-md" />
              <div className="h-3.5 w-24 bg-[#FAF7F0] rounded-md" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#E6EFE3]" />
        </div>
        <div className="h-4 w-full bg-[#FAF7F0] rounded mb-2" />
        <div className="h-4 w-4/5 bg-[#FAF7F0] rounded mb-4" />
        <div className="flex flex-wrap gap-1.5 mb-4">
          <div className="h-6 w-16 bg-[#E6EFE3] rounded-full" />
          <div className="h-6 w-20 bg-[#E6EFE3] rounded-full" />
          <div className="h-6 w-14 bg-[#E6EFE3] rounded-full" />
        </div>
      </div>
      <div className="pt-4 border-t border-[#F2ECE0] flex items-center justify-between">
        <div className="h-4 w-28 bg-[#FAF7F0] rounded" />
        <div className="h-9 w-28 bg-[#E6EFE3] rounded-xl" />
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <div className="p-4 border-b border-[#F2ECE0] flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#E6EFE3]" />
        <div className="space-y-2">
          <div className="h-4 w-48 bg-[#E6EFE3] rounded" />
          <div className="h-3 w-32 bg-[#FAF7F0] rounded" />
        </div>
      </div>
      <div className="h-6 w-20 bg-[#E6EFE3] rounded-full" />
      <div className="h-4 w-24 bg-[#FAF7F0] rounded" />
      <div className="h-8 w-24 bg-[#E6EFE3] rounded-lg" />
    </div>
  );
};

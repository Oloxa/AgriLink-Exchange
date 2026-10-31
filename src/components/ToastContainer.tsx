import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgStyle = 'bg-white border-[#CFE0CB] text-[#23302A]';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#1F5C3A] shrink-0" />;

        if (toast.type === 'error') {
          bgStyle = 'bg-red-50 border-red-200 text-red-900';
          icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-50 border-amber-200 text-amber-900';
          icon = <AlertCircle className="w-5 h-5 text-[#E8A33D] shrink-0" />;
        } else if (toast.type === 'info') {
          bgStyle = 'bg-[#F3F8F1] border-[#CFE0CB] text-[#1F5C3A]';
          icon = <Info className="w-5 h-5 text-[#1F5C3A] shrink-0" />;
        } else {
          bgStyle = 'bg-[#FAF7F0] border-[#1F5C3A]/30 text-[#153F28]';
          icon = <CheckCircle2 className="w-5 h-5 text-[#1F5C3A] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 ${bgStyle}`}
          >
            {icon}
            <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#5B6E64] hover:text-[#23302A] p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

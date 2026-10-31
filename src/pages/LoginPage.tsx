import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Globe2, 
  Wheat 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsTester, attemptRegularLogin } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempt, setFailedAttempt] = useState<string | null>(null);
  const [shakeCard, setShakeCard] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);

  const handleRegularLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAttempting(true);
    setShakeCard(false);

    // Simulate brief network verification delay
    setTimeout(() => {
      const result = attemptRegularLogin(email, password);
      setFailedAttempt(result.funnyMessage);
      setShakeCard(true);
      setIsAttempting(false);

      // Reset shake after animation
      setTimeout(() => {
        setShakeCard(false);
      }, 700);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative Agricultural Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E6EFE3] opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#E8A33D]/15 opacity-60 blur-3xl pointer-events-none" />
      
      {/* Header bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1F5C3A] flex items-center justify-center text-[#FAF7F0] shadow-md">
            <Sprout className="w-6 h-6 text-[#FAF7F0]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#153F28]">
            AgriLink Exchange
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#5B6E64] bg-[#E6EFE3]/80 px-3.5 py-1.5 rounded-full border border-[#CFE0CB]">
          <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
          <span>Institutional B2B Commodity Platform</span>
        </div>
      </div>

      {/* Main Login Card Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 z-10">
        <div className="max-w-md w-full">
          
          {/* Card Container */}
          <div 
            className={`bg-white rounded-3xl border border-[#CFE0CB] shadow-xl p-6 sm:p-8 transition-transform duration-300 ${
              shakeCard ? 'animate-funny-wobble ring-2 ring-red-400' : ''
            }`}
          >
            {/* Title & Tagline */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E6EFE3] text-[#1F5C3A] mb-3 shadow-inner">
                <Wheat className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153F28] tracking-tight">
                Sign In to AgriLink
              </h1>
              <p className="text-xs text-[#5B6E64] mt-1.5 leading-relaxed">
                Connect with 40+ audited agricultural exporters across Africa, Latin America, and Asia.
              </p>
            </div>

            {/* Funny Error Display when regular Login is pressed */}
            {failedAttempt && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-[#23302A] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center shrink-0 text-xl animate-sprout-nod">
                    🐐
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>User Not Found!</span>
                    </div>
                    <p className="text-xs font-medium text-[#23302A] mt-1 leading-snug">
                      {failedAttempt}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-amber-200/60">
                      <button
                        type="button"
                        onClick={loginAsTester}
                        className="text-xs font-bold text-[#1F5C3A] hover:underline flex items-center gap-1"
                      >
                        👉 Click here to enter via Tester Login instead
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Login Form */}
            <form onSubmit={handleRegularLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#23302A] mb-1.5">
                  Corporate Procurement Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5B6E64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. buyer@euroagrar-trade.de"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] text-[#23302A]"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#23302A]">
                    Password
                  </label>
                  <span className="text-[11px] text-[#1F5C3A] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5B6E64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] border border-[#CFE0CB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5C3A] text-[#23302A]"
                    required
                  />
                </div>
              </div>

              {/* Regular Login Button */}
              <button
                type="submit"
                disabled={isAttempting}
                className="w-full py-3 px-4 rounded-xl bg-[#1F5C3A] hover:bg-[#153F28] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1F5C3A]"
              >
                {isAttempting ? (
                  <span className="inline-block animate-spin mr-2">⏳</span>
                ) : (
                  <>
                    <span>Log In to Trade Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#CFE0CB]" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-[#5B6E64] uppercase tracking-wider">
                Instant Evaluation Access
              </span>
            </div>

            {/* Tester Login Button (Prominent & Easy) */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={loginAsTester}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E8A33D] to-[#D7922D] hover:from-[#D7922D] hover:to-[#B8771A] text-[#153F28] font-bold text-sm shadow-md transition-all flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F0] flex items-center justify-center text-[#153F28] font-bold shadow-sm">
                    ⚡
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold uppercase tracking-wide">
                      Tester Login
                    </div>
                    <div className="text-[11px] font-semibold text-[#153F28]/80">
                      Instant Access (No credentials required)
                    </div>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-[#153F28]" />
              </button>

              <p className="text-[11px] text-center text-[#5B6E64]">
                Enters as <strong>Marcus Vance</strong>, Lead Procurement Officer at EuroAgrar GmbH.
              </p>
            </div>

          </div>

          {/* Micro trust stats below card */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-[#CFE0CB]/60">
              <div className="font-serif font-bold text-sm text-[#1F5C3A]">40+</div>
              <div className="text-[10px] text-[#5B6E64]">Audited Exporters</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-[#CFE0CB]/60">
              <div className="font-serif font-bold text-sm text-[#1F5C3A]">48</div>
              <div className="text-[10px] text-[#5B6E64]">Origin Countries</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-xl border border-[#CFE0CB]/60">
              <div className="font-serif font-bold text-sm text-[#1F5C3A]">100%</div>
              <div className="text-[10px] text-[#5B6E64]">Escrow Guaranteed</div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="py-4 text-center text-xs text-[#5B6E64] border-t border-[#CFE0CB]/60 bg-[#FAF7F0]">
        AgriLink Exchange • Standardized Agricultural Trade Facilitation Platform
      </div>

    </div>
  );
};

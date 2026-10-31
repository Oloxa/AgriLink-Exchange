/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Sprout } from 'lucide-react';

// Lazy-loaded pages as requested
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const DirectoryPage = lazy(() =>
  import('./pages/DirectoryPage').then((m) => ({ default: m.DirectoryPage }))
);
const SupplierDetailPage = lazy(() =>
  import('./pages/SupplierDetailPage').then((m) => ({ default: m.SupplierDetailPage }))
);
const RfqBuilderPage = lazy(() =>
  import('./pages/RfqBuilderPage').then((m) => ({ default: m.RfqBuilderPage }))
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const ComparePage = lazy(() =>
  import('./pages/ComparePage').then((m) => ({ default: m.ComparePage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const RegisterExporterPage = lazy(() =>
  import('./pages/RegisterExporterPage').then((m) => ({ default: m.RegisterExporterPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="w-14 h-14 rounded-2xl bg-[#E6EFE3] flex items-center justify-center text-[#1F5C3A] shadow-sm animate-bounce">
      <Sprout className="w-8 h-8" />
    </div>
    <div className="text-center">
      <p className="font-serif font-bold text-base text-[#153F28]">Loading AgriLink Trade Portal...</p>
      <p className="text-xs text-[#5B6E64] mt-0.5">Syncing origin harvests and market quotes</p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();

  // If not authenticated, ALWAYS show Login interface first as requested
  if (!isAuthenticated) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
        <ToastContainer />
      </Suspense>
    );
  }

  // Once authenticated, show full application UI
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#23302A]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/supplier/:id" element={<SupplierDetailPage />} />
            <Route path="/rfq-builder" element={<RfqBuilderPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register-exporter" element={<RegisterExporterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

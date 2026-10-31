import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Search, 
  Layers, 
  Send, 
  LayoutDashboard, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Check, 
  ChevronDown, 
  ShieldCheck, 
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    shortlist, 
    rfqs, 
    notifications, 
    unreadNotificationCount, 
    markAllNotificationsRead, 
    markNotificationRead,
    logout 
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Exporters', path: '/directory', icon: Search },
    { 
      label: 'Compare', 
      path: '/compare', 
      icon: Layers, 
      badge: shortlist.length > 0 ? shortlist.length : undefined 
    },
    { label: 'RFQ Builder', path: '/rfq-builder', icon: Send },
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard,
      badge: rfqs.length > 0 ? rfqs.length : undefined 
    },
    { label: 'About', path: '/about', icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#CFE0CB]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3A] rounded-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-[#1F5C3A] flex items-center justify-center text-[#FAF7F0] shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-[#FAF7F0]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153F28]">
                  AgriLink
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8A33D]/20 text-[#9E6510] border border-[#E8A33D]/30">
                  Exchange
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#5B6E64] hidden sm:block tracking-wide">
                B2B Verified Commodity Trade Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-[#1F5C3A] text-white shadow-sm'
                      : 'text-[#23302A] hover:bg-[#E6EFE3] hover:text-[#1F5C3A]'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                        active
                          ? 'bg-[#E8A33D] text-[#153F28]'
                          : 'bg-[#1F5C3A]/15 text-[#1F5C3A]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right utility actions: Notifications & User profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Shortlist Quick View button */}
            <Link
              to="/compare"
              className="relative p-2 text-[#23302A] hover:text-[#1F5C3A] hover:bg-[#E6EFE3] rounded-xl transition-colors hidden sm:flex items-center justify-center"
              aria-label="View shortlisted suppliers"
              title="Shortlisted Exporters"
            >
              <Heart className="w-5 h-5" />
              {shortlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E8A33D] text-[#153F28] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 text-[#23302A] hover:text-[#1F5C3A] hover:bg-[#E6EFE3] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3A]"
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#CFE0CB] shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE0]">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#23302A]">Trade Notifications</h4>
                      {unreadNotificationCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-[#E6EFE3] text-[#1F5C3A] rounded-full">
                          {unreadNotificationCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[#1F5C3A] hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#F2ECE0] my-2">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-[#5B6E64]">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setShowNotifications(false);
                            if (n.rfqId) {
                              navigate(`/dashboard?rfqId=${n.rfqId}`);
                            }
                          }}
                          className={`p-3 rounded-xl transition-colors cursor-pointer hover:bg-[#FAF7F0] ${
                            !n.read ? 'bg-[#F3F8F1]/70' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-semibold text-xs text-[#153F28]">{n.title}</span>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-[#1F5C3A] shrink-0 mt-1" />}
                          </div>
                          <p className="text-xs text-[#5B6E64] line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-[#5B6E64]/70 mt-1.5 block">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#F2ECE0] text-center">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-semibold text-[#1F5C3A] hover:underline inline-flex items-center gap-1"
                    >
                      View All in Buyer Dashboard →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-[#E6EFE3] hover:bg-[#CFE0CB] rounded-full sm:rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3A]"
                aria-label="User account menu"
                aria-expanded={showUserMenu}
              >
                <div className="w-8 h-8 rounded-full bg-[#1F5C3A] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {user?.avatar || 'MV'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-[#153F28] leading-tight flex items-center gap-1">
                    <span>{user?.name || 'Verified Buyer'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1F5C3A]" />
                  </div>
                  <span className="text-[10px] text-[#5B6E64] font-medium block">
                    {user?.isTester ? 'Tester Account' : user?.company || 'EuroAgrar GmbH'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#5B6E64] hidden sm:block" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#CFE0CB] shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2 border-b border-[#F2ECE0] mb-2">
                    <p className="text-xs font-bold text-[#23302A]">{user?.name}</p>
                    <p className="text-[11px] text-[#5B6E64] truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#E6EFE3] text-[#1F5C3A] text-[10px] font-semibold">
                      {user?.company}
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-[#23302A] hover:bg-[#FAF7F0] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#1F5C3A]" />
                    <span>Procurement Dashboard</span>
                  </Link>

                  <Link
                    to="/compare"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-[#23302A] hover:bg-[#FAF7F0] transition-colors"
                  >
                    <Heart className="w-4 h-4 text-[#E8A33D]" />
                    <span>Shortlisted Exporters ({shortlist.length})</span>
                  </Link>

                  <Link
                    to="/register-exporter"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-[#23302A] hover:bg-[#FAF7F0] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1F5C3A]" />
                    <span>Register as Exporter</span>
                  </Link>

                  <div className="pt-2 mt-2 border-t border-[#F2ECE0]">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Log Out to Login Screen</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#23302A] hover:bg-[#E6EFE3] rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#CFE0CB] bg-[#FAF7F0] px-4 pt-3 pb-6 space-y-2 shadow-inner animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                  active
                    ? 'bg-[#1F5C3A] text-white'
                    : 'text-[#23302A] bg-white border border-[#CFE0CB]/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#E8A33D] text-[#153F28]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#CFE0CB] space-y-2">
            <Link
              to="/register-exporter"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#1F5C3A] bg-[#E6EFE3] border border-[#CFE0CB]"
            >
              <ShieldCheck className="w-4 h-4" />
              List Your Exporter Business
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-red-700 bg-red-50 border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

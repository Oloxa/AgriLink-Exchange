import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RFQ, NotificationItem, UserProfile, Supplier } from '../types';
import { INITIAL_SUPPLIERS } from '../data/suppliers';
import { INITIAL_RFQS, INITIAL_NOTIFICATIONS } from '../data/initialRfqs';
import { generateReferenceNumber, simulateSupplierQuote } from '../utils/tradeLogic';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  suppliers: Supplier[];
  shortlist: string[];
  rfqs: RFQ[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  toasts: ToastMessage[];
  loginAsTester: () => void;
  attemptRegularLogin: (email: string, pass: string) => { success: false; funnyMessage: string };
  logout: () => void;
  toggleShortlist: (supplierId: string) => void;
  isShortlisted: (supplierId: string) => boolean;
  clearShortlist: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  createRfq: (rfqData: Omit<RFQ, 'id' | 'referenceNo' | 'createdAt' | 'status' | 'quotesReceived' | 'timeline'>) => RFQ;
  acceptQuote: (rfqId: string, quoteId: string) => void;
  counterOfferQuote: (rfqId: string, quoteId: string, counterPrice: number) => void;
  triggerSupplierQuoteSimulation: (rfqId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const TESTER_PROFILE: UserProfile = {
  id: 'usr-tester-101',
  name: 'Marcus Vance',
  company: 'EuroAgrar Commodity Sourcing GmbH',
  role: 'Chief Agricultural Procurement Officer',
  email: 'm.vance@euroagrar-trade.de',
  avatar: 'MV',
  country: 'Germany (Hamburg)',
  verifiedBuyer: true,
  isTester: true,
};

const FUNNY_MESSAGES = [
  "🌾 Silo Error 404: No farmer or grain trader registered with those credentials! Our goats must have eaten the login sheet. Please use the 'Tester Login' button for immediate VIP access!",
  "🚜 Tractor Stalled: User account not found in our global agricultural harvest database! Use the 'Tester Login' button to bypass customs immediately!",
  "🌽 Kernel Panic: No matching harvest broker found in this silo! Click 'Tester Login' to enter directly with pre-verified procurement credentials.",
  "🥑 Holy Guacamole: That email and password didn't pass origin phytosanitary inspection. Tap 'Tester Login' to board the trade floor immediately!",
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);

  // Authentication: starts false by default, but checks query param ?autostart=1 or localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        return true;
      }
      const savedAuth = localStorage.getItem('agrilink_auth');
      return savedAuth === 'true';
    }
    return false;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        return TESTER_PROFILE;
      }
      const savedUser = localStorage.getItem('agrilink_user');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          return TESTER_PROFILE;
        }
      }
      if (localStorage.getItem('agrilink_auth') === 'true') {
        return TESTER_PROFILE;
      }
    }
    return null;
  });

  // Shortlist
  const [shortlist, setShortlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrilink_shortlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return ['sup-1', 'sup-2'];
        }
      }
    }
    return ['sup-1', 'sup-2'];
  });

  // RFQs
  const [rfqs, setRfqs] = useState<RFQ[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrilink_rfqs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_RFQS;
        }
      }
    }
    return INITIAL_RFQS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agrilink_notifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_NOTIFICATIONS;
        }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('agrilink_auth', isAuthenticated ? 'true' : 'false');
    if (user) {
      localStorage.setItem('agrilink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrilink_user');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    localStorage.setItem('agrilink_shortlist', JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem('agrilink_rfqs', JSON.stringify(rfqs));
  }, [rfqs]);

  useEffect(() => {
    localStorage.setItem('agrilink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginAsTester = () => {
    setUser(TESTER_PROFILE);
    setIsAuthenticated(true);
    addToast('Welcome, Marcus! Logged in as Verified Global Buyer (Tester Access)', 'success');
  };

  const attemptRegularLogin = (_email: string, _pass: string) => {
    const randomMsg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
    return {
      success: false as const,
      funnyMessage: randomMsg,
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('agrilink_auth');
    localStorage.removeItem('agrilink_user');
    addToast('You have been logged out safely.', 'info');
  };

  const toggleShortlist = (supplierId: string) => {
    const targetSupplier = suppliers.find((s) => s.id === supplierId);
    const supplierName = targetSupplier ? targetSupplier.name : 'Supplier';

    setShortlist((prev) => {
      const exists = prev.includes(supplierId);
      if (exists) {
        addToast(`Removed ${supplierName} from shortlist`, 'info');
        return prev.filter((id) => id !== supplierId);
      } else {
        addToast(`Added ${supplierName} to shortlist`, 'success');
        return [...prev, supplierId];
      }
    });
  };

  const isShortlisted = (supplierId: string) => shortlist.includes(supplierId);

  const clearShortlist = () => {
    setShortlist([]);
    addToast('Shortlist cleared', 'info');
  };

  const createRfq = (
    rfqData: Omit<RFQ, 'id' | 'referenceNo' | 'createdAt' | 'status' | 'quotesReceived' | 'timeline'>
  ): RFQ => {
    const refNo = generateReferenceNumber();
    const newRfq: RFQ = {
      ...rfqData,
      id: `rfq-${Date.now()}`,
      referenceNo: refNo,
      createdAt: new Date().toISOString(),
      status: 'Sent',
      quotesReceived: [],
      timeline: [
        {
          id: `tl-${Date.now()}-1`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          sender: 'buyer',
          title: 'RFQ Transmitted to Exporters',
          description: `Dispatched to ${rfqData.supplierIds.length} verified exporter(s) under ${rfqData.incoterm} terms.`,
        },
      ],
    };

    setRfqs((prev) => [newRfq, ...prev]);
    addToast(`RFQ ${refNo} sent successfully!`, 'success');

    // Simulate supplier quote response automatically after 5-7 seconds
    setTimeout(() => {
      triggerSupplierQuoteSimulation(newRfq.id);
    }, 6000);

    return newRfq;
  };

  const triggerSupplierQuoteSimulation = (rfqId: string) => {
    setRfqs((prev) => {
      const rfqIndex = prev.findIndex((r) => r.id === rfqId);
      if (rfqIndex === -1) return prev;

      const rfq = prev[rfqIndex];
      // Pick one of the target suppliers
      const supplierId = rfq.supplierIds[0] || 'sup-1';
      const supplier = suppliers.find((s) => s.id === supplierId) || suppliers[0];

      // Check if already quoted by this supplier
      const alreadyQuoted = rfq.quotesReceived.some((q) => q.supplierId === supplier.id);
      if (alreadyQuoted) return prev;

      const newQuote = simulateSupplierQuote(rfq, supplier);

      const updatedRfq: RFQ = {
        ...rfq,
        status: 'Quoted',
        quotesReceived: [...rfq.quotesReceived, newQuote],
        timeline: [
          ...rfq.timeline,
          {
            id: `tl-${Date.now()}-resp`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            sender: 'supplier',
            title: `Official Quote Received: $${newQuote.offeredPricePerMT.toLocaleString()} / MT`,
            description: `${supplier.name} submitted official export quotation with ${newQuote.leadTimeDays} days lead time from ${newQuote.shippingOriginPort}.`,
          },
        ],
      };

      const updatedList = [...prev];
      updatedList[rfqIndex] = updatedRfq;

      // Add notification and toast
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `Quotation Received: ${rfq.product}`,
        message: `${supplier.name} offered $${newQuote.offeredPricePerMT.toLocaleString()}/MT for ${rfq.referenceNo}`,
        read: false,
        rfqId: rfq.id,
        type: 'quote',
      };
      setNotifications((n) => [newNotif, ...n]);
      addToast(`🎉 New quotation arrived from ${supplier.name} for ${rfq.referenceNo}!`, 'success');

      return updatedList;
    });
  };

  const acceptQuote = (rfqId: string, quoteId: string) => {
    setRfqs((prev) => {
      return prev.map((rfq) => {
        if (rfq.id !== rfqId) return rfq;

        const updatedQuotes = rfq.quotesReceived.map((q) => {
          if (q.id === quoteId) {
            return { ...q, status: 'Accepted' as const };
          }
          return { ...q, status: 'Declined' as const };
        });

        const acceptedQuote = rfq.quotesReceived.find((q) => q.id === quoteId);

        return {
          ...rfq,
          status: 'Closed' as const,
          quotesReceived: updatedQuotes,
          timeline: [
            ...rfq.timeline,
            {
              id: `tl-${Date.now()}-accept`,
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
              sender: 'buyer' as const,
              title: `Quotation Accepted ($${acceptedQuote?.offeredPricePerMT || 0}/MT)`,
              description: `Buyer accepted terms from ${acceptedQuote?.supplierName}. Escrow contract draft and proforma invoice initiated.`,
            },
          ],
        };
      });
    });

    addToast('Quotation accepted! Contract draft initiated.', 'success');
  };

  const counterOfferQuote = (rfqId: string, quoteId: string, counterPrice: number) => {
    setRfqs((prev) => {
      return prev.map((rfq) => {
        if (rfq.id !== rfqId) return rfq;

        const updatedQuotes = rfq.quotesReceived.map((q) => {
          if (q.id === quoteId) {
            return {
              ...q,
              status: 'Countered' as const,
              counterOfferPrice: counterPrice,
            };
          }
          return q;
        });

        return {
          ...rfq,
          status: 'Negotiating' as const,
          quotesReceived: updatedQuotes,
          timeline: [
            ...rfq.timeline,
            {
              id: `tl-${Date.now()}-counter`,
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
              sender: 'buyer' as const,
              title: `Counter-Offer Submitted: $${counterPrice.toLocaleString()} / MT`,
              description: `Target price counter-offer transmitted to supplier desk.`,
            },
          ],
        };
      });
    });

    addToast(`Counter-offer of $${counterPrice.toLocaleString()}/MT sent!`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        suppliers,
        shortlist,
        rfqs,
        notifications,
        unreadNotificationCount,
        toasts,
        loginAsTester,
        attemptRegularLogin,
        logout,
        toggleShortlist,
        isShortlisted,
        clearShortlist,
        addToast,
        removeToast,
        createRfq,
        acceptQuote,
        counterOfferQuote,
        triggerSupplierQuoteSimulation,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

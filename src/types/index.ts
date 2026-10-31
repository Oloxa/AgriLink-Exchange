export type ProductCategory = 
  | 'Grains' 
  | 'Cocoa & Coffee' 
  | 'Fruits' 
  | 'Vegetables' 
  | 'Nuts & Oilseeds' 
  | 'Spices' 
  | 'Tubers' 
  | 'Livestock Feed';

export interface ProductCatalogItem {
  id: string;
  name: string;
  category: ProductCategory;
  grade: string;
  moqMT: number; // Metric Tons
  pricePerMT: { min: number; max: number }; // USD
  unit: string;
  seasonCalendar: boolean[]; // 12 months [Jan..Dec], true if available
  harvestWindow: string;
  specs: Record<string, string>;
}

export interface ReviewItem {
  id: string;
  buyerName: string;
  buyerCompany: string;
  buyerCountry: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedTransaction: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  tagline: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  city: string;
  establishedYear: number;
  annualCapacityMT: number;
  verified: boolean;
  rating: number;
  reviewCount: number;
  responseTimeHours: number;
  responseRatePercent: number;
  ports: string[];
  certifications: string[];
  categories: ProductCategory[];
  mainProducts: string[];
  minOrderQuantityMT: number;
  priceRangeUSD: { min: number; max: number };
  coverImage: string;
  logoUrl: string;
  description: string;
  exportDestinations: string[];
  contactEmail: string;
  contactPhone: string;
  catalog: ProductCatalogItem[];
  reviews: ReviewItem[];
}

export type Incoterm = 'FOB' | 'CIF' | 'CFR' | 'EXW' | 'DAP';

export type RfqStatus = 'Sent' | 'Viewed' | 'Quoted' | 'Negotiating' | 'Closed';

export interface QuoteItem {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierFlag: string;
  offeredPricePerMT: number;
  shippingOriginPort: string;
  leadTimeDays: number;
  paymentTerms: string;
  validUntil: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Countered';
  notes: string;
  counterOfferPrice?: number;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  sender: 'buyer' | 'supplier' | 'system';
  title: string;
  description: string;
}

export interface RFQ {
  id: string;
  referenceNo: string;
  createdAt: string;
  product: string;
  category: ProductCategory;
  grade: string;
  quantity: number;
  unit: string;
  targetPricePerMT: number;
  destinationCountry: string;
  destinationPort: string;
  incoterm: Incoterm;
  targetDeliveryDate: string;
  packagingType: string;
  requiredCertifications: string[];
  inspectionRequired: string;
  specialNotes: string;
  supplierIds: string[];
  status: RfqStatus;
  quotesReceived: QuoteItem[];
  timeline: TimelineEvent[];
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  read: boolean;
  rfqId?: string;
  type: 'quote' | 'status' | 'system';
}

export interface UserProfile {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  avatar: string;
  country: string;
  verifiedBuyer: boolean;
  isTester: boolean;
}

export interface DirectoryFilters {
  searchQuery: string;
  category: ProductCategory | 'All';
  country: string | 'All';
  certification: string | 'All';
  maxMoq: number; // 0 means any
  port: string | 'All';
  verifiedOnly: boolean;
  maxResponseHours: number; // 0 means any
  sortBy: 'relevance' | 'rating' | 'newest' | 'fastest_response' | 'lowest_moq';
  viewMode: 'grid' | 'list';
}

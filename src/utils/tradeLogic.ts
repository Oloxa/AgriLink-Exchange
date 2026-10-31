import { Supplier, DirectoryFilters, RFQ, QuoteItem, TimelineEvent } from '../types';

export function filterSuppliers(
  suppliers: Supplier[],
  filters: Partial<DirectoryFilters>
): Supplier[] {
  return suppliers.filter((supplier) => {
    // Search query matches name, description, country, or products
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = supplier.name.toLowerCase().includes(q);
      const matchCountry = supplier.country.toLowerCase().includes(q);
      const matchCity = supplier.city.toLowerCase().includes(q);
      const matchProducts = supplier.mainProducts.some((p) => p.toLowerCase().includes(q));
      const matchCategories = supplier.categories.some((c) => c.toLowerCase().includes(q));
      const matchPorts = supplier.ports.some((port) => port.toLowerCase().includes(q));

      if (!matchName && !matchCountry && !matchCity && !matchProducts && !matchCategories && !matchPorts) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (!supplier.categories.includes(filters.category)) {
        return false;
      }
    }

    // Country filter
    if (filters.country && filters.country !== 'All') {
      if (supplier.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }
    }

    // Certification filter
    if (filters.certification && filters.certification !== 'All') {
      const targetCert = filters.certification.toLowerCase();
      const hasCert = supplier.certifications.some((c) => c.toLowerCase().includes(targetCert));
      if (!hasCert) {
        return false;
      }
    }

    // Verified only filter
    if (filters.verifiedOnly && !supplier.verified) {
      return false;
    }

    // Max MOQ filter
    if (filters.maxMoq && filters.maxMoq > 0) {
      if (supplier.minOrderQuantityMT > filters.maxMoq) {
        return false;
      }
    }

    // Port filter
    if (filters.port && filters.port !== 'All') {
      const hasPort = supplier.ports.some((p) => p.toLowerCase().includes(filters.port!.toLowerCase()));
      if (!hasPort) {
        return false;
      }
    }

    // Max Response Hours filter
    if (filters.maxResponseHours && filters.maxResponseHours > 0) {
      if (supplier.responseTimeHours > filters.maxResponseHours) {
        return false;
      }
    }

    return true;
  });
}

export function sortSuppliers(
  suppliers: Supplier[],
  sortBy: DirectoryFilters['sortBy'] = 'relevance'
): Supplier[] {
  const list = [...suppliers];
  switch (sortBy) {
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'newest':
      return list.sort((a, b) => b.establishedYear - a.establishedYear);
    case 'fastest_response':
      return list.sort((a, b) => a.responseTimeHours - b.responseTimeHours);
    case 'lowest_moq':
      return list.sort((a, b) => a.minOrderQuantityMT - b.minOrderQuantityMT);
    case 'relevance':
    default:
      // Verified first, then rating, then capacity
      return list.sort((a, b) => {
        if (a.verified !== b.verified) return a.verified ? -1 : 1;
        return b.rating * Math.log10(b.reviewCount + 5) - a.rating * Math.log10(a.reviewCount + 5);
      });
  }
}

export interface SupplierComparisonResult {
  supplier: Supplier;
  isLowestMoq: boolean;
  isFastestResponse: boolean;
  isHighestRating: boolean;
  isHighestCapacity: boolean;
}

export function compareSuppliers(suppliers: Supplier[]): SupplierComparisonResult[] {
  if (suppliers.length === 0) return [];

  const lowestMoq = Math.min(...suppliers.map((s) => s.minOrderQuantityMT));
  const fastestResponse = Math.min(...suppliers.map((s) => s.responseTimeHours));
  const highestRating = Math.max(...suppliers.map((s) => s.rating));
  const highestCapacity = Math.max(...suppliers.map((s) => s.annualCapacityMT));

  return suppliers.map((supplier) => ({
    supplier,
    isLowestMoq: supplier.minOrderQuantityMT === lowestMoq,
    isFastestResponse: supplier.responseTimeHours === fastestResponse,
    isHighestRating: supplier.rating === highestRating,
    isHighestCapacity: supplier.annualCapacityMT === highestCapacity,
  }));
}

export function generateReferenceNumber(): string {
  const prefix = 'RFQ';
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${random}`;
}

export function validateRfqStep(
  step: number,
  formData: {
    product?: string;
    category?: string;
    grade?: string;
    quantity?: number;
    unit?: string;
    destinationCountry?: string;
    destinationPort?: string;
    incoterm?: string;
    targetDeliveryDate?: string;
    targetPricePerMT?: number;
    packagingType?: string;
    requiredCertifications?: string[];
    supplierIds?: string[];
  }
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!formData.product || formData.product.trim() === '') {
      errors.product = 'Please specify the agricultural commodity.';
    }
    if (!formData.category) {
      errors.category = 'Please select a commodity category.';
    }
    if (!formData.grade || formData.grade.trim() === '') {
      errors.grade = 'Please state required grade or spec (e.g. Grade 1, Organic Fairtrade).';
    }
    if (!formData.quantity || formData.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than zero.';
    }
  } else if (step === 2) {
    if (!formData.destinationCountry || formData.destinationCountry.trim() === '') {
      errors.destinationCountry = 'Destination country is required.';
    }
    if (!formData.destinationPort || formData.destinationPort.trim() === '') {
      errors.destinationPort = 'Destination port or discharge terminal is required.';
    }
    if (!formData.incoterm) {
      errors.incoterm = 'Please select an Incoterm.';
    }
    if (!formData.targetDeliveryDate) {
      errors.targetDeliveryDate = 'Target delivery date is required.';
    }
  } else if (step === 3) {
    if (!formData.packagingType || formData.packagingType.trim() === '') {
      errors.packagingType = 'Please select packaging specification.';
    }
  } else if (step === 4) {
    if (!formData.supplierIds || formData.supplierIds.length === 0) {
      errors.supplierIds = 'Please select at least one supplier to receive this RFQ.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function simulateSupplierQuote(
  rfq: RFQ,
  supplier: Supplier
): QuoteItem {
  // Offer realistic price slightly adjusted around targetPrice or supplier price range
  const basePrice = rfq.targetPricePerMT > 0 ? rfq.targetPricePerMT : supplier.priceRangeUSD.min;
  // Variance between -5% to +8%
  const varianceFactor = 0.95 + Math.random() * 0.13;
  const offeredPricePerMT = Math.round(basePrice * varianceFactor);
  const leadTimeDays = Math.floor(14 + Math.random() * 21);

  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + 14);

  return {
    id: `quote-${supplier.id}-${Date.now()}`,
    supplierId: supplier.id,
    supplierName: supplier.name,
    supplierFlag: supplier.flagEmoji,
    offeredPricePerMT,
    shippingOriginPort: supplier.ports[0] || 'Origin Port',
    leadTimeDays,
    paymentTerms: '30% Advance T/T, 70% against Irrevocable L/C at Sight',
    validUntil: validityDate.toISOString().split('T')[0],
    status: 'Pending',
    notes: `Official export quotation for ${rfq.quantity} MT ${rfq.product} (${rfq.grade}). Origin: ${supplier.country}. SGS pre-shipment inspection certified. Packaging: ${rfq.packagingType || 'Standard Export Jute/PP'}.`,
    createdAt: new Date().toISOString(),
  };
}

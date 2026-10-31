import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSuppliers,
  sortSuppliers,
  compareSuppliers,
  validateRfqStep,
  generateReferenceNumber,
} from './tradeLogic';
import { Supplier } from '../types';

const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'AfroHarvest Agro-Export',
    tagline: 'Premium West African Sesame & Cashew',
    country: 'Nigeria',
    countryCode: 'NG',
    flagEmoji: '🇳🇬',
    city: 'Lagos',
    establishedYear: 2012,
    annualCapacityMT: 45000,
    verified: true,
    rating: 4.85,
    reviewCount: 38,
    responseTimeHours: 3,
    responseRatePercent: 98,
    ports: ['Apapa Port', 'Tin Can Island'],
    certifications: ['GlobalG.A.P', 'HACCP', 'ISO 22000'],
    categories: ['Nuts & Oilseeds', 'Grains'],
    mainProducts: ['Sesame Seeds', 'Raw Cashew Nuts', 'Sorghum'],
    minOrderQuantityMT: 20,
    priceRangeUSD: { min: 1400, max: 2100 },
    coverImage: '',
    logoUrl: '',
    description: 'Leading agricultural export conglomerate.',
    exportDestinations: ['Netherlands', 'Japan', 'Turkey'],
    contactEmail: 'trade@afroharvest.ng',
    contactPhone: '+234 1 890 2341',
    catalog: [],
    reviews: [],
  },
  {
    id: 'sup-2',
    name: 'Andes Superfoods Export',
    tagline: 'High-altitude organic grains and superfoods',
    country: 'Peru',
    countryCode: 'PE',
    flagEmoji: '🇵🇪',
    city: 'Lima',
    establishedYear: 2018,
    annualCapacityMT: 12000,
    verified: false,
    rating: 4.6,
    reviewCount: 14,
    responseTimeHours: 12,
    responseRatePercent: 91,
    ports: ['Callao Port'],
    certifications: ['Organic', 'Fairtrade'],
    categories: ['Grains'],
    mainProducts: ['Quinoa', 'Chia Seeds', 'Amaranth'],
    minOrderQuantityMT: 10,
    priceRangeUSD: { min: 2200, max: 3100 },
    coverImage: '',
    logoUrl: '',
    description: 'Specialty organic grain exporter from the Andes.',
    exportDestinations: ['Germany', 'USA', 'France'],
    contactEmail: 'export@andessuperfoods.pe',
    contactPhone: '+51 1 456 7890',
    catalog: [],
    reviews: [],
  },
];

test('filterSuppliers matches query string against products, country and name', () => {
  const byName = filterSuppliers(mockSuppliers, { searchQuery: 'AfroHarvest' });
  assert.equal(byName.length, 1);
  assert.equal(byName[0].id, 'sup-1');

  const byProduct = filterSuppliers(mockSuppliers, { searchQuery: 'Quinoa' });
  assert.equal(byProduct.length, 1);
  assert.equal(byProduct[0].id, 'sup-2');

  const byCountry = filterSuppliers(mockSuppliers, { searchQuery: 'Nigeria' });
  assert.equal(byCountry.length, 1);
  assert.equal(byCountry[0].id, 'sup-1');
});

test('filterSuppliers respects verifiedOnly filter', () => {
  const verifiedOnly = filterSuppliers(mockSuppliers, { verifiedOnly: true });
  assert.equal(verifiedOnly.length, 1);
  assert.equal(verifiedOnly[0].id, 'sup-1');
});

test('filterSuppliers respects maxMoq filter', () => {
  const smallMoq = filterSuppliers(mockSuppliers, { maxMoq: 15 });
  assert.equal(smallMoq.length, 1);
  assert.equal(smallMoq[0].id, 'sup-2');
});

test('sortSuppliers sorts by rating and lowest MOQ', () => {
  const byRating = sortSuppliers(mockSuppliers, 'rating');
  assert.equal(byRating[0].id, 'sup-1'); // 4.85 > 4.6

  const byMoq = sortSuppliers(mockSuppliers, 'lowest_moq');
  assert.equal(byMoq[0].id, 'sup-2'); // 10 < 20
});

test('compareSuppliers identifies best value attributes', () => {
  const comparison = compareSuppliers(mockSuppliers);
  assert.equal(comparison.length, 2);

  const sup1Comp = comparison.find((c) => c.supplier.id === 'sup-1')!;
  const sup2Comp = comparison.find((c) => c.supplier.id === 'sup-2')!;

  assert.equal(sup1Comp.isHighestCapacity, true);
  assert.equal(sup1Comp.isFastestResponse, true);
  assert.equal(sup2Comp.isLowestMoq, true);
});

test('validateRfqStep validates required fields per step', () => {
  const invalidStep1 = validateRfqStep(1, {});
  assert.equal(invalidStep1.isValid, false);
  assert.ok(invalidStep1.errors.product);

  const validStep1 = validateRfqStep(1, {
    product: 'Sesame Seeds',
    category: 'Nuts & Oilseeds',
    grade: 'Grade A Natural Whitish',
    quantity: 100,
  });
  assert.equal(validStep1.isValid, true);
});

test('generateReferenceNumber produces valid format', () => {
  const ref = generateReferenceNumber();
  assert.match(ref, /^RFQ-\d{4}-\d{4}$/);
});

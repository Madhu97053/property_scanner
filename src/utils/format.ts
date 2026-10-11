import type { Property } from '@/types';

export function formatPrice(priceInLakhs: number): string {
  if (priceInLakhs >= 100) {
    const crores = priceInLakhs / 100;
    const str = crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2);
    return `₹${str} Cr`;
  }
  if (priceInLakhs < 1) {
    const thousands = Math.round(priceInLakhs * 100000);
    if (thousands >= 100000) {
      const lakhs = (thousands / 100000).toFixed(0);
      return `₹${lakhs} L`;
    }
    return `₹${thousands.toLocaleString('en-IN')}`;
  }
  const str = priceInLakhs % 1 === 0 ? priceInLakhs.toFixed(0) : priceInLakhs.toFixed(2);
  return `₹${str} L`;
}

export function formatPriceRange(priceInLakhs: number): string {
  return formatPrice(priceInLakhs);
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('en-IN')} sqft`;
}

export function formatPricePerSqft(priceInLakhs: number, area: number): string {
  const perSqft = Math.round((priceInLakhs * 100000) / area);
  return `₹${perSqft.toLocaleString('en-IN')}/sqft`;
}

export function getListingLabel(listingType: string): string {
  return listingType === 'buy' ? 'Buy' : 'Rent';
}

export function getPriceUnitLabel(priceInLakhs: number): string {
  if (priceInLakhs >= 100) return `${(priceInLakhs / 100).toFixed(1)} Cr`;
  return `${priceInLakhs} L`;
}

export function propertyMatchesFilters(property: Property, filters: {
  listingType: string;
  city: string;
  propertyType: string;
  bhk: string;
  maxBudget: number | null;
  minArea: number | null;
  maxArea: number | null;
}): boolean {
  if (filters.listingType && property.listingType !== filters.listingType) return false;
  if (filters.city && filters.city !== 'All' && property.city !== filters.city) return false;
  if (filters.propertyType && filters.propertyType !== 'All' && property.type !== filters.propertyType) return false;
  if (filters.bhk && filters.bhk !== 'All') {
    if (filters.bhk === '5+') {
      const bhkNum = property.bhk === '5+' ? 5 : property.bhk === 'Plot' ? 0 : parseInt(property.bhk);
      if (bhkNum < 5) return false;
    } else if (property.bhk !== filters.bhk) {
      return false;
    }
  }
  if (filters.maxBudget !== null && filters.maxBudget > 0 && property.price > filters.maxBudget) return false;
  if (filters.minArea !== null && filters.minArea > 0 && property.area < filters.minArea) return false;
  if (filters.maxArea !== null && filters.maxArea > 0 && property.area > filters.maxArea) return false;
  return true;
}

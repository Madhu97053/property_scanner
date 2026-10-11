export type ListingType = 'buy' | 'rent';
export type PropertyType = 'Apartment' | 'Villa' | 'Independent House' | 'Plot' | 'Commercial';
export type BHKType = '1' | '2' | '3' | '4' | '5+' | 'Plot';

export interface ProviderOffer {
  provider: string;
  price: number; // in lakhs
  logoColor: string;
  logo?: string;
  url: string;
  delivery?: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  bhk: BHKType;
  listingType: ListingType;
  city: string;
  locality: string;
  price: number; // in lakhs (1 crore = 100 lakhs)
  area: number; // in sqft
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  possession: string;
  age: string;
  images: string[];
  amenities: string[];
  description: string;
  featured: boolean;
  verified: boolean;
  dateAdded: string; // ISO date string
  offers: ProviderOffer[];
}

export interface SearchFilters {
  listingType: ListingType;
  city: string;
  propertyType: PropertyType | 'All';
  bhk: BHKType | 'All';
  maxBudget: number | null;
  minArea: number | null;
  maxArea: number | null;
  sort: 'newest' | 'price-low' | 'price-high';
}

export const CITIES = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Chennai', 'Pune'] as const;
export const PROPERTY_TYPES: PropertyType[] = ['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial'];
export const BHK_OPTIONS: BHKType[] = ['1', '2', '3', '4', '5+', 'Plot'];

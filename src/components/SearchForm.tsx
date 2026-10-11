import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Home, IndianRupee, BedDouble } from 'lucide-react';
import type { ListingType, PropertyType, BHKType } from '@/types';
import { CITIES, PROPERTY_TYPES, BHK_OPTIONS } from '@/types';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
  initialListingType?: ListingType;
  initialCity?: string;
  initialPropertyType?: PropertyType | 'All';
  initialBhk?: BHKType | 'All';
  initialMaxBudget?: number | null;
}

const BUDGET_OPTIONS = [
  { label: 'No Limit', value: 0 },
  { label: '₹20 L', value: 20 },
  { label: '₹50 L', value: 50 },
  { label: '₹75 L', value: 75 },
  { label: '₹1 Cr', value: 100 },
  { label: '₹2 Cr', value: 200 },
  { label: '₹5 Cr', value: 500 },
  { label: '₹10 Cr', value: 1000 },
];

export default function SearchForm({
  variant = 'hero',
  initialListingType = 'buy',
  initialCity = 'All',
  initialPropertyType = 'All',
  initialBhk = 'All',
  initialMaxBudget = 0,
}: SearchFormProps) {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [city, setCity] = useState(initialCity);
  const [propertyType, setPropertyType] = useState<PropertyType | 'All'>(initialPropertyType);
  const [bhk, setBhk] = useState<BHKType | 'All'>(initialBhk);
  const [maxBudget, setMaxBudget] = useState<number>(initialMaxBudget ?? 0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('listingType', listingType);
    if (city && city !== 'All') params.set('city', city);
    if (propertyType && propertyType !== 'All') params.set('type', propertyType);
    if (bhk && bhk !== 'All') params.set('bhk', bhk);
    if (maxBudget > 0) params.set('budget', String(maxBudget));
    navigate(`/search?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm sm:shadow-lg border border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 items-end">
          {/* Buy/Rent toggle */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <label className="label-field hidden lg:block">Type</label>
            <div className="flex rounded-xl bg-gray-100 p-1">
              {(['buy', 'rent'] as ListingType[]).map((lt) => (
                <button
                  key={lt}
                  type="button"
                  onClick={() => setListingType(lt)}
                  className={`flex-1 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold capitalize transition-all ${
                    listingType === lt ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lt}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <label className="label-field">City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field text-xs sm:text-sm py-2 sm:py-2.5">
              <option value="All">All Cities</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label className="label-field">Property Type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType | 'All')} className="input-field text-xs sm:text-sm py-2 sm:py-2.5">
              <option value="All">All Types</option>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label className="label-field">BHK</label>
            <select value={bhk} onChange={(e) => setBhk(e.target.value as BHKType | 'All')} className="input-field text-xs sm:text-sm py-2 sm:py-2.5">
              <option value="All">Any</option>
              {BHK_OPTIONS.map((b) => <option key={b} value={b}>{b} BHK</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label className="label-field">Max Budget</label>
            <select value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} className="input-field text-xs sm:text-sm py-2 sm:py-2.5">
              {BUDGET_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <button onClick={handleSearch} className="btn-primary flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 px-4 text-xs sm:text-sm">
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 lg:p-7 shadow-2xl shadow-black/20">
      {/* Buy/Rent toggle */}
      <div className="mb-4 sm:mb-5 flex rounded-xl sm:rounded-2xl bg-gray-100 p-1 sm:p-1.5">
        {(['buy', 'rent'] as ListingType[]).map((lt) => (
          <button
            key={lt}
            type="button"
            onClick={() => setListingType(lt)}
            className={`flex-1 rounded-lg sm:rounded-xl py-2 sm:py-2.5 text-xs sm:text-sm font-bold capitalize transition-all ${
              listingType === lt ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lt === 'buy' ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* City */}
        <div>
          <label className="label-field flex items-center gap-1.5"><MapPin className="h-3 w-3" /> City / Location</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field">
            <option value="All">All Cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="label-field flex items-center gap-1.5"><Building2 className="h-3 w-3" /> Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType | 'All')} className="input-field">
            <option value="All">All Types</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* BHK */}
        <div>
          <label className="label-field flex items-center gap-1.5"><BedDouble className="h-3 w-3" /> BHK</label>
          <select value={bhk} onChange={(e) => setBhk(e.target.value as BHKType | 'All')} className="input-field">
            <option value="All">Any BHK</option>
            {BHK_OPTIONS.map((b) => <option key={b} value={b}>{b === 'Plot' ? 'Plot' : `${b} BHK`}</option>)}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="label-field flex items-center gap-1.5"><IndianRupee className="h-3 w-3" /> Maximum Budget</label>
          <select value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} className="input-field">
            {BUDGET_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="btn-primary mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 py-3 sm:py-3.5 text-sm sm:text-base font-semibold"
      >
        <Search className="h-4 sm:h-5 w-4 sm:w-5" />
        Search Properties
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400">
        <Home className="h-3 w-3" /> Compare across multiple property platforms
      </p>
    </div>
  );
}

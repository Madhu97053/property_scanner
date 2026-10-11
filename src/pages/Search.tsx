import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal, X, Map as MapIcon, List, ArrowUpDown, MapPin
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import SearchForm from '@/components/SearchForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { properties } from '@/data/properties';
import { propertyMatchesFilters } from '@/utils/format';
import { CITIES, PROPERTY_TYPES, BHK_OPTIONS } from '@/types';
import type { ListingType, PropertyType, BHKType } from '@/types';

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

export default function Search() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Filters from URL
  const [listingType, setListingType] = useState<ListingType>(
    (searchParams.get('listingType') as ListingType) || 'buy'
  );
  const [city, setCity] = useState(searchParams.get('city') || 'All');
  const [propertyType, setPropertyType] = useState<PropertyType | 'All'>(
    (searchParams.get('type') as PropertyType) || 'All'
  );
  const [bhk, setBhk] = useState<BHKType | 'All'>(
    (searchParams.get('bhk') as BHKType) || 'All'
  );
  const [maxBudget, setMaxBudget] = useState(Number(searchParams.get('budget')) || 0);
  const [minArea, setMinArea] = useState(Number(searchParams.get('minArea')) || 0);
  const [maxArea, setMaxArea] = useState(Number(searchParams.get('maxArea')) || 0);
  const [sort, setSort] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [listingType, city, propertyType, bhk, maxBudget, minArea, maxArea, sort]);

  // Update filters when URL changes
  useEffect(() => {
    setListingType((searchParams.get('listingType') as ListingType) || 'buy');
    setCity(searchParams.get('city') || 'All');
    setPropertyType((searchParams.get('type') as PropertyType) || 'All');
    setBhk((searchParams.get('bhk') as BHKType) || 'All');
    setMaxBudget(Number(searchParams.get('budget')) || 0);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let results = properties.filter((p) =>
      propertyMatchesFilters(p, {
        listingType,
        city,
        propertyType,
        bhk,
        maxBudget: maxBudget > 0 ? maxBudget : null,
        minArea: minArea > 0 ? minArea : null,
        maxArea: maxArea > 0 ? maxArea : null,
      })
    );

    // Sort
    if (sort === 'price-low') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else {
      results = [...results].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return results;
  }, [listingType, city, propertyType, bhk, maxBudget, minArea, maxArea, sort]);

  const activeFilterCount = [
    city !== 'All',
    propertyType !== 'All',
    bhk !== 'All',
    maxBudget > 0,
    minArea > 0 || maxArea > 0,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCity('All');
    setPropertyType('All');
    setBhk('All');
    setMaxBudget(0);
    setMinArea(0);
    setMaxArea(0);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Listing Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">Listing Type</h3>
        <div className="flex rounded-xl bg-gray-100 p-1">
          {(['buy', 'rent'] as ListingType[]).map((lt) => (
            <button
              key={lt}
              onClick={() => setListingType(lt)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-all ${
                listingType === lt ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              {lt}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">City</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setCity('All')}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              city === 'All' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin className="h-4 w-4" /> All Cities
          </button>
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                city === c ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPin className="h-4 w-4" /> {c}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">Property Type</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setPropertyType('All')}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              propertyType === 'All' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Types
          </button>
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setPropertyType(t)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                propertyType === t ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* BHK */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">BHK</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBhk('All')}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              bhk === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Any
          </button>
          {BHK_OPTIONS.map((b) => (
            <button
              key={b}
              onClick={() => setBhk(b)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                bhk === b ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">Max Budget</h3>
        <select value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} className="input-field">
          {BUDGET_OPTIONS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>

      {/* Area */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2.5">Area (sqft)</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400">Min</label>
            <input
              type="number"
              placeholder="0"
              value={minArea || ''}
              onChange={(e) => setMinArea(Number(e.target.value))}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Max</label>
            <input
              type="number"
              placeholder="No limit"
              value={maxArea || ''}
              onChange={(e) => setMaxArea(Number(e.target.value))}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  // Prevent background scrolling when filter drawer is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileFilters]);

  return (
    <div className="pt-16">
      {/* Compact search bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <SearchForm
            variant="compact"
            initialListingType={listingType}
            initialCity={city}
            initialPropertyType={propertyType}
            initialBhk={bhk}
            initialMaxBudget={maxBudget}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <h1 className="font-display text-lg sm:text-2xl font-bold text-navy-600">
              {loading ? 'Searching...' : `${filtered.length} Properties`}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="w-full sm:w-auto appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-8 sm:pl-9 pr-7 sm:pr-8 text-xs sm:text-sm font-medium text-gray-700 outline-none focus:border-blue-500 cursor-pointer shadow-xs"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 sm:h-4 w-3.5 sm:w-4 text-gray-400" />
            </div>

            {/* View toggle (available on mobile & desktop) */}
            <div className="flex rounded-xl border border-gray-200 p-0.5 bg-white shrink-0 shadow-xs">
              <button
                onClick={() => setViewMode('list')}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label="Map view"
              >
                <MapIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 lg:hidden shadow-xs shrink-0"
            >
              <SlidersHorizontal className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-blue-600" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-base font-bold text-gray-800">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <LoadingSpinner message="Finding the best properties for you..." />
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No Properties Found"
                message="Try adjusting your filters or expanding your budget to see more results."
                actionLabel="Clear Filters"
                actionTo="/search"
              />
            ) : viewMode === 'map' ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-8 shadow-sm text-center min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-50 mb-4">
                  <MapIcon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-gray-700">Map View</h3>
                <p className="mt-2 max-w-md text-xs sm:text-sm text-gray-500">
                  Interactive map integration requires an API key. For this demo, properties are displayed as a list below. In production, this would show pins on a real map.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 w-full text-left">
                  {filtered.slice(0, 6).map((property) => (
                    <PropertyCard key={property.id} property={property} compact />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer with backdrop */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowMobileFilters(false)} />
          <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl animate-slide-in-right flex flex-col z-10">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                <h2 className="font-display text-base sm:text-lg font-bold text-gray-800">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <FilterPanel />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3.5 sm:p-4 shrink-0 flex gap-2">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="btn-primary flex-1 py-2.5 sm:py-3 text-xs sm:text-sm"
              >
                Show {filtered.length} Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

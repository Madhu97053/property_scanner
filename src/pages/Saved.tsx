import { Link } from 'react-router-dom';
import { Heart, GitCompare } from 'lucide-react';
import { properties } from '@/data/properties';
import { useSavedProperties } from '@/hooks/useStorage';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';

export default function Saved() {
  const { savedIds, removeSaved } = useSavedProperties();

  const savedProps = savedIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean) as typeof properties;

  return (
    <div className="pt-16 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-xs">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-navy-600">Saved Properties</h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {savedProps.length === 0
                ? 'No saved properties yet'
                : `${savedProps.length} saved ${savedProps.length === 1 ? 'property' : 'properties'}`}
            </p>
          </div>
        </div>
      </div>

      {savedProps.length === 0 ? (
        <EmptyState
          title="No Saved Properties"
          message="Click the heart icon on any property to save it here for later viewing. Your saved properties persist across sessions."
          actionLabel="Browse Properties"
          actionTo="/search"
        />
      ) : (
        <>
          {/* Bulk actions banner */}
          <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl bg-blue-50 border border-blue-100/60 p-3.5 sm:p-4">
            <div className="flex items-center gap-2.5 flex-1">
              <GitCompare className="h-5 w-5 text-blue-600 shrink-0" />
              <p className="text-xs sm:text-sm text-blue-700">
                Add saved properties to your compare list to see them side by side.
              </p>
            </div>
            <Link
              to="/compare"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              Go to Compare
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {savedProps.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard property={property} />
                <button
                  onClick={() => removeSaved(property.id)}
                  className="absolute -top-1.5 -right-1.5 z-20 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Remove from saved"
                >
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

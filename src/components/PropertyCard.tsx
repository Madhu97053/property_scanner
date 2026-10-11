import { Link } from 'react-router-dom';
import { Heart, GitCompare, Bed, Bath, Maximize, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import type { Property } from '@/types';
import { formatPrice, formatArea, formatPricePerSqft, getListingLabel } from '@/utils/format';
import { useSavedProperties, useCompareProperties } from '@/hooks/useStorage';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export default function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { isSaved, toggleSave } = useSavedProperties();
  const { isInCompare, toggleCompare, compareFull } = useCompareProperties();
  const saved = isSaved(property.id);
  const comparing = isInCompare(property.id);

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${compact ? 'h-40 sm:h-44' : 'h-48 sm:h-56'}`}
            loading="lazy"
          />
        </Link>

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5">
          <span className={`rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold shadow-sm ${
            property.listingType === 'buy' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'
          }`}>
            For {getListingLabel(property.listingType)}
          </span>
          {property.verified && (
            <span className="flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-sm px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-green-700 shadow-sm">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleSave(property.id); }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg shadow-sm transition-all ${
            saved ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
          }`}
          aria-label={saved ? 'Unsave property' : 'Save property'}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 sm:p-3">
          <span className="text-lg sm:text-xl font-bold text-white">
            {formatPrice(property.price)}
            {property.listingType === 'rent' && <span className="text-xs sm:text-sm font-normal text-white/80">/mo</span>}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className="font-display text-sm sm:text-base font-semibold text-navy-600 line-clamp-1 hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </p>

        {/* Specs */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {formatArea(property.area)}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100">
          <span className="text-[11px] sm:text-xs text-gray-400">{formatPricePerSqft(property.price, property.area)}</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={(e) => { e.preventDefault(); toggleCompare(property.id); }}
              disabled={!comparing && compareFull}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                comparing
                  ? 'bg-blue-600 text-white'
                  : compareFull
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <GitCompare className="h-3.5 w-3.5 shrink-0" />
              <span>{comparing ? 'Added' : 'Compare'}</span>
            </button>
            <Link
              to={`/property/${property.id}`}
              className="flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
            >
              View <ExternalLink className="h-3 w-3 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

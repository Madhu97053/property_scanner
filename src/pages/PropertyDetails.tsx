import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Heart, GitCompare, MapPin, Bed, Bath, Maximize,
  CheckCircle2, ChevronLeft, ChevronRight, Home, Car, Sofa,
  Calendar, Building, Zap, Shield, ExternalLink, Share2
} from 'lucide-react';
import { getPropertyById, getRelatedProperties } from '@/data/properties';
import { formatPrice, formatArea, formatPricePerSqft, getListingLabel } from '@/utils/format';
import { useSavedProperties, useCompareProperties } from '@/hooks/useStorage';
import PropertyCard from '@/components/PropertyCard';
import EmptyState from '@/components/EmptyState';

const amenityIcons: Record<string, typeof Home> = {
  'Swimming Pool': Home,
  'Gym': Zap,
  'Clubhouse': Building,
  '24/7 Security': Shield,
  'Power Backup': Zap,
  "Children's Play Area": Home,
  'Covered Parking': Car,
  'Lift': Building,
  'CCTV Surveillance': Shield,
  'Gated Community': Shield,
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = id ? getPropertyById(id) : undefined;
  const { isSaved, toggleSave } = useSavedProperties();
  const { isInCompare, toggleCompare, compareFull } = useCompareProperties();
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) {
    return (
      <div className="pt-16">
        <EmptyState
          title="Property Not Found"
          message="The property you're looking for doesn't exist or may have been removed."
          actionLabel="Browse Properties"
          actionTo="/search"
        />
      </div>
    );
  }

  const saved = isSaved(property.id);
  const comparing = isInCompare(property.id);
  const related = getRelatedProperties(property);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const sortedOffers = [...property.offers].sort((a, b) => a.price - b.price);
  const bestOffer = sortedOffers[0];

  const overviewItems = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'N/A' },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms > 0 ? `${property.bathrooms}` : 'N/A' },
    { icon: Maximize, label: 'Area', value: formatArea(property.area) },
    { icon: Building, label: 'Type', value: property.type },
    { icon: Sofa, label: 'Furnishing', value: property.furnishing },
    { icon: Calendar, label: 'Possession', value: property.possession },
    { icon: Shield, label: 'Age', value: property.age },
    { icon: Car, label: 'Balconies', value: property.balconies > 0 ? `${property.balconies}` : 'None' },
  ];

  return (
    <div className="pt-16">
      {/* Back bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> <span>Back</span>
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => { /* demo share */ }}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-xs"
              aria-label="Share property"
            >
              <Share2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => toggleSave(property.id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                saved ? 'bg-red-500 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={saved ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${saved ? 'fill-current' : ''}`} /> <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => toggleCompare(property.id)}
              disabled={!comparing && compareFull}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                comparing
                  ? 'bg-blue-600 text-white'
                  : compareFull
                    ? 'border border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
            >
              <GitCompare className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> <span className="hidden sm:inline">{comparing ? 'Added' : 'Compare'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Image gallery */}
        <div className="grid lg:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
          {/* Main image */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl group">
            <img
              src={property.images[currentImage]}
              alt={property.title}
              className="w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[460px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Gallery controls - visible on touch/mobile and on desktop hover */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === currentImage ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Top badges */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
              <span className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold shadow-sm ${
                property.listingType === 'buy' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'
              }`}>
                For {getListingLabel(property.listingType)}
              </span>
              {property.verified && (
                <span className="flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
            {property.images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                aria-label={`View thumbnail ${i + 1}`}
                className={`relative overflow-hidden rounded-xl transition-all ${
                  i === currentImage ? 'ring-2 ring-blue-600 shadow' : 'hover:ring-2 hover:ring-gray-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-16 sm:h-20 lg:h-32 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & price */}
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
              <h1 className="font-display text-2xl font-bold text-navy-600">{property.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-gray-500">
                <MapPin className="h-4 w-4" /> {property.locality}, {property.city}
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                  {property.listingType === 'rent' && <span className="text-sm sm:text-base font-normal text-gray-400">/month</span>}
                </span>
                <span className="text-sm text-gray-400">{formatPricePerSqft(property.price, property.area)}</span>
              </div>
            </div>

            {/* Overview */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-base sm:text-lg font-bold text-navy-600 mb-3 sm:mb-4">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {overviewItems.map((item) => (
                  <div key={item.label} className="flex flex-col items-start p-2.5 sm:p-3 rounded-xl bg-gray-50/70 border border-gray-100/60">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-2">
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs text-gray-400">{item.label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-base sm:text-lg font-bold text-navy-600 mb-2 sm:mb-3">Description</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
              <h2 className="font-display text-base sm:text-lg font-bold text-navy-600 mb-3 sm:mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || CheckCircle2;
                  return (
                    <div key={amenity} className="flex items-center gap-2 rounded-xl bg-gray-50 px-2.5 sm:px-3 py-2 sm:py-2.5">
                      <Icon className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-teal-600 shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 truncate">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: provider comparison */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm lg:sticky lg:top-32">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="font-display text-base font-bold text-navy-600">Provider Offers</h2>
              </div>

              <p className="text-xs text-gray-400 mb-3">
                Compare prices from multiple platforms. Best price highlighted.
              </p>

              <div className="space-y-2.5">
                {sortedOffers.map((offer, i) => (
                  <div
                    key={offer.provider}
                    className={`rounded-xl border p-3 transition-all ${
                      i === 0
                        ? 'border-teal-300 bg-teal-50/70'
                        : 'border-gray-100 bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: offer.logoColor }}
                        >
                          {offer.provider.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-gray-700">{offer.provider}</p>
                          <p className="text-[11px] text-gray-400">{offer.delivery}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs sm:text-sm font-bold ${i === 0 ? 'text-teal-700' : 'text-gray-700'}`}>
                          {formatPrice(offer.price)}
                        </p>
                        {i === 0 && (
                          <span className="text-[10px] font-bold text-teal-600 uppercase">Best Price</span>
                        )}
                      </div>
                    </div>
                    <a
                      href={offer.url}
                      className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-xs font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 transition-colors shadow-xs"
                    >
                      Visit Provider <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-blue-50 p-3">
                <p className="text-xs text-blue-700">
                  <span className="font-bold">Save up to {formatPrice(property.offers[0].price - bestOffer.price)}</span> by comparing providers.
                </p>
              </div>

              <button
                onClick={() => toggleCompare(property.id)}
                disabled={!comparing && compareFull}
                className={`mt-4 w-full rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all ${
                  comparing
                    ? 'bg-blue-600 text-white shadow-md'
                    : compareFull
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <GitCompare className="inline h-4 w-4 mr-1.5" />
                {comparing ? 'In Compare List' : compareFull ? 'Compare List Full' : 'Add to Compare'}
              </button>
            </div>
          </div>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <h2 className="font-display text-lg sm:text-xl font-bold text-navy-600 mb-4 sm:mb-5">Similar Properties in {property.city}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

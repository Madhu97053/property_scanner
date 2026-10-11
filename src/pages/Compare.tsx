import { Link } from 'react-router-dom';
import { X, Check, GitCompare, ExternalLink, Bed, Bath, Maximize, MapPin, Building, Sofa, Calendar, Shield, CheckCircle2 } from 'lucide-react';
import { properties } from '@/data/properties';
import { formatPrice, formatArea, formatPricePerSqft, getListingLabel } from '@/utils/format';
import { useCompareProperties } from '@/hooks/useStorage';
import EmptyState from '@/components/EmptyState';

export default function Compare() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareProperties();

  const compareProps = compareIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean) as typeof properties;

  if (compareProps.length === 0) {
    return (
      <div className="pt-16">
        <EmptyState
          title="Nothing to Compare Yet"
          message="Add properties to your compare list by clicking the Compare button on any property card. You can compare up to 5 properties at once."
          actionLabel="Start Searching"
          actionTo="/search"
        />
      </div>
    );
  }

  if (compareProps.length === 1) {
    return (
      <div className="pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <EmptyState
          title="Add More Properties to Compare"
          message="You need at least 2 properties to see a side-by-side comparison. Browse more properties and add them to your compare list."
          actionLabel="Browse Properties"
          actionTo="/search"
        />
        <div className="mt-8 max-w-md mx-auto">
          <CompareRow property={compareProps[0]} onRemove={removeFromCompare} />
        </div>
      </div>
    );
  }

  // Find best (lowest) price
  const lowestPrice = Math.min(...compareProps.map((p) => p.price));
  const largestArea = Math.max(...compareProps.map((p) => p.area));

  const rows: { label: string; key: string; render: (p: typeof properties[0]) => React.ReactNode; icon: typeof Bed }[] = [
    { label: 'Price', key: 'price', icon: Building, render: (p) => (
      <span className={`font-bold ${p.price === lowestPrice ? 'text-teal-600' : 'text-gray-700'}`}>
        {formatPrice(p.price)}
        {p.price === lowestPrice && <span className="block text-[10px] font-bold text-teal-500 uppercase">Lowest</span>}
      </span>
    )},
    { label: 'Price / sqft', key: 'persqft', icon: Building, render: (p) => formatPricePerSqft(p.price, p.area) },
    { label: 'Location', key: 'locality', icon: MapPin, render: (p) => `${p.locality}, ${p.city}` },
    { label: 'Type', key: 'type', icon: Building, render: (p) => p.type },
    { label: 'BHK', key: 'bhk', icon: Bed, render: (p) => p.bhk === 'Plot' ? 'N/A' : `${p.bhk} BHK` },
    { label: 'Bedrooms', key: 'bedrooms', icon: Bed, render: (p) => p.bedrooms > 0 ? `${p.bedrooms}` : 'N/A' },
    { label: 'Bathrooms', key: 'bathrooms', icon: Bath, render: (p) => p.bathrooms > 0 ? `${p.bathrooms}` : 'N/A' },
    { label: 'Area', key: 'area', icon: Maximize, render: (p) => (
      <span className={p.area === largestArea ? 'text-teal-600 font-semibold' : ''}>
        {formatArea(p.area)}
        {p.area === largestArea && <span className="block text-[10px] font-bold text-teal-500 uppercase">Largest</span>}
      </span>
    )},
    { label: 'Furnishing', key: 'furnishing', icon: Sofa, render: (p) => p.furnishing },
    { label: 'Possession', key: 'possession', icon: Calendar, render: (p) => p.possession },
    { label: 'Age', key: 'age', icon: Shield, render: (p) => p.age },
    { label: 'Listing', key: 'listingType', icon: Building, render: (p) => getListingLabel(p.listingType) },
    { label: 'Verified', key: 'verified', icon: CheckCircle2, render: (p) => p.verified ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-gray-300" /> },
  ];

  return (
    <div className="pt-16 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
            <GitCompare className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-navy-600">Compare Properties</h1>
            <p className="text-xs sm:text-sm text-gray-500">Comparing {compareProps.length} of 5 properties</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="rounded-xl border border-gray-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-xs"
            >
              Clear All
            </button>
            <Link
              to="/search"
              className="btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-md"
            >
              Add More
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal scroll hint on smaller screens */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5 px-1 lg:hidden">
        <span className="flex items-center gap-1.5 font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
          Swipe horizontally to compare all details &rarr;
        </span>
        <span className="text-gray-400">{compareProps.length} selected</span>
      </div>

      {/* Comparison table - horizontal scroll on mobile */}
      <div className="overflow-x-auto scrollbar-hide rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-collapse" style={{ minWidth: `${compareProps.length * 170 + 150}px` }}>
          {/* Header row with images */}
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-gray-50 p-3 sm:p-4 text-left align-bottom w-36 sm:w-44 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-gray-200">
                <span className="text-xs sm:text-sm font-bold text-gray-500">Property</span>
              </th>
              {compareProps.map((p) => (
                <th key={p.id} className="p-3 align-top" style={{ minWidth: 160 }}>
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute -top-1 -right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow transition-colors"
                      aria-label="Remove from compare"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <Link to={`/property/${p.id}`}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-20 sm:h-24 rounded-xl object-cover mb-2 shadow-xs"
                        loading="lazy"
                      />
                    </Link>
                    <Link to={`/property/${p.id}`}>
                      <p className="text-xs sm:text-sm font-semibold text-navy-600 line-clamp-2 hover:text-blue-600 transition-colors">
                        {p.title}
                      </p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={row.key} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="sticky left-0 z-20 bg-white p-3 sm:p-4 text-left shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-gray-100">
                  <div className="flex items-center gap-2">
                    <row.icon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">{row.label}</span>
                  </div>
                </td>
                {compareProps.map((p) => (
                  <td key={p.id + row.key} className="p-2.5 sm:p-3 text-center text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center justify-center">
                      {row.render(p)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}

            {/* Amenities row */}
            <tr>
              <td className="sticky left-0 z-20 bg-white p-3 sm:p-4 text-left align-top shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Amenities</span>
                </div>
              </td>
              {compareProps.map((p) => (
                <td key={p.id + 'amenities'} className="p-2.5 sm:p-3 align-top">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {p.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-600">
                        {a}
                      </span>
                    ))}
                    {p.amenities.length > 5 && (
                      <span className="text-[10px] text-gray-400">+{p.amenities.length - 5} more</span>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Best offer row */}
            <tr>
              <td className="sticky left-0 z-20 bg-white p-3 sm:p-4 text-left align-top shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-gray-100">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Best Provider Offer</span>
                </div>
              </td>
              {compareProps.map((p) => {
                const best = [...p.offers].sort((a, b) => a.price - b.price)[0];
                return (
                  <td key={p.id + 'offer'} className="p-2.5 sm:p-3 align-top text-center">
                    <div className="rounded-xl bg-teal-50 border border-teal-200 p-2">
                      <p className="text-[11px] text-gray-500">{best.provider}</p>
                      <p className="text-xs sm:text-sm font-bold text-teal-700">{formatPrice(best.price)}</p>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Action row */}
            <tr>
              <td className="sticky left-0 z-20 bg-white p-3 sm:p-4 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.06)] border-r border-gray-100"></td>
              {compareProps.map((p) => (
                <td key={p.id + 'action'} className="p-2.5 sm:p-3 text-center">
                  <Link
                    to={`/property/${p.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    View Details <ExternalLink className="h-3 w-3" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareRow({ property, onRemove }: { property: typeof properties[0]; onRemove: (id: string) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <img src={property.images[0]} alt={property.title} className="h-16 w-20 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <Link to={`/property/${property.id}`}>
          <p className="font-semibold text-navy-600 hover:text-blue-600 transition-colors line-clamp-1">{property.title}</p>
        </Link>
        <p className="text-sm text-gray-500">{formatPrice(property.price)} · {property.locality}</p>
      </div>
      <button
        onClick={() => onRemove(property.id)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

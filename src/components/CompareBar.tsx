import { useNavigate } from 'react-router-dom';
import { GitCompareArrows, X } from 'lucide-react';
import { useCompareProperties } from '@/hooks/useStorage';
import { properties } from '@/data/properties';
import { formatPrice } from '@/utils/format';

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareProperties();
  const navigate = useNavigate();

  if (compareIds.length === 0) return null;

  const compareProps = compareIds
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean) as typeof properties;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10 animate-fade-in-up pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Label / Counter */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <GitCompareArrows className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              Compare ({compareIds.length}/5)
            </span>
          </div>

          <div className="sm:hidden flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <GitCompareArrows className="h-4 w-4" />
            <span className="sr-only">Compare</span>
          </div>

          {/* Property thumbnails */}
          <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
            {compareProps.map((p) => (
              <div key={p.id} className="relative flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-lg border border-gray-200 bg-gray-50 py-1 pl-1 pr-6 sm:py-1.5 sm:pl-1.5 sm:pr-7">
                <img src={p.images[0]} alt={p.title} className="h-7 w-8 sm:h-8 sm:w-10 rounded object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-[11px] sm:text-xs font-semibold text-gray-700 max-w-[70px] sm:max-w-[100px]">{p.locality}</p>
                  <p className="text-[11px] sm:text-xs font-bold text-blue-600">{formatPrice(p.price)}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                  aria-label={`Remove ${p.title} from compare`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="hidden md:block text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => navigate('/compare')}
              disabled={compareIds.length < 2}
              className="btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden xs:inline">Compare</span> Now ({compareIds.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

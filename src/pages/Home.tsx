import { Link } from 'react-router-dom';
import {
  Search, GitCompare, ExternalLink, Building2, Home as HomeIcon,
  MapPin, TreePalm, Store, TrendingUp, ArrowRight, Sparkles,
  ShieldCheck, Clock, BadgeCheck, IndianRupee
} from 'lucide-react';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import DemoBadge from '@/components/DemoBadge';
import { getFeaturedProperties } from '@/data/properties';
import { CITIES, PROPERTY_TYPES } from '@/types';

const heroImage = 'https://images.pexels.com/photos/24805054/pexels-photo-24805054.jpeg?auto=compress&cs=tinysrgb&w=1920';

const propertyTypeIcons: Record<string, typeof Building2> = {
  Apartment: Building2,
  Villa: TreePalm,
  'Independent House': HomeIcon,
  Plot: MapPin,
  Commercial: Store,
};

const cityImages: Record<string, string> = {
  Hyderabad: 'https://images.pexels.com/photos/7672061/pexels-photo-7672061.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Bengaluru: 'https://images.pexels.com/photos/28304971/pexels-photo-28304971.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Mumbai: 'https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Chennai: 'https://images.pexels.com/photos/1099065/pexels-photo-1099065.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
  Pune: 'https://images.pexels.com/photos/36342575/pexels-photo-36342575.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
};

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Enter your preferences — city, budget, BHK, and property type — to find matching listings.',
  },
  {
    icon: GitCompare,
    title: 'Compare',
    description: 'See offers from multiple property platforms side by side, so you never miss a better deal.',
  },
  {
    icon: ExternalLink,
    title: 'Visit Original Provider',
    description: 'When you find the right property, we redirect you to the original listing to proceed further.',
  },
];

const stats = [
  { icon: Building2, label: 'Properties Listed', value: '30+' },
  { icon: MapPin, label: 'Cities Covered', value: '5' },
  { icon: Store, label: 'Platforms Compared', value: '4' },
  { icon: BadgeCheck, label: 'Verified Listings', value: '100%' },
];

export default function Home() {
  const featured = getFeaturedProperties();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury villa" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-700/95 via-navy-600/80 to-navy-600/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-700/90 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Headline */}
            <div className="text-white animate-fade-in-up">
              <div className="mb-3 sm:mb-4">
                <DemoBadge className="bg-white/15 text-white/90 border-white/20" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-balance">
                Discover Your Perfect
                <span className="block text-teal-300">Property, Confidently.</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-md leading-relaxed">
                Search and compare properties across multiple platforms, all in one place.
              </p>

              {/* Stats */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-lg">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-light rounded-xl p-2.5 sm:p-3">
                    <stat.icon className="h-4 sm:h-5 w-4 sm:w-5 text-teal-300 mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] sm:text-xs text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Search Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <SearchForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Property Type */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-600">Explore by Property Type</h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {PROPERTY_TYPES.map((type) => {
              const Icon = propertyTypeIcons[type];
              return (
                <Link
                  key={type}
                  to={`/search?type=${encodeURIComponent(type)}`}
                  className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-display text-xs sm:text-sm font-semibold text-gray-800">{type}</h3>
                  <p className="mt-1 text-xs text-gray-400 flex items-center gap-1 group-hover:text-blue-600">
                    Browse <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore by City */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-600">Explore by City</h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">Discover properties in India's top real estate markets</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CITIES.map((city) => (
              <Link
                key={city}
                to={`/search?city=${city}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 last:col-span-2 sm:last:col-span-1"
              >
                <img
                  src={cityImages[city]}
                  alt={city}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-700/90 via-navy-600/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{city}</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> View properties
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-teal-600" />
                <span className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-wide">Featured</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-600">Handpicked Properties</h2>
            </div>
            <Link
              to="/search"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all w-full sm:w-auto"
            >
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-navy-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-teal-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">How Property Scanner Works</h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-white/60">Three simple steps to find your dream property</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="glass-light rounded-2xl p-6 sm:p-8 text-center h-full flex flex-col items-center">
                  <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-4 sm:mb-5">
                    <step.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-teal-300 mb-1.5 sm:mb-2">STEP {i + 1}</div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector arrow - only show on large screens where cards have room */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-teal-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-2 mb-3 sm:mb-4">
            <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            <IndianRupee className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Smarter Property Search Starts Here
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
            Stop browsing multiple websites. Search once, compare everywhere, and find the best deal — all on Property Scanner.
          </p>
          <Link
            to="/search"
            className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-blue-600 hover:bg-blue-50 transition-all shadow-lg active:scale-[0.98] w-full sm:w-auto"
          >
            <TrendingUp className="h-5 w-5" />
            Start Searching Now
          </Link>
        </div>
      </section>
    </div>
  );
}

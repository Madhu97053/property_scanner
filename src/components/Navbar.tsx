import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Heart, GitCompare, ScanLine, LogIn, Home, Search as SearchIcon } from 'lucide-react';
import { useSavedProperties, useCompareProperties } from '@/hooks/useStorage';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { savedIds } = useSavedProperties();
  const { compareIds } = useCompareProperties();

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;
  const isTransparent = transparent && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/search', icon: SearchIcon },
    { label: 'Compare', path: '/compare', icon: GitCompare },
    { label: 'Saved', path: '/saved', icon: Heart },
  ];

  const linkClass = (path: string) => {
    const active = location.pathname === path;
    if (isTransparent) {
      return `text-sm font-medium transition-colors ${active ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`;
    }
    return `text-sm font-medium transition-colors ${active ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'glass-nav' : 'bg-white shadow-sm'}`}>
        <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isTransparent ? 'bg-white/20' : 'bg-blue-600'}`}>
                <ScanLine className="h-5 w-5 text-white" />
              </div>
              <span className={`font-display text-base sm:text-lg font-bold tracking-tight ${isTransparent ? 'text-white' : 'text-navy-600'}`}>
                Property<span className={isTransparent ? 'text-teal-300' : 'text-teal-600'}>Scanner</span>
              </span>
            </Link>

            {/* Desktop nav (Tablet & Laptop & Desktop) */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions (Desktop/Tablet) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                to="/saved"
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                aria-label="Saved properties"
              >
                <Heart className="h-5 w-5" />
                {savedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {savedIds.length}
                  </span>
                )}
              </Link>
              <Link
                to="/compare"
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                aria-label="Compare properties"
              >
                <GitCompare className="h-5 w-5" />
                {compareIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                    {compareIds.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => navigate('/search')}
                className={`flex items-center gap-1.5 lg:gap-2 rounded-xl px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition-all ${
                  isTransparent
                    ? 'bg-white text-navy-600 hover:bg-white/90 shadow'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </div>

            {/* Mobile quick actions & hamburger */}
            <div className="flex md:hidden items-center gap-1">
              <Link
                to="/saved"
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/15' : 'text-gray-700 hover:bg-gray-100'}`}
                aria-label="Saved properties"
              >
                <Heart className="h-5 w-5" />
                {savedIds.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {savedIds.length}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/15' : 'text-gray-800 hover:bg-gray-100'}`}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile navigation menu - rendered outside <header> to avoid backdrop-filter stacking trap */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content attached directly below 64px header */}
          <div className="fixed top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl z-50 animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-5 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.path === '/saved' && savedIds.length > 0 && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                        {savedIds.length}
                      </span>
                    )}
                    {link.path === '/compare' && compareIds.length > 0 && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                        {compareIds.length}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { navigate('/search'); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-600/30 active:scale-[0.98]"
                >
                  <LogIn className="h-5 w-5" />
                  Login to Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

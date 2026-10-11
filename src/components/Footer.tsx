import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import ScannerLogo from '@/components/ScannerLogo';

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const sections = [
    {
      title: 'Explore',
      links: [
        { label: 'Search Properties', path: '/search' },
        { label: 'Compare', path: '/compare' },
        { label: 'Saved Properties', path: '/saved' },
        { label: 'Sign In / Account', path: '/login' },
      ],
    },
    {
      title: 'Cities',
      links: [
        { label: 'Hyderabad', path: '/search?city=Hyderabad' },
        { label: 'Bengaluru', path: '/search?city=Bengaluru' },
        { label: 'Mumbai', path: '/search?city=Mumbai' },
        { label: 'Chennai', path: '/search?city=Chennai' },
        { label: 'Pune', path: '/search?city=Pune' },
      ],
    },
    {
      title: 'Property Types',
      links: [
        { label: 'Apartments', path: '/search?type=Apartment' },
        { label: 'Villas', path: '/search?type=Villa' },
        { label: 'Independent Houses', path: '/search?type=Independent+House' },
        { label: 'Plots', path: '/search?type=Plot' },
        { label: 'Commercial', path: '/search?type=Commercial' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 sm:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <ScannerLogo isTransparent={true} size="md" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold leading-tight">
                  Property<span className="text-teal-400">Scanner</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-white/50">
                  Live Property Radar
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-4">
              Search and compare properties across multiple platforms, all in one place. Making property search smarter, not harder.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections - Collapsible accordion on mobile, always visible in desktop */}
          {sections.map((section) => {
            const isOpen = !!openSections[section.title];
            return (
              <div
                key={section.title}
                className="border-b border-white/10 last:border-b-0 sm:border-none pb-3 sm:pb-0"
              >
                {/* Header: Clickable button with down chevron on mobile, static title on desktop */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between py-1 text-left sm:py-0 sm:cursor-default sm:pointer-events-none group"
                  aria-expanded={isOpen}
                >
                  <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 sm:group-hover:text-white transition-colors">
                    {section.title}
                  </h4>
                  <ChevronDown
                    className={`h-4 w-4 text-white/70 transition-transform duration-200 sm:hidden ${
                      isOpen ? 'rotate-180 text-teal-400' : ''
                    }`}
                  />
                </button>

                {/* Options list: Collapsed/expanded on mobile, always open on desktop */}
                <ul
                  className={`space-y-2 sm:space-y-2.5 pt-2 sm:pt-0 sm:mt-3 ${
                    isOpen ? 'block animate-fade-in' : 'hidden sm:block'
                  }`}
                >
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-xs sm:text-sm text-white/60 hover:text-teal-400 transition-colors block py-0.5 sm:py-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-white/60">
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> hello@propertyscanner.in</span>
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> +91 80 4567 8900</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Hyderabad, India</span>
            </div>
            <p className="text-xs text-white/40">
              © 2026 Property Scanner. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

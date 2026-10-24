'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Phone,
} from 'lucide-react'
import { SiteLogo } from './site-logo'
import { company, products } from '@/data/products'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setProductsDropdownOpen(false)
    setMobileMenuOpen(false)
    setSearchFocused(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setProductsDropdownOpen(false)
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchFocused(false)
    }
  }

  const searchSuggestions = products
    .filter((p) => {
      if (!searchQuery.trim()) return false
      const q = searchQuery.toLowerCase().trim()
      return (
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.therapeuticArea.toLowerCase().includes(q)
      )
    })
    .slice(0, 5)

  const isProductsActive = pathname.startsWith('/products') || pathname.startsWith('/therapeutic-areas')

  return (
    <header className="sticky top-0 z-50 w-full shadow-md font-sans">
      {/* 1. TOP UTILITY STRIP - EXACT APPROVED COLOR (IMAGE 1) */}
      <div className="w-full bg-[#000066] border-b border-white/10 text-white/90 py-1.5 px-4 sm:px-10 lg:px-12 xl:px-16 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
        <div className="mx-auto flex w-full max-w-[1560px] items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-[#159A9C]" />
              WHO-cGMP &amp; SCHEDULE M COMPLIANT
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/70">
              HYDERABAD, TELANGANA, INDIA
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 ml-auto text-[10px] sm:text-xs tracking-wider">
            <Link
              href="/contact"
              className="text-white/85 hover:text-white transition-colors font-medium"
            >
              INSTITUTIONAL ENQUIRIES
            </Link>
            <span className="text-white/30">|</span>
            <a
              href={`tel:+91${company.phone}`}
              className="text-white hover:text-[#DDE2FF] transition-colors font-bold inline-flex items-center gap-1 shrink-0"
            >
              <Phone className="size-3 text-[#159A9C]" />
              <span>{company.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN CORPORATE NAVIGATION BAR - EXACT APPROVED NAVY BLUE (IMAGE 1) */}
      <div className="relative bg-[#080878] text-white border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1560px] items-stretch justify-between px-4 sm:px-10 lg:px-12 xl:px-16 min-h-[58px] sm:min-h-[64px]">
          
          {/* RexCure Brand Logo (weight 700) */}
          <div className="shrink-0 flex items-center py-2.5">
            <SiteLogo variant="dark" />
          </div>

          {/* Desktop Horizontal Navigation (15-16px, weight 500-600) */}
          <nav
            className="hidden lg:flex items-stretch text-[15px] font-medium tracking-normal"
            aria-label="Main corporate navigation"
          >
            {/* Products Tab with Dropdown */}
            <div
              className="relative flex items-stretch"
              ref={dropdownRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                href="/products"
                onClick={() => setProductsDropdownOpen(false)}
                className={`inline-flex items-center gap-1 px-4 xl:px-5 transition-colors cursor-pointer select-none font-medium ${
                  isProductsActive || productsDropdownOpen
                    ? 'bg-[#2A4BF2] text-white font-semibold'
                    : 'text-white/95 hover:bg-[#2A4BF2]'
                }`}
                aria-expanded={productsDropdownOpen}
              >
                <span>Products</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    productsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              {/* PRODUCTS DROPDOWN MENU */}
              {productsDropdownOpen && (
                <div
                  className="absolute left-0 top-full z-50 min-w-[240px] animate-in fade-in duration-100"
                >
                  <div className="bg-[#080878] border border-white/20 shadow-2xl text-white py-2 rounded-b-md">
                    <Link
                      href="/products"
                      className="block px-5 py-2.5 text-[13.5px] font-medium tracking-normal hover:bg-[#2A4BF2] transition-colors"
                    >
                      All Formulations
                    </Link>
                    <Link
                      href="/therapeutic-areas"
                      className="block px-5 py-2.5 text-[13.5px] font-medium tracking-normal hover:bg-[#2A4BF2] transition-colors"
                    >
                      Therapeutic Areas
                    </Link>
                    <Link
                      href="/products?form=Tablets"
                      className="block px-5 py-2.5 text-[13.5px] font-medium tracking-normal hover:bg-[#2A4BF2] transition-colors"
                    >
                      Oral Solid Dosages
                    </Link>
                    <Link
                      href="/products?form=Syrups"
                      className="block px-5 py-2.5 text-[13.5px] font-medium tracking-normal hover:bg-[#2A4BF2] transition-colors"
                    >
                      Dry Suspensions &amp; Syrups
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-5 py-2.5 text-[13.5px] font-medium tracking-normal hover:bg-[#2A4BF2] transition-colors"
                    >
                      For Medical Professionals
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`inline-flex items-center px-4 xl:px-5 transition-colors font-medium ${
                pathname === '/about'
                  ? 'bg-[#2A4BF2] text-white font-semibold'
                  : 'text-white/95 hover:bg-[#2A4BF2]'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/quality"
              className={`inline-flex items-center px-4 xl:px-5 transition-colors font-medium ${
                pathname === '/quality'
                  ? 'bg-[#2A4BF2] text-white font-semibold'
                  : 'text-white/95 hover:bg-[#2A4BF2]'
              }`}
            >
              Quality &amp; QA
            </Link>

            <Link
              href="/contact"
              className={`inline-flex items-center px-4 xl:px-5 transition-colors font-medium ${
                pathname === '/contact'
                  ? 'bg-[#2A4BF2] text-white font-semibold'
                  : 'text-white/95 hover:bg-[#2A4BF2]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header: Integrated Search Bar (Image 1 style) */}
          <div ref={searchContainerRef} className="relative hidden md:flex items-center py-2.5">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchFocused(false)
                }}
                placeholder="SEARCH..."
                className="w-44 xl:w-56 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 pr-8 text-xs font-semibold text-white placeholder:text-white/60 focus:w-60 xl:focus:w-64 focus:bg-white focus:text-[#080878] focus:placeholder:text-[#555B66] focus:outline-none transition-all duration-200"
                aria-label="Search pharmaceutical products"
              />
              <button
                type="submit"
                aria-label="Submit Search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                <Search className="size-3.5" />
              </button>
            </form>

            {/* Live Autocomplete Results */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-0 top-full mt-2 w-80 rounded-md border border-[#D9DDE7] bg-white p-2 shadow-2xl z-50 text-[#202124]"
              >
                <span className="block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#555B66] border-b border-[#D9DDE7]">
                  Matching Formulations
                </span>
                <ul className="mt-1 space-y-1">
                  {searchSuggestions.map((prod) => (
                    <li key={prod.slug}>
                      <Link
                        href={`/products/${prod.slug}`}
                        onClick={() => {
                          setSearchFocused(false)
                          setSearchQuery('')
                        }}
                        className="flex flex-col px-3 py-1.5 rounded hover:bg-[#F5F6FA] transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold text-[#080878]">{prod.name}</span>
                        <span className="text-[11px] text-[#555B66] truncate">{prod.genericName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden py-2.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-9 items-center justify-center rounded border border-white/20 text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[96px] bg-black/50 z-40 lg:hidden backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 border-b border-white/15 bg-[#080878] px-5 py-5 sm:px-8 sm:py-6 lg:hidden animate-in slide-in-from-top duration-200 text-white shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH FORMULATIONS..."
                className="w-full rounded-full border border-white/25 bg-white/10 px-4 py-2.5 pr-10 text-xs sm:text-sm text-white placeholder:text-white/60 focus:bg-white focus:text-[#080878] focus:outline-none font-medium"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                <Search className="size-4" />
              </button>
            </form>

            {/* Mobile Autocomplete Results */}
            {searchQuery.trim() && searchSuggestions.length > 0 && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                className="mb-4 rounded-md border border-[#D9DDE7] bg-white p-2 text-[#202124] shadow-lg"
              >
                <span className="block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#555B66] border-b border-[#D9DDE7]">
                  Matching Formulations
                </span>
                <ul className="mt-1 space-y-1">
                  {searchSuggestions.map((prod) => (
                    <li key={prod.slug}>
                      <Link
                        href={`/products/${prod.slug}`}
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setSearchQuery('')
                        }}
                        className="flex flex-col px-3 py-1.5 rounded hover:bg-[#F5F6FA] transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold text-[#080878]">{prod.name}</span>
                        <span className="text-[11px] text-[#555B66] truncate">{prod.genericName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <nav className="flex flex-col space-y-1 text-xs sm:text-[14px] font-medium tracking-wide">
              <Link
                href="/"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  if (pathname === '/') {
                    e.preventDefault()
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  }
                }}
                className={`py-2.5 px-3 rounded transition-colors ${pathname === '/' ? 'bg-[#2A4BF2] text-white font-semibold' : 'hover:bg-[#2A4BF2]'}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded transition-colors flex items-center justify-between ${pathname.startsWith('/products') ? 'bg-[#2A4BF2] text-white font-semibold' : 'hover:bg-[#2A4BF2]'}`}
              >
                <span>Products</span>
                <span className="bg-white/15 px-2 py-0.5 rounded text-[10px] font-semibold">
                  {products.length} Formulations
                </span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded transition-colors ${pathname === '/about' ? 'bg-[#2A4BF2] text-white font-semibold' : 'hover:bg-[#2A4BF2]'}`}
              >
                About Us
              </Link>
              <Link
                href="/quality"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded transition-colors ${pathname === '/quality' ? 'bg-[#2A4BF2] text-white font-semibold' : 'hover:bg-[#2A4BF2]'}`}
              >
                Quality &amp; QA
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded transition-colors ${pathname === '/contact' ? 'bg-[#2A4BF2] text-white font-semibold' : 'hover:bg-[#2A4BF2]'}`}
              >
                Contact
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
              <span>Hyderabad Facility</span>
              <a href={`tel:+91${company.phone}`} className="text-white font-bold hover:underline">
                {company.phoneDisplay}
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

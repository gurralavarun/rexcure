'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, ShieldCheck, Pill } from 'lucide-react'
import { products, type Product } from '@/data/products'

export function HomepageProductGallery() {
  const [selectedTherapy, setSelectedTherapy] = useState<string>('all')
  const [hoveredImage, setHoveredImage] = useState<Record<string, number>>({})

  // Category filters derived from actual products
  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All Products', count: products.length },
      {
        id: 'anti-diabetic',
        label: 'Diabetology',
        count: products.filter((p) => p.therapeuticSlug === 'anti-diabetic').length,
      },
      {
        id: 'gastro-care',
        label: 'Gastro Care',
        count: products.filter((p) => p.therapeuticSlug === 'gastro-care').length,
      },
      {
        id: 'anti-infective',
        label: 'Anti-Infectives',
        count: products.filter((p) => p.therapeuticSlug === 'anti-infective').length,
      },
      {
        id: 'allergy-care',
        label: 'Allergy & Pediatric',
        count: products.filter((p) => p.therapeuticSlug === 'allergy-care').length,
      },
      {
        id: 'pain-management',
        label: 'Pain Management',
        count: products.filter((p) => p.therapeuticSlug === 'pain-management').length,
      },
      {
        id: 'nutraceutical',
        label: 'Nutraceuticals',
        count: products.filter((p) => p.therapeuticSlug === 'nutraceutical').length,
      },
    ]
  }, [])

  const filteredProducts = useMemo(() => {
    if (selectedTherapy === 'all') return products
    return products.filter((p) => p.therapeuticSlug === selectedTherapy)
  }, [selectedTherapy])

  return (
    <section
      id="product-gallery"
      className="bg-white py-16 lg:py-24 border-b border-[#D9DDE7] font-sans scroll-mt-20"
      aria-labelledby="our-products-heading"
    >
      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* ============================================================
            SECTION HEADER (Abbott & Dr. Reddy's Inspired Corporate Styling)
           ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
          <div className="max-w-3xl">
            {/* Corporate Category Eyebrow with Blue Accent Line */}
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-3">
              <span className="h-0.5 w-7 bg-[#080878] rounded-full" />
              <span>Pharmaceutical Formulations</span>
            </div>

            {/* Main Section Heading */}
            <h2
              id="our-products-heading"
              className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#080878] leading-tight"
            >
              Our Products
            </h2>

            {/* Standard Supporting Text */}
            <p className="mt-3 text-base sm:text-[17px] text-[#555B66] leading-relaxed max-w-2xl">
              Explore RexCure’s pharmaceutical and healthcare product portfolio, developed with a commitment to quality and patient well-being.
            </p>
          </div>

          {/* View All Products Action Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 text-sm font-semibold text-[#080878] border border-[#080878] rounded-md hover:bg-[#080878] hover:text-white transition-colors duration-150 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#080878]"
          >
            <span>View All Products</span>
            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ============================================================
            THERAPEUTIC AREA FILTER TABS
           ============================================================ */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filter products by therapeutic area">
          {categories.map((cat) => {
            const isActive = selectedTherapy === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedTherapy(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#080878] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#555B66] hover:bg-[#EEF2F6] hover:text-[#080878] border border-[#E2E8F0]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ============================================================
            PREMIUM 3-COLUMN PRODUCT GRID (Larger Packaging Display)
           ============================================================ */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 xl:gap-9 items-stretch">
          {filteredProducts.map((product) => {
            const activeIdx = hoveredImage[product.slug] ?? 0
            const displayImage = product.images[activeIdx] || product.primaryImage
            const hasMultipleImages = product.images.length > 1

            return (
              <div
                key={product.slug}
                className="group relative flex flex-col justify-between bg-white rounded-lg border border-[#D9DDE7] hover:border-[#CCD5FF] shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#080878]"
              >
                {/* 1. DEDICATED PROMINENT PRODUCT IMAGE AREA (310px-330px Container Height) */}
                <div className="relative w-full h-[290px] sm:h-[310px] lg:h-[330px] bg-gradient-to-b from-[#F9FBFE] to-[#F1F5FA]/80 flex items-center justify-center p-6 border-b border-[#E2E8F0] overflow-hidden select-none">
                  
                  {/* Subtle Corporate Blue Category Pill Badge (Top Left) */}
                  <span className="absolute top-3.5 left-3.5 z-10 rounded-md border border-[#CCD5FF] bg-[#DDE2FF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#080878] shadow-2xs">
                    {product.category}
                  </span>

                  {/* Prescription / Schedule Badge (Top Right) */}
                  <span className="absolute top-3.5 right-3.5 z-10 rounded-md border border-[#D9DDE7] bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-[#555B66]">
                    {product.prescription === 'Physician guided' ? 'Rx' : 'OTC'}
                  </span>

                  {/* Packaging Image (Preserving exact aspect ratio with object-contain, large and prominent) */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={displayImage}
                      alt={`${product.name} packaging`}
                      width={640}
                      height={480}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Alternate Packaging Angle Switcher (When multiple shots exist in public/mainproducts/) */}
                  {hasMultipleImages && (
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-[#D9DDE7] px-2.5 py-0.5 rounded-full shadow-2xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[10px] font-medium text-[#555B66] mr-0.5">
                        {product.images.length} Views:
                      </span>
                      {product.images.map((img, idx) => (
                        <button
                          key={img}
                          type="button"
                          aria-label={`View ${product.name} packaging angle ${idx + 1}`}
                          onClick={() =>
                            setHoveredImage((prev) => ({ ...prev, [product.slug]: idx }))
                          }
                          onMouseEnter={() =>
                            setHoveredImage((prev) => ({ ...prev, [product.slug]: idx }))
                          }
                          className="p-1.5 flex items-center justify-center cursor-pointer focus:outline-none"
                        >
                          <span
                            className={`size-2.5 rounded-full transition-all block ${
                              activeIdx === idx
                                ? 'bg-[#080878] scale-125'
                                : 'bg-[#94A3B8] hover:bg-[#64748B]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. PRODUCT INFORMATION AREA (Clean, Bold, Well-Spaced) */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  {/* Commercial Product Name */}
                  <h3 className="text-xl sm:text-[21px] font-bold text-[#080878] group-hover:text-[#2A4BF2] transition-colors leading-tight">
                    <Link href={`/products/${product.slug}`} className="focus:outline-none">
                      {product.name}
                    </Link>
                  </h3>

                  {/* Generic Composition Text (Smaller & Neatly Aligned) */}
                  <p className="mt-1.5 text-xs sm:text-[13px] text-[#555B66] font-normal leading-relaxed line-clamp-2 min-h-[36px]">
                    {product.genericName}
                  </p>

                  {/* Simplified Clean Specification Strip */}
                  <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#555B66]">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#080878]">
                      <Pill className="size-3.5 text-[#080878]" />
                      <span>{product.form}</span>
                    </span>
                    <span className="text-[11.5px] text-[#64748B] truncate max-w-[180px] font-mono">
                      {product.pack}
                    </span>
                  </div>
                </div>

                {/* 3. CARD ACTION LINK (View Product Details) */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs sm:text-[13px] font-semibold text-[#080878] bg-[#F8FAFC] hover:bg-[#080878] hover:text-white border border-[#D9DDE7] hover:border-[#080878] transition-all duration-150 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#080878]"
                  >
                    <span>View Product Details</span>
                    <ChevronRight className="size-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* ============================================================
            SECTION FOOTER / CORPORATE COMPLIANCE CALLOUT
           ============================================================ */}
        <div className="mt-14 p-5 sm:p-6 rounded-lg bg-[#F8F9FC] border border-[#D9DDE7] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-[#DDE2FF] flex items-center justify-center text-[#080878] shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-semibold text-[#080878]">
                WHO-cGMP &amp; Schedule M Analytical Verification
              </p>
              <p className="text-[11px] sm:text-xs text-[#555B66]">
                All 13 commercial formulations are manufactured under strict stability testing and Pharmacopoeial compliance.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#080878] hover:text-[#2A4BF2] hover:underline shrink-0"
          >
            <span>Explore Full Formulations Directory</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

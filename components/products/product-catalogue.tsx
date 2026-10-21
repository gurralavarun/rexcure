'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, X, Filter, ArrowRight } from 'lucide-react'
import { products, therapeuticAreas, type Product } from '@/data/products'

export function ProductCatalogue({ id = 'catalogue' }: { id?: string }) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-[#555B66] font-medium">
          Loading pharmaceutical directory...
        </div>
      }
    >
      <ProductCatalogueContent id={id} />
    </Suspense>
  )
}

function ProductCatalogueContent({ id = 'catalogue' }: { id?: string }) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialTherapy = searchParams.get('therapy') || 'all'
  const initialForm = searchParams.get('form') || 'all'

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedTherapy, setSelectedTherapy] = useState<string>(initialTherapy)
  const [selectedForm, setSelectedForm] = useState<string>(initialForm)
  const [activeTab, setActiveTab] = useState<'all' | 'therapies' | 'dosage'>('all')

  useEffect(() => {
    if (initialQuery) setSearchQuery(initialQuery)
    if (initialTherapy !== 'all') setSelectedTherapy(initialTherapy)
    if (initialForm !== 'all') setSelectedForm(initialForm)
  }, [initialQuery, initialTherapy, initialForm])

  const dosageForms = useMemo(() => {
    const forms = new Set<string>()
    products.forEach((p) => {
      if (p.form.toLowerCase().includes('tablet')) forms.add('Tablets')
      else if (p.form.toLowerCase().includes('capsule')) forms.add('Capsules')
      else if (p.form.toLowerCase().includes('syrup') || p.form.toLowerCase().includes('suspension'))
        forms.add('Syrups & Suspensions')
      else if (p.form.toLowerCase().includes('softgel')) forms.add('Softgels')
      else forms.add(p.form)
    })
    return Array.from(forms)
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.genericName.toLowerCase().includes(q) ||
        product.therapeuticArea.toLowerCase().includes(q) ||
        product.form.toLowerCase().includes(q) ||
        product.strength.toLowerCase().includes(q) ||
        product.composition.some((c) => c.toLowerCase().includes(q))

      const matchesTherapy =
        selectedTherapy === 'all' || product.therapeuticSlug === selectedTherapy

      const matchesForm =
        selectedForm === 'all' ||
        (selectedForm === 'Tablets' && product.form.toLowerCase().includes('tablet')) ||
        (selectedForm === 'Capsules' && product.form.toLowerCase().includes('capsule')) ||
        (selectedForm === 'Syrups & Suspensions' &&
          (product.form.toLowerCase().includes('syrup') ||
            product.form.toLowerCase().includes('suspension'))) ||
        (selectedForm === 'Softgels' && product.form.toLowerCase().includes('softgel')) ||
        (selectedForm === 'Syrups' &&
          (product.form.toLowerCase().includes('syrup') ||
            product.form.toLowerCase().includes('suspension')))

      return matchesQuery && matchesTherapy && matchesForm
    })
  }, [searchQuery, selectedTherapy, selectedForm])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTherapy('all')
    setSelectedForm('all')
    setActiveTab('all')
  }

  return (
    <section id={id} className="scroll-mt-24 bg-[#F5F6FA] py-14 lg:py-20 border-b border-[#D9DDE7] font-sans">
      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Abbott Reference Screenshot 4: Segmented Tab Bar */}
        <div className="mb-6 flex overflow-x-auto flex-nowrap sm:flex-wrap items-center border-b border-[#D9DDE7] scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setActiveTab('all')
              setSelectedTherapy('all')
              setSelectedForm('all')
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-[2px] whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'border-[#080878] bg-[#080878] text-white'
                : 'border-transparent text-[#555B66] hover:text-[#080878] hover:bg-white'
            }`}
          >
            All Formulations ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('therapies')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-[2px] whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'therapies'
                ? 'border-[#080878] bg-[#080878] text-white'
                : 'border-transparent text-[#555B66] hover:text-[#080878] hover:bg-white'
            }`}
          >
            Therapeutic Specialties ({therapeuticAreas.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dosage')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-[2px] whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'dosage'
                ? 'border-[#080878] bg-[#080878] text-white'
                : 'border-transparent text-[#555B66] hover:text-[#080878] hover:bg-white'
            }`}
          >
            Dosage Forms ({dosageForms.length})
          </button>
        </div>

        {/* Dynamic Secondary Specialty Bar */}
        {activeTab === 'therapies' && (
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedTherapy('all')}
              className={`shrink-0 rounded px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedTherapy === 'all'
                  ? 'bg-[#080878] text-white'
                  : 'bg-white border border-[#D9DDE7] text-[#202124] hover:border-[#080878]'
              }`}
            >
              All Therapies
            </button>
            {therapeuticAreas.map((area) => (
              <button
                key={area.slug}
                type="button"
                onClick={() => setSelectedTherapy(area.slug)}
                className={`shrink-0 rounded px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedTherapy === area.slug
                    ? 'bg-[#080878] text-white'
                    : 'bg-white border border-[#D9DDE7] text-[#202124] hover:border-[#080878]'
                }`}
              >
                {area.shortTitle} ({products.filter((p) => p.therapeuticSlug === area.slug).length})
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Dosage Forms Bar */}
        {activeTab === 'dosage' && (
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedForm('all')}
              className={`shrink-0 rounded px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedForm === 'all'
                  ? 'bg-[#080878] text-white'
                  : 'bg-white border border-[#D9DDE7] text-[#202124] hover:border-[#080878]'
              }`}
            >
              All Forms
            </button>
            {dosageForms.map((form) => (
              <button
                key={form}
                type="button"
                onClick={() => setSelectedForm(form)}
                className={`shrink-0 rounded px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedForm === form
                    ? 'bg-[#080878] text-white'
                    : 'bg-white border border-[#D9DDE7] text-[#202124] hover:border-[#080878]'
                }`}
              >
                {form}
              </button>
            ))}
          </div>
        )}

        {/* Corporate Search & Filter Bar */}
        <div className="mb-8 rounded border border-[#D9DDE7] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#555B66]">
                <Search className="size-4 text-[#080878]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, active molecule (e.g. Glimepiride, Rabeprazole, Amoxicillin)..."
                className="w-full rounded border border-[#D9DDE7] bg-[#F5F6FA] py-2 pl-10 pr-9 text-xs sm:text-sm text-[#202124] placeholder:text-[#555B66] focus:border-[#080878] focus:bg-white focus:outline-none"
                aria-label="Search pharmaceutical formulations"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#555B66] hover:text-[#202124]"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters & Counter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#555B66]">
                <Filter className="size-3.5 text-[#080878]" />
                <span className="font-semibold text-[#202124] hidden sm:inline">Therapy:</span>
                <select
                  value={selectedTherapy}
                  onChange={(e) => setSelectedTherapy(e.target.value)}
                  className="rounded border border-[#D9DDE7] bg-white px-3 py-1.5 text-xs font-medium text-[#202124] focus:border-[#080878] focus:outline-none"
                  aria-label="Filter by therapeutic area"
                >
                  <option value="all">All Specialties ({products.length})</option>
                  {therapeuticAreas.map((area) => (
                    <option key={area.slug} value={area.slug}>
                      {area.shortTitle} ({products.filter((p) => p.therapeuticSlug === area.slug).length})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#555B66]">
                <span className="font-semibold text-[#202124] hidden sm:inline">Form:</span>
                <select
                  value={selectedForm}
                  onChange={(e) => setSelectedForm(e.target.value)}
                  className="rounded border border-[#D9DDE7] bg-white px-3 py-1.5 text-xs font-medium text-[#202124] focus:border-[#080878] focus:outline-none"
                  aria-label="Filter by dosage form"
                >
                  <option value="all">All Forms</option>
                  {dosageForms.map((form) => (
                    <option key={form} value={form}>
                      {form}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedTherapy !== 'all' || selectedForm !== 'all') && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded bg-[#DDE2FF] px-3 py-1.5 text-xs font-bold text-[#080878] hover:bg-[#CCD5FF] transition-colors"
                >
                  Reset Filters
                </button>
              )}

              <div className="text-xs font-bold text-[#555B66] pl-2 border-l border-[#D9DDE7]">
                <span className="text-[#080878]">{filteredProducts.length}</span> of {products.length} Formulations
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Professional Pharmaceutical Directory Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded border border-[#D9DDE7] bg-white p-12 text-center">
            <Search className="size-8 text-[#080878] mx-auto mb-2" />
            <h3 className="text-base font-bold text-[#080878]">No Matching Formulations Found</h3>
            <p className="mt-1 text-xs text-[#555B66]">
              Try searching by generic ingredient (e.g., Metformin, Domperidone, Amoxicillin) or resetting filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductDirectoryCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductDirectoryCard({ product }: { product: Product }) {
  const displayImage = product.primaryImage || product.images[0]

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded border border-[#D9DDE7] bg-white transition-all duration-200 hover:border-[#080878] hover:shadow-md">
      <div>
        {/* Product Packaging Image (1:1 Ratio, object-fit: contain on white) */}
        <div className="relative aspect-square w-full overflow-hidden bg-white border-b border-[#F5F6FA] p-5 flex items-center justify-center">
          <Image
            src={displayImage}
            alt={`${product.name} packaging`}
            width={450}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
          />

          {/* Therapeutic Category Badge */}
          <div className="absolute left-3 top-3">
            <span className="rounded bg-[#DDE2FF] border border-[#CCD5FF] px-2 py-0.5 text-[10px] font-semibold text-[#080878] uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Prescription Schedule Tag */}
          <div className="absolute right-3 top-3">
            <span className="rounded bg-[#F5F6FA] border border-[#D9DDE7] px-2 py-0.5 text-[10px] font-medium text-[#475569]">
              {product.prescription === 'Physician guided' ? 'Schedule H Rx' : 'OTC Supportive'}
            </span>
          </div>
        </div>

        {/* Corporate Pharmaceutical Content */}
        <div className="p-4">
          <h3 className="text-[17px] font-semibold tracking-tight text-[#080878] group-hover:text-[#304BEA] transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 text-xs font-normal text-[#475569] truncate" title={product.genericName}>
            {product.genericName}
          </p>

          <div className="mt-2.5 flex items-center gap-2 text-xs text-[#64748b]">
            <span className="rounded bg-[#F5F6FA] px-2 py-0.5 font-medium text-[#080878] border border-[#D9DDE7]">
              {product.form}
            </span>
            <span>•</span>
            <span className="truncate">{product.strength}</span>
          </div>
        </div>
      </div>

      {/* Directory Footer: Packaging & Details Link */}
      <div className="border-t border-[#F5F6FA] bg-[#F5F6FA] px-4 py-2.5 flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-[#64748b] truncate max-w-[130px]">
          {product.pack}
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-[#080878] group-hover:text-[#304BEA] transition-colors uppercase tracking-wider text-xs"
        >
          <span>View Details</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </article>
  )
}

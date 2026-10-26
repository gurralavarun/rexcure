import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { company, therapeuticAreas, products } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function getTherapeuticArea(slug: string) {
  return therapeuticAreas.find((item) => item.slug === slug)
}

export function generateStaticParams() {
  return therapeuticAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getTherapeuticArea(slug)

  if (!area) {
    return {
      title: 'Therapeutic Specialty Not Found | RexCure',
    }
  }

  const title = `${area.name} Formulations & Therapies`
  const description = `Discover RexCure's ${area.name} formulations. Clinical focus: ${area.clinicalFocus}. Evidence-backed molecules: ${area.keyMolecules.join(', ')}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/therapeutic-areas/${area.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${company.siteUrl}/therapeutic-areas/${area.slug}`,
    },
  }
}

export default async function TherapeuticDetailPage({ params }: PageProps) {
  const { slug } = await params
  const area = getTherapeuticArea(slug)

  if (!area) {
    notFound()
  }

  const matchingProducts = products.filter((p) => p.therapeuticSlug === area.slug)

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      <main>
        {/* Page Banner */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Therapeutic Areas', href: '/therapeutic-areas' },
            { label: area.name },
          ]}
          eyebrow="Clinical Specialty Portfolio"
          title={area.name.toUpperCase()}
          badge={`${matchingProducts.length} Formulations`}
          description={area.description}
          variant="light-blue"
        />

        {/* Clinical Rationale & Matching Formulations */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16">
            
            {/* Specialty Clinical Focus Summary Strip */}
            <div className="mb-10 rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] block">Clinical Focus</span>
                <p className="text-sm font-semibold text-[#080878] mt-0.5">{area.clinicalFocus}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#555B66]">Key Molecules:</span>
                {area.keyMolecules.map((mol) => (
                  <span
                    key={mol}
                    className="rounded-md bg-white border border-[#D9DDE7] px-2.5 py-1 text-xs font-medium text-[#202124]"
                  >
                    {mol}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between border-b border-[#D9DDE7] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#080878]">
                  Marketed Formulations in {area.name}
                </h2>
                <p className="text-xs text-[#555B66] mt-1 font-normal">
                  Each product is formulated in compliance with strict Indian Pharmacopoeia assay standards.
                </p>
              </div>

              <Link
                href="/products"
                className="text-xs font-semibold text-[#080878] hover:text-[#304BEA] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {matchingProducts.map((product) => (
                <article
                  key={product.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#D9DDE7] bg-white transition-all duration-200 hover:border-[#080878] hover:shadow-md"
                >
                  <div>
                    {/* 1:1 Packaging Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-white p-5 border-b border-[#F5F6FA] flex items-center justify-center">
                      <Image
                        src={product.primaryImage || product.images[0]}
                        alt={`${product.name} (${product.genericName}) - ${product.category} packaging by RexCure Pharma`}
                        title={`${product.name} - ${product.genericName}`}
                        width={400}
                        height={400}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-md bg-[#DDE2FF] border border-[#CCD5FF] px-2 py-0.5 text-[10px] font-semibold text-[#080878]">
                          {product.form}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="rounded-md bg-[#F5F6FA] border border-[#D9DDE7] px-2 py-0.5 text-[10px] font-medium text-[#475569]">
                          {product.prescription === 'Physician guided' ? 'Schedule H Rx' : 'OTC Supportive'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-[17px] font-bold text-[#080878] group-hover:text-[#304BEA] transition-colors">
                        <Link href={`/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs font-normal text-[#475569] truncate">
                        {product.genericName}
                      </p>
                      <p className="mt-2 text-xs text-[#475569] leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      <div className="mt-3 rounded-lg bg-[#F5F6FA] p-2 text-[11px] border border-[#D9DDE7]">
                        <span className="font-semibold text-[#080878]">Composition: </span>
                        <span className="text-[#555B66]">{product.composition.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#F5F6FA] bg-[#F5F6FA] px-4 py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Pack: </span>
                      <span className="font-medium text-[#202124]">{product.pack}</span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#080878] hover:text-[#304BEA] uppercase tracking-wider text-xs"
                    >
                      <span>View Details</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-12 pt-6 border-t border-[#D9DDE7]">
              <Link
                href="/therapeutic-areas"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#080878] hover:text-[#304BEA] uppercase tracking-wider"
              >
                <ArrowLeft className="size-3.5" />
                <span>Return to All Therapeutic Areas</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

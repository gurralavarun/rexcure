import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { company, therapeuticAreas, products } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Therapeutic Areas | Clinical Disciplines',
  description: `Explore RexCure's therapeutic specialties: Diabetology, Gastroenterology, Allergy Care, Musculoskeletal Pain Management, Anti-Infectives, and Nutraceuticals.`,
  alternates: {
    canonical: '/therapeutic-areas',
  },
}

const segmentCodes: Record<string, string> = {
  'anti-diabetic': 'SEG-01',
  'gastro-care': 'SEG-02',
  'allergy-care': 'SEG-03',
  'pain-management': 'SEG-04',
  'anti-infective': 'SEG-05',
  'nutraceutical': 'SEG-06',
}

export default function TherapeuticAreasPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      <main>
        {/* Abbott-Style Page Banner */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Therapeutic Areas' },
          ]}
          eyebrow="Clinical Disciplines & Specialties"
          title="THERAPEUTIC AREAS"
          badge={`${therapeuticAreas.length} Specialties`}
          description="RexCure Pharma develops focused commercial portfolios addressing chronic metabolic care, gastro-protection, pediatric anti-infectives, and pain management across India."
          variant="light-blue"
        />

        {/* Professional Category Directory on White Content Area */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {therapeuticAreas.map((area) => {
                const code = segmentCodes[area.slug] || 'SEG'
                const areaProducts = products.filter((p) => p.therapeuticSlug === area.slug)

                return (
                  <div
                    key={area.slug}
                    className="flex flex-col justify-between rounded border border-[#D9DDE7] bg-white p-6 shadow-2xs hover:border-[#080878] hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-4 border-b border-[#F5F6FA] pb-3">
                        <span className="rounded bg-[#DDE2FF] border border-[#CCD5FF] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#080878]">
                          {code}
                        </span>
                        <span className="text-xs font-medium text-[#64748b]">
                          {areaProducts.length} {areaProducts.length === 1 ? 'Formulation' : 'Formulations'}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold text-[#080878]">
                        <Link href={`/therapeutic-areas/${area.slug}`} className="hover:text-[#304BEA] transition-colors">
                          {area.name}
                        </Link>
                      </h2>

                      <p className="mt-2.5 text-xs text-[#475569] leading-relaxed">
                        {area.description}
                      </p>

                      {/* Clinical Focus */}
                      <div className="mt-4 rounded bg-[#F5F6FA] p-3 text-xs border border-[#D9DDE7]">
                        <span className="font-semibold text-[#1e293b]">Clinical Focus: </span>
                        <span className="text-[#475569]">{area.clinicalFocus}</span>
                      </div>

                      {/* Active Molecules */}
                      <div className="mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] mb-2 block">
                          Key Molecules:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {area.keyMolecules.map((mol) => (
                            <span
                              key={mol}
                              className="rounded bg-white border border-[#D9DDE7] px-2 py-0.5 text-[11px] font-medium text-[#202124]"
                            >
                              {mol}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Formulations Preview */}
                      <div className="mt-4 pt-3 border-t border-[#F5F6FA]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] mb-1.5 block">
                          Marketed Formulations:
                        </span>
                        <ul className="space-y-1 text-xs">
                          {areaProducts.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/products/${p.slug}`}
                                className="text-[#080878] hover:text-[#304BEA] font-medium flex items-center justify-between py-0.5"
                              >
                                <span>• {p.name}</span>
                                <span className="text-[#555B66] text-[11px]">{p.form}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Link: EXPLORE PRODUCTS → */}
                    <div className="mt-6 pt-4 border-t border-[#F5F6FA]">
                      <Link
                        href={`/therapeutic-areas/${area.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#080878] hover:text-[#304BEA] transition-colors uppercase tracking-wider"
                      >
                        <span>EXPLORE PRODUCTS</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

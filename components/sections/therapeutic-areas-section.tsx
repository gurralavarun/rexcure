import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { therapeuticAreas, products } from '@/data/products'

export function TherapeuticAreasSection() {
  return (
    <section className="bg-[#F5F6FA] py-12 sm:py-16 lg:py-24 border-b border-[#D9DDE7] font-sans">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#080878]" />
              <span>Therapeutic Portfolio · Clinical Specialties</span>
            </div>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] font-bold tracking-tight text-[#080878] leading-[1.2]">
              Key Therapeutic Disciplines
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#475569] max-w-2xl leading-relaxed font-normal">
              Focused commercial portfolios addressing chronic metabolic care, gastro-protection, pediatric anti-infectives, and pain management across India.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/therapeutic-areas"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#080878] hover:text-[#304BEA] transition-colors uppercase tracking-wider"
            >
              <span>Explore All {therapeuticAreas.length} Specialties</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Sophisticated Corporate Directory Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapeuticAreas.map((area, index) => {
            const areaProducts = products.filter((p) => p.therapeuticSlug === area.slug)
            const code = `SEG-0${index + 1}`

            return (
              <div
                key={area.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-[#D9DDE7] bg-white p-6 transition-all duration-200 hover:border-[#080878] hover:shadow-md"
              >
                <div>
                  {/* Category Top Indicator */}
                  <div className="flex items-center justify-between mb-4 border-b border-[#F5F6FA] pb-3">
                    <span className="rounded-md bg-[#DDE2FF] border border-[#CCD5FF] px-2.5 py-0.5 text-[10px] font-semibold text-[#080878] tracking-wider">
                      {code}
                    </span>
                    <span className="text-xs font-medium text-[#555B66]">
                      {areaProducts.length} Formulations
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-[19px] font-bold text-[#080878] group-hover:text-[#304BEA] transition-colors">
                    <Link href={`/therapeutic-areas/${area.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {area.name}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {area.clinicalFocus}
                  </p>

                  {/* Key Molecules */}
                  <div className="mt-4 pt-3 border-t border-[#F5F6FA]">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#555B66] block mb-2">
                      Key Active Molecules:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.keyMolecules.map((mol) => (
                        <span
                          key={mol}
                          className="rounded-md bg-[#F5F6FA] border border-[#D9DDE7] px-2 py-0.5 text-[11px] font-medium text-[#202124]"
                        >
                          {mol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#F5F6FA] text-xs font-bold text-[#080878] group-hover:text-[#304BEA] uppercase tracking-wider">
                  <span>Explore Formulations</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

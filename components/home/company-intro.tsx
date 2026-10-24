import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { company, products, therapeuticAreas } from '@/data/products'

export function CompanyIntro() {
  return (
    <section
      aria-label="Who We Are - Corporate Profile"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FA] via-[#FFFFFF] to-[#FFFFFF] py-12 sm:py-16 lg:py-24 border-b border-[#D9DDE7] font-sans"
    >
      {/* Understated soft clinical glow in background (behind content) */}
      <div
        className="pointer-events-none absolute -top-44 -left-44 size-[580px] rounded-full bg-[#DDE2FF]/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-44 size-[480px] -translate-y-1/2 rounded-full bg-[#DDE2FF]/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16 min-w-0">
        <div className="grid w-full min-w-0 max-w-full items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          
          {/* ========================================================= */}
          {/* Left Column: Integrated Editorial Laboratory Feature      */}
          {/* ========================================================= */}
          <div className="w-full min-w-0 max-w-full lg:col-span-6">
            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-[#D9DDE7] bg-white p-2 sm:p-2.5 shadow-[0_8px_28px_-6px_rgba(8,8,120,0.06)] transition-all duration-200 hover:shadow-[0_12px_32px_-6px_rgba(8,8,120,0.09)]">
              {/* Natural Proportion Photographic Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full overflow-hidden rounded bg-[#F5F6FA]">
                <Image
                  src="/assets/hero-posters/whoweare.png"
                  alt="RexCure Pharma formulation development and corporate operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-center"
                />
              </div>

              {/* Clean Integrated White Caption Strip */}
              <div className="mt-2 px-2.5 sm:px-3 py-2 flex items-center justify-between gap-2 text-xs border-t border-[#DDE2FF] bg-white rounded-b-md min-w-0 max-w-full overflow-hidden">
                <span className="font-semibold text-[11px] sm:text-xs tracking-wide text-[#080878] flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                  <span className="size-1.5 rounded-full bg-[#080878] shrink-0" />
                  <span className="truncate">Formulation Development &amp; QA</span>
                </span>
                <span className="text-[10px] sm:text-xs text-[#555B66] font-medium shrink-0 whitespace-nowrap">
                  Hyderabad Lab Suite
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Right Column: Authoritative Corporate Profile & Data      */}
          {/* ========================================================= */}
          <div className="w-full min-w-0 max-w-full lg:col-span-6 flex flex-col items-start">
            
            {/* Eyebrow Label with Short Blue Accent Line */}
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-3 flex items-center gap-2.5">
              <span className="h-0.5 w-6 bg-[#304BEA] shrink-0" />
              <span className="truncate">WHO WE ARE · CORPORATE PROFILE</span>
            </div>

            {/* Main Section Heading (approx 30-38px) */}
            <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] font-bold tracking-tight text-[#080878] leading-[1.2] w-full break-words">
              Advancing Healthcare Through Reliable Pharmaceutical Solutions.
            </h2>

            {/* Editorial Body Paragraphs (16-18px) */}
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] lg:text-[17px] text-[#475569] leading-[1.7] max-w-2xl font-normal w-full break-words">
              Operating from Hyderabad, Telangana, {company.legalName} is an Indian pharmaceutical enterprise dedicated to delivering and marketing high-integrity formulations that healthcare practitioners prescribe with confidence.
            </p>

            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] lg:text-[17px] text-[#475569] leading-[1.7] max-w-2xl font-normal w-full break-words">
              Our commercial portfolio bridges laboratory science with real-world clinical needs — delivering bio-equivalent oral solid dosages, specialized pediatric dry suspensions, and supportive wellness formulations engineered for stability in tropical climatic conditions.
            </p>

            {/* ========================================================= */}
            {/* Integrated Company Facts & Statistics Panel               */}
            {/* ========================================================= */}
            <div className="mt-6 sm:mt-8 w-full min-w-0 max-w-full rounded border border-[#D9DDE7] bg-white shadow-[0_2px_16px_-4px_rgba(8,8,120,0.04)] overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#D9DDE7]">
                
                {/* Column 1: Headquarters & Therapeutic Reach */}
                <div className="divide-y divide-[#D9DDE7]">
                  <div className="p-3.5 sm:p-5 hover:bg-[#F5F6FA] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#555B66] block">
                      Headquarters
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      Hyderabad, Telangana
                    </p>
                  </div>
                  <div className="p-3.5 sm:p-5 hover:bg-[#F5F6FA] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#555B66] block">
                      Therapeutic Reach
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      {therapeuticAreas.length} Core Specialties
                    </p>
                  </div>
                </div>

                {/* Column 2: Quality Benchmark & Commercial Formulations */}
                <div className="divide-y divide-[#D9DDE7]">
                  <div className="p-3.5 sm:p-5 hover:bg-[#F5F6FA] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#555B66] block">
                      Quality Benchmark
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      WHO-cGMP &amp; IP Monograph
                    </p>
                  </div>
                  <div className="p-3.5 sm:p-5 hover:bg-[#F5F6FA] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#555B66] block">
                      Commercial Formulations
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      {products.length} Marketed Products
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* Corporate Action Buttons                                  */}
            {/* ========================================================= */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/about"
                id="company-intro-about-btn"
                className="group inline-flex items-center justify-center gap-2.5 rounded bg-[#080878] hover:bg-[#000066] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 border border-[#080878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] active:scale-[0.98]"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quality"
                id="company-intro-quality-btn"
                className="inline-flex items-center justify-center rounded bg-white hover:bg-[#F5F6FA] text-[#080878] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-[#080878] hover:border-[#000066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] active:scale-[0.98]"
              >
                <span>Quality &amp; Compliance</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { company, products, therapeuticAreas } from '@/data/products'

export function CompanyIntro() {
  return (
    <section
      aria-label="Who We Are - Corporate Profile"
      className="relative overflow-hidden bg-gradient-to-b from-[#F1F7FF] via-[#F8FBFF] to-[#FFFFFF] py-12 sm:py-16 lg:py-24 border-b border-[#DDE7F6] font-sans"
    >
      {/* Understated soft clinical glow in background (behind content) */}
      <div
        className="pointer-events-none absolute -top-44 -left-44 size-[580px] rounded-full bg-[#E5EEFF]/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-44 size-[480px] -translate-y-1/2 rounded-full bg-[#EDF4FF]/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          
          {/* ========================================================= */}
          {/* Left Column: Integrated Editorial Laboratory Feature      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl lg:rounded-[14px] border border-[#DDE7F6] bg-white p-2 sm:p-2.5 shadow-[0_12px_36px_-6px_rgba(8,8,120,0.07)] transition-all duration-200 hover:shadow-[0_16px_40px_-6px_rgba(8,8,120,0.1)]">
              {/* Natural Proportion Photographic Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F1F7FF]">
                <Image
                  src="/assets/hero-posters/whoweare.png"
                  alt="RexCure Pharma formulation development and corporate operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-center"
                />
              </div>

              {/* Clean Integrated White Caption Strip */}
              <div className="mt-2 px-3 py-2 flex items-center justify-between text-xs border-t border-[#EDF2FA] bg-white rounded-b-md">
                <span className="font-semibold text-[11px] sm:text-xs tracking-wide text-[#080878] flex items-center gap-1.5 truncate">
                  <span className="size-1.5 rounded-full bg-[#080878] shrink-0" />
                  <span className="truncate">Formulation Development &amp; Quality Control</span>
                </span>
                <span className="text-[10px] sm:text-xs text-[#5A6578] font-medium shrink-0 ml-2">
                  Hyderabad Lab Suite
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Right Column: Authoritative Corporate Profile & Data      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Eyebrow Label with Short Blue Accent Line */}
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-3 flex items-center gap-2.5">
              <span className="h-0.5 w-6 bg-[#304BEA]" />
              <span>WHO WE ARE · CORPORATE PROFILE</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-semibold tracking-tight text-[#080878] leading-[1.2]">
              Advancing Healthcare Through Reliable Pharmaceutical Solutions.
            </h2>

            {/* Editorial Body Paragraphs */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] text-[#334155] leading-relaxed max-w-2xl font-normal">
              Operating from Hyderabad, Telangana, {company.legalName} is an Indian pharmaceutical enterprise dedicated to delivering and marketing high-integrity formulations that healthcare practitioners prescribe with confidence.
            </p>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-[#334155] leading-relaxed max-w-2xl font-normal">
              Our commercial portfolio bridges laboratory science with real-world clinical needs — delivering bio-equivalent oral solid dosages, specialized pediatric dry suspensions, and supportive wellness formulations engineered for stability in tropical climatic conditions.
            </p>

            {/* ========================================================= */}
            {/* Integrated Company Facts & Statistics Panel               */}
            {/* ========================================================= */}
            <div className="mt-6 sm:mt-8 w-full rounded-xl border border-[#DDE7F6] bg-white shadow-[0_4px_24px_-4px_rgba(8,8,120,0.04)] overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E8EEF8]">
                
                {/* Column 1: Headquarters & Therapeutic Reach */}
                <div className="divide-y divide-[#E8EEF8]">
                  <div className="p-3.5 sm:p-5 hover:bg-[#F9FBFF] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] block">
                      Headquarters
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      Hyderabad, Telangana
                    </p>
                  </div>
                  <div className="p-3.5 sm:p-5 hover:bg-[#F9FBFF] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] block">
                      Therapeutic Reach
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      {therapeuticAreas.length} Core Specialties
                    </p>
                  </div>
                </div>

                {/* Column 2: Quality Benchmark & Commercial Formulations */}
                <div className="divide-y divide-[#E8EEF8]">
                  <div className="p-3.5 sm:p-5 hover:bg-[#F9FBFF] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] block">
                      Quality Benchmark
                    </span>
                    <p className="font-semibold text-[#080878] text-sm sm:text-[15px] mt-1">
                      WHO-cGMP &amp; IP Monograph
                    </p>
                  </div>
                  <div className="p-3.5 sm:p-5 hover:bg-[#F9FBFF] transition-colors">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] block">
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
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#080878] hover:bg-[#101C70] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 border border-[#080878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] active:scale-[0.98]"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quality"
                id="company-intro-quality-btn"
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-[#F1F7FF] text-[#080878] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-[#080878] hover:border-[#101C70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] active:scale-[0.98]"
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

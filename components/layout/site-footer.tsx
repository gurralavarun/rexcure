import Link from 'next/link'
import { company } from '@/data/products'
import { SiteLogo } from './site-logo'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#080878] text-white font-sans">
      {/* MAIN FOOTER CONTENT - PRESERVED LAYOUT & APPROVED COLORS (IMAGE 1) */}
      <div className="py-14 lg:py-18 px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1560px]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            
            {/* Left: Brand Logo */}
            <div className="shrink-0 lg:w-[260px]">
              <SiteLogo variant="dark" />
            </div>

            {/* Middle: Columns of Navigation Headings (Typography Refined: 14px, weight 500, clean line-height) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 flex-1 max-w-3xl">
              
              {/* Column 1 */}
              <div className="flex flex-col space-y-3 sm:space-y-3.5 text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.05em] leading-normal text-white/90">
                <Link href="/about" className="hover:text-white transition-colors">
                  ABOUT US
                </Link>
                <Link href="/products" className="hover:text-white transition-colors">
                  PRODUCTS
                </Link>
                <Link href="/therapeutic-areas" className="hover:text-white transition-colors">
                  THERAPEUTIC AREAS
                </Link>
                <Link href="/quality" className="hover:text-white transition-colors">
                  QUALITY &amp; QA
                </Link>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col space-y-3 sm:space-y-3.5 text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.05em] leading-normal text-white/90">
                <Link href="/contact" className="hover:text-white transition-colors">
                  INSTITUTIONAL SUPPLY
                </Link>
                <Link href="/quality" className="hover:text-white transition-colors">
                  CERTIFICATE OF ANALYSIS
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  CONTACTS
                </Link>
                <Link href="/quality" className="hover:text-white transition-colors">
                  SCHEDULE M COMPLIANCE
                </Link>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col space-y-3 sm:space-y-3.5 text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.05em] leading-normal text-white/90 col-span-2 sm:col-span-1">
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  SITE MAP
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  PHARMACOVIGILANCE
                </Link>
                <Link href="/about" className="hover:text-white transition-colors">
                  PRIVACY POLICY
                </Link>
                <Link href="/about" className="hover:text-white transition-colors">
                  TERMS &amp; CONDITIONS
                </Link>
              </div>

            </div>

            {/* Right: Social Media Icons (Preserved from Image 1) */}
            <div className="shrink-0 flex items-center gap-3 pt-2 lg:pt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#080878] transition-colors font-bold text-xs"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#080878] transition-colors font-bold text-xs"
                aria-label="X (Twitter)"
              >
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#080878] transition-colors font-bold text-xs"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#080878] transition-colors font-bold text-xs"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#080878] transition-colors font-bold text-xs"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>

          </div>

          {/* Copyright & Trademark Notice (Refined Typography: 13-14px copyright, readable disclaimer) */}
          <div className="mt-14 pt-8 border-t border-white/15 text-xs sm:text-[13px] text-white/70 leading-relaxed space-y-2.5">
            <p className="font-semibold text-white/90 text-xs sm:text-[13px]">
              &copy; {currentYear} {company.shortName || 'RexCure'} Pharma. All Rights Reserved. Please read the Legal Notice for further details.
            </p>
            <p className="max-w-4xl text-[12px] sm:text-[13px] leading-relaxed text-white/60 font-normal">
              Unless otherwise specified, all product and service names appearing in this Internet site are trademarks owned by or licensed to {company.shortName || 'RexCure'} Pharma, its subsidiaries or affiliates. No use of any {company.shortName || 'RexCure'} Pharma trademark, trade name, or trade dress in this site may be made without the prior written authorization of {company.shortName || 'RexCure'} Pharma, except to identify the product or services of the company.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}

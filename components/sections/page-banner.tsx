import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[]
  title: string
  eyebrow?: string
  description?: string
  badge?: string
  variant?: 'light-blue' | 'white' | 'corporate-blue'
  className?: string
}

export function PageBanner({
  breadcrumbs,
  title,
  eyebrow,
  description,
  badge,
  variant = 'light-blue',
  className = '',
}: PageBannerProps) {
  const isCorporateBlue = variant === 'corporate-blue'
  const isLightBlue = variant === 'light-blue'

  // Variant color definitions
  const bannerBg = isCorporateBlue
    ? 'bg-[#080878] text-white'
    : isLightBlue
    ? 'bg-[#DDE2FF] text-[#202124]'
    : 'bg-[#F5F6FA] text-[#202124]'

  const breadcrumbBg = isCorporateBlue
    ? 'bg-[#000066] border-white/10 text-white/70'
    : 'bg-[#CCD5FF] border-[#CCD5FF] text-[#555B66]'

  const titleColor = isCorporateBlue
    ? 'text-white'
    : 'text-[#080878]'

  const descColor = isCorporateBlue
    ? 'text-white/80'
    : 'text-[#555B66]'

  const eyebrowColor = isCorporateBlue
    ? 'text-[#CCD5FF]'
    : 'text-[#080878]'

  return (
    <div className={`w-full border-b border-[#D9DDE7] ${className}`}>
      {/* Clean Breadcrumb Strip */}
      <div className={`w-full border-b py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 transition-colors ${breadcrumbBg}`}>
        <div className="mx-auto w-full max-w-[1560px]">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs sm:text-[13px] font-medium tracking-wide">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <div key={item.label} className="inline-flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className={`size-3.5 shrink-0 ${isCorporateBlue ? 'text-white/40' : 'text-[#555B66]/60'}`} />
                  )}
                  {isLast || !item.href ? (
                    <span className={`font-semibold ${isCorporateBlue ? 'text-white' : 'text-[#080878]'}`}>
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={`hover:underline transition-colors ${
                        isCorporateBlue
                          ? 'text-white/80 hover:text-white'
                          : 'text-[#555B66] hover:text-[#080878]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Prominent Page Banner */}
      <div className={`w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 ${bannerBg}`}>
        <div className="mx-auto w-full max-w-[1560px]">
          <div className="max-w-4xl">
            {eyebrow && (
              <div className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${eyebrowColor}`}>
                <span className={`h-0.5 w-6 inline-block ${isCorporateBlue ? 'bg-white/60' : 'bg-[#080878]'}`} />
                <span>{eyebrow}</span>
              </div>
            )}

            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className={`text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold tracking-tight leading-[1.18] ${titleColor}`}>
                {title}
              </h1>
              {badge && (
                <span className={`rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isCorporateBlue
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'bg-white text-[#080878] border border-[#CCD5FF]'
                }`}>
                  {badge}
                </span>
              )}
            </div>

            {description && (
              <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-3xl font-normal ${descColor}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

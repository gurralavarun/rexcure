'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface SiteLogoProps {
  className?: string
  variant?: 'light' | 'dark'
  showTagline?: boolean
}

export function SiteLogo({
  className = '',
  variant = 'light',
}: SiteLogoProps) {
  const pathname = usePathname()
  const isDark = variant === 'dark'
  const textColor = isDark ? '#FFFFFF' : '#080878'
  const logoSrc = isDark
    ? '/assets/hero-posters/mainlogo-white.png'
    : '/assets/hero-posters/mainlogo-navy.png'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.pushState(null, '', '/')
      }
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`group inline-flex items-center gap-3 focus-visible:outline-none select-none transition-transform active:scale-[0.98] cursor-pointer ${className}`}
      aria-label="RexCure Home"
    >
      {/* Official RexCure Monogram Emblem from mainlogo */}
      <div className="shrink-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="RexCure Emblem"
          className="h-8 sm:h-9 w-auto max-w-[44px] object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Wordmark */}
      <div className="flex items-center">
        <span
          className="text-[21px] sm:text-[23px] font-bold tracking-[0.06em] leading-none"
          style={{ color: textColor }}
        >
          REXCURE
        </span>
      </div>
    </Link>
  )
}

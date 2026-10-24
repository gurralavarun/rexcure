'use client'

import React, { useState, useEffect, useCallback } from 'react'

export function BrandIntroAnimation() {
  const [step, setStep] = useState<number>(0)

  const handleSkip = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('rexcure_intro_seen', '1')
      } catch {
        // Ignore storage errors in private browsing
      }
    }
    setStep(6)
  }, [])

  useEffect(() => {
    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const hasSeenIntro =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('rexcure_intro_seen') === '1'

    if (isReducedMotion || hasSeenIntro) {
      setStep(6)
      return
    }

    try {
      sessionStorage.setItem('rexcure_intro_seen', '1')
    } catch {
      // Ignore
    }

    // Step 1: RC Symbol Reveal
    const t1 = setTimeout(() => setStep(1), 60)
    // Step 2: REX CURE Wordmark Reveal
    const t2 = setTimeout(() => setStep(2), 600)
    // Step 3: Brand Hold
    const t3 = setTimeout(() => setStep(3), 1100)
    // Step 4: Fade Out
    const t4 = setTimeout(() => setStep(4), 1600)
    // Step 5: Complete
    const t5 = setTimeout(() => setStep(6), 2100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [])

  if (step === 6) {
    return null
  }

  const isFadingOut = step >= 4

  return (
    <div
      aria-label="RexCure Brand Introduction"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden bg-[#080878] transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-[1.01]' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#080878',
      }}
    >
      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(204, 213, 255, 0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.22,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Soft Light Glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        aria-hidden="true"
      >
        <div className="w-[420px] h-[340px] rounded-full bg-gradient-to-r from-[#304BEA]/20 via-[#DDE2FF]/10 to-transparent blur-3xl" />
      </div>

      {/* Discrete Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Skip intro animation"
      >
        <span>Skip</span>
        <span aria-hidden="true">→</span>
      </button>

      {/* REXCURE LOGO WITH OFFICIAL MAIN LOGO MONOGRAM */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-5">
        
        {/* Step 1: Official Pure White RC Monogram Emblem from mainlogo */}
        <div
          className="shrink-0 flex items-center justify-center"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-posters/mainlogo-white.png"
            alt="RexCure Logo Emblem"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Step 2: Pure White Name 'REX CURE' like Abbott */}
        <div
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateX(0px)' : 'translateX(-8px)',
            transition: 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="text-3xl sm:text-4xl font-bold tracking-[0.06em] text-white">
            REXCURE
          </span>
        </div>

      </div>
    </div>
  )
}

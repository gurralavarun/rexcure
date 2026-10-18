'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { products, therapeuticAreas } from '@/data/products'
import { HERO_CAROUSEL_SLIDES } from '@/data/hero-carousel'

// Snappy, engaging slideshow speed (4.5 seconds per slide)
const SLIDESHOW_INTERVAL_MS = 4500

export function Hero() {
  const slides = HERO_CAROUSEL_SLIDES
  const totalSlides = slides.length

  // Extended slides with clones for infinite circular loop:
  // [Clone of Last, Slide 0, Slide 1, Slide 2, Slide 3, Slide 4, Clone of First]
  const extendedSlides = [
    slides[totalSlides - 1],
    ...slides,
    slides[0],
  ]

  // Start at index 1 (the real first slide)
  const [currentIndex, setCurrentIndex] = useState(1)
  const [enableTransition, setEnableTransition] = useState(true)
  const isTransitioningRef = useRef(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartXRef = useRef<number | null>(null)

  // Circular Next: smoothly slides forward to next index
  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    setEnableTransition(true)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  // Circular Prev: smoothly slides backward to previous index
  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    setEnableTransition(true)
    setCurrentIndex((prev) => prev - 1)
  }, [])

  // Handle transition end for seamless circular loop
  const handleTransitionEnd = () => {
    isTransitioningRef.current = false

    // If we moved past the last slide to the clone of the first slide
    if (currentIndex >= totalSlides + 1) {
      setEnableTransition(false)
      setCurrentIndex(1)
    }
    // If we moved before the first slide to the clone of the last slide
    else if (currentIndex <= 0) {
      setEnableTransition(false)
      setCurrentIndex(totalSlides)
    }
  }

  // Re-enable CSS transitions on next tick after seamless circular repositioning
  useEffect(() => {
    if (!enableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [enableTransition])

  // Continuous automatic slideshow movement
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      nextSlide()
    }, SLIDESHOW_INTERVAL_MS)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [nextSlide, currentIndex])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const diff = touchStartXRef.current - e.changedTouches[0].clientX
    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    touchStartXRef.current = null
  }

  return (
    <section
      aria-label="Therapeutic Areas and Formulations Carousel"
      className="relative w-full bg-white border-b border-[#D9DDE7]"
    >
      {/* ========================================================= */}
      {/* 1. FULL-WIDTH CIRCULAR HERO SLIDESHOW (2.5:1 DESKTOP)     */}
      {/* ========================================================= */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="RexCure Therapeutic Areas Showcase"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group/carousel relative w-full overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] focus-visible:ring-inset min-h-[480px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-0 lg:aspect-[2.5/1]"
      >
        {/* Infinite Circular Track: Moves in a continuous forward loop */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex w-full h-full ${
            enableTransition
              ? 'transition-transform duration-700 ease-in-out'
              : 'transition-none'
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedSlides.map((slide, index) => {
            return (
              <div
                key={`${slide.id}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide: ${slide.category}`}
                className="relative w-full h-full shrink-0 flex-none min-h-[480px] sm:min-h-[520px] md:min-h-[550px] lg:min-h-0"
              >
                {/* Background Banner Image (Photography on Left) */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 1}
                    sizes="100vw"
                    className="object-cover object-left md:object-center"
                  />
                </div>

                {/* Subtle Right-Side Gradient Overlay for Legibility (Left Photography Stays Clear) */}
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full sm:w-[80%] md:w-[68%] lg:w-[58%] xl:w-[52%] bg-gradient-to-l from-white/95 via-white/85 to-white/20 md:from-white/95 md:via-white/75 md:to-transparent"
                  aria-hidden="true"
                />

                {/* Content Overlay: Positioned on the RIGHT side of the image */}
                <div className="relative z-20 mx-auto flex h-full w-full max-w-[1560px] flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-12 sm:py-16">
                  <div className="ml-auto w-full max-w-lg lg:max-w-xl xl:max-w-2xl text-left animate-in fade-in duration-500">
                    
                    {/* Category Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2 rounded border border-[#CCD5FF] bg-[#DDE2FF]/95 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#080878] mb-3.5 sm:mb-4 shadow-2xs">
                      <span className="size-2 rounded-full bg-[#080878]" />
                      <span>{slide.category}</span>
                    </div>

                    {/* Slide Heading */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight text-[#080878] leading-[1.16]">
                      {slide.heading}
                    </h1>

                    {/* Slide Description */}
                    <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-[#334155] font-normal leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* Real, Clickable HTML CTA Button Layered Over Background */}
                    <div className="mt-6 sm:mt-8 flex items-center gap-4">
                      <Link
                        href={slide.ctaHref}
                        id={`hero-cta-${slide.id}`}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-[#080878] hover:bg-[#000066] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 border border-[#080878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] focus-visible:ring-offset-2 active:scale-[0.98]"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* ========================================================= */}
        {/* MANUAL CONTROLS: PREVIOUS & NEXT ARROWS                    */}
        {/* ========================================================= */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous carousel slide"
          id="hero-carousel-prev"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#080878] hover:text-[#000066] shadow-md border border-[#D9DDE7] backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA]"
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next carousel slide"
          id="hero-carousel-next"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#080878] hover:text-[#000066] shadow-md border border-[#D9DDE7] backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA]"
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>

      </div>

      {/* ========================================================= */}
      {/* 2. ESTABLISHED PHARMACEUTICAL STATISTICS & GOVERNANCE BAR */}
      {/* ========================================================= */}
      <div className="bg-[#F5F6FA] border-t border-[#D9DDE7] py-6 sm:py-8 font-sans">
        <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D9DDE7]">
            
            {/* Stat 1: Marketed Formulations */}
            <div className="pt-3 sm:pt-0 sm:px-6 first:pl-0">
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  {products.length}+
                </p>
                <span className="text-xs font-semibold text-[#304BEA] uppercase tracking-wider">
                  Formulations
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Formulations Marketed
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                Tablets, Dry Syrups, Capsules &amp; Softgels
              </p>
            </div>

            {/* Stat 2: Therapeutic Disciplines */}
            <div className="pt-3 sm:pt-0 sm:px-6">
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  {therapeuticAreas.length}
                </p>
                <span className="text-xs font-semibold text-[#304BEA] uppercase tracking-wider">
                  Specialties
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Therapeutic Segments
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                Cardio-diabetic, Gastro, Allergy &amp; Pain
              </p>
            </div>

            {/* Stat 3: Quality Governance */}
            <div className="pt-3 sm:pt-0 sm:px-6">
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  WHO-cGMP
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Quality Governance
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                Assay potency &amp; IP monograph compliance
              </p>
            </div>

            {/* Stat 4: Operational Facility */}
            <div className="pt-3 sm:pt-0 sm:px-6">
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  Hyderabad
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Operational Facility
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                Plot No. 44, Industrial Development Area
              </p>
            </div>

          </div>

          {/* Quick Therapeutic Specialties Jump Strip */}
          <div className="mt-6 pt-5 border-t border-[#D9DDE7] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#080878] uppercase tracking-wider text-[11px] mr-1">
                Direct Portfolio Access:
              </span>
              {slides.map((slide) => (
                <Link
                  key={slide.id}
                  href={slide.ctaHref}
                  className="rounded border border-[#D9DDE7] bg-white px-2.5 py-1 text-[#202124] font-medium hover:border-[#080878] hover:text-[#080878] hover:bg-[#DDE2FF]/50 transition-colors text-xs"
                >
                  {slide.category}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-[#555B66] text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="size-3.5 text-[#080878]" />
                Schedule M &amp; cGMP Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Award className="size-3.5 text-[#080878]" />
                DCGI Monitored
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

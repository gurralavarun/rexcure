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
      {/* ========================================================= */}
      {/* 1. FULL-WIDTH CIRCULAR HERO SLIDESHOW                     */}
      {/* Abbott Benchmark: Top image + text below on mobile/tablet */}
      {/* Seamless 2.5:1 overlaid corporate banner on desktop       */}
      {/* ========================================================= */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="RexCure Therapeutic Areas Showcase"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group/carousel relative w-full overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] focus-visible:ring-inset bg-white"
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
                className="relative w-full h-full shrink-0 flex-none flex flex-col lg:block lg:aspect-[2.5/1] bg-white"
              >
                {/* --------------------------------------------------------- */}
                {/* TOP IMAGE SECTION (Persons on Left Fully Preserved)        */}
                {/* --------------------------------------------------------- */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.1/1] lg:absolute lg:inset-0 lg:aspect-auto overflow-hidden bg-[#F1F5F9]">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 1}
                    sizes="(max-width: 1024px) 100vw, 1560px"
                    className="object-cover object-left"
                  />

                  {/* Desktop Only: Subtle Right-Side Gradient Overlay for text legibility */}
                  <div
                    className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 z-10 w-[58%] xl:w-[52%] bg-gradient-to-l from-white/98 via-white/85 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* --------------------------------------------------------- */}
                {/* SLIDE CONTENT & ACTION (Placed BELOW image on mobile/tab)  */}
                {/* --------------------------------------------------------- */}
                <div className="relative z-20 w-full bg-white px-5 py-6 sm:px-8 sm:py-7 md:px-10 lg:bg-transparent lg:h-full lg:max-w-[1560px] lg:mx-auto lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-16 lg:py-12 border-b lg:border-b-0 border-[#E2E8F0]">
                  <div className="w-full lg:ml-auto lg:max-w-xl xl:max-w-2xl text-left">
                    
                    {/* Category Eyebrow Pill */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded border border-[#CCD5FF] bg-[#DDE2FF] px-2.5 py-1 sm:px-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#080878] mb-2.5 sm:mb-3.5 shadow-2xs">
                      <span className="size-1.5 sm:size-2 rounded-full bg-[#080878]" />
                      <span>{slide.category}</span>
                    </div>

                    {/* Slide Heading - Responsively proportioned */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] font-bold tracking-tight text-[#080878] leading-[1.2]">
                      {slide.heading}
                    </h1>

                    {/* Slide Description */}
                    <p className="mt-2.5 sm:mt-3 lg:mt-4 text-xs sm:text-sm lg:text-[16px] text-[#475569] font-normal leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* Abbott CTA Button */}
                    <div className="mt-4 sm:mt-6 lg:mt-8 flex items-center gap-4">
                      <Link
                        href={slide.ctaHref}
                        id={`hero-cta-${slide.id}`}
                        className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#080878] hover:bg-[#000066] text-white px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 border border-[#080878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA] active:scale-[0.98]"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* ========================================================= */}
        {/* DESKTOP CONTROLS: PREVIOUS & NEXT SIDE ARROWS             */}
        {/* ========================================================= */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous carousel slide"
          id="hero-carousel-prev"
          className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 size-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#080878] hover:text-[#000066] shadow-md border border-[#D9DDE7] backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA]"
        >
          <ChevronLeft className="size-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next carousel slide"
          id="hero-carousel-next"
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 size-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#080878] hover:text-[#000066] shadow-md border border-[#D9DDE7] backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#304BEA]"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* ========================================================= */}
        {/* MOBILE & TABLET SLIDESHOW CONTROLLER PILL                  */}
        {/* Positioned in bottom-right empty zone to keep people clear */}
        {/* Includes Prev [<], Dots, and Next [>]                      */}
        {/* ========================================================= */}
        <div className="lg:hidden absolute right-3 sm:right-6 top-[calc(62.5vw-44px)] sm:top-[calc(56.25vw-48px)] md:top-[calc(47.6vw-50px)] z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-[#D9DDE7] shadow-md">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex size-6 sm:size-7 items-center justify-center rounded-full text-[#080878] hover:bg-[#EEF2F6] active:scale-90 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5 px-0.5">
            {slides.map((s, idx) => {
              const activeSlideIdx = ((currentIndex - 1 + totalSlides) % totalSlides)
              const isActive = activeSlideIdx === idx
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (isTransitioningRef.current) return
                    isTransitioningRef.current = true
                    setEnableTransition(true)
                    setCurrentIndex(idx + 1)
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${s.category}`}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-[#080878]'
                      : 'size-1.5 sm:size-2 bg-[#94A3B8] hover:bg-[#64748B]'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex size-6 sm:size-7 items-center justify-center rounded-full text-[#080878] hover:bg-[#EEF2F6] active:scale-90 transition-all cursor-pointer"
          >
            <ChevronRight className="size-3.5 sm:size-4" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP INDICATOR DOTS (Centered at bottom of banner)     */}
        {/* ========================================================= */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#D9DDE7] shadow-xs">
          {slides.map((s, idx) => {
            const activeSlideIdx = ((currentIndex - 1 + totalSlides) % totalSlides)
            const isActive = activeSlideIdx === idx
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (isTransitioningRef.current) return
                  isTransitioningRef.current = true
                  setEnableTransition(true)
                  setCurrentIndex(idx + 1)
                }}
                aria-label={`Go to slide ${idx + 1}: ${s.category}`}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-[#080878]'
                    : 'size-2 bg-[#94A3B8] hover:bg-[#64748B]'
                }`}
              />
            )
          })}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. ESTABLISHED PHARMACEUTICAL STATISTICS & GOVERNANCE BAR */}
      {/* ========================================================= */}
      <div className="bg-[#F5F6FA] border-t border-[#D9DDE7] py-6 sm:py-8 font-sans">
        <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 lg:gap-8 divide-y-0 sm:divide-x divide-[#D9DDE7]">
            
            {/* Stat 1: Marketed Formulations */}
            <div className="p-3 sm:p-0 sm:px-6 first:pl-0 bg-white sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-[#D9DDE7]/70 shadow-2xs sm:shadow-none">
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  {products.length}+
                </p>
                <span className="text-[10px] sm:text-xs font-semibold text-[#304BEA] uppercase tracking-wider">
                  Formulations
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Formulations Marketed
              </p>
              <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5">
                Tablets, Dry Syrups, Capsules &amp; Softgels
              </p>
            </div>

            {/* Stat 2: Therapeutic Disciplines */}
            <div className="p-3 sm:p-0 sm:px-6 bg-white sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-[#D9DDE7]/70 shadow-2xs sm:shadow-none">
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  {therapeuticAreas.length}
                </p>
                <span className="text-[10px] sm:text-xs font-semibold text-[#304BEA] uppercase tracking-wider">
                  Specialties
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Therapeutic Segments
              </p>
              <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5">
                Cardio-diabetic, Gastro, Allergy &amp; Pain
              </p>
            </div>

            {/* Stat 3: Quality Governance */}
            <div className="p-3 sm:p-0 sm:px-6 bg-white sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-[#D9DDE7]/70 shadow-2xs sm:shadow-none">
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  WHO-cGMP
                </p>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Quality Governance
              </p>
              <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5">
                Assay potency &amp; IP monograph compliance
              </p>
            </div>

            {/* Stat 4: Operational Facility */}
            <div className="p-3 sm:p-0 sm:px-6 bg-white sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-[#D9DDE7]/70 shadow-2xs sm:shadow-none">
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#080878]">
                  Hyderabad
                </p>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1e293b] mt-1">
                Operational Facility
              </p>
              <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5">
                Plot No. 44, Industrial Development Area
              </p>
            </div>

          </div>

          {/* Quick Therapeutic Specialties Jump Strip */}
          <div className="mt-6 pt-5 border-t border-[#D9DDE7] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-[#080878] uppercase tracking-wider text-[11px] mr-1 block sm:inline w-full sm:w-auto mb-1 sm:mb-0">
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

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#555B66] text-xs pt-2 md:pt-0 border-t md:border-t-0 border-[#D9DDE7]/60">
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

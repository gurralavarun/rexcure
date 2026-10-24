'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'

export type ProductGalleryProps = {
  name: string
  images: string[]
  category: string
  prescription: string
}

export function ProductGallery({ name, images, category, prescription }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentImage = images[activeIndex] || images[0]

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Main Image Frame - Clean White Pharmaceutical Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#D9DDE7] bg-white p-6 sm:p-8 shadow-xs flex items-center justify-center">
        <Image
          key={currentImage}
          src={currentImage}
          alt={`${name} pharmaceutical packaging display`}
          width={800}
          height={800}
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="h-full w-full object-contain transition-opacity duration-200"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-md border border-[#CCD5FF] bg-[#DDE2FF] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#080878]">
            {category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="rounded-md border border-[#D9DDE7] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#555B66]">
            {prescription === 'Physician guided' ? 'Schedule H Rx' : 'OTC Supportive Care'}
          </span>
        </div>

        {/* Bottom Verification Note */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#555B66] border-t border-[#D9DDE7] pt-2">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="size-3.5 text-[#080878]" />
            Genuine RexCure Batch Packaging
          </span>
          <span>Image {activeIndex + 1} of {images.length}</span>
        </div>
      </div>

      {/* Thumbnails Navigation (if multiple images exist) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative size-20 shrink-0 overflow-hidden rounded-lg border bg-white p-1.5 transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'border-[#080878] ring-2 ring-[#080878]/25 shadow-sm'
                  : 'border-[#D9DDE7] hover:border-[#080878] opacity-80 hover:opacity-100'
              }`}
              aria-label={`View ${name} packaging view ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                width={120}
                height={120}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

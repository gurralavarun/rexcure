import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export interface FeaturedProductItem {
  name: string
  subtitle: string
  generic: string
  category: string
  form: string
  pack: string
  image: string
  slug: string
  highlights: string[]
  badgeText: string
}

export const FEATURED_PRODUCTS: FeaturedProductItem[] = [
  {
    name: 'REXKOFF LS Junior',
    subtitle: 'Pediatric Cough & Mucolytic Syrup',
    generic: 'Levosalbutamol Sulphate, Ambroxol HCl & Guaiphenesin Syrup',
    category: 'Respiratory & Allergy Care',
    form: 'Pediatric Oral Syrup',
    pack: 'Amber PET Bottle with Calibrated Cup',
    image: '/products/rexkoff.jpeg',
    slug: 'rexkoff-ls-junior',
    badgeText: 'Strawberry Flavour',
    highlights: [
      'Selective β2-bronchodilator for rapid airway relaxation',
      'Mucolytic & expectorant action to dissolve stubborn phlegm',
      'Child-friendly taste ensuring stress-free compliance',
    ],
  },
  {
    name: 'LEVO-M KID',
    subtitle: 'Pediatric Dual-Action Anti-Allergic Syrup',
    generic: 'Montelukast Sodium & Levocetirizine Dihydrochloride Syrup',
    category: 'Allergy & Pediatric Care',
    form: 'Pediatric Oral Syrup (60 ml)',
    pack: '60 ml PET Bottle + Child-Resistant Cap',
    image: '/products/levo-mkid.jpeg',
    slug: 'levo-m-kid',
    badgeText: '60 ml Pediatric Pack',
    highlights: [
      'Dual blockade of histamine & leukotriene inflammatory cascades',
      'Controls allergic rhinitis, watery eyes & nighttime cough',
      'Restores uninterrupted restful nocturnal sleep',
    ],
  },
  {
    name: 'REXCLAV 625',
    subtitle: 'Broad-Spectrum Potentiated Antibacterial',
    generic: 'Amoxicillin & Potassium Clavulanate Tablets I.P. (625 mg)',
    category: 'Anti-Infectives & Antibacterials',
    form: 'Film-coated Tablets',
    pack: '10 × 10 Alu-Alu Blister Pack',
    image: '/products/rexclav625.jpeg',
    slug: 'rexclav-625',
    badgeText: 'Dual Action Protection',
    highlights: [
      'Potassium Clavulanate overcomes β-lactamase bacterial resistance',
      'High clinical cure rates in respiratory, ENT & soft tissue infections',
      'Hermetic Alu-Alu packaging guarantees optimal clavulanate stability',
    ],
  },
]

export function FeaturedProducts() {
  return (
    <section className="bg-[#F8F9FC] py-16 lg:py-24 border-b border-[#D9DDE7] font-sans">
      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Abbott-Style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[#D9DDE7]">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#080878]" />
              <span>Flagship Formulations · Clinical Focus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-[#080878] leading-[1.2]">
              Featured Pharmaceutical Formulations
            </h2>
            <p className="mt-3.5 text-base sm:text-[17px] text-[#475569] leading-relaxed font-normal">
              Precision-engineered oral solid and liquid therapeutics conforming to WHO-cGMP monographs for dependable therapeutic efficacy and patient adherence.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 text-sm font-semibold text-[#080878] border border-[#080878] rounded hover:bg-[#080878] hover:text-white transition-colors duration-150 shrink-0"
          >
            <span>Explore All Formulations</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 Products Side-by-Side Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.slug}
              className="group flex flex-col bg-white rounded-md border border-[#D9DDE7] hover:border-[#080878] hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Product Packaging Image Showcase */}
              <div className="relative aspect-[4/3] w-full bg-white border-b border-[#D9DDE7] p-4 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 480px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#080878] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                  {product.badgeText}
                </div>

                <div className="absolute top-3 right-3 bg-white/95 border border-[#D9DDE7] text-[#080878] text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                  Rx Only
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category & Therapeutic Classification */}
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#080878] mb-1.5">
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-[#080878] group-hover:text-[#2A4BF2] transition-colors leading-snug">
                  {product.name}
                </h3>

                {/* Generic Salt Formula */}
                <p className="mt-1 text-xs font-normal text-[#475569] leading-relaxed line-clamp-2 min-h-[32px]">
                  {product.generic}
                </p>

                {/* Dosage Form & Packaging Metadata Pills */}
                <div className="mt-4 pt-4 border-t border-[#D9DDE7]/70 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F5F6FA] text-[#080878] font-medium border border-[#D9DDE7]">
                    {product.form}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F5F6FA] text-[#555B66] font-medium border border-[#D9DDE7]">
                    {product.pack}
                  </span>
                </div>

                {/* Clinical Highlights Bullet Points */}
                <div className="mt-4 pt-4 border-t border-[#D9DDE7]/70 space-y-2 flex-1">
                  {product.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#475569]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#080878] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="mt-6 pt-4 border-t border-[#D9DDE7]">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex w-full items-center justify-between px-4 py-2.5 bg-[#080878] text-white rounded font-semibold text-xs uppercase tracking-wider hover:bg-[#2A4BF2] transition-colors shadow-2xs group-hover:shadow"
                  >
                    <span>View Product Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assurance Strip */}
        <div className="mt-10 rounded border border-[#D9DDE7] bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555B66]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#080878] shrink-0" />
            <span>
              All formulations produced under strict <strong className="text-[#080878]">WHO-cGMP</strong> compliance with validated dissolution testing and batch traceability.
            </span>
          </div>
          <Link
            href="/quality"
            className="font-bold text-[#080878] hover:text-[#2A4BF2] hover:underline shrink-0"
          >
            Review Quality Controls →
          </Link>
        </div>

      </div>
    </section>
  )
}

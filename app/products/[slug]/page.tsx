import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ChevronRight,
  Pill,
  ShieldCheck,
  ClipboardList,
  Sparkles,
  FileText,
  Boxes,
  Thermometer,
  AlertCircle,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { company, products, therapeuticAreas } from '@/data/products'
import { ProductGallery } from '@/components/products/product-gallery'
import { SiteHeader, SiteFooter } from '@/components/layout'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function getProduct(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return {
      title: 'Pharmaceutical Formulation Not Found | RexCure Pharma',
    }
  }

  const title = `${product.name} (${product.genericName}) | RexCure Pharma`
  const description = `${product.name} (${product.genericName}): ${product.form}, strength ${product.strength}. Prescribed for ${product.indications.slice(0, 3).join(', ')}. Official formulation profile by RexCure Pharma, Hyderabad.`

  const primaryImageUrl = (product.primaryImage || product.images[0]).startsWith('http')
    ? (product.primaryImage || product.images[0])
    : `${company.siteUrl}${product.primaryImage || product.images[0]}`

  const allImageUrls = product.images.map((img) =>
    img.startsWith('http') ? img : `${company.siteUrl}${img}`
  )

  return {
    title,
    description,
    keywords: [
      product.name,
      product.genericName,
      `${product.name} ${product.form}`,
      `${product.name} composition`,
      `${product.name} packaging`,
      'RexCure Pharma',
      'RexCure',
      'RexCure pharmaceuticals',
      product.category,
      product.therapeuticArea,
      ...product.composition,
    ],
    alternates: {
      canonical: `https://www.rexcurepharma.com/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.rexcurepharma.com/products/${product.slug}`,
      siteName: 'RexCure Pharma',
      type: 'article',
      images: allImageUrls.map((imgUrl, idx) => ({
        url: imgUrl,
        width: 800,
        height: 800,
        alt: `${product.name} (${product.genericName}) packaging box - RexCure Pharma view ${idx + 1}`,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primaryImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.therapeuticSlug === product.therapeuticSlug && p.slug !== product.slug)
    .slice(0, 3)

  const primaryImageUrl = (product.primaryImage || product.images[0]).startsWith('http')
    ? (product.primaryImage || product.images[0])
    : `${company.siteUrl}${product.primaryImage || product.images[0]}`

  const allImageUrls = product.images.map((img) =>
    img.startsWith('http') ? img : `${company.siteUrl}${img}`
  )

  // Strictly verified schema.org structure without invented offers, ratings, or unverified claims
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Schema.org Product (verified technical specifications only)
      {
        '@type': 'Product',
        '@id': `https://www.rexcurepharma.com/products/${product.slug}#product`,
        name: product.name,
        alternateName: product.genericName,
        description: product.overview || product.shortDescription,
        image: allImageUrls,
        sku: product.slug,
        mpn: product.slug.toUpperCase(),
        brand: {
          '@type': 'Brand',
          name: 'RexCure Pharma',
        },
        manufacturer: {
          '@type': 'Organization',
          name: company.legalName,
          url: 'https://www.rexcurepharma.com',
        },
        category: product.therapeuticArea,
      },
      // 2. Schema.org Drug Structure (verified composition, dosage form, active ingredients)
      {
        '@type': 'Drug',
        '@id': `https://www.rexcurepharma.com/products/${product.slug}#drug`,
        name: product.name,
        nonProprietaryName: product.genericName,
        description: product.shortDescription,
        dosageForm: product.form,
        activeIngredient: product.composition.join(', '),
        drugUnit: product.strength,
        administrationRoute: 'Oral',
        prescriptionStatus:
          product.prescription === 'Physician guided'
            ? 'https://schema.org/PrescriptionOnly'
            : 'https://schema.org/OTC',
        legalStatus:
          product.prescription === 'Physician guided'
            ? 'Schedule H Prescription Drug'
            : 'Over-the-Counter Healthcare Formulation',
        warning:
          'To be sold by retail on the prescription of a Registered Medical Practitioner only where applicable.',
        brand: {
          '@type': 'Organization',
          name: company.legalName,
          url: 'https://www.rexcurepharma.com',
        },
        manufacturer: {
          '@type': 'Organization',
          name: company.legalName,
        },
        url: `https://www.rexcurepharma.com/products/${product.slug}`,
        image: primaryImageUrl,
      },
      // 3. Search Breadcrumb Navigation
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.rexcurepharma.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://www.rexcurepharma.com/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.therapeuticArea,
            item: `https://www.rexcurepharma.com/therapeutic-areas/${product.therapeuticSlug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.name,
            item: `https://www.rexcurepharma.com/products/${product.slug}`,
          },
        ],
      },
      // 4. ImageObject metadata
      {
        '@type': 'ImageObject',
        '@id': `${primaryImageUrl}#image`,
        url: primaryImageUrl,
        contentUrl: primaryImageUrl,
        caption: `${product.name} (${product.genericName}) official pharmaceutical packaging box`,
        name: `${product.name} Packaging Display`,
        representativeOfPage: true,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      {/* Corporate Breadcrumb Strip */}
      <div className="w-full bg-[#DDE2FF] border-b border-[#CCD5FF] py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#555B66]">
        <div className="mx-auto w-full max-w-[1560px]">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5">
            <Link href="/" className="hover:text-[#080878] transition-colors">
              HOME
            </Link>
            <ChevronRight className="size-3.5 text-[#555B66]/60 shrink-0" />
            <Link href="/products" className="hover:text-[#080878] transition-colors">
              PRODUCTS
            </Link>
            <ChevronRight className="size-3.5 text-[#555B66]/60 shrink-0" />
            <Link
              href={`/therapeutic-areas/${product.therapeuticSlug}`}
              className="hover:text-[#080878] transition-colors"
            >
              {product.therapeuticArea.toUpperCase()}
            </Link>
            <ChevronRight className="size-3.5 text-[#555B66]/60 shrink-0" />
            <span className="text-[#080878] font-bold truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16 py-8 lg:py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#080878] hover:text-[#304BEA] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to All Formulations</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-14 border-b border-[#D9DDE7] pb-12">
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-5">
            <ProductGallery
              name={product.name}
              genericName={product.genericName}
              images={product.images}
              category={product.category}
              prescription={product.prescription}
            />
          </div>

          {/* Clinical Specification Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link
                href={`/therapeutic-areas/${product.therapeuticSlug}`}
                className="rounded-md border border-[#CCD5FF] bg-[#DDE2FF] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#080878] hover:bg-[#CCD5FF] transition-colors"
              >
                {product.therapeuticArea}
              </Link>
              <span className="rounded-md border border-[#D9DDE7] bg-[#F5F6FA] px-3 py-1 text-xs font-medium text-[#475569]">
                {product.form}
              </span>
              <span className="rounded-md border border-[#D9DDE7] bg-white px-3 py-1 text-xs font-semibold text-[#080878]">
                {product.prescription === 'Physician guided' ? 'Schedule H Rx' : 'OTC Supportive Care'}
              </span>
            </div>

            {/* Product Name (H1: 40-52px) */}
            <h1 className="text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold tracking-tight text-[#080878] leading-[1.18]">
              {product.name}
            </h1>

            {/* Generic Molecule */}
            <p className="mt-2 text-base sm:text-lg font-medium text-[#334155]">
              {product.genericName}
            </p>

            {/* Short Commercial Overview */}
            <p className="mt-4 text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Quick Formulation Attributes Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Strength</span>
                <p className="mt-1 text-xs font-bold text-[#202124]">{product.strength}</p>
              </div>
              <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Commercial Pack</span>
                <p className="mt-1 text-xs font-bold text-[#202124]">{product.pack}</p>
              </div>
              <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Indicative MRP</span>
                <p className="mt-1 text-xs font-bold text-[#080878]">{product.mrp}</p>
              </div>
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Drug Class</span>
                <p className="mt-1 text-xs font-bold text-[#080878]">
                  {product.prescription === 'Physician guided' ? 'Schedule H Rx' : 'OTC Supportive'}
                </p>
              </div>
            </div>

            {/* Physician & Distributor Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="btn-primary"
              >
                <FileText className="size-4" />
                <span>Request Prescribing Information</span>
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                <Phone className="size-4" />
                <span>Distributor &amp; Institutional Supply</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Clinical Sections */}
        <section className="mt-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Primary Clinical Data (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Section 1: Exact Active Composition */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D9DDE7]">
                  <Pill className="size-5 text-[#080878]" />
                  <h2 className="text-xl font-bold text-[#080878]">Active Chemical Composition</h2>
                </div>
                <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-5">
                  <p className="text-xs font-semibold text-[#555B66] mb-3 uppercase tracking-wider">
                    Each {product.form.toLowerCase().includes('tablet') ? 'film-coated tablet' : product.form.toLowerCase().includes('capsule') || product.form.toLowerCase().includes('softgel') ? 'capsule / softgel' : '5 ml suspension'} contains:
                  </p>
                  <ul className="space-y-2">
                    {product.composition.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#202124] font-medium">
                        <CheckCircle2 className="size-4 text-[#080878] shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 2: Clinical Indications */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D9DDE7]">
                  <ClipboardList className="size-5 text-[#080878]" />
                  <h2 className="text-xl font-bold text-[#080878]">Primary Clinical Indications</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.indications.map((ind, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#D9DDE7] bg-white p-4">
                      <div className="size-6 rounded-md bg-[#DDE2FF] flex items-center justify-center shrink-0 mt-0.5 text-[#080878] text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#202124] leading-relaxed">
                        {ind}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Therapeutic Mechanism & Overview */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D9DDE7]">
                  <Sparkles className="size-5 text-[#080878]" />
                  <h2 className="text-xl font-bold text-[#080878]">Therapeutic Pharmacology &amp; Overview</h2>
                </div>
                <div className="rounded-xl border border-[#D9DDE7] bg-white p-6 leading-relaxed text-[#475569] text-[15px]">
                  <p>{product.overview}</p>
                </div>
              </div>

              {/* Section 4: Therapeutic Formulation Benefits */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D9DDE7]">
                  <ShieldCheck className="size-5 text-[#080878]" />
                  <h2 className="text-xl font-bold text-[#080878]">Key Formulation Advantages</h2>
                </div>
                <div className="rounded-xl border border-[#CCD5FF] bg-[#DDE2FF]/40 p-5 space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#202124]">
                      <span className="size-1.5 rounded-full bg-[#080878] mt-2 shrink-0" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Recommended Posology */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D9DDE7]">
                  <AlertCircle className="size-5 text-[#080878]" />
                  <h2 className="text-xl font-bold text-[#080878]">Dosage &amp; Administration</h2>
                </div>
                <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-5 text-sm text-[#202124]">
                  <p className="font-semibold text-[#080878] mb-1">Standard Adult / Pediatric Regimen:</p>
                  <p className="leading-relaxed">{product.dosage}</p>
                  <p className="mt-3 text-xs text-[#555B66] italic">
                    Disclaimer: Dosage must be strictly adjusted by treating physicians based on clinical severity, renal clearance, and body weight.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Specifications & Regulatory Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Packaging Specification Card */}
              <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#080878] pb-2 border-b border-[#D9DDE7]">
                  Packaging &amp; Storage Details
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#555B66] font-medium">
                      <Boxes className="size-3.5 text-[#080878]" />
                      <span>Commercial Presentation:</span>
                    </div>
                    <p className="mt-1 font-semibold text-[#202124]">{product.packaging}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[#555B66] font-medium">
                      <Thermometer className="size-3.5 text-[#080878]" />
                      <span>Storage Monograph:</span>
                    </div>
                    <p className="mt-1 font-semibold text-[#202124]">{product.storage}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[#555B66] font-medium">
                      <ShieldCheck className="size-3.5 text-[#080878]" />
                      <span>Market Authorization Holder:</span>
                    </div>
                    <p className="mt-1 font-semibold text-[#202124]">{company.legalName}</p>
                    <p className="text-[#555B66] mt-0.5">{company.city}, {company.state}</p>
                  </div>
                </div>
              </div>

              {/* Physician Inquiry Card */}
              <div className="rounded-xl border border-[#CCD5FF] bg-[#DDE2FF] p-5">
                <h3 className="text-sm font-bold text-[#080878]">Clinical Inquiry / Sample Request</h3>
                <p className="mt-1.5 text-xs text-[#555B66] leading-relaxed">
                  Healthcare practitioners and hospital pharmacies may request detailed product dossiers, bio-equivalence data, or clinic samples.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#080878] py-2.5 text-xs font-bold text-white hover:bg-[#000066] uppercase tracking-wider transition-colors"
                >
                  <Mail className="size-3.5" />
                  <span>Contact Medical Desk</span>
                </Link>
              </div>

              {/* Regulatory Notice Card */}
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-4 text-[11px] text-[#555B66] leading-relaxed">
                <p className="font-bold text-[#202124] mb-1">Drug Law Compliance</p>
                Marketed under Drugs and Cosmetics Act, 1940 and Rules thereunder. Distributed exclusively through licensed pharmaceutical wholesalers and pharmacies.
              </div>
            </div>
          </div>
        </section>

        {/* Related Formulations in the Same Therapeutic Segment */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 border-t border-[#D9DDE7] pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#080878]">
                  Segment Portfolio
                </span>
                <h2 className="text-xl font-bold text-[#080878] sm:text-2xl mt-1">
                  Related Formulations in {product.therapeuticArea}
                </h2>
              </div>
              <Link
                href={`/therapeutic-areas/${product.therapeuticSlug}`}
                className="text-xs font-bold text-[#080878] hover:underline uppercase tracking-wider"
              >
                View Area (All) &rarr;
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col justify-between rounded-xl border border-[#D9DDE7] bg-white p-5 hover:border-[#CCD5FF] hover:shadow-md transition-all"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#F5F6FA] mb-4 p-3 flex items-center justify-center">
                      <Image
                        src={rel.primaryImage || rel.images[0]}
                        alt={`${rel.name} (${rel.genericName}) - ${rel.category} formulation packaging by RexCure Pharma`}
                        title={`${rel.name} - ${rel.genericName}`}
                        width={300}
                        height={300}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="rounded bg-[#DDE2FF] border border-[#CCD5FF] px-2 py-0.5 text-[10px] font-bold text-[#080878]">
                      {rel.form}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-[#080878] group-hover:text-[#304BEA]">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-[#555B66] mt-0.5 line-clamp-1">{rel.genericName}</p>
                  </div>

                  <Link
                    href={`/products/${rel.slug}`}
                    className="mt-4 flex items-center justify-between border-t border-[#F5F6FA] pt-3 text-xs font-bold text-[#080878] group-hover:text-[#304BEA] uppercase tracking-wider"
                  >
                    <span>View Product Profile</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

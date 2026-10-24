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
      title: 'Pharmaceutical Formulation Not Found | RexCure',
    }
  }

  const title = `${product.name} (${product.genericName}) | ${product.therapeuticArea}`
  const description = `Learn about ${product.name} (${product.genericName}), its dosage form (${product.form}), strength (${product.strength}), composition, clinical indications, and prescribing details from ${company.name}, Hyderabad.`

  return {
    title,
    description,
    keywords: [
      product.name,
      product.genericName,
      `${product.name} composition`,
      `${product.name} dosage`,
      `${product.name} indications`,
      `${product.name} side effects and uses`,
      product.category,
      product.therapeuticArea,
      ...product.composition,
      ...product.indications,
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${company.siteUrl}/products/${product.slug}`,
      siteName: company.name,
      type: 'article',
      images: [
        {
          url: product.primaryImage || product.images[0],
          width: 800,
          height: 800,
          alt: `${product.name} - ${product.genericName} by ${company.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.primaryImage || product.images[0]],
    },
    robots: {
      index: true,
      follow: true,
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

  // Schema.org Medical Drug Structure (SEO preservation)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Drug',
    name: product.name,
    nonProprietaryName: product.genericName,
    description: product.shortDescription,
    dosageForm: product.form,
    activeIngredient: product.composition.join(', '),
    brand: {
      '@type': 'Organization',
      name: company.legalName,
      url: company.siteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: company.city,
        addressRegion: company.state,
        addressCountry: 'IN',
      },
    },
    url: `${company.siteUrl}/products/${product.slug}`,
    image: (product.primaryImage || product.images[0]).startsWith('http')
      ? product.primaryImage
      : `${company.siteUrl}${product.primaryImage || product.images[0]}`,
    prescribingInfo: `${company.siteUrl}/products/${product.slug}`,
    administrationRoute: 'Oral',
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

            {/* Strength */}
            <p className="mt-1 text-sm font-normal text-[#555B66]">
              Strength / Profile: <span className="font-semibold text-[#080878]">{product.strength}</span>
            </p>

            {/* Clinical Overview */}
            <div className="mt-5 rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-4 text-xs sm:text-sm leading-relaxed text-[#475569]">
              <p>{product.overview}</p>
            </div>

            {/* Statutory Schedule H Warning for Prescription Formulations */}
            {product.prescription === 'Physician guided' ? (
              <div className="mt-4 rounded-xl border-l-4 border-[#DC2626] bg-[#FEF2F2] p-3.5 text-xs text-[#991B1B]">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#DC2626]">
                  <AlertCircle className="size-3.5" />
                  <span>Schedule H Prescription Drug — Statutory Notice</span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#7F1D1D]">
                  To be sold by retail on the prescription of a Registered Medical Practitioner only. Dispensed through licensed pharmacies.
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border-l-4 border-[#080878] bg-[#DDE2FF] p-3.5 text-xs text-[#080878]">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#080878]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Supportive Care &amp; Nutraceutical Formulation</span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#202124]">
                  Dietary / supportive formulation. Formulated in conformance with standard pharmacopoeial &amp; food safety guidelines.
                </p>
              </div>
            )}

            {/* Key Quick Specifications Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Dosage Form</span>
                <p className="mt-1 text-xs font-bold text-[#080878]">{product.form}</p>
              </div>
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">Packaging Pack</span>
                <p className="mt-1 text-xs font-bold text-[#080878]">{product.pack}</p>
              </div>
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66]">M.R.P. (Incl. Taxes)</span>
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
                <div className="flex items-center gap-2.5 mb-4 border-b border-[#D9DDE7] pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#DDE2FF] text-[#080878]">
                    <Pill className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#080878]">Composition &amp; Active Ingredients</h2>
                    <p className="text-xs text-[#555B66]">Exact formulation and quantitative profile</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#D9DDE7] bg-white shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#DDE2FF] border-b border-[#CCD5FF] text-[#080878] uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Active Ingredient / Excipient</th>
                        <th className="px-4 py-3">Specification / Potency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9DDE7] text-[#202124]">
                      {product.composition.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#F5F6FA]">
                          <td className="px-4 py-3 font-semibold text-[#080878]">{item}</td>
                          <td className="px-4 py-3 text-[#555B66]">
                            Pharmacopoeial Standard Formulation
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Clinical Indications */}
              <div>
                <div className="flex items-center gap-2.5 mb-4 border-b border-[#D9DDE7] pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#DDE2FF] text-[#080878]">
                    <ClipboardList className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#080878]">Therapeutic Indications &amp; Clinical Use</h2>
                    <p className="text-xs text-[#555B66]">Conditions managed under physician guidance</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.indications.map((indication, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-lg border border-[#D9DDE7] bg-[#F5F6FA] p-3 text-xs sm:text-sm text-[#202124]"
                    >
                      <CheckCircle2 className="size-4 text-[#080878] shrink-0 mt-0.5" />
                      <span>{indication}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Clinical Benefits */}
              <div>
                <div className="flex items-center gap-2.5 mb-4 border-b border-[#D9DDE7] pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#DDE2FF] text-[#080878]">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#080878]">Key Clinical Benefits &amp; Pharmacological Rationale</h2>
                    <p className="text-xs text-[#555B66]">Advantages for healthcare practitioners and patient compliance</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-[#D9DDE7] bg-white p-3.5 text-xs sm:text-sm leading-relaxed text-[#202124] shadow-2xs"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded bg-[#DDE2FF] text-[11px] font-bold text-[#080878] mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Recommended Dosage */}
              <div>
                <div className="flex items-center gap-2.5 mb-4 border-b border-[#D9DDE7] pb-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#DDE2FF] text-[#080878]">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#080878]">Recommended Dosage &amp; Administration</h2>
                    <p className="text-xs text-[#555B66]">Clinical administration protocol</p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-4 text-xs sm:text-sm leading-relaxed text-[#202124]">
                  <p className="font-bold text-[#080878]">Prescribing Guidance:</p>
                  <p className="mt-1 text-[#555B66]">{product.dosage}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#B91C1C] bg-[#FEF2F2] p-2.5 rounded border border-[#FEE2E2]">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>Always titrate and administer under registered medical advice. Do not exceed prescribed daily dose.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Specifications & Packaging Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Packaging & Storage Box */}
              <div className="rounded-xl border border-[#D9DDE7] bg-white p-5 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#080878] mb-4 border-b border-[#D9DDE7] pb-2">
                  Packaging &amp; Stability
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-[#555B66] flex items-center gap-1.5">
                      <Boxes className="size-3.5 text-[#080878]" />
                      Packaging Format
                    </span>
                    <p className="mt-1 font-semibold text-[#202124]">{product.packaging}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[#555B66] flex items-center gap-1.5">
                      <Thermometer className="size-3.5 text-[#080878]" />
                      Storage Conditions
                    </span>
                    <p className="mt-1 text-[#202124]">{product.storage}</p>
                  </div>

                  <div className="pt-2 border-t border-[#F5F6FA]">
                    <span className="font-bold text-[#555B66]">Marketing &amp; Distribution</span>
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
                className="text-xs font-bold text-[#080878] hover:text-[#304BEA] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All In This Segment</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col justify-between rounded-xl border border-[#D9DDE7] bg-white p-4 shadow-2xs hover:border-[#080878] hover:shadow-md transition-all"
                >
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden bg-white mb-3 p-3 flex items-center justify-center border-b border-[#F5F6FA]">
                      <Image
                        src={rel.primaryImage || rel.images[0]}
                        alt={rel.name}
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

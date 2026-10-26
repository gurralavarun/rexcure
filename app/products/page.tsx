import type { Metadata } from 'next'
import { company, products } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'
import { ProductCatalogue } from '@/components/products/product-catalogue'

export const metadata: Metadata = {
  title: 'Pharmaceutical Products | RexCure Pharma',
  description: `Browse the verified pharmaceutical products catalogue of RexCure Pharma, Hyderabad. Explore our 15 commercial formulations across anti-infectives, gastro care, diabetology, and wellness.`,
  keywords: [
    'RexCure Pharma products',
    'RexCure pharmaceutical products',
    'RexCure medicines',
    'Rexclav 625',
    'Lycorex Gold',
    'Rexofast Plus',
    ...products.map((p) => p.name),
  ],
  alternates: {
    canonical: 'https://www.rexcurepharma.com/products',
  },
  openGraph: {
    title: 'Pharmaceutical Products | RexCure Pharma',
    description: `Browse all 15 verified pharmaceutical formulations by RexCure Pharma.`,
    url: 'https://www.rexcurepharma.com/products',
    images: [
      {
        url: 'https://www.rexcurepharma.com/images/hero-lab.jpg',
        width: 1200,
        height: 675,
        alt: 'RexCure Pharma Pharmaceutical Products Catalogue',
      },
    ],
  },
}

export default function ProductsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RexCure Pharma Commercial Formulations Index',
    description: `Complete catalog of pharmaceutical products manufactured by ${company.name}`,
    url: `${company.siteUrl}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const primaryImg = product.primaryImage || product.images[0]
      const absoluteImg = primaryImg.startsWith('http') ? primaryImg : `${company.siteUrl}${primaryImg}`
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${company.siteUrl}/products/${product.slug}`,
        image: absoluteImg,
      }
    }),
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <SiteHeader />

      <main>
        {/* Abbott-Style Page Banner (Section 6) */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products' },
          ]}
          eyebrow="Commercial Portfolio Index"
          title="OUR PRODUCTS"
          badge={`${products.length} Formulations`}
          description="RexCure Pharma develops and distributes prescription medicines and supportive healthcare formulations conforming strictly to Indian Pharmacopoeia monographs and cGMP regulations."
          variant="light-blue"
        />

        {/* Professional Pharmaceutical Directory */}
        <ProductCatalogue id="catalogue-main" />
      </main>

      <SiteFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import { company, products } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'
import { ProductCatalogue } from '@/components/products/product-catalogue'

export const metadata: Metadata = {
  title: 'Pharmaceutical Formulations Portfolio | All Products',
  description: `Browse the complete pharmaceutical formulations catalogue of ${company.name}, Hyderabad. Explore all ${products.length} medicines, active ingredients, dosage forms, strengths, and therapeutic categories manufactured under cGMP compliance.`,
  keywords: [
    'RexCure Pharma products',
    'RexCure medicines list',
    'pharmaceutical formulations catalogue',
    'prescription medicines Hyderabad',
    'PCD pharma product list',
    'antibiotics India',
    'gastroenterology medicines',
    'diabetology formulations',
    'nutraceutical softgels India',
    ...products.map((p) => p.name),
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: `Pharmaceutical Formulations Portfolio | ${company.name}`,
    description: `Browse all ${products.length} pharmaceutical formulations by ${company.name}.`,
    url: `${company.siteUrl}/products`,
    images: [
      {
        url: `${company.siteUrl}/images/hero-lab.jpg`,
        width: 1200,
        height: 675,
        alt: `${company.name} Pharmaceutical Catalogue`,
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

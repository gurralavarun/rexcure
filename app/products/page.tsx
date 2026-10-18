import type { Metadata } from 'next'
import { company, products } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'
import { ProductCatalogue } from '@/components/products/product-catalogue'

export const metadata: Metadata = {
  title: 'Our Products | Pharmaceutical Portfolio',
  description: `Browse the complete pharmaceutical formulations catalogue of ${company.name}. Explore active ingredients, dosage forms, strengths, and therapeutic categories formulated in Hyderabad, India.`,
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: `Our Products | ${company.name}`,
    description: `Browse all ${products.length} pharmaceutical formulations by ${company.name}.`,
    url: `${company.siteUrl}/products`,
  },
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
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

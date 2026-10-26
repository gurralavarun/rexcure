import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { BrandIntroAnimation, Hero, CompanyIntro, HomepageProductGallery } from '@/components/home'
import {
  TherapeuticAreasSection,
  QualitySection,
  Contact,
} from '@/components/sections'
import { company, products } from '@/data/products'

export const metadata: Metadata = {
  title: 'RexCure Pharma | RexCure Pharmaceuticals Pvt. Ltd. | Official Website',
  description:
    'RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) is a premier pharmaceutical manufacturer in Hyderabad, Telangana. Discover prescription formulations including Rexclav 625, Lycorex Gold, Rexofast Plus, oral solid dosages, and cGMP medicines.',
  keywords: [
    'rexcure',
    'Rexcure',
    'REXCURE',
    'rexcure pharma',
    'RexCure Pharma',
    'rexcure pharmaceuticals',
    'RexCure Pharmaceuticals',
    'RexCure Pharmaceuticals Pvt Ltd',
    'rexcurepharma.com',
    'www.rexcurepharma.com',
    'RexCure Hyderabad',
    'RexCure medicines',
    'RexCure products',
    'Rexclav 625',
    'Lycorex Gold',
    'Rexofast Plus',
    'RexCure contact',
    'pharmaceutical company Hyderabad',
    'cGMP pharma formulations India',
    'PCD pharma franchise Hyderabad',
    ...products.map((p) => p.name),
  ],
  alternates: {
    canonical: company.siteUrl,
  },
  openGraph: {
    title: 'RexCure Pharma | RexCure Pharmaceuticals Pvt. Ltd.',
    description:
      'Official website of RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.), Hyderabad. Explore high-standard prescription formulations, therapeutic areas, and quality compliance.',
    url: company.siteUrl,
    siteName: 'RexCure Pharma',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: `${company.siteUrl}/images/hero-lab.jpg`,
        width: 1200,
        height: 675,
        alt: 'RexCure Pharma Corporate Headquarters and Formulations Suite',
      },
    ],
  },
}

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${company.siteUrl}/#organization`,
    name: 'RexCure Pharma',
    legalName: 'RexCure Pharmaceuticals Pvt. Ltd.',
    alternateName: [
      'RexCure',
      'Rexcure',
      'REXCURE',
      'RexCure Pharma',
      'rexcure pharma',
      'RexCure Pharmaceuticals',
      'RexCure Pharmaceuticals Private Limited',
      'RexCure Hyderabad',
    ],
    url: company.siteUrl,
    email: company.email,
    telephone: `+91-${company.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DNO 18-500/2, Malkangiri, Secunderabad',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500047',
      addressCountry: 'IN',
    },
    logo: `${company.siteUrl}/icon.png`,
    image: `${company.siteUrl}/images/hero-lab.jpg`,
    description:
      'RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) is an Indian pharmaceutical manufacturer and distributor based in Hyderabad, delivering high-integrity formulations across Diabetology, Gastroenterology, Allergy Care, Anti-Infectives, and Nutraceuticals.',
    sameAs: [
      'https://www.rexcurepharma.com',
      'https://facebook.com',
      'https://twitter.com',
      'https://linkedin.com',
      'https://instagram.com',
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.siteUrl}/#website`,
    name: 'RexCure Pharma',
    alternateName: ['RexCure', 'Rexcure', 'RexCure Pharmaceuticals'],
    url: company.siteUrl,
    publisher: {
      '@id': `${company.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${company.siteUrl}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <BrandIntroAnimation />

      <SiteHeader />

      <main className="w-full max-w-full overflow-x-hidden">
        {/* Section 4: Homepage Hero */}
        <Hero />

        {/* Section 5: Company Introduction (Split Section) */}
        <CompanyIntro />

        {/* Section 6: Redesigned Corporate Product Gallery (Abbott & Dr. Reddy's Benchmark) */}
        <HomepageProductGallery />

        {/* Section 11: Therapeutic Areas Portfolio */}
        <TherapeuticAreasSection />

        {/* Section 16: Quality & Analytical Compliance */}
        <QualitySection />

        {/* Corporate Communication & Inquiry Form */}
        <Contact />
      </main>

      {/* Section 20: Large Corporate Footer */}
      <SiteFooter />
    </div>
  )
}

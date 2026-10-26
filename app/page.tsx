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
  title: 'RexCure Pharma | Pharmaceutical Products & Healthcare Solutions',
  description:
    'RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) is an Indian pharmaceutical company based in Hyderabad, Telangana, delivering reliable prescription formulations, oral solid dosages, anti-infectives, and supportive healthcare products.',
  keywords: [
    'RexCure',
    'RexCure Pharma',
    'RexCure Pharmaceuticals',
    'RexCure Pharma official website',
    'RexCure Hyderabad',
    'Pharmaceutical Products India',
    'Rexclav 625',
    'Lycorex Gold',
    'Rexofast Plus',
    ...products.map((p) => p.name),
  ],
  alternates: {
    canonical: 'https://www.rexcurepharma.com',
  },
  openGraph: {
    title: 'RexCure Pharma | Pharmaceutical Products & Healthcare Solutions',
    description:
      'RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) is an Indian pharmaceutical company based in Hyderabad, delivering reliable prescription formulations and healthcare solutions.',
    url: 'https://www.rexcurepharma.com',
    siteName: 'RexCure Pharma',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.rexcurepharma.com/images/hero-lab.jpg',
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
    '@id': 'https://www.rexcurepharma.com/#organization',
    name: 'RexCure Pharma',
    legalName: 'RexCure Pharmaceuticals Pvt. Ltd.',
    alternateName: [
      'RexCure',
      'Rexcure',
      'RexCure Pharmaceuticals',
    ],
    url: 'https://www.rexcurepharma.com',
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
    logo: 'https://www.rexcurepharma.com/icon.png',
    image: 'https://www.rexcurepharma.com/images/hero-lab.jpg',
    description:
      'RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) is an Indian pharmaceutical enterprise based in Hyderabad, delivering high-integrity formulations across Diabetology, Gastroenterology, Allergy Care, Anti-Infectives, and Nutraceuticals.',
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.rexcurepharma.com/#website',
    name: 'RexCure Pharma',
    alternateName: ['RexCure', 'RexCure Pharmaceuticals'],
    url: 'https://www.rexcurepharma.com',
    publisher: {
      '@id': 'https://www.rexcurepharma.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.rexcurepharma.com/products?q={search_term_string}',
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

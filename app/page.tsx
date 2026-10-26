import { SiteHeader, SiteFooter } from '@/components/layout'
import { BrandIntroAnimation, Hero, CompanyIntro, HomepageProductGallery } from '@/components/home'
import {
  TherapeuticAreasSection,
  QualitySection,
  Contact,
} from '@/components/sections'
import { company } from '@/data/products'

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: company.name,
    legalName: company.legalName,
    alternateName: company.shortName,
    url: company.siteUrl,
    email: company.email,
    telephone: `+91-${company.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DNO 18-500/2, Malkangiri, Secunderabad',
      addressLocality: company.city,
      addressRegion: company.state,
      addressCountry: 'IN',
    },
    logo: `${company.siteUrl}/logo.svg`,
    image: `${company.siteUrl}/images/hero-lab.jpg`,
    description:
      'RexCure Pharma is a premier Indian pharmaceutical company delivering high-standard formulations across Diabetology, Gastroenterology, Allergy Care, Pain Management, Anti-Infectives, and Nutraceuticals.',
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.siteUrl,
    publisher: {
      '@type': 'Organization',
      name: company.legalName,
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

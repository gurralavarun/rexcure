import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { company, products } from '@/data/products'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#080878',
  width: 'device-width',
  initialScale: 1,
}

const productKeywords = products.flatMap((product) => [
  product.name,
  product.genericName,
  `${product.name} ${product.form}`,
  `${product.name} composition`,
  `${product.name} indications`,
  `${product.name} price`,
  `${product.name} uses`,
  `RexCure ${product.name}`,
  ...product.composition,
])

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} | Pharmaceutical Formulations, Medicines & Healthcare Solutions India`,
    template: `%s | ${company.name}`,
  },
  description:
    'RexCure Pharma is a premier pharmaceutical manufacturer in Hyderabad, India. Browse our high-quality prescription formulations, oral solid dosages, antibiotics, diabetology, and wellness products with cGMP compliance.',
  applicationName: company.name,
  keywords: [
    company.name,
    company.legalName,
    'Pharmaceutical Company Hyderabad',
    'Indian Pharmaceutical Formulations',
    'cGMP Formulations India',
    'Oral Solid Dosages',
    'Diabetology Medicines',
    'Gastroenterology Formulations',
    'Anti-Infective Dry Syrups',
    'Allergy Pediatric Suspensions',
    'Musculoskeletal Analgesics',
    'Nutraceutical Antioxidant Softgels',
    'PCD Pharma Franchise India',
    'Hospital Supply Pharmaceuticals',
    ...productKeywords,
  ],
  authors: [{ name: company.name, url: company.siteUrl }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: company.siteUrl,
    siteName: company.name,
    title: `${company.name} | Pharmaceutical Formulations & Healthcare Excellence`,
    description:
      'Explore RexCure Pharma therapeutic portfolio, quality standards and clinical product profiles.',
    images: [
      {
        url: `${company.siteUrl}/images/hero-lab.jpg`,
        width: 1200,
        height: 675,
        alt: `${company.name} State-of-the-art Formulation Laboratory`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} | Pharmaceutical Formulations & Healthcare Excellence`,
    description:
      'Explore RexCure Pharma therapeutic portfolio, quality standards and clinical product profiles.',
    images: [`${company.siteUrl}/images/hero-lab.jpg`],
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const rootJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'MedicalBusiness'],
        '@id': `${company.siteUrl}/#organization`,
        name: company.name,
        legalName: company.legalName,
        url: company.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${company.siteUrl}/icon.png`,
          width: 512,
          height: 512,
        },
        image: `${company.siteUrl}/images/hero-lab.jpg`,
        email: company.email,
        telephone: `+91-${company.phone}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address,
          addressLocality: company.city,
          addressRegion: company.state,
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+91-${company.phone}`,
          contactType: 'customer service',
          email: company.email,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Telugu'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${company.siteUrl}/#website`,
        url: company.siteUrl,
        name: company.name,
        description: 'Pharmaceutical Formulations & Healthcare Solutions',
        publisher: { '@id': `${company.siteUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${company.siteUrl}/products?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-[#202124] bg-white selection:bg-[#080878] selection:text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

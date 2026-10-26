import type { Metadata } from 'next'
import { company } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner, Contact } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Contact RexCure Pharma | Institutional Enquiries',
  description: `Contact RexCure Pharma (RexCure Pharmaceuticals Pvt. Ltd.) in Hyderabad, Telangana. Direct commercial desk for hospital tenders, PCD distribution partnerships, and institutional supply enquiries.`,
  alternates: {
    canonical: 'https://www.rexcurepharma.com/contact',
  },
  openGraph: {
    title: 'Contact RexCure Pharma | Institutional Enquiries',
    description: `Contact RexCure Pharma in Hyderabad, Telangana for commercial and institutional supply.`,
    url: 'https://www.rexcurepharma.com/contact',
    siteName: 'RexCure Pharma',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      <main>
        {/* Abbott-Style Page Banner */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
          eyebrow="Corporate Communications & Inquiries"
          title="CONTACT US"
          description="We welcome inquiries from medical practitioners, pharmaceutical distributors, hospital procurement committees, and institutional partners from our Hyderabad headquarters."
          variant="light-blue"
        />

        {/* Contact Form & Information */}
        <Contact id="contact-main" />
      </main>

      <SiteFooter />
    </div>
  )
}

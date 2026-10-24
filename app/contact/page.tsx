import type { Metadata } from 'next'
import { company } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner, Contact } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Contact Us | Corporate Office & Partnerships',
  description: `Contact ${company.legalName} in Hyderabad, Telangana. Business development, distribution franchise, hospital supply, medical information and pharmacovigilance desks.`,
  alternates: {
    canonical: '/contact',
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

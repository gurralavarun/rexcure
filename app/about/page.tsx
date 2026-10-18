import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  CheckCircle2,
  Building2,
  Microscope,
  ArrowRight,
} from 'lucide-react'
import { company, products, therapeuticAreas } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'

export const metadata: Metadata = {
  title: 'About Us | Corporate Profile & Heritage',
  description: `Discover ${company.legalName}: an Indian pharmaceutical enterprise headquartered in Hyderabad, Telangana. Learn about our mission, vision, corporate values, and therapeutic focus.`,
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  const corporateValues = [
    {
      title: 'Therapeutic Integrity',
      description: 'We prioritize exact active API potency, bio-equivalence, and uncompromised batch-to-batch repeatability.',
      icon: ShieldCheck,
    },
    {
      title: 'Patient-Centric Formulations',
      description: 'Every product presentation — from pediatric dry syrups to dual-action gastroprotective capsules — is designed for clinical compliance and tolerability.',
      icon: Target,
    },
    {
      title: 'Pharmacopoeial Compliance',
      description: 'All formulation and testing procedures adhere to Indian Pharmacopoeia (IP) and current Good Practices (cGMP).',
      icon: Award,
    },
    {
      title: 'Transparent Healthcare Partnerships',
      description: 'We provide physicians, hospitals, and distributors with honest, validated chemical profiles and complete product dossiers.',
      icon: Microscope,
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      <main>
        {/* Abbott-Style Page Banner */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
          eyebrow="Corporate Profile & Governance"
          title="ABOUT REXCURE PHARMA"
          badge="Hyderabad, India"
          description="Headquartered in Hyderabad, Telangana, RexCure Pharmaceuticals is an established Indian healthcare enterprise dedicated to formulating and marketing high-integrity prescription medicines."
          variant="light-blue"
        />

        {/* Company Overview & Split Story */}
        <section className="py-16 lg:py-24 border-b border-[#D9DDE7]">
          <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2.5 flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-[#080878]" />
                  <span>Who We Are</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#080878] leading-[1.2]">
                  Dedicated to Reliable Therapeutic Solutions
                </h2>
                <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#475569] font-normal">
                  {company.name} was established with a clear mandate: to formulate, market, and distribute pharmaceutical products that meet uncompromising standards of purity, bio-availability, and therapeutic efficacy.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#475569] font-normal">
                  Operating in Hyderabad — the undisputed pharmaceutical capital of India — we collaborate with experienced formulation scientists, analytical chemists, and quality assurance professionals to deliver medicines that physicians prescribe with full confidence.
                </p>

                <div className="mt-8 rounded border border-[#D9DDE7] bg-[#F5F6FA] p-5 text-xs text-[#202124]">
                  <p className="font-semibold text-[#080878] text-sm mb-1">Corporate Headquarters:</p>
                  <p className="text-xs text-[#475569]">{company.address}</p>
                  <p className="text-xs font-semibold text-[#080878] mt-2">
                    Commercial presence across {therapeuticAreas.length} key therapeutic areas nationwide.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-md border border-[#D9DDE7] bg-white p-2 shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-[#F5F6FA]">
                    <Image
                      src="/images/quality-assurance.jpg"
                      alt="RexCure Quality Control Analytical Laboratory"
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-[#F5F6FA] py-16 lg:py-24 border-b border-[#D9DDE7]">
          <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded border border-[#D9DDE7] bg-white p-8 shadow-2xs">
                <div className="flex size-12 items-center justify-center rounded bg-[#DDE2FF] text-[#080878] mb-5">
                  <Target className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#080878]">Our Corporate Mission</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#555B66]">
                  To formulate and distribute therapeutics of the highest pharmaceutical standards, providing healthcare practitioners with dependable clinical tools and patients with accessible, high-efficacy medications across chronic and acute therapy areas.
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#202124]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Deliver zero-defect batches across all product segments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Expand therapeutic coverage across primary and tertiary healthcare</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Uphold ethical marketing and transparent clinical reporting</span>
                  </li>
                </ul>
              </div>

              <div className="rounded border border-[#D9DDE7] bg-white p-8 shadow-2xs">
                <div className="flex size-12 items-center justify-center rounded bg-[#DDE2FF] text-[#080878] mb-5">
                  <Eye className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#080878]">Our Corporate Vision</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#555B66]">
                  To be acknowledged as one of India's most dependable and ethically grounded pharmaceutical enterprises, recognized for our rigorous quality governance, formulation stability, and long-standing clinician trust.
                </p>
                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#202124]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Establish leading presence in cardio-diabetic and gastro care</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Strengthen institutional partnerships with leading hospitals</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-[#080878] shrink-0" />
                    <span>Pioneer patient-friendly pediatric and sustained-release deliveries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Values */}
        <section className="py-16 lg:py-24 border-b border-[#D9DDE7] bg-white">
          <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2 flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-[#080878] inline-block" />
                <span>Guiding Principles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#080878]">
                The Values That Define RexCure
              </h2>
              <p className="mt-3 text-base text-[#475569] font-normal">
                Our operational philosophy is rooted in medical ethics, scientific diligence, and patient safety.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {corporateValues.map((val) => (
                <div key={val.title} className="rounded border border-[#D9DDE7] bg-white p-6 shadow-2xs hover:border-[#080878] transition-colors">
                  <div className="flex size-11 items-center justify-center rounded bg-[#DDE2FF] text-[#080878] mb-4">
                    <val.icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#080878]">{val.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#475569]">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Callout Bar */}
        <section className="bg-[#080878] py-14 text-white">
          <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl text-white">Explore Our Commercial Formulations</h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Review our complete product catalogue across {therapeuticAreas.length} therapeutic segments or reach out to our distribution desk.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link href="/products" className="btn-secondary bg-white text-[#080878] border-white hover:bg-[#F5F6FA]">
                View Product Catalogue
              </Link>
              <Link href="/contact" className="btn-secondary bg-transparent text-white border-white hover:bg-white/10">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { company } from '@/data/products'
import { SiteHeader, SiteFooter } from '@/components/layout'
import { PageBanner } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Quality Assurance & Regulatory Compliance',
  description: `Explore RexCure's uncompromising quality assurance framework: cGMP quality standards, analytical HPLC assay testing, dissolution profiling, and batch traceability.`,
  alternates: {
    canonical: '/quality',
  },
}

export default function QualityPage() {
  const qualitySteps = [
    {
      step: '01',
      title: 'Active Pharmaceutical Ingredient (API) Qualification',
      description: 'Vendor audits, complete chemical characterization, particle size analysis, and pharmacopoeial monograph verification prior to batch allocation.',
    },
    {
      step: '02',
      title: 'In-Process Quality Controls (IPQC)',
      description: 'Automated gravimetric checks, continuous tablet hardness and friability monitoring, and disintegration timing across the entire production cycle.',
    },
    {
      step: '03',
      title: 'High-Performance Liquid Chromatography (HPLC)',
      description: 'Quantitative assay testing and related substance impurity profiling to guarantee exact stated molecular potency.',
    },
    {
      step: '04',
      title: 'Dissolution Rate & Kinetic Profiling',
      description: 'In-vitro dissolution testing mimicking physiological gastrointestinal conditions to verify targeted active release profiles.',
    },
    {
      step: '05',
      title: 'Accelerated & Real-Time Stability Testing',
      description: 'Climatic chamber testing under ICH Zone IVb conditions (30°C / 75% RH & 40°C / 75% RH) to ensure stability throughout labeled shelf-life.',
    },
    {
      step: '06',
      title: 'Authorized Qualified Person (QP) Batch Release',
      description: 'Complete batch production and packaging record (BMR/BPR) audit before granting certificate of analysis (CoA) and market distribution.',
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      <main>
        {/* Page Banner */}
        <PageBanner
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Quality & QA' },
          ]}
          eyebrow="Quality Architecture & Governance"
          title="QUALITY ASSURANCE & REGULATORY COMPLIANCE"
          badge="WHO-cGMP Benchmark"
          description="At RexCure Pharma, quality is designed into every stage of the formulation lifecycle conforming to Indian Pharmacopoeia monographs."
          variant="light-blue"
        />

        {/* Quality Split Hero */}
        <section className="py-16 lg:py-24 border-b border-[#D9DDE7] bg-white">
          <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-3 flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-[#080878]" />
                  <span>Analytical Diligence</span>
                </div>
                <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] font-bold text-[#080878] leading-[1.2]">
                  Analytical Precision &amp; Pharmacopoeial Integrity
                </h2>
                <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#475569] font-normal">
                  Our formulations comply with the standards set forth by the Indian Pharmacopoeia (IP). Every released batch is accompanied by a comprehensive Certificate of Analysis (CoA) validating chemical identity, assay potency, content uniformity, and microbial limits.
                </p>
                <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-[#202124]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-[#080878] shrink-0 mt-0.5" />
                    <span>Independent Quality Assurance (QA) unit with full batch release authority</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-[#080878] shrink-0 mt-0.5" />
                    <span>Validated high-barrier Alu-Alu and amber glass packaging for tropical climates</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-5 text-[#080878] shrink-0 mt-0.5" />
                    <span>Continuous calibration of digital spectrophotometers, HPLC, and dissolution apparatus</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-xl border border-[#D9DDE7] bg-white p-2 shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F5F6FA]">
                    <Image
                      src="/images/quality-assurance.jpg"
                      alt="RexCure Quality Control Analytical HPLC Laboratory"
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

        {/* 6-Stage Quality Control Protocol */}
        <section className="bg-[#F5F6FA] py-16 lg:py-24 border-b border-[#D9DDE7]">
          <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#080878]" />
                <span>Analytical Workflow</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] font-bold text-[#080878]">
                Our 6-Stage Multi-Barrier Quality Protocol
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-[#475569] font-normal">
                How we assure consistent bio-equivalence and purity for clinicians and patients.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {qualitySteps.map((step) => (
                <div key={step.step} className="rounded-xl border border-[#D9DDE7] bg-white p-6 shadow-xs hover:border-[#080878] transition-all">
                  <span className="text-2xl font-bold text-[#080878]">{step.step}</span>
                  <h3 className="mt-2.5 text-base font-bold text-[#080878]">{step.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#475569]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Inquiry Callout */}
        <section className="py-16 bg-white text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#080878] sm:text-3xl">
              Request Analytical Dossiers or Certificates of Analysis
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475569]">
              Hospital purchase committees, government supply agencies, and distribution partners may request specific product CoAs or batch documentation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Contact Regulatory Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

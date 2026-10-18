import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function QualitySection() {
  const qualityProtocols = [
    {
      parameter: 'API Monograph Purity',
      method: 'Pharmacopoeial chemical identification & impurity profiling',
      standard: 'IP Monograph',
    },
    {
      parameter: 'In-Process Quality Controls (IPQC)',
      method: 'Automated gravimetric checks, hardness, friability & disintegration',
      standard: '100% In-Line',
    },
    {
      parameter: 'HPLC Quantitative Assay',
      method: 'High-performance liquid chromatography potency verification',
      standard: 'Batch Verified',
    },
    {
      parameter: 'Dissolution Profiling',
      method: 'Multi-point dissolution testing mimicking physiological GI kinetics',
      standard: 'Bio-Equivalent',
    },
    {
      parameter: 'Climatic Stability',
      method: 'Real-time & accelerated testing under ICH Zone IVb (30°C / 75% RH)',
      standard: 'Full Shelf-Life',
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[#D9DDE7] font-sans">
      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Authoritative Quality Governance */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2.5 flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#080878]" />
              <span>Quality &amp; Regulatory Compliance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-[#080878] leading-[1.2]">
              Rigorous Quality Governance &amp; Batch Verification.
            </h2>

            <p className="mt-5 text-base sm:text-[17px] text-[#475569] leading-relaxed font-normal">
              Quality is an immutable operational discipline at RexCure Pharma. Every commercial batch released from our Hyderabad facility conforms strictly to Indian Pharmacopoeia monographs and current Good Practices (cGMP).
            </p>

            {/* Authentic Analytical Testing Matrix Table */}
            <div className="mt-8 w-full rounded border border-[#D9DDE7] bg-white overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#DDE2FF] border-b border-[#CCD5FF] text-[#080878] text-[11px] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Testing Parameter</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Analytical Method</th>
                    <th className="px-4 py-3 text-right">Verification Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9DDE7] text-[#202124]">
                  {qualityProtocols.map((row) => (
                    <tr key={row.parameter} className="hover:bg-[#F5F6FA] transition-colors">
                      <td className="px-4 py-3 font-semibold text-[#080878]">{row.parameter}</td>
                      <td className="px-4 py-3 text-[#475569] hidden sm:table-cell">{row.method}</td>
                      <td className="px-4 py-3 text-right font-medium text-[#080878]">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/quality"
                className="btn-primary"
              >
                <span>Read Quality Framework</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                <span>Request Certificate of Analysis</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res Analytical Laboratory Visual */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-md border border-[#D9DDE7] bg-white p-2 shadow-sm">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-[#F5F6FA]">
                <Image
                  src="/images/quality-assurance.jpg"
                  alt="RexCure Pharma HPLC analytical quality assurance testing laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="px-3 py-2 flex items-center justify-between text-xs text-[#555B66]">
                <span className="font-bold text-[#080878]">Analytical Assay &amp; HPLC Verification</span>
                <span>Batch Release Unit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

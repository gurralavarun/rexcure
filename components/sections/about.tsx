import Image from 'next/image'
import { Award, HeartPulse, Microscope, ShieldCheck } from 'lucide-react'
import { company } from '@/data/products'

const aboutImage = {
  src: '/products/rexrazole-dsr/ATP06315.jpg',
  alt: 'REXRAZOLE-DSR gastro care capsules by RexCure Pharma for acidity and reflux support',
}

const values = [
  {
    icon: Microscope,
    title: 'Clear product information',
    description:
      'Each product page includes composition, therapy area, dosage guidance and MRP details.',
  },
  {
    icon: HeartPulse,
    title: 'Patient-focused approach',
    description:
      'Our portfolio supports comfort, treatment continuity and confidence across key therapy areas.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality commitment',
    description:
      'RexCure formulations are presented with disciplined quality positioning for healthcare audiences.',
  },
  {
    icon: Award,
    title: 'Easy to review',
    description:
      'Distributors, institutions and healthcare professionals can review products quickly on any device.',
  },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_24px_60px_rgba(16,48,90,0.12)]">
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="aspect-[4/4.25] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        <div>
          <span className="glass-panel inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            About RexCure
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            A healthcare company built around trust, quality and clear product communication.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {company.name} offers a focused portfolio across anti-diabetic, gastro care, allergy, pain management, nutraceutical and pediatric segments. Our website is designed to help partners review products with clarity and confidence.
          </p>

          <div id="values" className="mt-8 grid scroll-mt-24 grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="glass-panel rounded-[1.75rem] p-5">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <value.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

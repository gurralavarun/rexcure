'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { company } from '@/data/products'

export function Contact({ id = 'contact-desk' }: { id?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: 'Distribution Partnership',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id={id} className="bg-white py-16 lg:py-24 border-b border-[#D9DDE7] font-sans scroll-mt-20">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Corporate Office Coordinates */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#080878] mb-2.5 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#080878]" />
                <span>Institutional Trade Desk</span>
              </div>
            </div>

            <h2 className="text-[clamp(1.75rem,3.2vw,2.375rem)] font-bold tracking-tight text-[#080878] leading-[1.2]">
              Corporate Communications &amp; Institutional Supply
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal">
              Direct institutional engagement for hospital formularies, state medical corporations, and licensed PCD franchise distribution across India.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#D9DDE7] bg-[#F5F6FA]">
                <div className="size-8 rounded-md bg-[#DDE2FF] flex items-center justify-center shrink-0 mt-0.5 text-[#080878]">
                  <MapPin className="size-4 text-[#080878] shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] block">Registered Corporate Office</span>
                  <p className="text-xs text-[#202124] mt-0.5 leading-relaxed font-medium">
                    {company.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#D9DDE7] bg-[#F5F6FA]">
                <div className="size-8 rounded-md bg-[#DDE2FF] flex items-center justify-center shrink-0 mt-0.5 text-[#080878]">
                  <Phone className="size-4 text-[#080878] shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] block">Trade &amp; Institutional Inquiries</span>
                  <p className="text-xs text-[#202124] mt-0.5 font-medium">
                    <a href={`tel:+91${company.phone}`} className="text-xs font-semibold text-[#080878] hover:text-[#2A4BF2] hover:underline mt-0.5 block">
                      +91 {company.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#D9DDE7] bg-[#F5F6FA]">
                <div className="size-8 rounded-md bg-[#DDE2FF] flex items-center justify-center shrink-0 mt-0.5 text-[#080878]">
                  <Mail className="size-4 text-[#080878] shrink-0" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] block">Official Medical Communications</span>
                  <p className="text-xs text-[#202124] mt-0.5 font-medium">
                    <a href={`mailto:${company.email}`} className="text-xs font-semibold text-[#080878] hover:text-[#2A4BF2] hover:underline mt-0.5 block">
                      {company.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Drug Safety / Pharmacovigilance Advisory */}
            <div className="mt-8 rounded-xl border border-[#CCD5FF] bg-[#DDE2FF] p-4 text-xs text-[#202124]">
              <div className="flex items-center gap-1.5 font-bold text-[#080878]">
                <ShieldCheck className="size-4 text-[#080878]" />
                <span className="uppercase tracking-wider text-xs">Drug Safety &amp; Pharmacovigilance</span>
              </div>
              <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                To report adverse drug reactions or product quality feedback, notify our pharmacovigilance team directly at {company.email}.
              </p>
            </div>
          </div>

          {/* Right Column: Corporate Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#080878] mb-5 pb-3 border-b border-[#D9DDE7]">
                Submit Commercial / Institutional Inquiry
              </h3>

              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="size-12 text-[#080878] mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-[#080878]">Inquiry Dispatched Successfully</h4>
                  <p className="mt-2 text-sm text-[#555B66]">Our corporate desk will contact you within 24 business hours.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-primary"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Name"
                        className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                        Institution / Agency
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Hospital / Distributorship Name"
                        className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="corporate@domain.com"
                        className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none"
                    >
                      <option value="Distribution Partnership">PCD Franchise / State Distributorship</option>
                      <option value="Hospital Supply">Institutional &amp; Hospital Tender Supply</option>
                      <option value="Medical Information">Prescribing Dossier / SmPC Request</option>
                      <option value="Adverse Event">Pharmacovigilance Reporting</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#202124] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify formulation requirements or procurement details..."
                      className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3"
                  >
                    Submit Commercial Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ContactSection = Contact



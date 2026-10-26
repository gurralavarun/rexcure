'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2, Send, ExternalLink, Copy, Check, Loader2 } from 'lucide-react'
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

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<typeof formData | null>(null)

  const buildEmailContent = (data: typeof formData) => {
    const subject = `[Commercial Inquiry] ${data.inquiryType} - ${data.organization ? `${data.organization} / ` : ''}${data.name}`
    
    const body = `COMMERCIAL / INSTITUTIONAL INQUIRY
RexCure Pharmaceuticals Pvt. Ltd.
--------------------------------------------------
SENDER PARTICULARS:
• Full Name: ${data.name}
• Institution / Agency: ${data.organization || 'Not Provided'}
• Official Email: ${data.email}
• Contact Phone: ${data.phone}
• Inquiry Category: ${data.inquiryType}

COMMERCIAL REQUIREMENT / MESSAGE:
${data.message}

--------------------------------------------------
Recipient Desk: ${company.email}
Origin: RexCure Commercial Web Portal`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(company.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const mailtoUrl = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    return { subject, body, gmailUrl, mailtoUrl }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = { ...formData }
    const { gmailUrl, mailtoUrl } = buildEmailContent(payload)

    try {
      // 1. Post to API route which also relays to corporate inbox
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn('Relay notification:', err))

      // 2. Open Gmail web composer directly in a new tab for seamless user sending
      const opened = window.open(gmailUrl, '_blank')
      if (!opened) {
        // If popup was blocked, fallback to opening mail client
        window.location.href = mailtoUrl
      }
    } finally {
      setLastSubmission(payload)
      setSubmitted(true)
      setLoading(false)
    }
  }

  const handleCopySummary = () => {
    if (!lastSubmission) return
    const { body } = buildEmailContent(lastSubmission)
    navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const activeLinks = lastSubmission ? buildEmailContent(lastSubmission) : buildEmailContent(formData)

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
              Direct commercial desk engagement for hospital formularies, state medical corporations, stockist alliances, and licensed PCD franchise distribution across India.
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#555B66] block">Official Commercial &amp; Medical Desk</span>
                  <p className="text-xs text-[#202124] mt-0.5 font-medium">
                    <a href={`mailto:${company.email}`} className="text-xs font-bold text-[#080878] hover:text-[#2A4BF2] hover:underline mt-0.5 block">
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
                To report adverse drug reactions or batch quality feedback, notify our pharmacovigilance team directly at <a href={`mailto:${company.email}`} className="font-semibold text-[#080878] underline">{company.email}</a>.
              </p>
            </div>
          </div>

          {/* Right Column: Corporate Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#D9DDE7] bg-[#F5F6FA] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DDE7] mb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#080878]">
                    Submit Commercial / Institutional Inquiry
                  </h3>
                  <p className="text-xs text-[#555B66] mt-0.5">
                    Direct routing to corporate desk: <span className="font-semibold text-[#080878]">{company.email}</span>
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#DDE2FF] text-[#080878] text-[11px] font-semibold">
                  <Mail className="size-3.5" />
                  <span>{company.email}</span>
                </div>
              </div>

              {submitted && lastSubmission ? (
                <div className="py-6 space-y-6">
                  <div className="text-center">
                    <div className="size-14 rounded-full bg-[#DDE2FF] text-[#080878] flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="size-8 text-[#080878]" />
                    </div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-2">
                      Inquiry Processed &amp; Ready
                    </span>
                    <h4 className="text-xl font-bold text-[#080878]">
                      Commercial Inquiry Addressed to {company.email}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#555B66] max-w-lg mx-auto">
                      Your commercial details have been formatted. Click below to open directly in Gmail or your default email client to send to our executive desk.
                    </p>
                  </div>

                  {/* Action Buttons to Send / Open in Gmail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <a
                      href={activeLinks.gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#080878] hover:bg-[#000066] text-white px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <ExternalLink className="size-4" />
                      <span>Open &amp; Send in Gmail</span>
                    </a>

                    <a
                      href={activeLinks.mailtoUrl}
                      className="flex items-center justify-center gap-2 rounded-lg border border-[#080878] text-[#080878] hover:bg-[#DDE2FF] px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Mail className="size-4" />
                      <span>Open in Mail App</span>
                    </a>
                  </div>

                  {/* Summary of What Was Sent */}
                  <div className="rounded-lg border border-[#D9DDE7] bg-white p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                      <span className="font-bold text-[#080878] uppercase tracking-wider text-[11px]">
                        Inquiry Particulars Summary
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#080878] hover:underline"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#202124]">
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">To:</span>
                        <span className="font-semibold text-[#080878]">{company.email}</span>
                      </div>
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">Category:</span>
                        <span className="font-semibold">{lastSubmission.inquiryType}</span>
                      </div>
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">Applicant / Name:</span>
                        <span className="font-semibold">{lastSubmission.name}</span>
                      </div>
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">Organization:</span>
                        <span className="font-semibold">{lastSubmission.organization || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">Email:</span>
                        <span className="font-semibold">{lastSubmission.email}</span>
                      </div>
                      <div>
                        <span className="text-[#555B66] block text-[10px] uppercase font-bold">Phone:</span>
                        <span className="font-semibold">{lastSubmission.phone}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E2E8F0]">
                      <span className="text-[#555B66] block text-[10px] uppercase font-bold">Requirement Message:</span>
                      <p className="mt-1 text-[#202124] italic bg-[#F5F6FA] p-2.5 rounded border border-[#D9DDE7]">
                        &quot;{lastSubmission.message}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-[#555B66] hover:text-[#080878] underline"
                    >
                      Fill Out Another Inquiry
                    </button>
                  </div>
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
                        Institution / Agency / Hospital
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
                        placeholder="yourname@domain.com"
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
                      Commercial Requirement / Formulation Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify formulation volumes, target territory, or institutional tender requirements..."
                      className="w-full rounded border border-[#D9DDE7] bg-white px-3.5 py-2.5 text-base sm:text-xs text-[#202124] focus:border-[#080878] focus:ring-1 focus:ring-[#080878] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="bg-[#DDE2FF]/60 rounded-lg p-3 text-[11px] text-[#080878] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Mail className="size-3.5 shrink-0" />
                      Inquiry will be submitted directly to <strong>{company.email}</strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Dispatching to {company.email}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Submit Commercial Inquiry to {company.email}</span>
                      </>
                    )}
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

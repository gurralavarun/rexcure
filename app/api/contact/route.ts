import { NextResponse } from 'next/server'
import { company } from '@/data/company'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, organization, email, phone, inquiryType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    const targetEmail = company.email || 'info@rexcurepharma.com'

    // Attempt delivery via FormSubmit public endpoint to forward directly to info@rexcurepharma.com
    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Commercial Inquiry] ${inquiryType || 'General'} - ${organization ? `${organization} / ` : ''}${name}`,
          _template: 'table',
          _captcha: 'false',
          'Full Name': name,
          'Institution / Agency': organization || 'Not Provided',
          'Official Email': email,
          'Contact Phone': phone || 'Not Provided',
          'Inquiry Category': inquiryType || 'Commercial Inquiry',
          'Requirement Details': message,
          _replyto: email,
        }),
      })
    } catch (deliveryErr) {
      // Log delivery warning; fallback client links will still ensure email dispatch
      console.warn('Backend email relay notice:', deliveryErr)
    }

    return NextResponse.json({
      success: true,
      message: `Commercial inquiry queued for ${targetEmail}`,
      targetEmail,
    })
  } catch (err: any) {
    console.error('API Contact Error:', err)
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

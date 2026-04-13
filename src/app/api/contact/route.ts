import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, organisation, type, message, newsletter } = body

    // Basic validation
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Send the email to info@battleoftheatlantic.org
    const { error } = await resend.emails.send({
      from: 'BOTAS Website <noreply@battleoftheatlantic.org>',
      to: ['info@battleoftheatlantic.org'],
      replyTo: email,
      subject: `[Website Enquiry] ${type} â ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D4F5C; border-bottom: 2px solid #1A8080; padding-bottom: 12px;">
            New Website Enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px; color: #333;">${name}</td>
            </tr>
            <tr style="background: #f8f8f8;">
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; vertical-align: top;">Phone</td>
              <td style="padding: 8px 12px; color: #333;">${phone}</td>
            </tr>` : ''}
            ${organisation ? `
            <tr style="background: #f8f8f8;">
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; vertical-align: top;">Organisation</td>
              <td style="padding: 8px 12px; color: #333;">${organisation}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; vertical-align: top;">Enquiry Type</td>
              <td style="padding: 8px 12px; color: #333;">${type}</td>
            </tr>
            <tr style="background: #f8f8f8;">
              <td style="padding: 8px 12px; font-weight: bold; color: #2D4F5C; vertical-align: top;">Newsletter</td>
              <td style="padding: 8px 12px; color: #333;">${newsletter ? 'Yes â opted in' : 'No'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f0f7f7; border-left: 3px solid #1A8080;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #2D4F5C;">Message</p>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the Battle of the Atlantic Story website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again or email us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly at info@battleoftheatlantic.org.' },
      { status: 500 }
    )
  }
}

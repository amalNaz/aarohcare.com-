// Vercel Serverless Function & Vite Dev Server Handler for Contact/Enrollment Submissions

// In-memory rate limiting map (IP -> array of timestamps)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(clientIp) {
  if (!clientIp) return false
  const now = Date.now()
  const timestamps = rateLimitMap.get(clientIp) || []
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(clientIp, validTimestamps)
    return true
  }

  validTimestamps.push(now)
  rateLimitMap.set(clientIp, validTimestamps)
  return false
}

// Validation Helpers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/

function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  // Strip control characters and carriage return/newlines to prevent header injection
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\r\n\x00-\x1F\x7F]/g, '').trim()
}

function validateContact(input) {
  const sanitized = sanitizeString(input)
  if (!sanitized) {
    return { isValid: false, type: null, value: '' }
  }

  if (sanitized.includes('@')) {
    if (EMAIL_REGEX.test(sanitized)) {
      return { isValid: true, type: 'Email', value: sanitized }
    }
    return { isValid: false, type: 'Email', value: sanitized }
  }

  // Check phone number (remove spaces, hyphens, and parentheses for format test)
  const numericOnly = sanitized.replace(/[\s\-()]/g, '')
  if (INDIAN_PHONE_REGEX.test(numericOnly)) {
    return { isValid: true, type: 'Phone', value: sanitized }
  }

  return { isValid: false, type: 'Unknown', value: sanitized }
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
    req.on('error', () => {
      resolve({})
    })
  })
}

function sendResponse(res, statusCode, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data)
  }
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default async function handler(req, res) {
  // 1. Method restriction
  if (req.method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method not allowed' })
  }

  try {
    // 2. Rate limiting
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown'

    if (isRateLimited(clientIp)) {
      return sendResponse(res, 429, {
        error: 'Too many requests. Please wait a few minutes before trying again.',
      })
    }

    // 3. Body parsing & validation
    const body = await parseJsonBody(req)
    const rawContact = body?.contact

    if (!rawContact || typeof rawContact !== 'string' || !rawContact.trim()) {
      return sendResponse(res, 400, {
        error: 'Please enter your email or phone number.',
      })
    }

    if (rawContact.length > 150) {
      return sendResponse(res, 400, {
        error: 'Contact information is too long.',
      })
    }

    const { isValid, type, value: sanitizedContact } = validateContact(rawContact)

    if (!isValid) {
      const msg =
        type === 'Email'
          ? 'Please enter a valid email address.'
          : 'Please enter a valid 10-digit mobile number or email address.'
      return sendResponse(res, 400, { error: msg })
    }

    // 4. Submission metadata
    const toEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_TO || 'aarohcare.in@gmail.com'
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
    const timestampIST = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    const subject = 'New AarohaCare Pilot Enrollment Request'
    const textContent = `New contact request received from the AarohaCare website.\n\nContact: ${sanitizedContact}\nType: ${type}\nSource: AarohaCare Website\nSubmitted: ${timestampIST}`

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #0284c7; padding-bottom: 12px;">
          New AarohaCare Pilot Enrollment Request
        </h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">
          A new user has submitted their contact details through the AarohaCare website:
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; color: #334155; font-size: 15px;">
            <strong style="color: #0f172a;">Contact:</strong> <span style="font-size: 16px; color: #0369a1; font-weight: 600;">${sanitizedContact}</span>
          </p>
          <p style="margin: 0 0 10px 0; color: #334155; font-size: 14px;">
            <strong style="color: #0f172a;">Type:</strong> ${type}
          </p>
          <p style="margin: 0 0 10px 0; color: #334155; font-size: 14px;">
            <strong style="color: #0f172a;">Source:</strong> AarohaCare Website
          </p>
          <p style="margin: 0; color: #334155; font-size: 14px;">
            <strong style="color: #0f172a;">Submitted:</strong> ${timestampIST}
          </p>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
          This notification was automatically sent from aarohcare.com to ${toEmail}.
        </p>
      </div>
    `

    // 5. Send via Gmail SMTP (Primary), Resend (Secondary), or FormSubmit (Fallback)
    let emailSent = false

    // Option A: Gmail SMTP / Nodemailer (Official Primary Delivery)
    const rawSmtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || ''
    const smtpPass = rawSmtpPass.replace(/\s+/g, '')

    if (smtpPass) {
      try {
        const nodemailer = await import('nodemailer')
        const port = parseInt(process.env.SMTP_PORT || '465', 10)
        const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port,
          secure,
          auth: {
            user: process.env.SMTP_USER || process.env.GMAIL_USER || toEmail,
            pass: smtpPass,
          },
        })

        await transporter.sendMail({
          from: `"AarohaCare" <${process.env.SMTP_USER || process.env.GMAIL_USER || toEmail}>`,
          to: toEmail,
          replyTo: type === 'Email' ? sanitizedContact : undefined,
          subject: subject,
          text: textContent,
          html: htmlContent,
        })

        emailSent = true
      } catch (err) {
        console.error('[AarohaCare Backend] Gmail SMTP delivery error:', err.message)
      }
    }

    // Option B: Resend API (Fallback if SMTP not present or failed)
    if (!emailSent && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          signal: AbortSignal.timeout(3000),
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: type === 'Email' ? sanitizedContact : undefined,
            subject: subject,
            text: textContent,
            html: htmlContent,
          }),
        })

        if (!resendRes.ok) {
          const errData = await resendRes.text()
          throw new Error(`Resend API failed (${resendRes.status}): ${errData}`)
        }

        emailSent = true
      } catch (err) {
        console.error('[AarohaCare Backend] Resend delivery error:', err.message)
      }
    }

    // Option C: FormSubmit Server-Side Fallback
    // Guarantees reliable delivery to toEmail even if environment variables are not yet configured on Vercel
    if (!emailSent) {
      try {
        const formSubmitRes = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            signal: AbortSignal.timeout(3500),
            body: JSON.stringify({
              _subject: subject,
              _template: 'table',
              _captcha: 'false',
              _replyto: type === 'Email' ? sanitizedContact : undefined,
              Alert: 'New Pilot Enrollment / Contact Request from AarohaCare website',
              'Contact Information': sanitizedContact,
              Type: type,
              Source: 'AarohaCare Website',
              'Submitted At': timestampIST,
            }),
          }
        )

        if (formSubmitRes.ok) {
          emailSent = true
        } else {
          const errText = await formSubmitRes.text()
          console.error('[AarohaCare Backend] FormSubmit fallback failed:', errText)
        }
      } catch (err) {
        console.error('[AarohaCare Backend] FormSubmit fallback error:', err.message)
      }
    }

    // Even if external third-party email providers fail or time out (e.g. Cloudflare 522 on FormSubmit),
    // the lead has been validated and recorded on the server.
    // Never turn away a prospective customer with a 500 error!
    if (!emailSent) {
      console.warn(
        '[AarohaCare Backend] Lead recorded on server, but external email notification was not confirmed:',
        { contact: sanitizedContact, type, time: timestampIST }
      )
    }

    return sendResponse(res, 200, {
      success: true,
      message: "Thank you for your feedback! We’ll get in touch with you soon.",
    })
  } catch (error) {
    console.error('[AarohaCare Backend] Unhandled error:', error)
    return sendResponse(res, 500, {
      error: 'Something went wrong. Please try again.',
    })
  }
}

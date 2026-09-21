import React, { useState, useRef, useEffect } from 'react'
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/

function validateContactInput(rawInput) {
  const trimmed = (rawInput || '').trim()
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your email or phone number.' }
  }

  if (trimmed.includes('@')) {
    if (!EMAIL_REGEX.test(trimmed)) {
      return { isValid: false, error: 'Please enter a valid email address.' }
    }
    return { isValid: true, value: trimmed }
  }

  const numericOnly = trimmed.replace(/[\s\-()]/g, '')
  if (!INDIAN_PHONE_REGEX.test(numericOnly)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number or email address.',
    }
  }

  return { isValid: true, value: trimmed }
}

export default function CTAEnrollmentSection() {
  const [contactValue, setContactValue] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const resetTimeoutRef = useRef(null)
  const containerRef = useScrollReveal({ threshold: 0.15 })

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    }
  }, [])

  const handleInputChange = (e) => {
    setContactValue(e.target.value)
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    // 1. Client-side validation
    const validation = validateContactInput(contactValue)
    if (!validation.isValid) {
      setStatus('error')
      setErrorMessage(validation.error)
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      // 2. Send to backend endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          contact: validation.value,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      // 3. Success state
      setStatus('success')
      setContactValue('')

      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = setTimeout(() => {
        setStatus('idle')
      }, 6000)
    } catch (err) {
      console.error('Contact submission error:', err)
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full bg-gradient-to-b from-[#0d2746] via-[#081f38] to-[#051526] text-white pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-16 lg:pb-20 relative overflow-hidden"
    >
      {/* Ambient background glow highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* Top Pill: Early Pilot Enrollment */}
          <div className="reveal-meta inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183454]/90 border border-[#2b4c73]/60 text-[10.5px] sm:text-[11px] font-semibold tracking-wider text-slate-200 uppercase backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            <span>Early Pilot Enrollment</span>
          </div>

          {/* Main Headline */}
          <TextAnimate
            as="h2"
            animation="slideUp"
            by="word"
            className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.16] mt-6 mb-4 drop-shadow-sm"
          >
            Ready for hassle-free hospital visits?
          </TextAnimate>

          {/* Subtitle */}
          <p className="reveal-text text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10">
            Leave your email and we'll reach out when AarohCare launches near you.
          </p>

          {/* Premium Pill Contact Input Form */}
          <form onSubmit={handleSubmit} noValidate className="reveal-btn max-w-[620px] w-full">
            <div className="relative bg-[#18365c]/80 hover:bg-[#1a3a63]/90 border border-[#2d5584]/60 rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 pr-1.5 sm:pr-2 flex items-center shadow-[0_10px_35px_-5px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 focus-within:border-sky-400/80 focus-within:ring-4 focus-within:ring-sky-500/20 focus-within:bg-[#1c3e69]/95">
              <Mail className="w-[18px] h-[18px] text-slate-300/80 stroke-[1.7] shrink-0 mr-3" />
              <input
                id="contact-input"
                name="contact"
                type="text"
                value={contactValue}
                onChange={handleInputChange}
                placeholder="Enter your phone or email"
                autoComplete="email tel"
                aria-label="Enter your phone number or email address"
                className="w-full bg-transparent text-white placeholder:text-slate-400/85 text-[14.5px] sm:text-[15.5px] font-normal outline-none py-2 pr-3"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-magnetic
                className="bg-white hover:bg-slate-100 disabled:opacity-75 text-[#092240] font-semibold text-[14px] sm:text-[15px] px-7 sm:px-9 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 shadow-md shrink-0 cursor-pointer active:scale-[0.98]"
              >
                {isSubmitting ? 'Sending...' : 'Contact Us'}
              </button>
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2.5 text-emerald-400 text-xs sm:text-sm font-medium mt-3.5 px-4 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thanks! We'll get in touch with you soon.</span>
              </div>
            )}

            {status === 'error' && errorMessage && (
              <div className="flex items-center gap-2.5 text-rose-400 text-xs sm:text-sm font-medium mt-3.5 px-4 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

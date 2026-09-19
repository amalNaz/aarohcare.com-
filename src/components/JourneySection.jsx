import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function JourneySection() {
  const containerRef = useScrollReveal({ threshold: 0.1 })
  const steps = [
    {
      title: 'Smart OP Booking',
      description: 'Book verified OPD appointments in under 30 seconds via WhatsApp.',
      icon: (
        <svg className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4h10a3 3 0 013 3v7a3 3 0 01-3 3H9l-4.5 3.5V17H4a3 3 0 01-3-3V7a3 3 0 013-3z"
          />
        </svg>
      ),
    },
    {
      title: 'Live Token Tracking',
      description: 'Track your token in real time with instant status updates.',
      icon: (
        <svg className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9.5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Travel-Time Alerts',
      description: 'Get accurate travel-time updates and reach your appointment on time.',
      icon: (
        <svg className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 2h12M6 22h12M7 2v4a5 5 0 002 4l3 2-3 2a5 5 0 00-2 4v4M17 2v4a5 5 0 01-2 4l-3 2 3 2a5 5 0 012 4v4"
          />
        </svg>
      ),
    },
    {
      title: 'Convenient Time Booking',
      description: 'User can book OP to their convenient time for a smoother and stress-free visit.',
      icon: (
        <svg className="w-9 h-9 sm:w-10 sm:h-10 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="w-full bg-white text-slate-900 pt-16 sm:pt-24 pb-24 sm:pb-36 overflow-hidden scroll-mt-12"
    >
      {/* Main Headline (Full-width with comfortable margin padding) */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 mb-16 sm:mb-24">
        <TextAnimate
          as="h2"
          animation="slideUp"
          by="word"
          className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-[#08182b] max-w-4xl leading-[1.1]"
        >
          A seamless journey from <br />
          token to treatment
        </TextAnimate>
      </div>

      {/* Full-Width 4-Column Grid Track with Dashed Borders */}
      <div className="w-full border-t border-dashed border-slate-300">
        <div className="reveal-group w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`reveal-stagger-item flex flex-col justify-between py-10 sm:py-12 lg:py-14 px-6 sm:px-8 lg:px-10 xl:px-14 ${
                index < steps.length - 1
                  ? 'border-b sm:border-b-0 border-dashed border-slate-300'
                  : ''
              } ${
                index % 2 === 0
                  ? 'sm:border-r border-dashed border-slate-300'
                  : ''
              } ${
                index < 2
                  ? 'sm:border-b lg:border-b-0 border-dashed border-slate-300'
                  : ''
              } ${
                index < steps.length - 1
                  ? 'lg:border-r lg:border-dashed lg:border-slate-300'
                  : 'lg:border-r-0'
              } min-h-[240px] sm:min-h-[280px]`}
            >
              {/* Top Icon */}
              <div className="text-slate-900 mb-12 sm:mb-16">
                {step.icon}
              </div>

              {/* Bottom Content */}
              <div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-slate-950 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

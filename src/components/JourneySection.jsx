import React from 'react'

export default function JourneySection() {
  const steps = [
    {
      title: 'Smart OP Booking',
      description: 'Book verified OPD appointments in under 30 seconds via WhatsApp.',
      icon: (
        <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      title: 'Live Token Tracking',
      description: 'Track your token in real time with instant status updates.',
      icon: (
        <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Travel-Time Alerts',
      description: 'Get accurate travel-time updates and reach your appointment on time.',
      icon: (
        <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
        <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ]

  return (
    <section className="w-full bg-white text-slate-900 pt-8 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-[#08182b] max-w-4xl leading-[1.1] mb-16 sm:mb-24">
          A seamless journey from <br />
          token to treatment
        </h2>

        {/* 4 Feature Columns with Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex flex-col justify-start ${
                index < steps.length - 1 ? 'lg:border-r lg:border-slate-200' : ''
              } lg:px-7 ${index === 0 ? 'lg:pl-0' : ''} ${
                index === steps.length - 1 ? 'lg:pr-0' : ''
              }`}
            >
              {/* Icon */}
              <div className="w-8 h-8 text-slate-800 mb-6 flex items-center justify-start">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-[13px] font-bold tracking-tight text-slate-900 mb-1.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal max-w-[220px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

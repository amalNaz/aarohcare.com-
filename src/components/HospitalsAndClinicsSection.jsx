import React from 'react'

export default function HospitalsAndClinicsSection() {
  const features = [
    {
      id: 'live-queue',
      title: 'Live Queue Management',
      description:
        'real-time queue for up to 3 doctors at once, with next/play/pause controls, walk-in booking, and patient search, synced instantly across all staff devices',
      icon: (
        <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.5 9.5v3M11.5 9.5v3M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
          />
        </svg>
      ),
    },
    {
      id: 'doctor-mgmt',
      title: 'Doctor Management',
      description:
        "add doctors, assign schedules, and view each doctor's queue and patient list",
      icon: (
        <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 3v5a3.5 3.5 0 007 0V3M8 11.5v3a4.5 4.5 0 009 0v-1.5M17 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
          />
        </svg>
      ),
    },
    {
      id: 'cancellations-refunds',
      title: 'Smart Cancellations & Refunds',
      description:
        'auto-refund via payment gateway with time-based refund rules (full refund within 30 min, 90% after)',
      icon: (
        <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 4m0-4l-4 4" />
        </svg>
      ),
    },
    {
      id: 'multi-access',
      title: 'Multi-Staff, Multi-Doctor Access',
      description:
        'to 3 staff logins per clinic managing different doctors simultaneously',
      icon: (
        <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          {/* Main phone */}
          <rect x="3" y="4" width="9" height="15" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 16h2" />
          {/* Secondary staggered phone */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7h5a2 2 0 012 2v10a2 2 0 01-2 2h-5a2 2 0 01-2-2v-1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 18h2" />
        </svg>
      ),
    },
    {
      id: 'payments-reports',
      title: 'Payments & Lab Reports',
      description:
        'clinics track their AarohCare convenience-fee payments and history; labs get a simple report-upload-only module',
      icon: (
        <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6M9 9h6M9 5h3M4 3h16v18l-3-2-3 2-2-2-3 2-2-2-3 2V3z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="w-full bg-white text-slate-900 pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-28 lg:pb-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Headline and Subtext */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight text-[#161a1f] leading-[1.06]">
              Designed for <br />
              Hospitals and Clinics.
            </h2>

            <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-[1.05rem] text-slate-600 font-normal leading-relaxed max-w-md">
              Streamline daily operations with smarter tools for seamless patient and staff management.
            </p>
          </div>

          {/* Right Column: 5 Feature Rows */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10 lg:space-y-11">
            {features.map((item) => (
              <div key={item.id} className="flex items-start gap-5 sm:gap-6 group">
                {/* Icon Container */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-[#1c2229] flex-shrink-0 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg lg:text-[1.15rem] font-semibold text-[#161a1f] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

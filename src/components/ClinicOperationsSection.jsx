import React from 'react'
import clinicTabletImg from '../assets/clinic-operations-management.png'

export default function ClinicOperationsSection() {
  return (
    <section className="w-full bg-[#f8f9fa] text-slate-900 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#161a1f] leading-[1.12]">
            Clinic Side Operations <br />
            Management
          </h2>
        </div>

        {/* Tablet Mockup Showcase */}
        <div className="mt-10 sm:mt-14 lg:mt-16 max-w-5xl xl:max-w-6xl mx-auto flex justify-center">
          <div className="relative w-full flex justify-center group">
            {/* Subtle glow / shadow underneath */}
            <div className="absolute inset-x-8 -bottom-6 h-12 bg-slate-400/20 blur-2xl rounded-full pointer-events-none" />

            <img
              src={clinicTabletImg}
              alt="AarohCare Clinic Side Operations Management Dashboard"
              className="w-full h-auto max-h-[800px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.01] select-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

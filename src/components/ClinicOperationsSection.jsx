import React from 'react'
import clinicTabletImg from '../assets/clinic-operations-management.png'

export default function ClinicOperationsSection() {
  return (
    <section className="w-full bg-[#f8f9fa] text-slate-900 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#161a1f] leading-[1.12]">
            Clinic Side Operations <br />
            Management
          </h2>
        </div>

        {/* Tablet Mockup Showcase — Compact tight gap to heading */}
        <div className="mt-8 sm:mt-10 lg:mt-12 max-w-4xl lg:max-w-5xl xl:max-w-[1040px] mx-auto flex justify-center">
          <div className="relative w-full flex justify-center group">
            {/* Subtle glow / shadow underneath */}
            <div className="absolute inset-x-8 -bottom-4 h-10 bg-slate-400/20 blur-2xl rounded-full pointer-events-none" />

            <img
              src={clinicTabletImg}
              alt="AarohCare Clinic Side Operations Management Dashboard"
              className="w-full h-auto object-contain drop-shadow-xl select-none transition-transform duration-300 hover:scale-[1.008]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import clinicDashboardImg from '../assets/clinic-dashboard-screen.jpg'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ClinicOperationsSection() {
  const containerRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section
      id="products"
      ref={containerRef}
      className="w-full bg-white text-slate-900 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-hidden scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="reveal-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#161a1f] leading-[1.12]">
            Clinic Side Operations <br />
            Management
          </h2>
        </div>

        {/* Custom High-Fidelity iPad Pro Mockup Showcase */}
        <div className="reveal-image mt-8 sm:mt-10 lg:mt-12 max-w-4xl lg:max-w-5xl xl:max-w-[1020px] mx-auto">
          <div className="relative group">
            {/* iPad Chassis (No external blurry floor shadow) */}
            <div className="relative bg-[#0d0f12] p-[9px] sm:p-[13px] lg:p-[15px] rounded-[28px] sm:rounded-[38px] lg:rounded-[44px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-[1.008]">
              {/* Landscape Front Camera & Sensor Header */}
              <div className="absolute top-[4px] sm:top-[6px] lg:top-[7px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
                {/* Camera Lens */}
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1b2129] ring-[0.5px] ring-slate-600/70 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#0a3556]" />
                </div>
                {/* Ambient Sensor */}
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#12161c]" />
              </div>

              {/* iPad Screen Glass & Display */}
              <div className="relative w-full rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] overflow-hidden bg-white ring-1 ring-black/10 shadow-inner">
                {/* Clear Dashboard Image */}
                <img
                  src={clinicDashboardImg}
                  alt="AarohCare Clinic Queue Management Dashboard"
                  className="w-full h-auto object-cover select-none block"
                  loading="lazy"
                />

                {/* Subtle Glass Surface Reflection Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none rounded-[20px] sm:rounded-[26px] lg:rounded-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

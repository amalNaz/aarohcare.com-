import React from 'react'

export default function ZeroWaitSection() {
  return (
    <section className="w-full bg-white text-slate-900 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Description */}
        <p className="text-xs sm:text-sm md:text-[13px] text-slate-500 max-w-xl leading-relaxed mb-10 sm:mb-14 font-normal">
          Eliminate traditional reception logjams through coordinated clinical scheduling algorithms designed for patients, doctors, and hospital administrators.
        </p>

        {/* Big Bold Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#08182b] max-w-3xl leading-[1.1]">
          Engineered for zero-wait <br className="hidden sm:inline" />
          patient experiences
        </h2>
      </div>
    </section>
  )
}

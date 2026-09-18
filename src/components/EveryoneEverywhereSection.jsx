import React from 'react'
import zeroOvercrowdingImg from '../assets/zero over crowding.png'

export default function EveryoneEverywhereSection() {
  return (
    <section className="w-full bg-[#f4efe6] text-slate-900 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-slate-200">
              <img
                src={zeroOvercrowdingImg}
                alt="Everyone Everywhere Healthcare"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Large Typography & Content */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-[#08182b] leading-[1.05]">
              Everyone. <br />
              Everywhere.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
              Transforming outpatient access from fragmented queues into a connected, dignified experience for every clinic, doctor, and patient across Kerala and beyond.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#explore"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-slate-950 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-sm"
              >
                Learn More About Our Mission
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

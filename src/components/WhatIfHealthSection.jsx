import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// CENTRALIZED TUNING CONFIGURATION
// Adjust scroll distance, orbit radii, and visual scales in one clean block.
// ============================================================================
const CONFIG = {
  scrollDistance: 2600, // Total vertical scroll px while pinned
  scrubAmount: 0.8, // GSAP scrub smoothing factor
  stepAngle: 36, // Angular spacing between consecutive points (degrees)
  totalRotation: 144, // 4 steps * 36 deg = 144 deg total rotation from 01 to 05
  activeHighlightColor: 'rgba(251, 191, 36, 0.9)', // Warm golden/amber accent
  inactiveOpacity: 0.35, // Inactive node opacity
  activeScale: 1.25, // Active node scale
  inactiveScale: 0.85, // Inactive node scale
}

// Exactly 5 states matching the reference sequence
const STATES = [
  {
    num: '01',
    title: 'Instant',
    description: 'What once took months, now happens in moments.',
  },
  {
    num: '02',
    title: 'Predictive',
    description: 'So you never had to wait for symptoms.',
  },
  {
    num: '03',
    title: 'Accessible',
    description: 'No longer limited by geographical location and availability.',
  },
  {
    num: '04',
    title: 'Intelligent',
    description: 'Where data tells your story — and changes your outcome.',
  },
  {
    num: '05',
    title: 'Designed for you',
    description: "Because you're not a checkbox or a protocol.",
  },
]

export default function WhatIfHealthSection() {
  const containerRef = useRef(null)
  const wheelRef = useRef(null)
  const nodeRefs = useRef([])
  const contentRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Base angles for the 5 points around the circumference
  // 01 at 0° (apex), 02 at +36°, 03 at +72°, 04 at -72°, 05 at -36°
  const nodeBaseAngles = [0, 36, 72, -72, -36]

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // Initialize wheel at 0 deg (node 01 is at top-center apex)
      gsap.set(wheel, { rotation: 0 })

      nodeRefs.current.forEach((node) => {
        if (node) gsap.set(node, { rotation: 0 })
      })

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${CONFIG.scrollDistance}`,
        pin: true,
        scrub: CONFIG.scrubAmount,
        onUpdate: (self) => {
          const progress = self.progress // 0.0 to 1.0

          // Smoothly rotate the orbital wheel from 0° to -144°
          const currentRotation = -progress * CONFIG.totalRotation
          gsap.set(wheel, { rotation: currentRotation })

          // Counter-rotate each node so numbers stay horizontally upright
          nodeRefs.current.forEach((node) => {
            if (node) gsap.set(node, { rotation: -currentRotation })
          })

          // Calculate which state is currently closest to the top-center apex
          const rawIndex = progress * (STATES.length - 1)
          const index = Math.min(
            STATES.length - 1,
            Math.max(0, Math.round(rawIndex))
          )

          setActiveIndex(index)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white overflow-hidden selection:bg-amber-400 selection:text-black"
    >
      {/* Pinned Viewport Container */}
      <div className="relative h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 lg:px-20 z-10">
        
        {/* Top Header — Fixed Storytelling Anchor at Upper-Left */}
        <div className="w-full flex items-start justify-between">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
              What If <br />
              Health Was ...
            </h2>
          </div>

          {/* Clean Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500 bg-neutral-950/80 border border-neutral-800/80 px-3 py-1.5 rounded-full">
            <span className="text-amber-400 font-bold">{STATES[activeIndex].num}</span>
            <span>/</span>
            <span>05</span>
          </div>
        </div>

        {/* Active Point Content Center Block (Above the Arc Apex) */}
        <div
          ref={contentRef}
          className="w-full max-w-xl mx-auto text-center px-4 my-auto flex flex-col items-center z-20 transition-all duration-300 ease-out"
        >
          {/* Active Concept Title */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight transition-all duration-300">
            {STATES[activeIndex].title}
          </h3>

          {/* Active Concept Description */}
          <p className="text-sm sm:text-base text-slate-300/90 font-light max-w-md mx-auto leading-relaxed transition-all duration-300">
            {STATES[activeIndex].description}
          </p>

          {/* Vertical Connector Line Extending from Content down to the Arc Apex Dot */}
          <div className="mt-6 flex flex-col items-center">
            <div className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-transparent via-amber-400/60 to-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] -mt-1" />
          </div>
        </div>

        {/* Large Orbital Semicircular System (Extends beyond viewport boundaries) */}
        <div className="relative w-full h-36 sm:h-48 lg:h-56 flex items-center justify-center overflow-visible">
          {/* Giant Rotating Orbital Wheel */}
          <div
            ref={wheelRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] sm:w-[1300px] sm:h-[1300px] lg:w-[1700px] lg:h-[1700px] rounded-full border border-slate-800/60 pointer-events-none select-none"
            style={{ willChange: 'transform' }}
          >
            {/* Subtle Arc Border Guide */}
            <div className="absolute inset-0 rounded-full border border-slate-800/80" />

            {/* 5 Numbered Orbit Nodes Distributed Around the Circumference */}
            {STATES.map((state, index) => {
              const angleDeg = nodeBaseAngles[index]
              const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg corresponds to the top apex
              const radiusPercent = 50 // Placed on the 50% outer radius

              // Parametric positioning
              const leftPercent = 50 + radiusPercent * Math.cos(angleRad)
              const topPercent = 50 + radiusPercent * Math.sin(angleRad)

              const isActive = index === activeIndex

              return (
                <div
                  key={state.num}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                >
                  {/* Upright Counter-Rotating Node Badge */}
                  <div
                    ref={(el) => (nodeRefs.current[index] = el)}
                    className={`flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'scale-110 opacity-100 z-30'
                        : 'scale-90 opacity-40 hover:opacity-70 z-10'
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-neutral-950 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                          : 'bg-neutral-950 border border-slate-800 text-slate-500'
                      }`}
                    >
                      {state.num}
                    </div>

                    {/* Node Title Label */}
                    <span
                      className={`mt-1.5 text-[10px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-amber-300 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {state.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Scroll Guide */}
        <div className="w-full flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-neutral-900">
          <span>Scroll to travel the orbit</span>
          <span className="font-mono text-slate-500">
            {STATES[activeIndex].num} — {STATES[activeIndex].title}
          </span>
        </div>
      </div>
    </section>
  )
}

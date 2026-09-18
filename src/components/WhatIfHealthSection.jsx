import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// CENTRALIZED TUNING CONFIGURATION
// All animation parameters, scroll distances, and timings are controlled here.
// ============================================================================
const CONFIG = {
  scrollDistance: 3000, // Total vertical scroll distance (px) while pinned
  scrubSpeed: 0.6, // Scrub response (smooth interpolation factor)
  totalRotation: 144, // 4 steps * 36 deg = 144 deg total rotation from 01 to 05
  stepAngle: 36, // Angular offset between consecutive nodes
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
  const nodeBadgeRefs = useRef([])
  const nodeTitleRefs = useRef([])
  const nodeWrapperRefs = useRef([])
  const stateCardRefs = useRef([])
  const progressNumRef = useRef(null)

  // Base angles for the 5 points around the circumference
  // 01 starts at 0° (apex), 02 at +36°, 03 at +72°, 04 at -72°, 05 at -36°
  const nodeBaseAngles = [0, 36, 72, -72, -36]

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // ========================================================================
      // 1. MASTER TIMELINE SYNCHRONIZED BY SCROLLTRIGGER
      // ONE single source of truth for the entire sequence (01 -> 05).
      // ========================================================================
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${CONFIG.scrollDistance}`,
          pin: true,
          scrub: CONFIG.scrubSpeed,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Smoothly rotate the orbital wheel from 0° to -144° over timeline duration (0 to 1)
      masterTL.to(wheel, { rotation: -CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)

      // 2. Counter-rotate node wrappers so badges remain horizontally upright
      nodeWrapperRefs.current.forEach((wrapper) => {
        if (wrapper) {
          masterTL.to(wrapper, { rotation: CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)
        }
      })

      // 3. Smooth deterministic text cross-fades between the 5 states
      // State 0: 0.00 -> 0.20
      // State 1: 0.20 -> 0.40
      // State 2: 0.40 -> 0.60
      // State 3: 0.60 -> 0.80
      // State 4: 0.80 -> 1.00 (holds until pin release)

      // Transition 0 -> 1 (Instant -> Predictive)
      masterTL.to(stateCardRefs.current[0], { opacity: 0, y: -12, duration: 0.05, ease: 'power1.inOut' }, 0.17)
      masterTL.fromTo(stateCardRefs.current[1], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power1.inOut' }, 0.20)

      // Transition 1 -> 2 (Predictive -> Accessible)
      masterTL.to(stateCardRefs.current[1], { opacity: 0, y: -12, duration: 0.05, ease: 'power1.inOut' }, 0.37)
      masterTL.fromTo(stateCardRefs.current[2], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power1.inOut' }, 0.40)

      // Transition 2 -> 3 (Accessible -> Intelligent)
      masterTL.to(stateCardRefs.current[2], { opacity: 0, y: -12, duration: 0.05, ease: 'power1.inOut' }, 0.57)
      masterTL.fromTo(stateCardRefs.current[3], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power1.inOut' }, 0.60)

      // Transition 3 -> 4 (Intelligent -> Designed for you)
      masterTL.to(stateCardRefs.current[3], { opacity: 0, y: -12, duration: 0.05, ease: 'power1.inOut' }, 0.77)
      masterTL.fromTo(stateCardRefs.current[4], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power1.inOut' }, 0.80)

      // 4. Synchronized Node Active Highlighting on the Orbit
      nodeBadgeRefs.current.forEach((badge, index) => {
        if (!badge) return
        const titleEl = nodeTitleRefs.current[index]
        const targetT = index * 0.25 // 0.00, 0.25, 0.50, 0.75, 1.00

        // Set initial states
        if (index === 0) {
          gsap.set(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a' })
          if (titleEl) gsap.set(titleEl, { opacity: 1, color: '#fef08a' })
          masterTL.to(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373', duration: 0.05 }, 0.17)
          if (titleEl) masterTL.to(titleEl, { opacity: 0.4, color: '#525252', duration: 0.05 }, 0.17)
        } else if (index === 4) {
          gsap.set(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373' })
          if (titleEl) gsap.set(titleEl, { opacity: 0.4, color: '#525252' })
          masterTL.to(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a', duration: 0.05 }, 0.77)
          if (titleEl) masterTL.to(titleEl, { opacity: 1, color: '#fef08a', duration: 0.05 }, 0.77)
        } else {
          gsap.set(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373' })
          if (titleEl) gsap.set(titleEl, { opacity: 0.4, color: '#525252' })

          // Activate when arriving at top apex
          masterTL.to(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a', duration: 0.05 }, targetT - 0.04)
          if (titleEl) masterTL.to(titleEl, { opacity: 1, color: '#fef08a', duration: 0.05 }, targetT - 0.04)

          // Deactivate when rotating away
          masterTL.to(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373', duration: 0.05 }, targetT + 0.12)
          if (titleEl) masterTL.to(titleEl, { opacity: 0.4, color: '#525252', duration: 0.05 }, targetT + 0.12)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white overflow-hidden selection:bg-amber-400 selection:text-black z-10"
    >
      {/* Pinned Viewport Container */}
      <div className="relative h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 lg:px-20 z-10 overflow-hidden">
        
        {/* Top Header — Fixed Storytelling Anchor at Upper-Left */}
        <div className="w-full flex items-start justify-between z-30 pointer-events-none">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
              What If <br />
              Health Was ...
            </h2>
          </div>
        </div>

        {/* Center Active Story Card Container (All 5 states stacked deterministically) */}
        <div className="relative w-full max-w-xl mx-auto h-48 sm:h-52 my-auto flex items-center justify-center z-20">
          {STATES.map((state, index) => (
            <div
              key={state.num}
              ref={(el) => (stateCardRefs.current[index] = el)}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              style={{
                opacity: index === 0 ? 1 : 0,
                transform: index === 0 ? 'translateY(0px)' : 'translateY(12px)',
                willChange: 'opacity, transform',
              }}
            >
              {/* Active State Number Badge */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-400/80 bg-neutral-950 text-amber-300 font-mono text-xs sm:text-sm flex items-center justify-center font-bold shadow-[0_0_15px_rgba(251,191,36,0.35)] mb-3 sm:mb-4">
                {state.num}
              </div>

              {/* Active Concept Title */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2.5 sm:mb-3 tracking-tight">
                {state.title}
              </h3>

              {/* Active Concept Description */}
              <p className="text-sm sm:text-base text-slate-300/90 font-light max-w-md mx-auto leading-relaxed">
                {state.description}
              </p>
            </div>
          ))}

          {/* Vertical Connector Line Extending from Content Down to the Arc Apex Dot */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
            <div className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-transparent via-amber-400/60 to-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] -mt-1" />
          </div>
        </div>

        {/* Large Semicircular Orbital Wheel System */}
        <div className="relative w-full h-36 sm:h-48 lg:h-56 flex items-center justify-center overflow-visible z-10 pointer-events-none">
          {/* Giant Rotating Orbital Wheel */}
          <div
            ref={wheelRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] sm:w-[1300px] sm:h-[1300px] lg:w-[1700px] lg:h-[1700px] rounded-full border border-slate-800/80 select-none"
            style={{ willChange: 'transform' }}
          >
            {/* Subtle Arc Border Guide */}
            <div className="absolute inset-0 rounded-full border border-slate-800/80" />

            {/* 5 Numbered Orbit Nodes Distributed Around the Circumference */}
            {STATES.map((state, index) => {
              const angleDeg = nodeBaseAngles[index]
              const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg corresponds to the top apex
              const radiusPercent = 50 // Placed on the outer circumference

              // Parametric positioning
              const leftPercent = 50 + radiusPercent * Math.cos(angleRad)
              const topPercent = 50 + radiusPercent * Math.sin(angleRad)

              return (
                <div
                  key={state.num}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                >
                  {/* Upright Counter-Rotating Node Wrapper */}
                  <div
                    ref={(el) => (nodeWrapperRefs.current[index] = el)}
                    className="flex flex-col items-center justify-center"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Node Badge */}
                    <div
                      ref={(el) => (nodeBadgeRefs.current[index] = el)}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm bg-neutral-950 border border-slate-800 text-slate-500 shadow-md"
                      style={{ willChange: 'opacity, transform, border-color, color' }}
                    >
                      {state.num}
                    </div>

                    {/* Node Title Label */}
                    <span
                      ref={(el) => (nodeTitleRefs.current[index] = el)}
                      className="mt-1.5 text-[10px] sm:text-xs font-medium tracking-tight whitespace-nowrap text-slate-600"
                      style={{ willChange: 'opacity, color' }}
                    >
                      {state.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Scroll Guide Bar */}
        <div className="w-full flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-neutral-900 z-20 pointer-events-none">
          <span>Scroll to travel the orbit</span>
          <span className="font-mono text-slate-500">
            01 Instant → 05 Designed for you
          </span>
        </div>
      </div>
    </section>
  )
}

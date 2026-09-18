import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// CENTRALIZED TUNING CONFIGURATION
// All animation parameters, scroll distances, and timings are controlled here.
// ============================================================================
const CONFIG = {
  scrubSpeed: 0.5, // Scrub response (smooth interpolation factor)
  stepAngle: 32, // Angular offset between consecutive nodes (32 deg)
  totalRotation: 128, // 4 steps * 32 deg = 128 deg total rotation
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

  // Base angles for the 5 points in initial rest position:
  // Node 01 at 0° (apex), Node 02 at +32°, Node 03 at +64°, Node 04 at +96°, Node 05 at +128°
  // As the wheel rotates by -128°, every node 01 -> 02 -> 03 -> 04 -> 05 reaches 0° (the apex) sequentially!
  const nodeBaseAngles = [0, 32, 64, 96, 128]

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // 1. Initialize all 5 cards
      stateCardRefs.current.forEach((card, idx) => {
        if (!card) return
        if (idx === 0) {
          gsap.set(card, { opacity: 1, y: 0, pointerEvents: 'auto' })
        } else {
          gsap.set(card, { opacity: 0, y: 16, pointerEvents: 'none' })
        }
      })

      // 2. Initialize node badges
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const titleEl = nodeTitleRefs.current[idx]
        if (idx === 0) {
          gsap.set(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a' })
          if (titleEl) gsap.set(titleEl, { opacity: 1, color: '#fef08a' })
        } else {
          gsap.set(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373' })
          if (titleEl) gsap.set(titleEl, { opacity: 0.4, color: '#525252' })
        }
      })

      // ========================================================================
      // MASTER TIMELINE SYNCHRONIZED BY SCROLLTRIGGER
      // Uses 3.5 viewport heights of scroll distance for relaxed pacing.
      // ========================================================================
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(2600, window.innerHeight * 3.5)}`,
          pin: true,
          scrub: CONFIG.scrubSpeed,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Smoothly rotate the orbital wheel from 0° to -128° over timeline duration (0 to 1)
      masterTL.to(wheel, { rotation: -CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)

      // 2. Counter-rotate node wrappers so badges remain horizontally upright
      nodeWrapperRefs.current.forEach((wrapper) => {
        if (wrapper) {
          masterTL.to(wrapper, { rotation: CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)
        }
      })

      // 3. Sequential cross-fades across the 5 states (0.00 -> 0.20 -> 0.40 -> 0.60 -> 0.80 -> 1.00)
      // State 0 (Instant) -> State 1 (Predictive)
      masterTL.to(stateCardRefs.current[0], { opacity: 0, y: -16, duration: 0.04, ease: 'power1.inOut' }, 0.18)
      masterTL.to(stateCardRefs.current[1], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.22)

      // State 1 (Predictive) -> State 2 (Accessible)
      masterTL.to(stateCardRefs.current[1], { opacity: 0, y: -16, duration: 0.04, ease: 'power1.inOut' }, 0.38)
      masterTL.to(stateCardRefs.current[2], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.42)

      // State 2 (Accessible) -> State 3 (Intelligent)
      masterTL.to(stateCardRefs.current[2], { opacity: 0, y: -16, duration: 0.04, ease: 'power1.inOut' }, 0.58)
      masterTL.to(stateCardRefs.current[3], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.62)

      // State 3 (Intelligent) -> State 4 (Designed for you)
      masterTL.to(stateCardRefs.current[3], { opacity: 0, y: -16, duration: 0.04, ease: 'power1.inOut' }, 0.78)
      masterTL.to(stateCardRefs.current[4], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.82)
      // State 4 (Designed for you) holds cleanly until progress 1.00!

      // 4. Synchronized Node Active Badges on the Orbit Wheel
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const titleEl = nodeTitleRefs.current[idx]

        if (idx === 0) {
          masterTL.to(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373', duration: 0.04 }, 0.18)
          if (titleEl) masterTL.to(titleEl, { opacity: 0.4, color: '#525252', duration: 0.04 }, 0.18)
        } else if (idx === 4) {
          masterTL.to(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a', duration: 0.04 }, 0.82)
          if (titleEl) masterTL.to(titleEl, { opacity: 1, color: '#fef08a', duration: 0.04 }, 0.82)
        } else {
          const inTime = idx * 0.20 + 0.02
          const outTime = (idx + 1) * 0.20 - 0.02

          masterTL.to(badge, { opacity: 1, scale: 1.15, borderColor: '#fbbf24', color: '#fef08a', duration: 0.04 }, inTime)
          if (titleEl) masterTL.to(titleEl, { opacity: 1, color: '#fef08a', duration: 0.04 }, inTime)

          masterTL.to(badge, { opacity: 0.35, scale: 0.85, borderColor: '#262626', color: '#737373', duration: 0.04 }, outTime)
          if (titleEl) masterTL.to(titleEl, { opacity: 0.4, color: '#525252', duration: 0.04 }, outTime)
        }
      })
    }, containerRef)

    // Ensure ScrollTrigger refreshes accurately after mounting
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
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
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
              style={{
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

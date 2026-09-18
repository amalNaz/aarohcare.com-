import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// CENTRALIZED TUNING CONFIGURATION
// ============================================================================
const CONFIG = {
  scrubSpeed: 0.5, // Scrub response
  stepAngle: 72, // 360° / 5 = 72° per step (places active at apex, prev at bottom-left, next at bottom-right)
  totalRotation: 288, // 4 steps * 72° = 288° total rotation across the 5 states
}

// Exactly 5 states matching the reference sequence
const STATES = [
  {
    num: '1',
    title: 'Instant',
    description: 'What once took months, now happens in moments.',
  },
  {
    num: '2',
    title: 'Predictive',
    description: 'So you never had to wait for symptoms.',
  },
  {
    num: '3',
    title: 'Accessible',
    description: 'No longer limited by geographical location and availability.',
  },
  {
    num: '4',
    title: 'Intelligent',
    description: 'Where data tells your story — and changes your outcome.',
  },
  {
    num: '5',
    title: 'Designed for you',
    description: "Because you're not a checkbox or a protocol.",
  },
]

export default function WhatIfHealthSection() {
  const containerRef = useRef(null)
  const wheelRef = useRef(null)
  const nodeBadgeRefs = useRef([])
  const nodeDotRefs = useRef([])
  const nodeWrapperRefs = useRef([])
  const stateCardRefs = useRef([])

  // Base angles for the 5 points evenly distributed around the 360° circle (every 72°):
  // Node 1: 0° (apex), Node 2: 72° (bottom-right), Node 3: 144°, Node 4: 216°, Node 5: 288° (-72°, bottom-left)
  const nodeBaseAngles = [0, 72, 144, 216, 288]

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
          gsap.set(card, { opacity: 0, y: 12, pointerEvents: 'none' })
        }
      })

      // 2. Initialize node badges and dots
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const dot = nodeDotRefs.current[idx]
        if (idx === 0) {
          gsap.set(badge, { opacity: 1, scale: 1, borderColor: '#52525b', color: '#ffffff', backgroundColor: '#18181b' })
          if (dot) gsap.set(dot, { opacity: 1, backgroundColor: '#f59e0b', scale: 1.2 })
        } else {
          gsap.set(badge, { opacity: 0.4, scale: 0.9, borderColor: '#27272a', color: '#71717a', backgroundColor: '#09090b' })
          if (dot) gsap.set(dot, { opacity: 0.6, backgroundColor: '#ffffff', scale: 1 })
        }
      })

      // ========================================================================
      // MASTER TIMELINE SYNCHRONIZED BY SCROLLTRIGGER
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

      // 1. Smoothly rotate the orbital wheel from 0° to -288° over timeline duration (0 to 1)
      masterTL.to(wheel, { rotation: -CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)

      // 2. Counter-rotate node wrappers so badges remain horizontally upright
      nodeWrapperRefs.current.forEach((wrapper) => {
        if (wrapper) {
          masterTL.to(wrapper, { rotation: CONFIG.totalRotation, ease: 'none', duration: 1 }, 0)
        }
      })

      // 3. Sequential cross-fades across the 5 states
      // State 0 (Instant) -> State 1 (Predictive)
      masterTL.to(stateCardRefs.current[0], { opacity: 0, y: -12, duration: 0.04, ease: 'power1.inOut' }, 0.18)
      masterTL.to(stateCardRefs.current[1], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.22)

      // State 1 (Predictive) -> State 2 (Accessible)
      masterTL.to(stateCardRefs.current[1], { opacity: 0, y: -12, duration: 0.04, ease: 'power1.inOut' }, 0.38)
      masterTL.to(stateCardRefs.current[2], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.42)

      // State 2 (Accessible) -> State 3 (Intelligent)
      masterTL.to(stateCardRefs.current[2], { opacity: 0, y: -12, duration: 0.04, ease: 'power1.inOut' }, 0.58)
      masterTL.to(stateCardRefs.current[3], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.62)

      // State 3 (Intelligent) -> State 4 (Designed for you)
      masterTL.to(stateCardRefs.current[3], { opacity: 0, y: -12, duration: 0.04, ease: 'power1.inOut' }, 0.78)
      masterTL.to(stateCardRefs.current[4], { opacity: 1, y: 0, duration: 0.04, ease: 'power1.inOut' }, 0.82)

      // 4. Synchronized Node Active Badges on the Orbit Wheel
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const dot = nodeDotRefs.current[idx]

        if (idx === 0) {
          masterTL.to(badge, { opacity: 0.4, scale: 0.9, borderColor: '#27272a', color: '#71717a', backgroundColor: '#09090b', duration: 0.04 }, 0.18)
          if (dot) masterTL.to(dot, { opacity: 0.6, backgroundColor: '#ffffff', scale: 1, duration: 0.04 }, 0.18)
        } else if (idx === 4) {
          masterTL.to(badge, { opacity: 1, scale: 1, borderColor: '#52525b', color: '#ffffff', backgroundColor: '#18181b', duration: 0.04 }, 0.82)
          if (dot) masterTL.to(dot, { opacity: 1, backgroundColor: '#f59e0b', scale: 1.2, duration: 0.04 }, 0.82)
        } else {
          const inTime = idx * 0.20 + 0.02
          const outTime = (idx + 1) * 0.20 - 0.02

          masterTL.to(badge, { opacity: 1, scale: 1, borderColor: '#52525b', color: '#ffffff', backgroundColor: '#18181b', duration: 0.04 }, inTime)
          if (dot) masterTL.to(dot, { opacity: 1, backgroundColor: '#f59e0b', scale: 1.2, duration: 0.04 }, inTime)

          masterTL.to(badge, { opacity: 0.4, scale: 0.9, borderColor: '#27272a', color: '#71717a', backgroundColor: '#09090b', duration: 0.04 }, outTime)
          if (dot) masterTL.to(dot, { opacity: 0.6, backgroundColor: '#ffffff', scale: 1, duration: 0.04 }, outTime)
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
      className="relative w-full h-screen bg-black text-white overflow-hidden select-none z-10"
    >
      {/* Top Header — Anchored at Upper-Left matching reference */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-14 lg:top-14 lg:left-20 z-30 pointer-events-none">
        <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.05]">
          What If <br />
          Health Was ...
        </h2>
      </div>

      {/* Static Vertical Connector Line (Dropping from apex into the text) */}
      <div className="absolute top-[42vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <div className="w-[1px] h-24 sm:h-28 bg-gradient-to-b from-[#f59e0b] via-neutral-700 to-transparent" />
      </div>

      {/* Center Active Story Card Container (Inside / below the arc apex) */}
      <div className="absolute top-[calc(42vh+115px)] sm:top-[calc(42vh+125px)] left-1/2 -translate-x-1/2 w-full max-w-lg px-4 text-center z-20 pointer-events-none">
        {STATES.map((state, index) => (
          <div
            key={state.num}
            ref={(el) => (stateCardRefs.current[index] = el)}
            className="absolute inset-0 flex flex-col items-center justify-start text-center"
            style={{
              willChange: 'opacity, transform',
            }}
          >
            {/* Active Concept Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2.5 tracking-tight">
              {state.title}
            </h3>

            {/* Active Concept Description */}
            <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-xs mx-auto leading-relaxed">
              {state.description}
            </p>
          </div>
        ))}
      </div>

      {/* Giant Rotating Orbital Wheel — Top apex aligns exactly at 42vh */}
      <div
        ref={wheelRef}
        className="absolute top-[42vh] left-1/2 -translate-x-1/2 w-[1380px] h-[1380px] sm:w-[1480px] sm:h-[1480px] lg:w-[1550px] lg:h-[1550px] rounded-full border border-neutral-800 pointer-events-none select-none z-10"
        style={{ willChange: 'transform' }}
      >
        {/* 5 Numbered Orbit Nodes Distributed around 360° at every 72° */}
        {STATES.map((state, index) => {
          const angleDeg = nodeBaseAngles[index]
          const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg corresponds to top apex
          const radiusPercent = 50 // Placed on outer circumference

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
                className="flex flex-col items-center justify-center -translate-y-[18px]"
                style={{ willChange: 'transform' }}
              >
                {/* Node Badge */}
                <div
                  ref={(el) => (nodeBadgeRefs.current[index] = el)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-medium text-xs bg-[#09090b] border border-neutral-800 text-neutral-400 mb-1.5 shadow-sm"
                  style={{ willChange: 'opacity, transform, border-color, color, background-color' }}
                >
                  {state.num}
                </div>

                {/* Node Dot (Positioned exactly on the arc circumference) */}
                <div
                  ref={(el) => (nodeDotRefs.current[index] = el)}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  style={{ willChange: 'opacity, transform, background-color' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

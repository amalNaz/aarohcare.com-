import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 5 Core Story States
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

// Base angles around the 360° circle (0° = top apex, 72° clockwise for next state)
const NODE_BASE_ANGLES = [0, 72, 144, 216, 288]

export default function WhatIfHealthSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const wheelRef = useRef(null)
  const connectorRef = useRef(null)
  const contentWrapRef = useRef(null)
  const nodeBadgeRefs = useRef([])
  const nodeDotRefs = useRef([])
  const badgeTextRefs = useRef([])
  const stateCardRefs = useRef([])

  const [activeStep, setActiveStep] = useState(0)
  const stRef = useRef(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    const connector = connectorRef.current
    const header = headerRef.current
    const contentWrap = contentWrapRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // 1. Initial State Setup (Ensures State 1 'Instant' is fully visible at entry)
      if (connector) gsap.set(connector, { opacity: 1 })

      stateCardRefs.current.forEach((card, idx) => {
        if (!card) return
        if (idx === 0) {
          gsap.set(card, { opacity: 1, y: 0, pointerEvents: 'auto' })
        } else {
          gsap.set(card, { opacity: 0, y: 10, pointerEvents: 'none' })
        }
      })

      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const dot = nodeDotRefs.current[idx]
        if (idx === 0) {
          gsap.set(badge, { opacity: 1, scale: 1, borderColor: '#ffffff', color: '#ffffff', backgroundColor: '#000000' })
          if (dot) gsap.set(dot, { opacity: 0 })
        } else {
          gsap.set(badge, { opacity: 0.45, scale: 0.95, borderColor: '#3f3f46', color: '#a1a1aa', backgroundColor: '#000000' })
          if (dot) gsap.set(dot, { opacity: 0.6 })
        }
      })

      // ======================================================================
      // SECTION ENTRANCE ANIMATION (Header & Wheel Entrance)
      // ======================================================================
      if (header && wheel) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          wheel,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ======================================================================
      // 5-STAGE MASTER GSAP TIMELINE (4 Transitions: 0->1, 1->2, 2->3, 3->4)
      // Snap points: 0.0 (State 1), 0.25 (State 2), 0.50 (State 3), 0.75 (State 4), 1.0 (State 5)
      // ======================================================================
      const snapPoints = [0, 0.25, 0.5, 0.75, 1.0]
      const validTextRefs = badgeTextRefs.current.filter(Boolean)

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(2600, window.innerHeight * 2.8)}`,
          pin: true,
          scrub: 0.4,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.25, max: 0.45 },
            ease: 'power2.out',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const stepIndex = Math.min(4, Math.floor(self.progress * 4 + 0.5))
            setActiveStep(stepIndex)
          },
        },
      })

      // Duration per stage transition on the timeline
      const STAGE_DUR = 1.0

      // Ensure State 1 card starts fully opaque at timeline time 0
      if (stateCardRefs.current[0]) {
        masterTimeline.set(stateCardRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' }, 0)
      }

      // Animate through 4 transition intervals connecting the 5 states
      for (let i = 0; i < 4; i++) {
        const nextIdx = i + 1
        const startTime = i * STAGE_DUR

        // 1. Wheel Rotation (72° per stage)
        masterTimeline.to(
          wheel,
          {
            rotation: -(i + 1) * 72,
            ease: 'power1.inOut',
            duration: STAGE_DUR,
          },
          startTime
        )

        // 2. Counter-rotate badge numbers to keep digits upright
        if (validTextRefs.length > 0) {
          masterTimeline.to(
            validTextRefs,
            {
              rotation: (i + 1) * 72,
              ease: 'power1.inOut',
              duration: STAGE_DUR,
            },
            startTime
          )
        }

        // 3. Current Card Fades Out (Starts after 20% hold, completes by 50%)
        const currentCard = stateCardRefs.current[i]
        if (currentCard) {
          masterTimeline.to(
            currentCard,
            {
              opacity: 0,
              y: -8,
              ease: 'power1.in',
              duration: STAGE_DUR * 0.3,
              pointerEvents: 'none',
            },
            startTime + STAGE_DUR * 0.2
          )
        }

        // 4. Next Card Fades In (Starts at 55%, completes by 85%, holds till next stage)
        const nextCard = stateCardRefs.current[nextIdx]
        if (nextCard) {
          masterTimeline.fromTo(
            nextCard,
            { opacity: 0, y: 10, pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              duration: STAGE_DUR * 0.3,
              pointerEvents: 'auto',
              immediateRender: false,
            },
            startTime + STAGE_DUR * 0.55
          )
        }

        // 5. Current Badge Dims
        const currentBadge = nodeBadgeRefs.current[i]
        const currentDot = nodeDotRefs.current[i]
        if (currentBadge) {
          masterTimeline.to(
            currentBadge,
            {
              opacity: 0.45,
              scale: 0.95,
              borderColor: '#3f3f46',
              color: '#a1a1aa',
              duration: STAGE_DUR * 0.35,
              ease: 'power1.inOut',
            },
            startTime + STAGE_DUR * 0.2
          )
          if (currentDot) {
            masterTimeline.to(
              currentDot,
              { opacity: 0.6, duration: STAGE_DUR * 0.35, ease: 'power1.inOut' },
              startTime + STAGE_DUR * 0.2
            )
          }
        }

        // 6. Next Badge Illuminates
        const nextBadge = nodeBadgeRefs.current[nextIdx]
        const nextDot = nodeDotRefs.current[nextIdx]
        if (nextBadge) {
          masterTimeline.to(
            nextBadge,
            {
              opacity: 1,
              scale: 1,
              borderColor: '#ffffff',
              color: '#ffffff',
              duration: STAGE_DUR * 0.35,
              ease: 'power1.inOut',
            },
            startTime + STAGE_DUR * 0.55
          )
          if (nextDot) {
            masterTimeline.to(
              nextDot,
              { opacity: 0, duration: STAGE_DUR * 0.35, ease: 'power1.inOut' },
              startTime + STAGE_DUR * 0.55
            )
          }
        }

        // 7. Connector Line Pulse at apex
        if (connector) {
          masterTimeline.fromTo(
            connector,
            { opacity: 0.4 },
            { opacity: 1, duration: STAGE_DUR * 0.3, ease: 'power1.out', immediateRender: false },
            startTime + STAGE_DUR * 0.6
          )
        }
      }

      stRef.current = masterTimeline.scrollTrigger
    }, containerRef)

    // ========================================================================
    // DIRECT BADGE CLICK NAVIGATION
    // ========================================================================
    window.__whatIfAnimateToStep = (index) => {
      const st = stRef.current
      if (!st) return

      setActiveStep(index)
      const targetProgress = index / 4
      const targetScroll = st.start + targetProgress * (st.end - st.start)

      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetScroll, {
          duration: 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: false },
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      delete window.__whatIfAnimateToStep
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden select-none z-10 scroll-mt-0"
    >
      {/* Top Header — Clear clearance below mobile navbar with smooth popping entrance */}
      <div
        ref={headerRef}
        className="absolute top-20 sm:top-20 md:top-14 lg:top-16 left-6 sm:left-10 lg:left-16 z-30 pointer-events-none"
        style={{ willChange: 'opacity, transform' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.08]">
          What If <br />
          Health Was ...
        </h2>
      </div>

      {/* Apex Indicator: Amber Dot & Vertical Connector Line (Only extends DOWNWARDS) */}
      <div
        ref={connectorRef}
        className="absolute top-[44vh] sm:top-[42vh] md:top-[42vh] lg:top-[40vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
        style={{ willChange: 'opacity, transform' }}
      >
        {/* Solid Amber Dot centered on the arc path */}
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] -translate-y-1/2" />
        {/* Crisp Straight Vertical Line extending down into concept text */}
        <div className="w-[1px] h-8 sm:h-10 md:h-12 lg:h-14 bg-[#8e8e93]/75 -mt-0.5" />
      </div>

      {/* Center Active Story Card Container (Inside / below the arc apex) */}
      <div
        ref={contentWrapRef}
        className="absolute top-[calc(44vh+38px)] sm:top-[calc(42vh+48px)] md:top-[calc(42vh+58px)] lg:top-[calc(40vh+68px)] left-1/2 -translate-x-1/2 w-full max-w-lg h-32 sm:h-36 md:h-40 lg:h-44 px-4 text-center z-20 pointer-events-none"
        style={{ willChange: 'opacity, transform' }}
      >
        {STATES.map((state, index) => (
          <div
            key={state.num}
            ref={(el) => (stateCardRefs.current[index] = el)}
            className="absolute inset-0 flex flex-col items-center justify-start text-center"
            style={{
              opacity: index === 0 ? 1 : 0,
              transform: index === 0 ? 'translateY(0px)' : 'translateY(10px)',
              pointerEvents: index === 0 ? 'auto' : 'none',
              willChange: 'opacity, transform',
            }}
          >
            {/* Active Concept Title */}
            <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">
              {state.title}
            </h3>

            {/* Active Concept Description */}
            <p className="text-[13px] sm:text-sm md:text-base text-neutral-300 font-normal max-w-[300px] sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
              {state.description}
            </p>
          </div>
        ))}
      </div>

      {/* Giant Rotating Orbital Wheel — Center is at (50%, 50%), Top Apex aligns at top-[44vh]/[40vh] */}
      <div
        ref={wheelRef}
        className="absolute top-[44vh] sm:top-[42vh] md:top-[42vh] lg:top-[40vh] left-1/2 -translate-x-1/2 w-[1050px] h-[1050px] sm:w-[1250px] sm:h-[1250px] md:w-[1450px] md:h-[1450px] lg:w-[1650px] lg:h-[1650px] rounded-full border border-neutral-800 pointer-events-none select-none z-10"
        style={{ willChange: 'transform' }}
      >
        {/* 5 Numbered Orbit Nodes Distributed around 360° at every 72° */}
        {STATES.map((state, index) => {
          const angleDeg = NODE_BASE_ANGLES[index]
          const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg corresponds to top apex

          // Position the dot exactly on the 50% radius circumference
          const dotLeftPercent = 50 + 50 * Math.cos(angleRad)
          const dotTopPercent = 50 + 50 * Math.sin(angleRad)

          // Position the badge center radially outward
          const badgeRadiusPercent = 52.0
          const badgeLeftPercent = 50 + badgeRadiusPercent * Math.cos(angleRad)
          const badgeTopPercent = 50 + badgeRadiusPercent * Math.sin(angleRad)

          return (
            <React.Fragment key={state.num}>
              {/* Orbit Arc Dot (Positioned exactly on the arc circumference) */}
              <div
                ref={(el) => (nodeDotRefs.current[index] = el)}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${dotLeftPercent}%`,
                  top: `${dotTopPercent}%`,
                  willChange: 'opacity',
                }}
              />

              {/* Number Circle Badge (Matching closeup reference: round black background, crisp border, bold white number) */}
              <button
                type="button"
                ref={(el) => (nodeBadgeRefs.current[index] = el)}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.__whatIfAnimateToStep) {
                    window.__whatIfAnimateToStep(index)
                  }
                }}
                className="absolute w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-sans font-bold text-xs sm:text-xs md:text-sm bg-black border border-neutral-700/80 text-white -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto shadow-sm focus:outline-none transition-colors duration-200"
                style={{
                  left: `${badgeLeftPercent}%`,
                  top: `${badgeTopPercent}%`,
                  willChange: 'opacity, transform, border-color, color',
                }}
                aria-label={`Jump to state ${state.num}: ${state.title}`}
              >
                {/* Digit element counter-rotated so it remains upright */}
                <span
                  ref={(el) => (badgeTextRefs.current[index] = el)}
                  className="inline-block pointer-events-none"
                  style={{ willChange: 'transform' }}
                >
                  {state.num}
                </span>
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}

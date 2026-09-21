import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 5 Core Story States
const STATES = [
  {
    num: '1',
    title: 'Less waiting',
    description: 'Shorter queues and faster turnaround with real-time updates.',
  },
  {
    num: '2',
    title: 'More predictable',
    description: 'Clear appointment slots and timelines so patients know what to expect, when.',
  },
  {
    num: '3',
    title: 'More connected',
    description: 'Clinics, labs, and patients linked on one platform instead of scattered calls and paperwork.',
  },
  {
    num: '4',
    title: 'More human',
    description: 'Care and communication that still feels personal, not robotic, despite the tech.',
  },
  {
    num: '5',
    title: 'Built around your time',
    description: "Scheduling and access designed to fit into the patient's life, not the other way around.",
  },
]

// Base angles around the 360° circle (0° = top apex, 72° clockwise for next state)
const NODE_BASE_ANGLES = [0, 72, 144, 216, 288]

export default function WhatIfHealthSection() {
  const sectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const headerRef = useRef(null)
  const orbitContainerRef = useRef(null)
  const wheelRef = useRef(null)
  const connectorRef = useRef(null)
  const contentWrapRef = useRef(null)
  const nodeBadgeRefs = useRef([])
  const nodeDotRefs = useRef([])
  const badgeTextRefs = useRef([])
  const stateCardRefs = useRef([])

  const stepRef = useRef(0)
  const lastStepTimeRef = useRef(0)
  const isSteppingRef = useRef(false)
  const stRef = useRef(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) {
      if (orbitContainerRef.current) gsap.set(orbitContainerRef.current, { opacity: 1, y: 0, scale: 1 })
      if (wheelRef.current) gsap.set(wheelRef.current, { opacity: 1, scale: 1, rotation: 0 })
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 })
      if (connectorRef.current) gsap.set(connectorRef.current, { opacity: 1 })
      if (stateCardRefs.current[0]) gsap.set(stateCardRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        if (idx === 0) gsap.set(badge, { opacity: 1, scale: 1, borderColor: '#ffffff', color: '#ffffff', backgroundColor: '#000000' })
        else gsap.set(badge, { opacity: 0.45, scale: 0.95, borderColor: '#3f3f46', color: '#a1a1aa', backgroundColor: '#000000' })
      })
      nodeDotRefs.current.forEach((dot, idx) => {
        if (!dot) return
        if (idx === 0) gsap.set(dot, { opacity: 0 })
        else gsap.set(dot, { opacity: 0.6 })
      })

      window.__whatIfAnimateToStep = (index) => {
        stateCardRefs.current.forEach((card, idx) => {
          if (!card) return
          if (idx === index) {
            gsap.set(card, { opacity: 1, y: 0, pointerEvents: 'auto' })
          } else {
            gsap.set(card, { opacity: 0, y: 14, pointerEvents: 'none' })
          }
        })
        nodeBadgeRefs.current.forEach((badge, idx) => {
          if (!badge) return
          if (idx === index) {
            gsap.set(badge, { opacity: 1, scale: 1, borderColor: '#ffffff', color: '#ffffff', backgroundColor: '#000000' })
          } else {
            gsap.set(badge, { opacity: 0.45, scale: 0.95, borderColor: '#3f3f46', color: '#a1a1aa', backgroundColor: '#000000' })
          }
        })
        nodeDotRefs.current.forEach((dot, idx) => {
          if (!dot) return
          if (idx === index) gsap.set(dot, { opacity: 0 })
          else gsap.set(dot, { opacity: 0.6 })
        })
      }

      return () => {
        delete window.__whatIfAnimateToStep
      }
    }

    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    const orbitContainer = orbitContainerRef.current
    const wheel = wheelRef.current
    const connector = connectorRef.current
    const header = headerRef.current
    if (!section || !pinWrapper || !wheel || !orbitContainer) return

    const ctx = gsap.context(() => {
      // Responsive pop-up metrics
      const getMetrics = () => {
        const width = typeof window !== 'undefined' ? window.innerWidth : 1200
        const height = typeof window !== 'undefined' ? window.innerHeight : 800
        const isMobile = width < 768
        const isTablet = width >= 768 && width < 1024
        return {
          yOffset: isMobile ? Math.min(130, height * 0.18) : isTablet ? 180 : 240,
          scale: isMobile ? 0.95 : isTablet ? 0.94 : 0.93,
        }
      }

      // 1. Initial State Setup
      gsap.set(orbitContainer, {
        y: () => getMetrics().yOffset,
        scale: () => getMetrics().scale,
        opacity: 0,
        transformOrigin: '50% 55%',
      })

      if (wheel) gsap.set(wheel, { opacity: 1, rotation: 0 })
      if (header) gsap.set(header, { opacity: 0, y: 24 })
      if (connector) gsap.set(connector, { opacity: 0, scaleY: 0.9 })

      stateCardRefs.current.forEach((card, idx) => {
        if (!card) return
        if (idx === 0) {
          gsap.set(card, { opacity: 0, y: 14, pointerEvents: 'auto' })
        } else {
          gsap.set(card, { opacity: 0, y: 14, pointerEvents: 'none' })
        }
      })

      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        if (idx === 0) {
          gsap.set(badge, { opacity: 0, scale: 0.8, borderColor: '#ffffff', color: '#ffffff', backgroundColor: '#000000' })
        } else {
          gsap.set(badge, { opacity: 0, scale: 0.8, borderColor: '#3f3f46', color: '#a1a1aa', backgroundColor: '#000000' })
        }
      })

      nodeDotRefs.current.forEach((dot) => {
        if (dot) gsap.set(dot, { opacity: 0 })
      })

      // 2. Scroll-Driven Pop-Up Reveal Timeline
      // Normalized progress 0 -> 1 tied directly to section entering viewport
      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top top',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      })

      // Orbit container physically rises upward from below, expanding from 0.93-0.95 -> 1.0
      entranceTimeline.to(
        orbitContainer,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power1.out',
        },
        0
      )

      // Center Content remains visually stable in place, gracefully revealing
      if (header) {
        entranceTimeline.to(
          header,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power1.out',
          },
          0.05
        )
      }

      if (stateCardRefs.current[0]) {
        entranceTimeline.to(
          stateCardRefs.current[0],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power1.out',
          },
          0.2
        )
      }

      if (connector) {
        entranceTimeline.to(
          connector,
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.4,
            ease: 'power1.out',
          },
          0.3
        )
      }

      // Progressive Node Reveal Choreography
      // Node 0: Apex Node (State 1 - Active)
      const apexBadge = nodeBadgeRefs.current[0]
      if (apexBadge) {
        entranceTimeline.to(
          apexBadge,
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.2
        )
      }

      // Nodes 1 & 4: Flank Nodes (States 2 & 5)
      const flankBadges = [nodeBadgeRefs.current[1], nodeBadgeRefs.current[4]].filter(Boolean)
      const flankDots = [nodeDotRefs.current[1], nodeDotRefs.current[4]].filter(Boolean)
      if (flankBadges.length > 0) {
        entranceTimeline.to(
          flankBadges,
          {
            opacity: 0.45,
            scale: 0.95,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.4
        )
      }
      if (flankDots.length > 0) {
        entranceTimeline.to(
          flankDots,
          {
            opacity: 0.6,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.4
        )
      }

      // Nodes 2 & 3: Lower Nodes (States 3 & 4)
      const lowerBadges = [nodeBadgeRefs.current[2], nodeBadgeRefs.current[3]].filter(Boolean)
      const lowerDots = [nodeDotRefs.current[2], nodeDotRefs.current[3]].filter(Boolean)
      if (lowerBadges.length > 0) {
        entranceTimeline.to(
          lowerBadges,
          {
            opacity: 0.45,
            scale: 0.95,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.6
        )
      }
      if (lowerDots.length > 0) {
        entranceTimeline.to(
          lowerDots,
          {
            opacity: 0.6,
            duration: 0.35,
            ease: 'power1.out',
          },
          0.6
        )
      }

      // Master 6-Checkpoint GSAP Timeline (Pinned on inner pinWrapper, trigger on outer section)
      const validTextRefs = badgeTextRefs.current.filter(Boolean)

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(3400, window.innerHeight * 3.6)}`,
          pin: pinWrapper,
          scrub: 0.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            stepRef.current = 0
          },
          onEnterBack: () => {
            stepRef.current = 5
          },
          onUpdate: (self) => {
            if (!isSteppingRef.current) {
              const calcStep = Math.min(5, Math.max(0, Math.round(self.progress * 5)))
              stepRef.current = calcStep
            }
          },
        },
      })

      const STAGE_DUR = 1.0

      if (stateCardRefs.current[0]) {
        masterTimeline.set(stateCardRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' }, 0)
      }

      // 5 transitions connecting the 6 checkpoints (1 -> 2 -> 3 -> 4 -> 5 -> 1 full 360° ring)
      for (let i = 0; i < 5; i++) {
        const nextIdx = (i + 1) % 5
        const currentIdx = i % 5
        const startTime = i * STAGE_DUR

        // 1. Wheel Rotation (72° per stage)
        masterTimeline.to(
          wheel,
          {
            rotation: -(i + 1) * 72,
            ease: 'none',
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
              ease: 'none',
              duration: STAGE_DUR,
            },
            startTime
          )
        }

        // 3. Current Card Fades Out
        const currentCard = stateCardRefs.current[currentIdx]
        if (currentCard) {
          masterTimeline.to(
            currentCard,
            {
              opacity: 0,
              y: -10,
              ease: 'power1.in',
              duration: STAGE_DUR * 0.35,
              pointerEvents: 'none',
            },
            startTime + STAGE_DUR * 0.1
          )
        }

        // 4. Next Card Fades In
        const nextCard = stateCardRefs.current[nextIdx]
        if (nextCard) {
          masterTimeline.fromTo(
            nextCard,
            { opacity: 0, y: 14, pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              duration: STAGE_DUR * 0.35,
              pointerEvents: 'auto',
              immediateRender: false,
            },
            startTime + STAGE_DUR * 0.55
          )
        }

        // 5. Current Badge Dims
        const currentBadge = nodeBadgeRefs.current[currentIdx]
        const currentDot = nodeDotRefs.current[currentIdx]
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
            startTime + STAGE_DUR * 0.1
          )
          if (currentDot) {
            masterTimeline.to(
              currentDot,
              { opacity: 0.6, duration: STAGE_DUR * 0.35, ease: 'power1.inOut' },
              startTime + STAGE_DUR * 0.1
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

        // 7. Connector Line Pulse
        if (connector) {
          masterTimeline.fromTo(
            connector,
            { opacity: 0.35, scaleY: 0.96 },
            { opacity: 1, scaleY: 1, duration: STAGE_DUR * 0.3, ease: 'power1.out', immediateRender: false },
            startTime + STAGE_DUR * 0.6
          )
        }
      }

      stRef.current = masterTimeline.scrollTrigger
    }, sectionRef)

    // ========================================================================
    // DISCRETE STEP-TO CONTROLLER (Fluid 1.2s glide per checkpoint)
    // ========================================================================
    const stepTo = (targetStep) => {
      const st = stRef.current
      if (!st) return

      const clampedStep = Math.max(0, Math.min(5, targetStep))
      isSteppingRef.current = true
      stepRef.current = clampedStep

      const targetProgress = clampedStep / 5
      const targetScroll = st.start + targetProgress * (st.end - st.start)

      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetScroll, {
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -7 * t)),
          onComplete: () => {
            setTimeout(() => {
              isSteppingRef.current = false
            }, 80)
          },
        })
      } else {
        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: false },
          duration: 1.15,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            setTimeout(() => {
              isSteppingRef.current = false
            }, 80)
          },
        })
      }

      setTimeout(() => {
        isSteppingRef.current = false
      }, 1300)
    }

    // ========================================================================
    // 1-SCROLL WHEEL INTERCEPTOR (1 mouse wheel scroll = 1 circle checkpoint)
    // ========================================================================
    const handleWheel = (e) => {
      const st = stRef.current
      if (!st) return

      const scrollY = window.scrollY || window.pageYOffset || 0
      const start = st.start
      const end = st.end
      const tol = 16

      const isPinned = scrollY >= start - tol && scrollY <= end + tol
      if (!isPinned) {
        if (scrollY < start) stepRef.current = 0
        else if (scrollY > end) stepRef.current = 5
        return
      }

      // Filter out micro trackpad noise
      if (Math.abs(e.deltaY) < 6) return

      const direction = e.deltaY > 0 ? 1 : -1
      const curStep = stepRef.current

      // Forward exit: when at Step 5 and scrolling DOWN -> allow scroll to next section naturally
      if (curStep === 5 && direction === 1) {
        return
      }

      // Reverse exit: when at Step 0 and scrolling UP -> allow scroll to previous section naturally
      if (curStep === 0 && direction === -1) {
        return
      }

      const nextStep = curStep + direction
      if (nextStep < 0 || nextStep > 5) return

      const now = Date.now()
      // Cooldown prevents one flick from skipping multiple nodes
      if (now - lastStepTimeRef.current < 450) return
      if (isSteppingRef.current) return

      // Intercept wheel event only when inside valid stepping range
      e.preventDefault()
      e.stopPropagation()
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation()
      }

      lastStepTimeRef.current = now
      stepTo(nextStep)
    }

    // Touch swipe support for mobile/tablet
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      const st = stRef.current
      if (!st) return
      const scrollY = window.scrollY || window.pageYOffset || 0
      const isPinned = scrollY >= st.start - 16 && scrollY <= st.end + 16
      if (!isPinned) return

      const deltaY = touchStartY - e.touches[0].clientY
      if (Math.abs(deltaY) < 25) return

      const direction = deltaY > 0 ? 1 : -1
      const curStep = stepRef.current

      if (curStep === 5 && direction === 1) return
      if (curStep === 0 && direction === -1) return

      const nextStep = curStep + direction
      if (nextStep < 0 || nextStep > 5) return

      const now = Date.now()
      if (now - lastStepTimeRef.current < 450) return
      if (isSteppingRef.current) return

      e.preventDefault()
      lastStepTimeRef.current = now
      touchStartY = e.touches[0].clientY
      stepTo(nextStep)
    }

    // Keyboard Arrow navigation
    const handleKeyDown = (e) => {
      const st = stRef.current
      if (!st) return
      const scrollY = window.scrollY || window.pageYOffset || 0
      const isPinned = scrollY >= st.start - 16 && scrollY <= st.end + 16
      if (!isPinned) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const curStep = stepRef.current
        if (curStep < 5) {
          e.preventDefault()
          if (!isSteppingRef.current) stepTo(curStep + 1)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const curStep = stepRef.current
        if (curStep > 0) {
          e.preventDefault()
          if (!isSteppingRef.current) stepTo(curStep - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    // Direct Badge Click Navigation
    window.__whatIfAnimateToStep = (index) => {
      let targetStep = index
      if (index === 0) {
        targetStep = stepRef.current >= 4 ? 5 : 0
      }
      stepTo(targetStep)
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      delete window.__whatIfAnimateToStep
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full bg-black"
    >
      {/* Inner Pinned Container — GSAP pins this container inside the outer section */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen bg-black text-white overflow-hidden select-none z-10"
      >
        {/* Top Header */}
        <div
          ref={headerRef}
          className="absolute top-20 sm:top-20 md:top-14 lg:top-16 left-6 sm:left-10 lg:left-16 z-30 pointer-events-none"
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.08]">
            What If <br />
            Healthcare Was ...
          </h2>
        </div>

        {/* Apex Indicator: Amber Dot & Vertical Connector Line */}
        <div
          ref={connectorRef}
          className="absolute top-[44vh] sm:top-[42vh] md:top-[42vh] lg:top-[40vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] -translate-y-1/2" />
          <div className="w-[1px] h-8 sm:h-10 md:h-12 lg:h-14 bg-[#8e8e93]/75 -mt-0.5" />
        </div>

        {/* Center Active Story Card Container */}
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
                transform: index === 0 ? 'translateY(0px)' : 'translateY(14px)',
                pointerEvents: index === 0 ? 'auto' : 'none',
                willChange: 'opacity, transform',
              }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">
                {state.title}
              </h3>

              <p className="text-[13px] sm:text-sm md:text-base text-neutral-300 font-normal max-w-[300px] sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
                {state.description}
              </p>
            </div>
          ))}
        </div>

        {/* Orbit Pop-Up Motion Container */}
        <div
          ref={orbitContainerRef}
          className="absolute inset-0 pointer-events-none select-none z-10"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Giant Rotating Orbital Wheel */}
          <div
            ref={wheelRef}
            className="absolute top-[44vh] sm:top-[42vh] md:top-[42vh] lg:top-[40vh] left-1/2 -translate-x-1/2 w-[1050px] h-[1050px] sm:w-[1250px] sm:h-[1250px] md:w-[1450px] md:h-[1450px] lg:w-[1650px] lg:h-[1650px] rounded-full border border-neutral-800 pointer-events-none select-none"
            style={{ willChange: 'transform' }}
          >
            {/* 5 Numbered Orbit Nodes Distributed around 360° at every 72° */}
            {STATES.map((state, index) => {
              const angleDeg = NODE_BASE_ANGLES[index]
              const angleRad = (angleDeg - 90) * (Math.PI / 180)

              const dotLeftPercent = 50 + 50 * Math.cos(angleRad)
              const dotTopPercent = 50 + 50 * Math.sin(angleRad)

              const badgeRadiusPercent = 52.0
              const badgeLeftPercent = 50 + badgeRadiusPercent * Math.cos(angleRad)
              const badgeTopPercent = 50 + badgeRadiusPercent * Math.sin(angleRad)

              return (
                <React.Fragment key={state.num}>
                  <div
                    ref={(el) => (nodeDotRefs.current[index] = el)}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${dotLeftPercent}%`,
                      top: `${dotTopPercent}%`,
                      willChange: 'opacity',
                    }}
                  />

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
        </div>
      </div>
    </section>
  )
}

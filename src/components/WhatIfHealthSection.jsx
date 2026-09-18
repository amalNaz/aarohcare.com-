import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================
const CONFIG = {
  stepAngle: 72, // 360° / 5 = 72° per checkpoint
  totalRotation: 288, // 4 steps * 72° = 288° total rotation across 5 states
  transitionDuration: 0.6, // Smooth cinematic rotation duration
  scrollCooldown: 650, // Minimum ms between wheel gestures to prevent multi-step skipping
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

// Base angles around the 360° circle (0° = top apex, 72° clockwise for next state)
const NODE_BASE_ANGLES = [0, 72, 144, 216, 288]

export default function WhatIfHealthSection() {
  const containerRef = useRef(null)
  const wheelRef = useRef(null)
  const connectorRef = useRef(null)
  const nodeBadgeRefs = useRef([])
  const nodeDotRefs = useRef([])
  const badgeTextRefs = useRef([])
  const stateCardRefs = useRef([])

  const [activeStep, setActiveStep] = useState(0)
  const activeStepRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const lastScrollTimeRef = useRef(0)
  const stRef = useRef(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    const connector = connectorRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // 1. Initialize connector bar (visible at state 0)
      if (connector) {
        gsap.set(connector, { opacity: 1, scaleY: 1 })
      }

      // 2. Initialize all 5 cards
      stateCardRefs.current.forEach((card, idx) => {
        if (!card) return
        if (idx === 0) {
          gsap.set(card, { opacity: 1, y: 0, pointerEvents: 'auto' })
        } else {
          gsap.set(card, { opacity: 0, y: 14, pointerEvents: 'none' })
        }
      })

      // 3. Initialize node badges and dots
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const dot = nodeDotRefs.current[idx]
        if (idx === 0) {
          gsap.set(badge, {
            opacity: 1,
            scale: 1,
            borderColor: '#71717a',
            color: '#ffffff',
            backgroundColor: '#000000',
          })
          if (dot) gsap.set(dot, { opacity: 0 })
        } else {
          gsap.set(badge, {
            opacity: 0.5,
            scale: 0.95,
            borderColor: '#27272a',
            color: '#71717a',
            backgroundColor: '#000000',
          })
          if (dot) gsap.set(dot, { opacity: 0.6 })
        }
      })

      // ========================================================================
      // SCROLLTRIGGER PIN CONTROLLER WITH CHECKPOINT SNAP
      // ========================================================================
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.max(2000, window.innerHeight * 2.5)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1.0],
          duration: { min: 0.2, max: 0.45 },
          ease: 'power2.out',
        },
        onEnter: () => {
          activeStepRef.current = 0
          setActiveStep(0)
        },
        onEnterBack: () => {
          activeStepRef.current = 4
          setActiveStep(4)
        },
        onLeave: () => {
          activeStepRef.current = 4
          setActiveStep(4)
        },
        onLeaveBack: () => {
          activeStepRef.current = 0
          setActiveStep(0)
        },
        onUpdate: (self) => {
          if (!isAnimatingRef.current) {
            const nearestStep = Math.min(4, Math.max(0, Math.round(self.progress * 4)))
            if (nearestStep !== activeStepRef.current) {
              activeStepRef.current = nearestStep
              setActiveStep(nearestStep)
              applyStepVisuals(nearestStep, 0.3)
            }
          }
        },
      })

      stRef.current = st
    }, containerRef)

    // ========================================================================
    // VISUAL STATE TRANSITION ENGINE
    // ========================================================================
    const applyStepVisuals = (targetStep, duration = CONFIG.transitionDuration) => {
      const targetRotation = -targetStep * CONFIG.stepAngle
      const counterRotation = targetStep * CONFIG.stepAngle

      // 1. Rotate the wheel smoothly
      if (wheel) {
        gsap.to(wheel, {
          rotation: targetRotation,
          duration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      // 2. Counter-rotate the digits inside each badge to keep text upright
      badgeTextRefs.current.forEach((textEl) => {
        if (textEl) {
          gsap.to(textEl, {
            rotation: counterRotation,
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })

      // 3. Yellow/Grey Connector Bar: Brief fade out during transition, fade in at apex
      if (connector) {
        gsap.killTweensOf(connector)
        const tl = gsap.timeline()
        tl.to(connector, { opacity: 0, duration: duration * 0.25, ease: 'power1.out' })
        tl.to(connector, { opacity: 1, duration: duration * 0.45, ease: 'power1.in' }, duration * 0.55)
      }

      // 4. Cross-fade text cards
      stateCardRefs.current.forEach((card, idx) => {
        if (!card) return
        gsap.killTweensOf(card)
        if (idx === targetStep) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 12, pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              duration: duration * 0.6,
              delay: duration * 0.35,
              ease: 'power2.out',
              pointerEvents: 'auto',
            }
          )
        } else {
          gsap.to(card, {
            opacity: 0,
            y: -10,
            duration: duration * 0.3,
            ease: 'power1.inOut',
            pointerEvents: 'none',
          })
        }
      })

      // 5. Update badge borders and dots
      nodeBadgeRefs.current.forEach((badge, idx) => {
        if (!badge) return
        const dot = nodeDotRefs.current[idx]
        gsap.killTweensOf(badge)
        if (dot) gsap.killTweensOf(dot)

        if (idx === targetStep) {
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            borderColor: '#71717a',
            color: '#ffffff',
            duration: duration * 0.5,
            delay: duration * 0.3,
            ease: 'power2.out',
          })
          if (dot) {
            gsap.to(dot, { opacity: 0, duration: duration * 0.3 })
          }
        } else {
          gsap.to(badge, {
            opacity: 0.5,
            scale: 0.95,
            borderColor: '#27272a',
            color: '#71717a',
            duration: duration * 0.3,
            ease: 'power2.out',
          })
          if (dot) {
            gsap.to(dot, { opacity: 0.6, duration: duration * 0.4, delay: duration * 0.2 })
          }
        }
      })
    }

    // ========================================================================
    // DISCRETE CHECKPOINT CONTROLLER WITH ScrollToPlugin
    // ========================================================================
    const animateToStep = (targetStep) => {
      const st = stRef.current
      if (!st) return
      isAnimatingRef.current = true
      activeStepRef.current = targetStep
      setActiveStep(targetStep)

      const targetProgress = targetStep / (STATES.length - 1)
      const targetScroll = st.start + targetProgress * (st.end - st.start)

      applyStepVisuals(targetStep, CONFIG.transitionDuration)

      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: CONFIG.transitionDuration,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 120)
        },
      })
    }

    // Expose for node click handler
    window.__whatIfAnimateToStep = animateToStep

    // ========================================================================
    // ROBUST 1-SCROLL-PER-CIRCLE WHEEL INTERCEPTOR
    // ========================================================================
    const handleWheel = (e) => {
      const st = stRef.current
      if (!st || !st.isActive) return

      if (Math.abs(e.deltaY) < 12) return

      const now = Date.now()
      const timeSinceLast = now - lastScrollTimeRef.current

      if (e.deltaY > 0) {
        // User scrolling DOWN
        if (activeStepRef.current < STATES.length - 1) {
          e.preventDefault()
          if (timeSinceLast > CONFIG.scrollCooldown && !isAnimatingRef.current) {
            lastScrollTimeRef.current = now
            animateToStep(activeStepRef.current + 1)
          }
        }
        // If at state 4, allow default scroll to proceed naturally down to next section
      } else if (e.deltaY < 0) {
        // User scrolling UP
        if (activeStepRef.current > 0) {
          e.preventDefault()
          if (timeSinceLast > CONFIG.scrollCooldown && !isAnimatingRef.current) {
            lastScrollTimeRef.current = now
            animateToStep(activeStepRef.current - 1)
          }
        }
        // If at state 0, allow default scroll to proceed naturally up to previous section
      }
    }

    // Touch Support for Mobile / Tablets
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      const st = stRef.current
      if (!st || !st.isActive) return
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY

      if (Math.abs(deltaY) < 30) return

      const now = Date.now()
      const timeSinceLast = now - lastScrollTimeRef.current

      if (deltaY > 0 && activeStepRef.current < STATES.length - 1) {
        e.preventDefault()
        if (timeSinceLast > CONFIG.scrollCooldown && !isAnimatingRef.current) {
          lastScrollTimeRef.current = now
          touchStartY = currentY
          animateToStep(activeStepRef.current + 1)
        }
      } else if (deltaY < 0 && activeStepRef.current > 0) {
        e.preventDefault()
        if (timeSinceLast > CONFIG.scrollCooldown && !isAnimatingRef.current) {
          lastScrollTimeRef.current = now
          touchStartY = currentY
          animateToStep(activeStepRef.current - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      delete window.__whatIfAnimateToStep
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      clearTimeout(refreshTimer)
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

      {/* Apex Indicator: Amber Dot & Vertical Connector Line (Only extends DOWNWARDS) */}
      <div
        ref={connectorRef}
        className="absolute top-[42vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
        style={{ willChange: 'opacity, transform' }}
      >
        {/* Solid Amber Dot centered on the arc path */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] -translate-y-1/2" />
        {/* Crisp Straight Vertical Line extending down into concept text */}
        <div className="w-[1px] h-32 sm:h-36 bg-[#8e8e93]/75 -mt-0.5" />
      </div>

      {/* Center Active Story Card Container (Inside / below the arc apex) */}
      <div className="absolute top-[calc(42vh+125px)] sm:top-[calc(42vh+135px)] left-1/2 -translate-x-1/2 w-full max-w-lg px-4 text-center z-20 pointer-events-none">
        {STATES.map((state, index) => (
          <div
            key={state.num}
            ref={(el) => (stateCardRefs.current[index] = el)}
            className="absolute inset-0 flex flex-col items-center justify-start text-center"
            style={{ willChange: 'opacity, transform' }}
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

      {/* Giant Rotating Orbital Wheel — Center is at (50%, 50%), Top Apex aligns at 42vh */}
      <div
        ref={wheelRef}
        className="absolute top-[42vh] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] sm:w-[1500px] sm:h-[1500px] lg:w-[1550px] lg:h-[1550px] rounded-full border border-neutral-800 pointer-events-none select-none z-10"
        style={{ willChange: 'transform' }}
      >
        {/* 5 Numbered Orbit Nodes Distributed around 360° at every 72° */}
        {STATES.map((state, index) => {
          const angleDeg = NODE_BASE_ANGLES[index]
          const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg corresponds to top apex

          // Position the dot exactly on the 50% radius circumference
          const dotLeftPercent = 50 + 50 * Math.cos(angleRad)
          const dotTopPercent = 50 + 50 * Math.sin(angleRad)

          // Position the badge center radially outward by 28px
          // (50% * (R + 28px) / R -> roughly 52.0% radius)
          const badgeRadiusPercent = 52.0
          const badgeLeftPercent = 50 + badgeRadiusPercent * Math.cos(angleRad)
          const badgeTopPercent = 50 + badgeRadiusPercent * Math.sin(angleRad)

          return (
            <React.Fragment key={state.num}>
              {/* Orbit Arc Dot (Positioned exactly on the arc circumference) */}
              <div
                ref={(el) => (nodeDotRefs.current[index] = el)}
                className="absolute w-2 h-2 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
                className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-sans font-bold text-xs sm:text-sm bg-black border border-neutral-700/80 text-white -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto shadow-sm focus:outline-none transition-colors duration-200"
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


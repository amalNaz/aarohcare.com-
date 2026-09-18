import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const concepts = [
  {
    num: '01',
    title: 'Instant',
    tagline: 'Zero Latency Triage',
    description:
      'Eliminating traditional clinical delays with intelligent instant queue telemetry and rapid check-in protocols.',
    accent: 'from-cyan-400 to-teal-300',
  },
  {
    num: '02',
    title: 'Insightful',
    tagline: 'Deep Clinical Clarity',
    description:
      'Providing patients and care providers with transparent real-time consultation stages and diagnostic timelines.',
    accent: 'from-teal-300 to-emerald-400',
  },
  {
    num: '03',
    title: 'Predictive',
    tagline: 'Proactive Care Schedules',
    description:
      'Forecasting appointment durations, travel times, and hospital traffic before you even leave your home.',
    accent: 'from-emerald-400 to-cyan-300',
  },
  {
    num: '04',
    title: 'Accessible',
    tagline: 'Care Within Reach',
    description:
      'Seamless WhatsApp & browser-native booking without confusing portals, bulky apps, or dawn queues.',
    accent: 'from-cyan-300 to-sky-400',
  },
  {
    num: '05',
    title: 'Intelligent',
    tagline: 'Dynamic Capacity Balancing',
    description:
      'AI-orchestrated scheduling that prevents waiting room logjams and optimizes doctor availability dynamically.',
    accent: 'from-sky-400 to-teal-400',
  },
  {
    num: '06',
    title: 'Designed for you',
    tagline: 'Human-Centered Healthcare',
    description:
      'A compassionate ecosystem that respects your time, dignity, and peace of mind at every single step.',
    accent: 'from-teal-400 to-emerald-300',
  },
]

export default function WhatIfHealthSection() {
  const containerRef = useRef(null)
  const wheelRef = useRef(null)
  const nodeRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Angles for the 6 nodes along the wheel's circumference (in degrees)
  // Positioned symmetrically across the top visible arc
  const baseAngles = [-60, -36, -12, 12, 36, 60]

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    const container = containerRef.current
    const wheel = wheelRef.current
    if (!container || !wheel) return

    const ctx = gsap.context(() => {
      // Rotation span: moves the wheel so node 0 (at -60deg) rotates to apex (0deg),
      // all the way to node 5 (at +60deg) rotating to apex
      const startRot = 60
      const endRot = -60

      gsap.set(wheel, { rotation: startRot })

      // Counter-rotate node content so numbers and icons stay upright
      nodeRefs.current.forEach((node) => {
        if (node) gsap.set(node, { rotation: -startRot })
      })

      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=2800',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress // 0.0 to 1.0
          const currentRotation = gsap.utils.interpolate(startRot, endRot, progress)

          // Rotate the main orbital wheel
          gsap.set(wheel, { rotation: currentRotation })

          // Counter-rotate each node element to remain upright
          nodeRefs.current.forEach((node) => {
            if (node) gsap.set(node, { rotation: -currentRotation })
          })

          // Calculate current active index based on scroll progress
          const index = Math.min(
            concepts.length - 1,
            Math.max(0, Math.floor(progress * concepts.length * 0.999))
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
      className="relative w-full bg-[#020813] text-white overflow-hidden selection:bg-cyan-500 selection:text-black"
    >
      {/* Background ambient radial lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-cyan-900/20 via-teal-900/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Main Pinned Viewport Container */}
      <div className="relative h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 lg:px-20 z-10">
        {/* Top Header */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-400/80 font-semibold mb-2 block">
              The Vision of Aarohcare
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              What If Health Was{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">
                {concepts[activeIndex].title}
              </span>
            </h2>
          </div>

          {/* Active Step Indicator Badge */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-medium text-slate-300">
              <strong className="text-white text-sm">{concepts[activeIndex].num}</strong> / 06
            </span>
          </div>
        </div>

        {/* Center Active Story Card & Content */}
        <div className="max-w-xl mx-auto text-center my-auto px-4 z-20 transition-all duration-300">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium uppercase tracking-wider mb-4">
            {concepts[activeIndex].tagline}
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {concepts[activeIndex].title}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-lg mx-auto">
            {concepts[activeIndex].description}
          </p>
        </div>

        {/* Bottom Orbital Wheel System (Large & Extended beyond bottom/edges) */}
        <div className="relative w-full h-44 sm:h-56 lg:h-64 flex items-center justify-center overflow-visible">
          {/* Central Apex Target Line Indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-transparent z-30" />

          {/* Large Rotating Orbital Circle System */}
          <div
            ref={wheelRef}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] lg:w-[1400px] lg:h-[1400px] rounded-full border border-slate-800/80 pointer-events-none select-none"
            style={{ willChange: 'transform' }}
          >
            {/* Outer Subtle Dashed Orbit Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/25" />

            {/* Inner Concentric Guide Ring */}
            <div className="absolute inset-8 sm:inset-12 lg:inset-16 rounded-full border border-slate-800/40" />

            {/* 6 Numbered Orbit Nodes Distributed Around the Circumference */}
            {concepts.map((concept, index) => {
              const angleDeg = baseAngles[index]
              const angleRad = (angleDeg - 90) * (Math.PI / 180) // 0deg at top
              const radiusPercent = 50 // on the outer circumference

              // Calculate percentage position
              const leftPercent = 50 + radiusPercent * Math.cos(angleRad)
              const topPercent = 50 + radiusPercent * Math.sin(angleRad)

              const isActive = index === activeIndex

              return (
                <div
                  key={concept.num}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                >
                  {/* Upright Counter-Rotating Inner Badge */}
                  <div
                    ref={(el) => (nodeRefs.current[index] = el)}
                    className={`flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'scale-125 z-20'
                        : 'scale-90 opacity-40 hover:opacity-75 z-10'
                    }`}
                  >
                    {/* Node Dot / Badge */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-tr from-cyan-400 to-teal-300 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.6)] ring-4 ring-cyan-500/20'
                          : 'bg-slate-900 border border-slate-700 text-slate-400'
                      }`}
                    >
                      {concept.num}
                    </div>

                    {/* Node Title Label */}
                    <span
                      className={`mt-2 text-[10px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {concept.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Subtle Scroll Guide Hint */}
        <div className="w-full flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/40">
          <span>Scroll to explore</span>
          <span className="flex items-center gap-1.5 text-cyan-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Interactive Storyline
          </span>
        </div>
      </div>
    </section>
  )
}

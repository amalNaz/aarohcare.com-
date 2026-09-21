import React, { useRef, useState, useCallback, useEffect } from 'react'
import clinicDashboardImg from '../assets/clinic-dashboard-screen.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function ClinicOperationsSection() {
  const containerRef = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -10% 0px' })
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const rafId = useRef(null)

  // Clean up any pending animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const isHoverSupported = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }

  const handleMouseMove = useCallback((e) => {
    if (!isHoverSupported() || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt angle: 6 degrees for smooth, calm physical 3D feel
    const maxTilt = 6
    const rotX = -((y - centerY) / centerY) * maxTilt
    const rotY = ((x - centerX) / centerX) * maxTilt
    const sX = (x / rect.width) * 100
    const sY = (y / rect.height) * 100

    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      setTransform({ rotateX: rotX, rotateY: rotY, shineX: sX, shineY: sY })
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isHoverSupported()) setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (rafId.current) cancelAnimationFrame(rafId.current)
    setTransform({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
  }, [])

  return (
    <section
      id="products"
      ref={containerRef}
      className="w-full bg-white text-slate-900 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <TextAnimate
            as="h2"
            animation="slideUp"
            by="word"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#161a1f] leading-[1.12]"
          >
            Clinic Side Operations <br />
            Management
          </TextAnimate>
        </div>

        {/* Custom High-Fidelity iPad Pro Mockup Showcase with 3D Tilt & Glass Shine */}
        <div className="reveal-ipad-showcase mt-8 sm:mt-10 lg:mt-12 max-w-4xl lg:max-w-5xl xl:max-w-[1020px] mx-auto">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
            style={{
              perspective: '1200px',
            }}
          >
            {/* iPad Chassis (Physical Device Unit) */}
            <div
              className="ipad-device-chassis relative bg-[#0d0f12] p-[9px] sm:p-[13px] lg:p-[15px] rounded-[28px] sm:rounded-[38px] lg:rounded-[44px]"
              style={{
                transform: isHovered
                  ? `rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.1, 1.1, 1.1)`
                  : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
                boxShadow: isHovered
                  ? '0 35px 70px -15px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                  : '0 12px 30px -10px rgba(0, 0, 0, 0.12)',
                transition: isHovered
                  ? 'transform 120ms cubic-bezier(0.2, 0, 0, 1), box-shadow 300ms ease-out'
                  : 'transform 850ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 850ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform, box-shadow',
              }}
            >
              {/* Dynamic Chassis Rim Sheen */}
              <div
                className="absolute inset-0 rounded-[28px] sm:rounded-[38px] lg:rounded-[44px] pointer-events-none transition-opacity duration-500 z-30"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(circle 500px at ${transform.shineX}% ${transform.shineY}%, rgba(255, 255, 255, 0.15), transparent 60%)`,
                }}
              />

              {/* Landscape Front Camera & Sensor Header */}
              <div className="absolute top-[4px] sm:top-[6px] lg:top-[7px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
                {/* Camera Lens */}
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1b2129] ring-[0.5px] ring-slate-600/70 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#0a3556]" />
                </div>
                {/* Ambient Sensor */}
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#12161c]" />
              </div>

              {/* iPad Screen Glass & Display */}
              <div className="relative w-full rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] overflow-hidden bg-white ring-1 ring-black/10 shadow-inner">
                {/* Clear Dashboard Image */}
                <div className="ipad-screen-content">
                  <img
                    src={clinicDashboardImg}
                    alt="AarohCare Clinic Queue Management Dashboard"
                    className="w-full h-auto object-cover select-none block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Dynamic 3D Interactive Cursor-Following Glass Shine Layer */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] z-30"
                  style={{
                    opacity: isHovered ? 0.85 : 0,
                    background: `radial-gradient(circle 520px at ${transform.shineX}% ${transform.shineY}%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
                    mixBlendMode: 'overlay',
                    transition: isHovered
                      ? 'opacity 300ms ease-out'
                      : 'opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                />

                {/* Base Glass Surface Reflection Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none rounded-[20px] sm:rounded-[26px] lg:rounded-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

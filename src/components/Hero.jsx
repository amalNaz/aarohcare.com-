import React, { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './Navbar'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function Hero({ videoSrc = '/hero-bg.mp4' }) {
  const videoRef = useRef(null)
  const containerRef = useScrollReveal({ threshold: 0.05 })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch((err) => {
        console.warn('Hero background video autoplay prevented:', err)
      })
    }
  }, [videoSrc])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full hero-gradient-bg text-white overflow-hidden pb-16 sm:pb-24 min-h-[620px]"
    >
      {/* Background Video Element with Gradient Overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Subtle dark gradient overlay to ensure text contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010a14]/50 via-[#010a14]/20 to-[#010a14]/85 pointer-events-none" />
      </div>

      {/* Header / Navbar */}
      <Navbar />

      <div className="relative z-10 w-full px-5 pt-24 sm:pt-32 lg:pt-36">
        {/* Main Headline */}
        <div className="max-w-3xl mb-24 sm:mb-32 lg:mb-40">
          <TextAnimate
            as="h1"
            animation="slideUp"
            by="word"
            className="text-5xl sm:text-7xl lg:text-[5.75rem] font-bold tracking-tight leading-[1.04] text-white drop-shadow-md"
          >
            Our Health, <br />
            Our Time.
          </TextAnimate>
        </div>

        {/* Bottom Section: 3 Features (Left) & Malayalam Quote + CTA (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left Column: 3 Highlights */}
          <div className="reveal-group lg:col-span-7 space-y-7 sm:space-y-8">
            {/* Feature 1 */}
            <div className="reveal-stagger-item flex items-start gap-4 sm:gap-5 group">
              <div className="mt-0.5 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 text-slate-300 flex items-center justify-center">
                {/* Hourglass / 0 hrs icon */}
                <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 2h12M6 22h12M7 2v4a5 5 0 002 4l3 2-3 2a5 5 0 00-2 4v4M17 2v4a5 5 0 01-2 4l-3 2 3 2a5 5 0 012 4v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-normal">
                  0 hrs Waiting Room Congestion
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/85 mt-0.5 leading-relaxed font-light">
                  Real-time insights, so you get care without the wait.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="reveal-stagger-item flex items-start gap-4 sm:gap-5 group">
              <div className="mt-0.5 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 text-slate-300 flex items-center justify-center">
                {/* Live Token Tracking / Target icon */}
                <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-normal">
                  Live Token Tracking
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/85 mt-0.5 leading-relaxed font-light">
                  Track your token status in real time and stay informed every step of the way.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="reveal-stagger-item flex items-start gap-4 sm:gap-5 group">
              <div className="mt-0.5 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 text-slate-300 flex items-center justify-center">
                {/* Hospital / Clinic Partner icon */}
                <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v6m-3-3h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-normal">
                  15+ Trusted Health Partners in Kerala
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/85 mt-0.5 leading-relaxed font-light">
                  From clinics to labs to hospitals — quality healthcare is closer than you think.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Malayalam Tagline & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right pt-4 lg:pt-0">
            <div className="space-y-4 sm:space-y-5">
              <div className="reveal-text font-malayalam text-xl sm:text-2xl lg:text-[1.7rem] font-semibold text-white leading-snug tracking-wide">
                &ldquo;നമ്മുടെ സമയം, <br />
                നമ്മുടെ ആരോഗ്യം&rdquo;
              </div>

              <div className="reveal-btn">
                <a
                  href="#how-it-works"
                  data-cursor-magnetic
                  className="group inline-flex items-center gap-2.5 bg-black/90 hover:bg-black text-white pl-5 pr-2 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-slate-700/60 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore More</span>
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

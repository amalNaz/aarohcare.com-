import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import healthPartnerHandImg from '../assets/health-partner-hand.jpg'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function HealthPartnerSection() {
  const containerRef = useScrollReveal({ threshold: 0.15 })

  return (
    <section ref={containerRef} className="w-full bg-white overflow-hidden select-none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] xl:min-h-[720px] 2xl:min-h-[780px]">
        {/* Left Column: Hand with Smartphone Mockup on Soft Curved Backdrop */}
        <div className="group relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-full bg-[#d6e6f2] overflow-hidden flex items-center justify-center cursor-pointer">
          <div className="w-full h-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.035] group-hover:-translate-y-1 group-active:scale-[1.02] will-change-transform flex items-center justify-center">
            <img
              src={healthPartnerHandImg}
              alt="AarohCare App Live OP Queue Tracking"
              width={1024}
              height={1024}
              className="reveal-image w-full h-full object-contain lg:object-cover object-center pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Right Column: Deep Navy Blue Section matching CTA Section with Typography & CTA */}
        <div
          data-theme="dark"
          className="reveal-group relative w-full bg-gradient-to-b from-[#0d2746] via-[#081f38] to-[#051526] text-white flex flex-col justify-center px-8 py-16 sm:px-14 sm:py-20 lg:px-16 lg:py-24 xl:px-24 2xl:px-32 overflow-hidden"
        >
          {/* Subtle ambient glow matching CTA Section */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl xl:max-w-2xl relative z-10">
            {/* Main Heading — Exact 2 lines */}
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-bold tracking-tight text-white leading-[1.05]"
            >
              Your Health Partner <br />
              We Imagined.
            </TextAnimate>

            {/* Paragraph Description */}
            <p className="reveal-text mt-7 sm:mt-8 lg:mt-9 text-base sm:text-lg lg:text-[1.25rem] xl:text-[1.38rem] text-slate-300 leading-[1.4] font-normal max-w-lg lg:max-w-xl">
              AarohCare connects your OP ticket with the live queue, helping you understand where you are in line and when it's time to head to the hospital.
            </p>

            {/* CTA Button */}
            <div className="reveal-btn mt-8 sm:mt-10 lg:mt-12">
              <a
                href="#how-it-works"
                data-cursor-magnetic
                className="group inline-flex items-center gap-3.5 bg-white hover:bg-slate-100 text-slate-900 pl-6 pr-2 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore More</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

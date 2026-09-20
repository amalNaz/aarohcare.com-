import React from 'react'
import labDashboardImg from '../assets/lab-command-center.webp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function LabFeaturesSection() {
  const containerRef = useScrollReveal({ threshold: 0.1 })
  const labFeatures = [
    {
      title: 'Accessible Expert Care',
      description:
        "upload lab results straight to a patient's app account. no printouts. no waiting for a callback",
    },
    {
      title: 'Instant Patient Access',
      description:
        'patients view and download their reports anytime through the AarohCare app',
    },
    {
      title: 'Full Patient History',
      description: "pull up a patient's past reports and visits in seconds",
    },
    {
      title: 'Simple, Focused Dashboard',
      description:
        'no queue clutter. labs get one clean module built just for reports',
    },
    {
      title: 'Secure & Registered-Only Access',
      description:
        'reports are only accessible to verified, registered patients, keeping results private',
    },
  ]

  return (
    <section ref={containerRef} className="relative w-full bg-[#0B294B] text-white overflow-hidden py-10 sm:py-12 lg:py-14 xl:py-16 min-h-[560px] lg:min-h-[620px] xl:min-h-[660px]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
          {/* LEFT COLUMN: Positioned strictly toward Upper-Left */}
          <div className="reveal-group lg:col-span-5 xl:col-span-5 relative z-20 pt-2 sm:pt-4">
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] font-medium tracking-tight text-white leading-[1.02] text-left"
            >
              Labs features for <br />
              the site:
            </TextAnimate>

            {/* 5 Feature Bullets */}
            <div className="mt-8 sm:mt-9 lg:mt-10 space-y-4 sm:space-y-4.5 lg:space-y-5">
              {labFeatures.map((item, idx) => (
                <div key={idx} className="reveal-stagger-item space-y-0.5 group text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 opacity-90" />
                    <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-[#F5F7FA] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-[#AFC0D0] font-normal leading-[1.4] pl-4 max-w-sm sm:max-w-md">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic Apple-style iPad Mockup */}
          <div className="reveal-image lg:col-span-7 xl:col-span-7 relative w-full pt-4 lg:pt-0">
            <div className="w-full max-w-xl sm:max-w-2xl mx-auto lg:max-w-none lg:mx-0 lg:absolute lg:top-4 xl:top-2 lg:left-0 lg:w-[132%] xl:w-[136%] 2xl:w-[140%]">
              <div className="relative bg-[#0d1015] p-[8px] sm:p-[10px] lg:p-[12px] rounded-[28px] sm:rounded-[36px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[48px] lg:rounded-bl-[48px] border-[2.5px] sm:border-[3px] lg:border-r-0 border-[#c8aa84] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,170,132,0.25)]">
                {/* Left Bezel Front Camera & Ambient Sensor */}
                <div className="absolute left-[3px] sm:left-[4px] lg:left-[4.5px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1a1f26] ring-[0.5px] ring-slate-600/70 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#0a3556]" />
                  </div>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#11161d]" />
                </div>

                {/* Inner Screen Display Glass */}
                <div className="relative w-full rounded-[20px] sm:rounded-[28px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[36px] lg:rounded-bl-[36px] overflow-hidden bg-white ring-1 ring-black/10 shadow-inner">
                  <img
                    src={labDashboardImg}
                    alt="AarohCare Lab Command Center Dashboard"
                    className="w-full h-auto object-cover sm:object-contain select-none block"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.045] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

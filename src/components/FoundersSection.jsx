import React from 'react'
import amalImg from '../assets/amal-hisham.webp'
import aslamImg from '../assets/muhammed-aslam.webp'
import kiranImg from '../assets/kiran-vk.webp'
import { TextAnimate } from '@/registry/magicui/text-animate'

export default function FoundersSection() {
  const founders = [
    {
      name: 'Amal Hisham K',
      role: 'Founder and CEO',
      bio: 'Leads product vision and company direction',
      image: amalImg,
      imagePosition: 'object-[center_20%]',
      alt: 'Amal Hisham K, Founder and CEO of AarohCare',
    },
    {
      name: 'Muhammed Aslam',
      role: 'Co-founder and COO',
      bio: 'Leads operations and hospital/clinic partnerships',
      image: aslamImg,
      imagePosition: 'object-[center_15%]',
      alt: 'Muhammed Aslam, COO of AarohCare',
    },
    {
      name: 'Kiran VK',
      role: 'Co-founder and CMO',
      bio: 'Leads marketing and growth',
      image: kiranImg,
      imagePosition: 'object-[center_25%]',
      alt: 'Kiran VK, CMO of AarohCare',
    },
  ]

  return (
    <section
      id="about-us"
      className="w-full bg-white text-slate-900 pt-20 sm:pt-22 lg:pt-24 pb-12 sm:pb-14 lg:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <TextAnimate
            as="h2"
            animation="slideUp"
            by="word"
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#091e38] tracking-tight leading-[1.2] text-center"
          >
            Built by People Who Care
          </TextAnimate>
        </div>

        {/* 3 Founder Cards Grid — Always visible, cleanly aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-[#dde3ea] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] p-3.5 sm:p-4 lg:p-4.5 pb-6 sm:pb-7 flex flex-col transition-shadow duration-300 shadow-xs hover:shadow-md"
            >
              {/* Photo Box — Strictly square aspect ratio for identical alignment across all cards */}
              <div
                className="relative w-full flex-shrink-0 rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] overflow-hidden bg-slate-200 shadow-xs"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={founder.image}
                  alt={founder.alt}
                  width={400}
                  height={400}
                  className={`w-full h-full object-cover grayscale transition-transform duration-700 ease-out hover:scale-[1.02] ${founder.imagePosition}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Founder Information — Aligned cleanly flush with photo box */}
              <div className="mt-4 sm:mt-5 px-1 space-y-1 text-left">
                <h3 className="text-lg sm:text-xl lg:text-[1.25rem] font-bold text-[#0f172a] tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-[17px] sm:text-[18px] font-semibold text-slate-800">
                  {founder.role}
                </p>
                <p className="text-[15px] sm:text-[16px] text-slate-600 font-normal leading-relaxed pt-0.5">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

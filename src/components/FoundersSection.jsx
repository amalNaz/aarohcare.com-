import React from 'react'
import amalImg from '../assets/amal-hisham.jpg'
import aslamImg from '../assets/muhammed-aslam.jpg'
import kiranImg from '../assets/kiran-vk.jpg'

export default function FoundersSection() {
  const founders = [
    {
      name: 'Amal Hisham K',
      role: 'Founder and CEO',
      bio: 'Leads product vision and company direction',
      image: amalImg,
      imagePosition: 'object-[center_20%]',
    },
    {
      name: 'Muhammed Aslam',
      role: 'Co-founder and COO',
      bio: 'leads operations and hospital/clinic partnerships',
      image: aslamImg,
      imagePosition: 'object-[center_15%]',
    },
    {
      name: 'Kiran VK',
      role: 'Co-founder and CMO',
      bio: 'leads marketing and growth',
      image: kiranImg,
      imagePosition: 'object-[center_25%]',
    },
  ]

  return (
    <section className="w-full bg-[#edf1f5] text-slate-900 py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-semibold text-[#091e38] tracking-tight leading-[1.35]">
            AarohCare is a Kerala-born health-tech startup built to end <br className="hidden sm:inline" />
            the age-old hospital waiting-room problem.
          </h2>
        </div>

        {/* 3 Founder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-[#dde3ea] rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] p-4 sm:p-4.5 lg:p-5 pb-7 sm:pb-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              {/* Photo Box */}
              <div className="relative w-full aspect-[1/1.12] rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] overflow-hidden bg-white shadow-sm">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className={`w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02] ${founder.imagePosition}`}
                  loading="lazy"
                />
              </div>

              {/* Founder Information */}
              <div className="mt-5 sm:mt-6 px-1.5 space-y-1">
                <h3 className="text-lg sm:text-xl lg:text-[1.28rem] font-bold text-[#111822] tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-xs sm:text-[13px] font-medium text-[#4a5568]">
                  {founder.role}
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#6b778c] font-normal leading-relaxed pt-0.5">
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

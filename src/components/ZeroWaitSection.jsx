import React from 'react'
import smartOpBookingImg from '../assets/smart op booking.png'
import liveTokenTrackingImg from '../assets/live token tracking.png'
import zeroOvercrowdingImg from '../assets/zero over crowding.png'

export default function ZeroWaitSection() {
  const cards = [
    {
      title: 'Smart OP Booking',
      description:
        'Reserve verified OPD appointments in under 30 seconds via WhatsApp or mobile browser without dawn queues.',
      image: smartOpBookingImg,
      alt: 'Smart OP Booking at clinic',
    },
    {
      title: 'Live Token Tracking',
      description:
        'Unbroken real-time telemetry syncing doctor consultation intervals directly to your screen with millisecond latency.',
      image: liveTokenTrackingImg,
      alt: 'Live doctor consultation and token tracking',
    },
    {
      title: 'Zero Overcrowding',
      description:
        'Protected, calm waiting lounges that shield fragile individuals and pediatric patients from airborne infection.',
      image: zeroOvercrowdingImg,
      alt: 'Calm and zero overcrowding medical care',
    },
  ]

  return (
    <section className="w-full bg-white text-slate-900 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Description */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed mb-8 sm:mb-12 font-normal">
          Eliminate traditional reception logjams through coordinated clinical scheduling algorithms designed for patients, doctors, and hospital administrators.
        </p>

        {/* Big Bold Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight text-[#08182b] max-w-4xl leading-[1.08] mb-12 sm:mb-16">
          Engineered for zero-wait <br />
          patient experiences
        </h2>

        {/* 3 Image Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Card Image */}
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Dark Gradient Overlay for High Contrast Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Content at Bottom of Card */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

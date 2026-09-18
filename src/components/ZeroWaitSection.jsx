import React from 'react'
import smartOpBookingImg from '../assets/smart op booking.png'
import liveTokenTrackingImg from '../assets/live token tracking.png'

export default function ZeroWaitSection() {
  const baseCards = [
    {
      id: 'card-a-1',
      title: 'Smart OP Booking',
      description:
        'Reserve verified OPD appointments in under 30 seconds via WhatsApp or mobile browser without dawn queues.',
      image: smartOpBookingImg,
      alt: 'Smart OP Booking at clinic',
    },
    {
      id: 'card-b-1',
      title: 'Live Token Tracking',
      description:
        'Unbroken real-time telemetry syncing doctor consultation intervals directly to your screen with millisecond latency.',
      image: liveTokenTrackingImg,
      alt: 'Live doctor consultation and token tracking',
    },
    {
      id: 'card-a-2',
      title: 'Smart OP Booking',
      description:
        'Reserve verified OPD appointments in under 30 seconds via WhatsApp or mobile browser without dawn queues.',
      image: smartOpBookingImg,
      alt: 'Smart OP Booking at clinic',
    },
    {
      id: 'card-b-2',
      title: 'Live Token Tracking',
      description:
        'Unbroken real-time telemetry syncing doctor consultation intervals directly to your screen with millisecond latency.',
      image: liveTokenTrackingImg,
      alt: 'Live doctor consultation and token tracking',
    },
  ]

  // Duplicated set to create an endless, seamless looping track
  const allCards = [...baseCards, ...baseCards]

  return (
    <section className="w-full bg-white text-slate-900 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Top Header & Description (Constrained Width) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed mb-8 sm:mb-12 font-normal">
          Eliminate traditional reception logjams through coordinated clinical scheduling algorithms designed for patients, doctors, and hospital administrators.
        </p>

        <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight text-[#08182b] max-w-4xl leading-[1.08]">
          Engineered for zero-wait <br />
          patient experiences
        </h2>
      </div>

      {/* Full-Width Infinite Moving Card Track (Bleeds to Viewport Edges) */}
      <div className="w-full overflow-hidden select-none py-2">
        <div className="animate-card-marquee flex gap-6 sm:gap-8 px-3">
          {allCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="group relative flex-shrink-0 w-[78vw] sm:w-[50vw] md:w-[42vw] lg:w-[38vw] xl:w-[480px] max-w-[500px] aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Card Image */}
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                draggable={false}
              />

              {/* Dark Gradient Overlay for High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

              {/* Card Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white flex flex-col justify-end">
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

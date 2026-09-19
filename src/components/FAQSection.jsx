import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import faqRunningImg from '../assets/faq-running.jpg'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'How do I book an OP appointment on AarohCare?',
      answer:
        "Open the app, search for your hospital, clinic, or lab, pick a doctor, and choose a date from the calendar. You'll get a confirmation with a unique booking ID and a live OP number instantly.",
    },
    {
      question: 'How does the live queue tracking work?',
      answer:
        "AarohCare connects directly to the clinic's OPD counter. Your live token progress updates in real-time, displaying how many patients are ahead and when it's your turn.",
    },
    {
      question: 'What are travel-time departure alerts?',
      answer:
        'The app calculates live traffic and queue movement to send intelligent alerts telling you exactly when to leave home, ensuring zero waiting room congestion.',
    },
    {
      question: 'Can I access my lab reports through the app?',
      answer:
        'Yes, partner labs upload results directly to your verified AarohCare patient profile, allowing you to view and download historical reports securely anytime.',
    },
    {
      question: 'Is AarohCare free for patients?',
      answer:
        'AarohCare is completely free for patients to download, browse hospitals, track queue status, and access personal medical records.',
    },
  ]

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <section className="w-full bg-white text-slate-900 py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Image Box with Aarohcare Wordmark */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative w-full aspect-[1/1] sm:aspect-[4/3.5] lg:aspect-[1.05/1] rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden bg-slate-900 shadow-xl group">
              {/* Blurred action running photo */}
              <img
                src={faqRunningImg}
                alt="AarohCare Live Motion"
                className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Contrast overlay */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />

              {/* Centered Aarohcare Wordmark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight drop-shadow-md">
                  Aarohcare
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions Accordion */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold text-[#081f3d] tracking-tight mb-8 sm:mb-10 lg:mb-12">
              Frequently Asked Questions
            </h2>

            {/* Accordion List */}
            <div className="divide-y divide-dashed divide-slate-300/80">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <div key={index} className="py-5 sm:py-6 first:pt-0 last:pb-0">
                    {/* Question Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg lg:text-[1.12rem] font-semibold text-[#0f1d30] tracking-tight group-hover:text-cyan-700 transition-colors">
                        {faq.question}
                      </span>

                      {/* Animated Chevron */}
                      <span className="text-[#0f1d30] shrink-0 transition-transform duration-300">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 stroke-[2.2]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 stroke-[2.2]" />
                        )}
                      </span>
                    </button>

                    {/* Expandable Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm lg:text-[0.92rem] text-slate-600 font-normal leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

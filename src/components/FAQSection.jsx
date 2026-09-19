import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import faqRunningImg from '../assets/faq-running.jpg'

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      question: 'How do I join MyHealthPrac?',
      answer:
        'Create your account through the MyHealthPrac platform and complete the onboarding process. Once your profile is set up, you can access the available tools and services.',
    },
    {
      question: 'Who is MyHealthPrac for?',
      answer:
        'MyHealthPrac is designed for people who want a more structured approach to understanding and managing their health, as well as practitioners working with health data and patient care.',
    },
    {
      question: 'What is Functional Medicine?',
      answer:
        'Functional Medicine focuses on understanding the underlying factors that influence health rather than looking only at individual symptoms. It uses a broader view of health history, lifestyle, and relevant data.',
    },
    {
      question: 'Where is MyHealthPrac available?',
      answer:
        'MyHealthPrac availability depends on the services and practitioner network offered in your region. Check the current platform availability during registration.',
    },
    {
      question: "When's the best time to start using MyHealthPrac?",
      answer:
        'You can start whenever you want to take a more structured approach to your health. Beginning early can help you establish useful health information and track changes over time.',
    },
    {
      question: 'Do I need to be a doctor to use MyHealthPrac?',
      answer:
        'No. The platform can support different user types and workflows. Certain professional tools and clinical features may require appropriate practitioner access or credentials.',
    },
    {
      question: 'What makes MyHealthPrac different from other health platforms?',
      answer:
        'MyHealthPrac brings health information, insights, and workflows together in a focused experience designed to make complex health information easier to understand and use.',
    },
    {
      question: 'What features are included in MyHealthPrac?',
      answer:
        'Depending on the account and service available, features can include health data management, reports, practitioner workflows, monitoring tools, insights, and personalized health information.',
    },
    {
      question: 'How does MyHealthPrac interpret test results and data?',
      answer:
        'The platform can organize and contextualize health information to make patterns easier to review. Clinical interpretation should always be performed by an appropriately qualified healthcare professional when required.',
    },
    {
      question: 'Can I use MyHealthPrac to deliver remote care at scale, not just monitor my own health?',
      answer:
        'Yes, professional workflows can be designed to support remote monitoring and digital care delivery across multiple patients, subject to appropriate clinical, privacy, and regulatory requirements.',
    },
  ]

  const toggleAccordion = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index))
  }

  return (
    <section className="w-full bg-white text-slate-900 py-20 sm:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* =========================================================================
              LEFT COLUMN (~50% width): Large, High-Presence Sticky Visual
              Stays sticky while right FAQ content moves with normal page scroll
              ========================================================================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start w-full">
            <div className="relative w-full aspect-[1/1] sm:aspect-[4/3.5] lg:aspect-[1/1] rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden bg-slate-950 shadow-xl group">
              {/* Large High-Quality Healthcare Motion Visual */}
              <img
                src={faqRunningImg}
                alt="AarohCare Healthcare Motion"
                className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle ambient contrast overlay */}
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />

              {/* Centered Brand Signature Wordmark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight drop-shadow-md">
                  Aarohcare
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (~50% width): Normal Document Flow with 10 FAQs
              ========================================================================= */}
          <div className="lg:col-span-6 w-full space-y-2">
            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#081f3d] tracking-tight mb-8 sm:mb-10 lg:mb-12">
              Quick Answers
            </h2>

            {/* 10-Item FAQ Accordion List */}
            <div className="divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index
                const answerId = `faq-answer-${index}`
                const buttonId = `faq-button-${index}`

                return (
                  <div key={index} className="py-4.5 sm:py-5 lg:py-5.5">
                    {/* Semantic Accordion Header Button */}
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-lg py-1 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="text-[15px] sm:text-[16.5px] lg:text-[17.5px] font-medium text-[#101b2b] tracking-tight group-hover:text-cyan-700 transition-colors">
                        {faq.question}
                      </span>

                      {/* Clean Plus (+) / Minus (−) Toggle Indicator */}
                      <span className="text-[#101b2b] group-hover:text-cyan-700 shrink-0 w-6 h-6 flex items-center justify-center transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                        )}
                      </span>
                    </button>

                    {/* Smoothly Animated Expandable Answer Content */}
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5 sm:mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-slate-600 font-normal leading-relaxed pr-6 max-w-xl">
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

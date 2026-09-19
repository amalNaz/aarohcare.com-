import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import faqRunningImg from '../assets/faq-running.jpg'

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState(0)

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
    <section className="w-full bg-[#f4f4f4] text-slate-900 py-14 sm:py-16 lg:py-20">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* =========================================================================
              LEFT COLUMN (57–58% width): Prominent Large Image with Centered Aarohcare Text
              ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 w-full">
            <div className="relative w-full aspect-[1.12/1] sm:aspect-[1.1/1] lg:h-[540px] xl:h-[580px] 2xl:h-[600px] rounded-[8px] sm:rounded-[10px] overflow-hidden bg-slate-900 shadow-sm">
              <img
                src={faqRunningImg}
                alt="Aarohcare"
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
              />
              {/* Centered Aarohcare brand text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-2xl sm:text-3xl lg:text-[1.85rem] font-medium tracking-tight drop-shadow-sm">
                  Aarohcare
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (42–43% width): Heading & Compact Dotted Accordion
              ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 w-full flex flex-col justify-start">
            {/* Heading: Refined navy heading aligned with top of the image */}
            <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-[#092240] tracking-tight mb-5 sm:mb-6 leading-tight">
              Frequently Asked Questions
            </h2>

            {/* 10 FAQ Questions: Minimal dotted separator list */}
            <div className="w-full">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index
                const answerId = `faq-answer-${index}`
                const buttonId = `faq-button-${index}`

                return (
                  <div
                    key={index}
                    className="border-b border-dotted border-[#cfcfcf] py-3.5 sm:py-4"
                  >
                    {/* Interactive Row Button */}
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between gap-3 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#092240] rounded py-0.5 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] font-medium text-[#092240] tracking-tight group-hover:text-blue-900 transition-colors">
                        {faq.question}
                      </span>

                      {/* Small Chevron Icon */}
                      <span className="text-[#092240] shrink-0 w-4 h-4 flex items-center justify-center transition-transform">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 stroke-[2]" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 stroke-[2]" />
                        )}
                      </span>
                    </button>

                    {/* Smooth Expand/Collapse Region */}
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[11.5px] sm:text-[12px] text-slate-500 font-normal leading-[1.55] pr-2">
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

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/animate-ui/components/radix/accordion'
import faqRunningImg from '../assets/faq-running.webp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TextAnimate } from '@/registry/magicui/text-animate'

const faqs = [
  {
    question: 'What is AarohCare?',
    answer:
      'AarohCare is a HealthTech platform that helps patients book OP appointments online, track their live queue, and visit the hospital at the right time.',
  },
  {
    question: 'How does AarohCare work?',
    answer:
      'Simply choose your hospital, select the doctor and your preferred time, book your OP, and track your live queue from your phone.',
  },
  {
    question: 'Do I still need to stand in long queues?',
    answer:
      'No. AarohCare helps reduce unnecessary waiting by letting you arrive closer to your consultation time.',
  },
  {
    question: 'Can I see my live OP number?',
    answer:
      'Yes. You can track your OP number and the live queue status directly from the app.',
  },
  {
    question: 'What is Smart Arrival Notification?',
    answer:
      'AarohCare notifies you when it\'s the right time to leave for the hospital based on your queue status, distance, and traffic conditions.',
  },
  {
    question: 'Can I book OP from home?',
    answer:
      'Yes. You can book your OP anytime, from anywhere, using the AarohCare app.',
  },
  {
    question: 'Which hospitals can I use AarohCare with?',
    answer:
      'You can use AarohCare at hospitals and clinics that are partnered with our platform.',
  },
  {
    question: 'Is AarohCare only for large hospitals?',
    answer:
      'No. AarohCare is designed for hospitals and clinics of all sizes, especially those in rural and semi-urban areas.',
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'Yes. We use secure technology to protect your personal and medical information.',
  },
  {
    question: 'Why should I choose AarohCare?',
    answer:
      'AarohCare saves time, reduces waiting, helps avoid crowded hospitals, and makes your hospital visit easier and more convenient.',
  },
  {
    question: 'How does AarohCare help hospitals?',
    answer:
      'It helps hospitals manage patient flow, reduce overcrowding, and improve the overall patient experience.',
  },
  {
    question: 'Is it difficult for hospitals to start using AarohCare?',
    answer:
      'No. Our team assists hospitals with setup, onboarding, and support, making the process simple and hassle-free.',
  },
]

export default function FAQSection() {
  const containerRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section
      id="faq"
      ref={containerRef}
      className="w-full bg-[#f4f4f4] text-slate-900 py-16 sm:py-20 lg:py-28 relative scroll-mt-12"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN: Sticky on Desktop — Waits until all accordions finish
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 w-full lg:sticky lg:top-24 lg:self-start">
            <div className="reveal-image relative w-full aspect-[1.12/1] sm:aspect-[1.1/1] lg:h-[480px] xl:h-[530px] rounded-[10px] sm:rounded-[12px] overflow-hidden bg-slate-900 shadow-sm">
              <img
                src={faqRunningImg}
                alt="Aarohcare"
                width={640}
                height={570}
                className="w-full h-full object-cover object-center select-none"
                loading="lazy"
                decoding="async"
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
              RIGHT COLUMN: Heading & Staggered Radix UI Accordion Flow
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex flex-col justify-start">
            {/* Heading: Refined navy heading aligned with top of the image */}
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              className="text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold text-[#092240] tracking-tight mb-6 sm:mb-8 leading-tight"
            >
              Frequently Asked Questions
            </TextAnimate>

            {/* 12 AarohCare FAQ Questions: Radix Accordion with smooth transitions */}
            <div className="reveal-group w-full">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className="reveal-stagger-item"
                  >
                    <AccordionTrigger showArrow={true}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent keepRendered={false}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



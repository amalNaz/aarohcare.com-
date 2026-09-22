import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  FileText,
  Shield,
  UserCheck,
  Clock,
  Building2,
  CreditCard,
  AlertTriangle,
  Lock,
  Globe,
  Award,
  Scale,
  BookOpen,
  RefreshCw,
  Mail,
  Phone,
  ChevronRight,
  ArrowUp,
} from 'lucide-react'
import logoImg from '../assets/aarohcare-logo.png'
import { TextAnimate } from '@/registry/magicui/text-animate'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: 'about',
    number: '01',
    title: 'About AarohCare',
    icon: Building2,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare is a digital platform that enables users to book OP tokens and track clinic/hospital queues. AarohCare does not provide medical diagnosis, treatment, consultation, or other healthcare services.
      </p>
    ),
  },
  {
    id: 'user-info',
    number: '02',
    title: 'User Information',
    icon: UserCheck,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        Users must provide accurate and up-to-date information, including their name, age, phone number, and other information required for booking.
      </p>
    ),
  },
  {
    id: 'booking-tokens',
    number: '03',
    title: 'OP Booking & Token',
    icon: Clock,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>When booking through AarohCare:</p>
        <ul className="space-y-2.5 pl-1">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span>A token confirms your booking in the selected clinic/hospital queue.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span>Token numbers and estimated waiting times may change due to actual clinic conditions.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span>Booking a token does not guarantee an exact consultation time.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span>Clinic/hospital operating hours, doctor availability, and queue management may affect your visit.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'clinics-doctors',
    number: '04',
    title: 'Clinics & Doctors',
    icon: Shield,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        Clinics and doctors available through AarohCare are independent service providers. AarohCare is not responsible for the medical services, diagnosis, treatment, decisions, or outcomes provided by them.
      </p>
    ),
  },
  {
    id: 'payments-fees',
    number: '05',
    title: 'Payments & Fees',
    icon: CreditCard,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        Where applicable, AarohCare may charge a platform or booking fee. Consultation and other healthcare charges are determined by the respective clinic/hospital.
      </p>
    ),
  },
  {
    id: 'user-responsibilities',
    number: '06',
    title: 'User Responsibilities',
    icon: AlertTriangle,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>Users must not:</p>
        <ul className="space-y-2.5 pl-1">
          <li className="flex items-start gap-2.5 text-rose-700/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
            <span>Make fake, fraudulent, or unnecessary bookings.</span>
          </li>
          <li className="flex items-start gap-2.5 text-rose-700/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
            <span>Provide false or misleading information.</span>
          </li>
          <li className="flex items-start gap-2.5 text-rose-700/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
            <span>Attempt to access or interfere with another user's account or data.</span>
          </li>
          <li className="flex items-start gap-2.5 text-rose-700/90 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
            <span>Misuse, damage, or disrupt the AarohCare platform.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'account-suspension',
    number: '07',
    title: 'Account Suspension',
    icon: Lock,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare may suspend or terminate an account if it is used fraudulently, unlawfully, or in violation of these Terms.
      </p>
    ),
  },
  {
    id: 'service-availability',
    number: '08',
    title: 'Service Availability',
    icon: Globe,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare aims to provide reliable services but does not guarantee that the platform will always be available, uninterrupted, or error-free.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    number: '09',
    title: 'Intellectual Property',
    icon: Award,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        The AarohCare name, logo, design, content, software, and other platform materials are owned by or licensed to AarohCare and may not be copied or used without permission.
      </p>
    ),
  },
  {
    id: 'limitation-liability',
    number: '10',
    title: 'Limitation of Liability',
    icon: Scale,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        To the extent permitted by applicable law, AarohCare is not responsible for medical outcomes, clinic delays, changes in doctor availability, cancellations, or losses resulting from information or services provided by clinics/hospitals.
      </p>
    ),
  },
  {
    id: 'privacy',
    number: '11',
    title: 'Privacy',
    icon: Shield,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        Your use of AarohCare is also governed by our Privacy Policy, which explains how we collect, use, store, and share your personal information.
      </p>
    ),
  },
  {
    id: 'changes-terms',
    number: '12',
    title: 'Changes to These Terms',
    icon: RefreshCw,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare may update these Terms from time to time. Updated Terms will be made available through the platform.
      </p>
    ),
  },
  {
    id: 'governing-law',
    number: '13',
    title: 'Governing Law',
    icon: BookOpen,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        These Terms are governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of courts in Kerala, India.
      </p>
    ),
  },
  {
    id: 'contact-us',
    number: '14',
    title: 'Contact Us',
    icon: Mail,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          For questions, clarifications, or concerns regarding these Terms and Conditions, please reach out to our team:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <a
            href="mailto:aarohcare.in@gmail.com?subject=AarohCare%20Terms%20Inquiry"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Email Us</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">aarohcare.in@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/919072043356?text=Hi%20AarohCare%2C%20I%20have%20a%20question%20regarding%20the%20Terms%20and%20Conditions."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-200 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span>WhatsApp / Call</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded font-bold">LIVE</span>
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">+91 9072043356</p>
            </div>
          </a>
        </div>
      </div>
    ),
  },
]

export default function TermsPage({ onNavigateHome, onNavigatePage }) {
  const [activeSection, setActiveSection] = useState('about')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
      window.__lenis.resize()
    }
    document.title = 'Terms & Conditions — AarohCare'
  }, [])

  useEffect(() => {
    let sectionPositions = []
    const updatePositions = () => {
      sectionPositions = SECTIONS.map((section) => {
        const el = document.getElementById(section.id)
        return {
          id: section.id,
          top: el ? el.offsetTop : 0,
          height: el ? el.offsetHeight : 0,
        }
      })
    }
    updatePositions()

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const scrollY = window.scrollY
        setShowScrollTop((prev) => (scrollY > 400 ? (prev ? prev : true) : (!prev ? prev : false)))

        const scrollPosition = scrollY + 200
        for (const sec of sectionPositions) {
          if (scrollPosition >= sec.top && scrollPosition < sec.top + sec.height) {
            setActiveSection((prev) => (prev !== sec.id ? sec.id : prev))
            break
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updatePositions, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updatePositions)
    }
  }, [])

  const scrollToClause = (id) => {
    const element = document.getElementById(id)
    if (element) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -90, duration: 1.0 })
      } else {
        const yOffset = -90
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.0 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-500/20 selection:text-blue-900">
      {/* Top Clean Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Back to Home Arrow Button + Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onNavigateHome && onNavigateHome()}
              aria-label="Back to Home"
              title="Back to Home"
              className="inline-flex items-center justify-center w-8.5 h-8.5 sm:w-10 sm:h-10 text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-full transition-all duration-200 cursor-pointer border border-slate-200/80 shadow-2xs hover:shadow-xs group shrink-0 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateHome && onNavigateHome('#hero')}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none group min-w-0"
            >
              <img
                src={logoImg}
                alt="AarohCare logo"
                width={32}
                height={32}
                decoding="async"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain shadow-xs shrink-0"
              />
              <span className="text-base sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                AarohCare
              </span>
            </button>
          </div>

          {/* Right: Document Switcher Toggle */}
          <div className="flex items-center shrink-0">
            <div className="flex items-center bg-slate-100/90 p-0.5 sm:p-1 rounded-full border border-slate-200/80 text-[11px] sm:text-xs font-semibold">
              <button
                type="button"
                onClick={() => onNavigatePage ? onNavigatePage('privacy') : (window.location.hash = '#privacy')}
                className="px-2.5 sm:px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="hidden sm:inline">Privacy Policy</span>
                <span className="sm:hidden">Privacy</span>
              </button>
              <span className="px-2.5 sm:px-3 py-1 bg-white text-blue-700 rounded-full shadow-xs whitespace-nowrap">
                Terms
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner with Dark Blue Gradient */}
      <section className="w-full bg-[#051326] text-white pt-10 sm:pt-16 pb-12 sm:pb-18 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-medium text-blue-200 mb-4 sm:mb-6 backdrop-blur-md shadow-xs">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Official Agreement</span>
              <span className="text-blue-500">•</span>
              <span className="font-mono text-[11px] text-blue-300">Last Updated: 19/09/2026</span>
            </div>

            {/* Title with Word-by-Word SlideUp TextAnimate */}
            <TextAnimate
              as="h1"
              animation="slideUp"
              by="word"
              className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3 sm:mb-4"
            >
              AarohCare — Terms & Conditions
            </TextAnimate>

            <p className="text-slate-300 text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Please read these terms and conditions carefully before using the AarohCare digital OP token booking and live queue telemetry platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Table of Contents</span>
              </h3>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 text-xs sm:text-sm font-medium">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToClause(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate pr-2">
                        <span className="text-slate-400 text-xs mr-2 font-mono">{sec.number}.</span>
                        {sec.title}
                      </span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Quick Support Card */}
            <div className="bg-gradient-to-br from-[#0c2340] to-[#071628] rounded-2xl p-5 sm:p-6 text-white border border-blue-900/40 shadow-xs">
              <h4 className="font-semibold text-sm sm:text-base text-white mb-2">Need Help or Clarification?</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Our team is available to assist you with any questions regarding token policies and clinic protocols.
              </p>
              <a
                href="mailto:aarohcare.in@gmail.com"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors duration-200 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Legal Support</span>
              </a>
            </div>
          </aside>

          {/* Right Column: 14 Detailed Clause Cards */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            {SECTIONS.map((section) => {
              const IconComponent = section.icon
              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors duration-200 scroll-mt-28"
                >
                  {/* Clause Header */}
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 border border-blue-100/80">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">
                        Clause {section.number}
                      </div>
                      <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 mt-0.5 leading-snug">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Clause Body */}
                  <div className="pt-1">{section.content}</div>
                </article>
              )
            })}
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button (Positioned cleanly above WhatsApp widget) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to Top"
          className="fixed bottom-20 sm:bottom-22 right-4 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-200 cursor-pointer animate-in fade-in zoom-in"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Global Footer */}
      <Footer onNavigate={(page, hash) => {
        if (page === 'home' && onNavigateHome) {
          onNavigateHome(hash)
        } else if (onNavigatePage) {
          onNavigatePage(page, hash)
        }
      }} />
    </div>
  )
}

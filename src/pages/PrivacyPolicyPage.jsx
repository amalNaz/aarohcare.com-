import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Shield,
  FileText,
  Lock,
  Database,
  Layers,
  Share2,
  Server,
  Clock,
  Scale,
  Users,
  Cookie,
  RefreshCw,
  Mail,
  Phone,
  ChevronRight,
  ArrowUp,
  Building2,
} from 'lucide-react'
import { TextAnimate } from '@/registry/magicui/text-animate'
import Footer from '../components/Footer'
import logoImg from '../assets/aarohcare-logo.png'

const SECTIONS = [
  {
    id: 'introduction',
    number: '01',
    title: 'Introduction',
    icon: FileText,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare respects your privacy. This Privacy Policy explains how we collect, use, store, and share information when you use our platform.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    number: '02',
    title: 'Information We Collect',
    icon: Database,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>Depending on the features you use, we may collect:</p>
        <ul className="space-y-2.5 pl-1">
          {[
            'Name',
            'Age and gender',
            'Mobile number and OTP verification information',
            'Clinic/hospital and doctor selected',
            'OP token, booking, and visit information',
            'Information you voluntarily provide during a booking or visit',
            'Device and technical information required to operate and secure the platform',
            'Location information, where you provide permission',
            'Payment-related information, where applicable',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'how-we-use-information',
    number: '03',
    title: 'How We Use Your Information',
    icon: Layers,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>We use your information to:</p>
        <ul className="space-y-2.5 pl-1">
          {[
            'Create and manage your account.',
            'Process OP bookings and tokens.',
            'Display queue and estimated waiting information.',
            'Share necessary booking information with the selected clinic/hospital.',
            'Send booking, token, and service-related notifications.',
            'Provide customer support.',
            'Maintain, secure, and improve AarohCare.',
            'Comply with applicable legal requirements.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'sharing-of-information',
    number: '04',
    title: 'Sharing of Information',
    icon: Share2,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>We may share relevant information with:</p>
        <ul className="space-y-2.5 pl-1">
          {[
            'The clinic/hospital and doctor selected by you.',
            'Service providers that help us operate AarohCare.',
            'Payment providers, where applicable.',
            'Government authorities or other parties when required by applicable law.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-sm font-semibold flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-blue-600 shrink-0" />
          <span>We do not sell your personal data.</span>
        </div>
      </div>
    ),
  },
  {
    id: 'third-party-services',
    number: '05',
    title: 'Third-Party Services',
    icon: Server,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare may use third-party services, including Amazon Web Services (AWS) and MongoDB, for hosting, storage, database management, and related technical services. These providers may process data on our behalf in accordance with applicable agreements and their respective policies.
      </p>
    ),
  },
  {
    id: 'data-security',
    number: '06',
    title: 'Data Security',
    icon: Lock,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        We take reasonable technical and organisational measures to protect your information against unauthorized access, loss, misuse, or disclosure. However, no digital system can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    id: 'data-retention',
    number: '07',
    title: 'Data Retention',
    icon: Clock,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        We retain personal information only for as long as reasonably necessary to provide our services, meet legal or regulatory requirements, resolve disputes, and maintain legitimate business records.
      </p>
    ),
  },
  {
    id: 'your-rights',
    number: '08',
    title: 'Your Rights',
    icon: Scale,
    content: (
      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
        <p>Subject to applicable law, you may have rights to:</p>
        <ul className="space-y-2.5 pl-1">
          {[
            'Request access to your personal information.',
            'Request correction of inaccurate information.',
            'Request deletion of your personal information.',
            'Withdraw consent where applicable.',
            'Raise a privacy-related grievance.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2 font-medium text-slate-700">
          To exercise your rights, contact us using the details below.
        </p>
      </div>
    ),
  },
  {
    id: 'children',
    number: '09',
    title: 'Children',
    icon: Users,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare is not intended for independent use by children. Where services are used on behalf of a minor, the parent or lawful guardian is responsible for providing the required information and consent.
      </p>
    ),
  },
  {
    id: 'cookies-similar-tech',
    number: '10',
    title: 'Cookies & Similar Technologies',
    icon: Cookie,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        AarohCare may use cookies or similar technologies to maintain functionality, improve performance, understand usage, and enhance the user experience.
      </p>
    ),
  },
  {
    id: 'policy-changes',
    number: '11',
    title: 'Changes to This Privacy Policy',
    icon: RefreshCw,
    content: (
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        We may update this Privacy Policy from time to time. The updated version will be made available through the AarohCare platform.
      </p>
    ),
  },
  {
    id: 'contact-grievances',
    number: '12',
    title: 'Contact & Privacy Grievances',
    icon: Mail,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          For privacy questions, requests, or complaints:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <a
            href="mailto:aarohcare.in@gmail.com?subject=AarohCare%20Privacy%20Inquiry"
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
            href="https://wa.me/919072043356?text=Hi%20AarohCare%2C%20I%20have%20a%20question%20regarding%20the%20Privacy%20Policy."
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

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600">
          <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">Registered Business Address</p>
            <p className="text-slate-500 mt-0.5">Aarohacare Technologies Pvt Ltd, Kerala, India</p>
          </div>
        </div>
      </div>
    ),
  },
]

export default function PrivacyPolicyPage({ onNavigateHome, onNavigatePage }) {
  const [activeSection, setActiveSection] = useState('introduction')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
      window.__lenis.resize()
    }
    document.title = 'Privacy Policy — AarohCare'
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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => onNavigateHome && onNavigateHome()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </button>

          {/* AarohCare Brand Logo & Name */}
          <button
            type="button"
            onClick={() => onNavigateHome && onNavigateHome('#hero')}
            className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 focus:outline-none group"
          >
            <img
              src={logoImg}
              alt="AarohCare Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain shadow-xs shrink-0"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:opacity-85 transition-opacity">
              AarohCare
            </span>
          </button>

          {/* Document Switcher Toggle */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/80 text-xs font-semibold">
            <span className="px-3 py-1 bg-white text-blue-700 rounded-full shadow-xs">
              Privacy Policy
            </span>
            <button
              type="button"
              onClick={() => onNavigatePage ? onNavigatePage('terms') : (window.location.hash = '#terms')}
              className="px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Page Title & Meta Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4 border border-blue-200/60">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Legal Document</span>
          </div>

          <TextAnimate
            as="h1"
            animation="slideUp"
            by="word"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 leading-[1.12]"
          >
            Privacy Policy
          </TextAnimate>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            AAROHCARE — PRIVACY POLICY
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
            <span className="font-medium text-slate-700">Last Updated: September 2026</span>
            <span>•</span>
            <span>Applicable to all AarohCare Users & Patients</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigatePage ? onNavigatePage('terms') : (window.location.hash = '#terms')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              View Terms & Conditions
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sticky Sidebar (Desktop) + Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Table of Contents (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 scrollbar-thin">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">
                Table of Contents
              </h2>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon
                  const isActive = activeSection === sec.id
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToClause(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? 'bg-blue-50/90 text-blue-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`text-[11px] font-mono ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                          {sec.number}
                        </span>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-blue-600 translate-x-0.5' : 'text-transparent group-hover:text-slate-300'}`} />
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: 12 Clause Cards */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
              return (
                <article
                  key={sec.id}
                  id={sec.id}
                  className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all duration-300 shadow-xs ${
                    isActive
                      ? 'border-blue-300 ring-2 ring-blue-500/10'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-semibold text-blue-600 tracking-wider uppercase">
                        Section {sec.number}
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {sec.title}
                      </h2>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    {sec.content}
                  </div>
                </article>
              )
            })}

            {/* App Consent Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-md">
              <div className="flex items-center gap-2.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4" />
                <span>App Consent</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                By continuing to use AarohCare, you acknowledge that you have read and understood the Privacy Policy and agree to the Terms & Conditions.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToTop()}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  View Privacy Policy (Top)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage ? onNavigatePage('terms') : (window.location.hash = '#terms')}
                  className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  View Terms & Conditions ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Full Footer Component */}
      <Footer onNavigate={onNavigateHome} />
    </div>
  )
}

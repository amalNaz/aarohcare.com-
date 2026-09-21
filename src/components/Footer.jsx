import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Footer({ onNavigate }) {
  const containerRef = useScrollReveal({ threshold: 0.1 })
  const solutionLinks = [
    { name: 'Smart OP Booking App', href: '#features' },
    { name: 'Live Queue Management', href: '#products' },
    { name: 'Live Token Tracking', href: '#products' },
    { name: 'Digital Lab Reports', href: '#features' },
    { name: 'Doctor & Schedule Management', href: '#products' },
    { name: 'Focused Lab Report Module', href: '#features' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#terms' },
    { name: 'Clinical Compliance', href: '#' },
  ]

  const handleLinkClick = (e, href) => {
    if (href === '#terms' || href === '/terms' || href.includes('terms') || href === '#terms-and-conditions') {
      e.preventDefault()
      if (onNavigate) {
        onNavigate('terms')
      }
      return
    }

    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      if (onNavigate) {
        onNavigate('home', href)
      }

      if (typeof window !== 'undefined' && window.__lenis) {
        const target = document.querySelector(href)
        if (target) {
          window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 })
          return
        }
      }
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer ref={containerRef} className="w-full bg-black text-white border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">
          {/* Column 1: Brand & Contact Info (5 Cols on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Logo & Title */}
              <div className="reveal-heading flex items-center gap-3.5 mb-4">
                {/* Stylized AarohaCare 'A' Logo Icon */}
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full text-blue-600"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M12 2L3 21h4.5l2-4.5h5l2 4.5H21L12 2z"
                      fill="#2563eb"
                      stroke="none"
                    />
                    <path
                      d="M9.5 16.5h5"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="7" r="1.5" fill="#60a5fa" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-none">
                    AarohaCare
                  </h3>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mt-1">
                    Technologies Pvt Ltd
                  </p>
                </div>
              </div>

              {/* Mission Paragraph */}
              <p className="reveal-text text-neutral-400 text-sm leading-relaxed max-w-sm">
                Pioneering digital outpatient pacing across Kerala. Eliminating waiting halls through coordinated token telemetry and smart transit prompts.
              </p>
            </div>

            {/* Direct Contact Row */}
            <div className="reveal-meta flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-neutral-300 font-medium mt-6 pt-2">
              <a
                href="https://wa.me/919072043356?text=Hi%20AarohCare%2C%20I%20would%20like%20to%20connect%20with%20your%20team."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-200 group"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                <span>+91 9072043356</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-normal">WhatsApp</span>
              </a>
              <span className="text-neutral-600 select-none">•</span>
              <a
                href="mailto:aarohcare.in@gmail.com?subject=Inquiry%20-%20AarohCare"
                title="Send an Email"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>aarohcare.in@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions (4 Cols on LG) */}
          <div className="lg:col-span-4 lg:pl-6">
            <h4 className="reveal-heading text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5">
              Solutions
            </h4>
            <ul className="reveal-group space-y-3">
              {solutionLinks.map((item) => (
                <li key={item.name} className="reveal-stagger-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-sm text-neutral-300 hover:text-white transition-all duration-200 inline-block hover:translate-x-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Operational Hub (3 Cols on LG) */}
          <div className="reveal-meta lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5">
              Operational Hub
            </h4>

            {/* Location */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center gap-2 text-sm text-neutral-200 font-medium">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Kerala, India</span>
              </div>
              <p className="text-sm text-neutral-400 pl-6">
                Active in Calicut • Malappuram
              </p>
            </div>

            {/* Network Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium tracking-wide">Live Telemetry Active</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="reveal-meta border-t border-neutral-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="text-center md:text-left">
            © 2026 AarohCare — Aarohacare Technologies Pvt Ltd. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

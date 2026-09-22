import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MotionConfig, motion, AnimatePresence } from 'motion/react'
import { scrollToSection } from '../utils/scrollNavigation'
import logoImg from '../assets/aarohcare-logo.png'

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 5.5px)',
    },
  },
}

function AnimatedHamburgerButton({ active, setActive, isAtHero }) {
  const barBg = active || isAtHero ? 'bg-white' : 'bg-slate-900'

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive((pv) => !pv)}
        className="relative h-10 w-10 rounded-full transition-colors flex items-center justify-center focus:outline-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
        aria-label={active ? 'Close menu' : 'Open menu'}
        aria-expanded={active}
        aria-controls="mobile-navigation-menu"
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className={`absolute h-[2px] w-[22px] rounded-full ${barBg} transition-colors duration-200`}
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className={`absolute h-[2px] w-[22px] rounded-full ${barBg} transition-colors duration-200`}
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className={`absolute h-[2px] w-[11px] rounded-full ${barBg} transition-colors duration-200`}
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 5.5px)',
          }}
        />
      </motion.button>
    </MotionConfig>
  )
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAtHero, setIsAtHero] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Products', href: '#products' },
    { label: 'About Us', href: '#about-us' },
    { label: 'FAQ', href: '#faq' },
  ]

  useEffect(() => {
    let heroBottom = 620
    const updateHeroBottom = () => {
      const heroElement = document.getElementById('hero')
      if (heroElement) {
        heroBottom = heroElement.offsetTop + heroElement.offsetHeight - 70
      }
    }
    updateHeroBottom()

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const currentScrollY = window.scrollY
        const isMobile = window.innerWidth < 768

        if (currentScrollY <= heroBottom) {
          // Inside Hero section: always visible and transparent
          setIsAtHero((prev) => (prev ? prev : true))
          setIsVisible((prev) => (prev ? prev : true))
        } else {
          // Outside Hero section: white background
          setIsAtHero((prev) => (!prev ? prev : false))
          if (isMobile) {
            // On mobile: ALWAYS popped up / visible
            setIsVisible((prev) => (prev ? prev : true))
          } else {
            // During programmatic navigation, keep navbar visible
            if (window.__isNavigating) {
              setIsVisible((prev) => (prev ? prev : true))
            } else {
              // On desktop: show on scroll-up, hide on scroll-down
              if (currentScrollY < lastScrollY.current - 4) {
                setIsVisible((prev) => (prev ? prev : true))
              } else if (currentScrollY > lastScrollY.current + 6) {
                setIsVisible((prev) => (!prev ? prev : false))
                setMobileMenuOpen(false)
              }
            }
          }
        }

        lastScrollY.current = currentScrollY
      })
    }

    const handleResize = () => {
      updateHeroBottom()
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleScroll()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Lock background body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (e, href) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
    setIsVisible(true)
    scrollToSection(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        mobileMenuOpen
          ? 'h-[100dvh] inset-0 bg-[#121316] text-white flex flex-col overflow-y-auto'
          : isVisible
          ? 'translate-y-0 transition-all duration-300 ease-out'
          : '-translate-y-full pointer-events-none transition-all duration-300 ease-out'
      } ${
        !mobileMenuOpen
          ? isAtHero
            ? 'bg-transparent text-white border-transparent shadow-none pt-5 sm:pt-8 pb-4 sm:pb-6'
            : 'bg-white/95 text-slate-900 border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] backdrop-blur-md py-3 sm:py-4'
          : ''
      }`}
    >
      <div
        className={`w-full px-5 flex items-center justify-between shrink-0 ${
          mobileMenuOpen ? 'py-4 border-b border-white/10' : ''
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className={`flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-tight transition-all duration-200 ${
            mobileMenuOpen || isAtHero ? 'text-white hover:opacity-90' : 'text-slate-900 hover:opacity-85'
          }`}
        >
          <img
            src={logoImg}
            alt="AarohCare logo"
            width={32}
            height={32}
            decoding="async"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain shadow-xs shrink-0"
          />
          <span>AarohCare</span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden md:flex items-center space-x-3 text-xs lg:text-sm transition-colors duration-200 ${
            isAtHero ? 'text-slate-300 font-normal' : 'text-slate-700 font-medium'
          }`}
        >
          {navLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors duration-200 cursor-pointer ${
                  isAtHero ? 'hover:text-white' : 'hover:text-black'
                }`}
              >
                {link.label}
              </a>
              {index < navLinks.length - 1 && (
                <span
                  className={`select-none ${
                    isAtHero ? 'text-slate-500' : 'text-slate-300'
                  }`}
                >
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Contact Us CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`group inline-flex items-center gap-2.5 bg-black text-white pl-5 pr-2 py-1.5 rounded-full text-xs lg:text-sm font-medium shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              isAtHero ? 'border border-slate-700/60 bg-black/90 hover:bg-black' : 'hover:bg-slate-900'
            }`}
          >
            <span>Contact Us</span>
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </a>
        </div>

        {/* Mobile Animated Hamburger Button */}
        <div className="md:hidden flex items-center">
          <AnimatedHamburgerButton
            active={mobileMenuOpen}
            setActive={setMobileMenuOpen}
            isAtHero={isAtHero}
          />
        </div>
      </div>

      {/* High-Fidelity Mobile Drawer Content (Aligned with Reference Model) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full px-5 flex-1 flex flex-col py-6 overflow-y-auto"
          >
            <div className="w-full flex flex-col">
              {/* Category Header */}
              <div className="pb-3">
                <span className="text-sm font-medium text-neutral-400">
                  Discover
                </span>
              </div>

              {/* Navigation Links with Dashed Dividers */}
              <div className="border-t border-dashed border-white/15 divide-y divide-dashed divide-white/15">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-3.5 text-[22px] sm:text-2xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Secure Your Spot Section with Dashed Divider Above */}
              <div className="pt-4 border-t border-dashed border-white/15 space-y-3">
                <p className="text-[22px] sm:text-2xl font-bold tracking-tight text-white">
                  Secure Your Spot
                </p>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-between bg-[#f4f4f5] text-black pl-6 pr-2 py-2 rounded-full shadow-lg active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span className="text-sm sm:text-[15px] font-semibold tracking-tight text-neutral-900">
                    Contact Us
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#18181b] text-white flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </a>
              </div>

              {/* Contact Information */}
              <div className="mt-8 space-y-1">
                <p className="text-sm font-medium text-neutral-400">
                  Contact
                </p>
                <a
                  href="mailto:aarohcare.in@gmail.com"
                  className="block text-sm sm:text-base font-bold text-white hover:text-neutral-200 transition-colors"
                >
                  aarohcare.in@gmail.com
                </a>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 space-y-1.5 pb-6">
                <p className="text-sm font-medium text-neutral-400">
                  Social Media
                </p>
                <div className="flex flex-col space-y-1">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-white hover:text-neutral-200 transition-colors w-fit"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-white hover:text-neutral-200 transition-colors w-fit"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}




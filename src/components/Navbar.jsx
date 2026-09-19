import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroElement = document.getElementById('hero')
      const isMobile = window.innerWidth < 768
      // Exact bottom edge of the hero section
      const heroBottom = heroElement
        ? heroElement.offsetTop + heroElement.offsetHeight - 70
        : 620

      if (currentScrollY <= heroBottom) {
        // Inside Hero section: always visible and transparent
        setIsAtHero(true)
        setIsVisible(true)
      } else {
        // Outside Hero section: white background
        setIsAtHero(false)
        if (isMobile) {
          // On mobile: ALWAYS popped up / visible
          setIsVisible(true)
        } else {
          // On desktop: show on scroll-up, hide on scroll-down
          if (currentScrollY < lastScrollY.current - 4) {
            setIsVisible(true)
          } else if (currentScrollY > lastScrollY.current + 6) {
            setIsVisible(false)
            setMobileMenuOpen(false)
          }
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (href === '#' || href === '#hero') {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    const targetElement = document.querySelector(href)
    if (targetElement) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 })
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      } ${
        isAtHero
          ? 'bg-transparent text-white border-transparent shadow-none pt-5 sm:pt-8 pb-4 sm:pb-6'
          : 'bg-white/95 text-slate-900 border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] backdrop-blur-md py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-all duration-200 ${
            isAtHero ? 'text-white hover:opacity-90' : 'text-slate-900 hover:opacity-85'
          }`}
        >
          Aarohcare
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none cursor-pointer transition-colors ${
              isAtHero ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl border-b ${
            isAtHero
              ? 'bg-slate-950/95 border-slate-800 text-slate-300'
              : 'bg-white/98 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex flex-col space-y-4 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-1 cursor-pointer transition-colors ${
                  isAtHero ? 'hover:text-white' : 'hover:text-blue-950'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`inline-flex items-center justify-between w-full bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md cursor-pointer ${
                  isAtHero ? 'border border-slate-700/60' : ''
                }`}
              >
                <span>Contact Us</span>
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}




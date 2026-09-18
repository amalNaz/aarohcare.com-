import React, { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Products', href: '#products' },
    { label: 'About Us', href: '#about-us' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="w-full relative z-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="text-white text-xl sm:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          Aarohcare
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-3 text-xs lg:text-sm text-slate-300 font-normal">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
              {index < navLinks.length - 1 && (
                <span className="text-slate-500 select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Contact Us CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 bg-black/90 hover:bg-black text-white pl-5 pr-2 py-1.5 rounded-full text-xs lg:text-sm font-medium border border-slate-700/60 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
            className="text-slate-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-5 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 text-sm text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-between w-full bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium border border-slate-700/60"
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

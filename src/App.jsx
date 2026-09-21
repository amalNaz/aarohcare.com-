import React, { useState, useEffect, useLayoutEffect, useRef, Suspense, lazy } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'
import JourneySection from './components/JourneySection'
import WhatIfHealthSection from './components/WhatIfHealthSection'
import HealthPartnerSection from './components/HealthPartnerSection'
import ClinicOperationsSection from './components/ClinicOperationsSection'
import HospitalsAndClinicsSection from './components/HospitalsAndClinicsSection'
import LabFeaturesSection from './components/LabFeaturesSection'
import FoundersSection from './components/FoundersSection'
import FAQSection from './components/FAQSection'
import CTAEnrollmentSection from './components/CTAEnrollmentSection'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import WhatsAppButton from './components/WhatsAppButton'
import MouseTracker from './components/MouseTracker'
import { scrollToSection } from './utils/scrollNavigation'

const TermsPage = lazy(() => import('./pages/TermsPage'))

const isTermsRoute = () => {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash.toLowerCase()
  const path = window.location.pathname.toLowerCase()
  const search = window.location.search.toLowerCase()
  return (
    hash === '#terms' ||
    hash === '#terms-and-conditions' ||
    hash.startsWith('#/terms') ||
    hash.startsWith('#terms') ||
    path === '/terms' ||
    path === '/terms-and-conditions' ||
    path.endsWith('/terms') ||
    search.includes('terms')
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return isTermsRoute() ? 'terms' : 'home'
  })
  const navTimeoutRef = useRef(null)
  const pageChangeTimeoutRef = useRef(null)

  // Listen to browser forward/back & hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      if (isTermsRoute()) {
        setCurrentPage('terms')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current)
      if (pageChangeTimeoutRef.current) clearTimeout(pageChangeTimeoutRef.current)
    }
  }, [])

  // Reset scroll and recalculate heights when page changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
        window.__lenis.resize()
      }
      if (pageChangeTimeoutRef.current) clearTimeout(pageChangeTimeoutRef.current)
      pageChangeTimeoutRef.current = setTimeout(() => {
        window.scrollTo(0, 0)
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true })
          window.__lenis.resize()
        }
        ScrollTrigger.refresh()
      }, 50)
    }
    return () => {
      if (pageChangeTimeoutRef.current) clearTimeout(pageChangeTimeoutRef.current)
    }
  }, [currentPage])

  const navigateTo = (page, hashTarget) => {
    if (page === 'terms') {
      if (window.location.hash !== '#terms') {
        window.location.hash = 'terms'
      }
      setCurrentPage('terms')
    } else {
      if (hashTarget && hashTarget.startsWith('#') && hashTarget !== '#hero') {
        window.location.hash = hashTarget
      } else {
        if (window.location.hash.includes('terms')) {
          history.pushState(null, '', window.location.pathname)
        }
      }
      setCurrentPage('home')

      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current)
      navTimeoutRef.current = setTimeout(() => {
        if (hashTarget && hashTarget.startsWith('#') && hashTarget !== '#hero') {
          scrollToSection(hashTarget, { updateHash: false })
        } else {
          scrollToSection('#hero', { updateHash: false })
        }
      }, 100)
    }
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white w-full">
        {currentPage === 'terms' ? (
          <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]" />}>
            <TermsPage onNavigateHome={(hash) => navigateTo('home', hash)} />
          </Suspense>
        ) : (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Zero Wait Section with Moving Cards */}
            <ZeroWaitSection />

            {/* Journey Section with 4 Steps */}
            <JourneySection />

            {/* What If Health Was... (5-State Pinned Orbital Scroll Section) */}
            <WhatIfHealthSection />

            {/* Your Health Partner We Imagined. (Beige Split Section) */}
            <HealthPartnerSection />

            {/* Clinic Side Operations Management Section */}
            <ClinicOperationsSection />

            {/* Designed for Hospitals and Clinics Section */}
            <HospitalsAndClinicsSection />

            {/* Labs Features for the Site Section */}
            <LabFeaturesSection />

            {/* Founders / Team Section */}
            <FoundersSection />

            {/* Frequently Asked Questions Section */}
            <FAQSection />

            {/* Early Pilot Enrollment / CTA Section */}
            <CTAEnrollmentSection />

            {/* AarohaCare Technologies Footer Section */}
            <Footer onNavigate={navigateTo} />
          </>
        )}

        {/* Global Floating WhatsApp Chat Pill Widget */}
        <WhatsAppButton />

        {/* Cuberto-Inspired Global Mouse Interaction Layer */}
        <MouseTracker />
      </div>
    </SmoothScroll>
  )
}

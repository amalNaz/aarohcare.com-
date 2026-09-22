import React, { useState, useEffect, useLayoutEffect, useRef, Suspense, lazy } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'
import JourneySection from './components/JourneySection'
import HealthPartnerSection from './components/HealthPartnerSection'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import WhatsAppButton from './components/WhatsAppButton'
import MouseTracker from './components/MouseTracker'
import { scrollToSection } from './utils/scrollNavigation'

const WhatIfHealthSection = lazy(() => import('./components/WhatIfHealthSection'))
const ClinicOperationsSection = lazy(() => import('./components/ClinicOperationsSection'))
const HospitalsAndClinicsSection = lazy(() => import('./components/HospitalsAndClinicsSection'))
const LabFeaturesSection = lazy(() => import('./components/LabFeaturesSection'))
const FoundersSection = lazy(() => import('./components/FoundersSection'))
const FAQSection = lazy(() => import('./components/FAQSection'))
const CTAEnrollmentSection = lazy(() => import('./components/CTAEnrollmentSection'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))

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

const isPrivacyRoute = () => {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash.toLowerCase()
  const path = window.location.pathname.toLowerCase()
  const search = window.location.search.toLowerCase()
  return (
    hash === '#privacy' ||
    hash === '#privacy-policy' ||
    hash.startsWith('#/privacy') ||
    hash.startsWith('#privacy') ||
    path === '/privacy' ||
    path === '/privacy-policy' ||
    path.endsWith('/privacy') ||
    search.includes('privacy')
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (isTermsRoute()) return 'terms'
    if (isPrivacyRoute()) return 'privacy'
    return 'home'
  })
  const navTimeoutRef = useRef(null)
  const pageChangeTimeoutRef = useRef(null)

  // Listen to browser forward/back & hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      if (isTermsRoute()) {
        setCurrentPage('terms')
      } else if (isPrivacyRoute()) {
        setCurrentPage('privacy')
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

  // Synchronize document title and canonical tag based on active page route
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }

    if (currentPage === 'terms') {
      document.title = 'Terms & Conditions — AarohCare'
      canonical.setAttribute('href', 'https://aarohcare.com/terms')
    } else if (currentPage === 'privacy') {
      document.title = 'Privacy Policy — AarohCare'
      canonical.setAttribute('href', 'https://aarohcare.com/privacy')
    } else {
      document.title = 'AarohCare — Our Health, Our Time'
      canonical.setAttribute('href', 'https://aarohcare.com/')
    }
  }, [currentPage])

  const navigateTo = (page, hashTarget) => {
    if (page === 'terms') {
      if (window.location.hash !== '#terms') {
        window.location.hash = 'terms'
      }
      setCurrentPage('terms')
    } else if (page === 'privacy') {
      if (window.location.hash !== '#privacy') {
        window.location.hash = 'privacy'
      }
      setCurrentPage('privacy')
    } else {
      if (hashTarget && hashTarget.startsWith('#') && hashTarget !== '#hero') {
        window.location.hash = hashTarget
      } else {
        if (window.location.hash.includes('terms') || window.location.hash.includes('privacy')) {
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
            <TermsPage
              onNavigateHome={(hash) => navigateTo('home', hash)}
              onNavigatePage={navigateTo}
            />
          </Suspense>
        ) : currentPage === 'privacy' ? (
          <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]" />}>
            <PrivacyPolicyPage
              onNavigateHome={(hash) => navigateTo('home', hash)}
              onNavigatePage={navigateTo}
            />
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
            <Suspense fallback={null}>
              <WhatIfHealthSection />
            </Suspense>

            {/* Your Health Partner We Imagined. (Beige Split Section) */}
            <HealthPartnerSection />

            {/* Clinic Side Operations Management Section */}
            <Suspense fallback={null}>
              <ClinicOperationsSection />
            </Suspense>

            {/* Designed for Hospitals and Clinics Section */}
            <Suspense fallback={null}>
              <HospitalsAndClinicsSection />
            </Suspense>

            {/* Labs Features for the Site Section */}
            <Suspense fallback={null}>
              <LabFeaturesSection />
            </Suspense>

            {/* Founders / Team Section */}
            <Suspense fallback={null}>
              <FoundersSection />
            </Suspense>

            {/* Frequently Asked Questions Section */}
            <Suspense fallback={null}>
              <FAQSection />
            </Suspense>

            {/* Early Pilot Enrollment / CTA Section */}
            <Suspense fallback={null}>
              <CTAEnrollmentSection />
            </Suspense>

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

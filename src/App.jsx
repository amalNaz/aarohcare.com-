import React, { useState, useEffect } from 'react'
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
import TermsPage from './pages/TermsPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (
        hash === '#terms' ||
        hash === '#terms-and-conditions' ||
        path === '/terms' ||
        path === '/terms-and-conditions'
      ) {
        return 'terms'
      }
    }
    return 'home'
  })

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (
        hash === '#terms' ||
        hash === '#terms-and-conditions' ||
        path === '/terms' ||
        path === '/terms-and-conditions'
      ) {
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
    }
  }, [])

  const navigateTo = (page, hashTarget) => {
    if (page === 'terms') {
      window.location.hash = 'terms'
      setCurrentPage('terms')
      window.scrollTo(0, 0)
    } else {
      if (hashTarget && hashTarget.startsWith('#')) {
        window.location.hash = hashTarget
      } else {
        if (window.location.hash.includes('terms')) {
          history.replaceState(null, '', window.location.pathname)
        }
      }
      setCurrentPage('home')
      setTimeout(() => {
        if (hashTarget && hashTarget.startsWith('#')) {
          const el = document.querySelector(hashTarget)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            return
          }
        }
        window.scrollTo(0, 0)
      }, 50)
    }
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white w-full">
        {currentPage === 'terms' ? (
          <TermsPage onNavigateHome={(hash) => navigateTo('home', hash)} />
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
      </div>
    </SmoothScroll>
  )
}

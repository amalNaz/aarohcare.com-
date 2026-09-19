import React from 'react'
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

export default function App() {
  return (
    <div className="min-h-screen bg-white w-full">
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
    </div>
  )
}








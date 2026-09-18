import React from 'react'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'
import JourneySection from './components/JourneySection'
import WhatIfHealthSection from './components/WhatIfHealthSection'
import EveryoneEverywhereSection from './components/EveryoneEverywhereSection'

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

      {/* Everyone. Everywhere. (Warm Beige Follow-Up Section) */}
      <EveryoneEverywhereSection />
    </div>
  )
}

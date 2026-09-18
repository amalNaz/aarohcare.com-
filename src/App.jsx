import React from 'react'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'
import JourneySection from './components/JourneySection'
import WhatIfHealthSection from './components/WhatIfHealthSection'

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Zero Wait Section with Moving Cards */}
      <ZeroWaitSection />

      {/* Journey Section with 4 Steps */}
      <JourneySection />

      {/* What If Health Was... Orbital Pinned Scroll Section */}
      <WhatIfHealthSection />
    </div>
  )
}

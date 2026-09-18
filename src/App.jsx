import React from 'react'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'
import JourneySection from './components/JourneySection'

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Zero Wait Section with 3 Cards */}
      <ZeroWaitSection />

      {/* Journey Section with 4 Steps */}
      <JourneySection />
    </div>
  )
}

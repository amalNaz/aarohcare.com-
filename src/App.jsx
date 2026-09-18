import React from 'react'
import Hero from './components/Hero'
import ZeroWaitSection from './components/ZeroWaitSection'

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Zero Wait Section */}
      <ZeroWaitSection />
    </div>
  )
}

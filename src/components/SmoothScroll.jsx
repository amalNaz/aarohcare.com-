import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToSection } from '../utils/scrollNavigation'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis = null
    let updateTicker = null

    if (!prefersReducedMotion) {
      // Initialize Lenis smooth inertial scrolling
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential deceleration
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        infinite: false,
      })

      lenisRef.current = lenis
      window.__lenis = lenis

      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      updateTicker = (time) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(updateTicker)
      gsap.ticker.lagSmoothing(0)
    }

    // Handle smooth anchor scrolling across the page (ignoring page routes like #terms)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (
        !href ||
        href === '#' ||
        href === '#terms' ||
        href === '#terms-and-conditions' ||
        href.startsWith('#terms')
      ) {
        return
      }

      const element = document.querySelector(href)
      if (element) {
        e.preventDefault()
        scrollToSection(href)
      }
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true })
      if (updateTicker) {
        gsap.ticker.remove(updateTicker)
      }
      if (lenis) {
        lenis.destroy()
        window.__lenis = null
      }
    }
  }, [])

  return <>{children}</>
}

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToSection } from '../utils/scrollNavigation'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const hasMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    const finePointerMedia = hasMatchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : null
    const reducedMotionMedia = hasMatchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

    let lenis = null
    let updateTicker = null

    const shouldEnableLenis = () => {
      const prefersReducedMotion = reducedMotionMedia ? reducedMotionMedia.matches : false
      const hasFinePointer = finePointerMedia ? finePointerMedia.matches : true
      return hasFinePointer && !prefersReducedMotion
    }

    const initLenis = () => {
      if (lenis) return // Avoid duplicate instance

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

    const destroyLenis = () => {
      if (updateTicker) {
        gsap.ticker.remove(updateTicker)
        updateTicker = null
      }
      gsap.ticker.lagSmoothing(500, 33)

      if (lenis) {
        lenis.destroy()
        lenis = null
        lenisRef.current = null
        window.__lenis = null
      }
    }

    // Initial evaluation
    if (shouldEnableLenis()) {
      initLenis()
    }

    // Handle runtime changes (e.g., responsive mode toggle in DevTools or OS preference update)
    const handleMediaChange = () => {
      if (shouldEnableLenis()) {
        if (!lenis) {
          initLenis()
          ScrollTrigger.refresh()
        }
      } else {
        if (lenis) {
          destroyLenis()
          ScrollTrigger.refresh()
        }
      }
    }

    const addMqlListener = (mql, handler) => {
      if (!mql) return
      if (mql.addEventListener) {
        mql.addEventListener('change', handler)
      } else if (mql.addListener) {
        mql.addListener(handler)
      }
    }

    const removeMqlListener = (mql, handler) => {
      if (!mql) return
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler)
      } else if (mql.removeListener) {
        mql.removeListener(handler)
      }
    }

    addMqlListener(finePointerMedia, handleMediaChange)
    addMqlListener(reducedMotionMedia, handleMediaChange)

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
      removeMqlListener(finePointerMedia, handleMediaChange)
      removeMqlListener(reducedMotionMedia, handleMediaChange)
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}


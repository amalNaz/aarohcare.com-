import { useEffect, useRef } from 'react'

/**
 * useScrollReveal Hook
 * Observes container elements and triggers staggered reveals for headings, body text,
 * metadata, badges, and images using cubic-bezier(0.22, 1, 0.36, 1).
 */
export function useScrollReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) {
      // If user prefers reduced motion, make everything visible immediately
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll(
          '.reveal-heading, .reveal-text, .reveal-meta, .reveal-btn, .reveal-image, .reveal-stagger-item'
        )
        elements.forEach((el) => {
          el.classList.add('is-revealed')
        })
      }
      return
    }

    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            if (options.once !== false) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: options.rootMargin || '0px 0px -8% 0px',
        threshold: options.threshold || 0.1,
      }
    )

    // Observe the main container if it has reveal classes
    if (
      container.classList.contains('reveal-heading') ||
      container.classList.contains('reveal-text') ||
      container.classList.contains('reveal-group') ||
      container.classList.contains('reveal-image')
    ) {
      observer.observe(container)
    }

    // Observe any nested reveal elements
    const elements = container.querySelectorAll(
      '.reveal-group, .reveal-heading, .reveal-text, .reveal-meta, .reveal-btn, .reveal-image, .reveal-stagger-item'
    )
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [options.rootMargin, options.threshold, options.once])

  return containerRef
}

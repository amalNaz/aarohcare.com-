/**
 * Centralized, authoritative section navigation and scroll positioning utility.
 * Handles dynamic navbar measurement, smooth scrolling coordination with Lenis / native scroll,
 * navbar visibility synchronization, and URL hash updates without double-scroll triggers.
 */

let navigationTimer = null

export function scrollToSection(target, options = {}) {
  if (typeof window === 'undefined') return

  const {
    duration = 1.15,
    updateHash = true,
    onComplete,
  } = options

  // 1. Handle Top / Hero navigation
  if (!target || target === '#' || target === '#hero' || target === 'top') {
    window.__isNavigating = true
    if (navigationTimer) clearTimeout(navigationTimer)
    navigationTimer = setTimeout(() => {
      window.__isNavigating = false
      if (onComplete) onComplete()
    }, duration * 1000 + 100)

    if (updateHash && window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }

  // 2. Resolve Target Element
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) {
    console.warn(`[scrollNavigation] Target element not found:`, target)
    return
  }

  // 3. Mark programmatic navigation so Navbar does not auto-hide on desktop
  window.__isNavigating = true
  if (navigationTimer) clearTimeout(navigationTimer)
  navigationTimer = setTimeout(() => {
    window.__isNavigating = false
    if (onComplete) onComplete()
  }, duration * 1000 + 100)

  // 4. Update browser URL hash cleanly without triggering native jump
  if (updateHash && typeof target === 'string' && target.startsWith('#')) {
    window.history.pushState(null, '', target)
  }

  // 5. Calculate scroll target position
  // All section components have internal top padding (pt-16/pt-20/pt-24) so that
  // when the section begins at the top of the viewport (y=0), the fixed navbar (~64px)
  // sits over the padding and the section content begins cleanly below the navbar.
  // With scrollMarginTop removed (0px), Lenis scrolls to element.offsetTop with offset: 0.
  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset: 0,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    // Fallback for native scrolling
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

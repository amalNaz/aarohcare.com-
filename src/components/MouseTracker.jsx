import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './mouse-tracker.css'

/**
 * 1:1 Cuberto-inspired mouse interaction system.
 * Single solid difference dot (9px) that seamlessly expands into an inverted
 * circle (64px) on interactive elements, or a floating pill (CONNECT ↗) on team cards.
 */
export default function MouseTracker() {
  const dotRef = useRef(null)
  const followerRef = useRef(null)
  const innerRef = useRef(null)
  const textRef = useRef(null)
  const mediaRef = useRef(null)
  const mediaImgRef = useRef(null)

  useEffect(() => {
    // 1. Capability & accessibility checks
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasFinePointer) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dotEl = dotRef.current
    const followerEl = followerRef.current
    const innerEl = innerRef.current
    const textEl = textRef.current
    const mediaImgEl = mediaImgRef.current

    if (!dotEl || !followerEl || !innerEl) return

    // Position & velocity tracking variables
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const follower = { x: mouse.x, y: mouse.y }
    let prevFollowerX = mouse.x
    let prevFollowerY = mouse.y

    let isVisible = false
    let isHidden = false
    let isPill = false
    let isMedia = false
    let isDarkArea = false
    let currentImg = ''
    let magneticEl = null

    // High-performance GSAP quick setters
    const setDotX = gsap.quickSetter(dotEl, 'x', 'px')
    const setDotY = gsap.quickSetter(dotEl, 'y', 'px')
    const setFollowerX = gsap.quickSetter(followerEl, 'x', 'px')
    const setFollowerY = gsap.quickSetter(followerEl, 'y', 'px')
    const setInnerRotation = gsap.quickSetter(innerEl, 'rotation', 'rad')
    const setInnerScaleX = gsap.quickSetter(innerEl, 'scaleX')
    const setInnerScaleY = gsap.quickSetter(innerEl, 'scaleY')

    const applyFollowerDimensions = (w, h, radius, duration = 0.28) => {
      gsap.to(followerEl, {
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        borderRadius: radius,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    // 2. Mouse move handler
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Instantly position precision dot (for pill mode)
      setDotX(mouse.x)
      setDotY(mouse.y)

      if (!isVisible) {
        isVisible = true
        gsap.to(followerEl, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      // Check if cursor is over a dark/black section or element
      const darkTarget = e.target.closest(
        '#hero, #features, #contact, footer, .bg-black, .hero-gradient-bg, [data-theme="dark"], .bg-slate-900, [class*="bg-[#0a1820]"], [class*="bg-[#0d2746]"], [class*="bg-[#010a14]"], [class*="bg-[#081f38]"]'
      )
      const isDark = Boolean(darkTarget)
      if (isDark !== isDarkArea) {
        isDarkArea = isDark
        if (isDark) {
          followerEl.classList.add('is-dark-area')
        } else {
          followerEl.classList.remove('is-dark-area')
        }
      }

      // Handle magnetic button displacement if currently hovering a magnetic target
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distX = e.clientX - centerX
        const distY = e.clientY - centerY

        if (!prefersReducedMotion) {
          gsap.to(magneticEl, {
            x: distX * 0.28,
            y: distY * 0.28,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }
    }

    // 3. Mouse down / up (compression feedback)
    const handleMouseDown = () => {
      if (isHidden) return
      gsap.to(followerEl, {
        scale: 0.82,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseUp = () => {
      if (isHidden) return
      gsap.to(followerEl, {
        scale: 1,
        duration: 0.25,
        ease: 'elastic.out(1.2, 0.4)',
        overwrite: 'auto',
      })
    }

    // 4. Viewport entry / leave
    const handleMouseLeave = () => {
      isVisible = false
      gsap.to([dotEl, followerEl], {
        opacity: 0,
        scale: 0.2,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
      })
    }

    const handleMouseEnter = () => {
      isVisible = true
      gsap.to(followerEl, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // 5. Interactive hover delegation
    const handleMouseOver = (e) => {
      const target = e.target

      // Hidden target (iframes, inputs, inputs without cursor)
      const hiddenTarget = target.closest(
        '[data-cursor-hidden], iframe, input, textarea, select'
      )
      if (hiddenTarget) {
        isHidden = true
        followerEl.classList.add('is-hidden')
        dotEl.classList.add('is-hidden')
        return
      }

      // Floating Pill hover target (data-cursor-pill="CONNECT ↗", etc.)
      const pillTarget = target.closest('[data-cursor-pill]')
      if (pillTarget) {
        const textVal = pillTarget.getAttribute('data-cursor-pill') || 'CONNECT ↗'
        if (textEl) textEl.textContent = textVal
        isPill = true
        followerEl.classList.add('is-pill')
        dotEl.classList.add('is-pill')
        gsap.fromTo(
          followerEl,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.28, ease: 'power2.out', overwrite: 'auto' }
        )
        applyFollowerDimensions(124, 44, '9999px', 0.28)
        return
      }

      // Media hover target (data-cursor-img="url")
      const mediaTarget = target.closest('[data-cursor-img]')
      if (mediaTarget) {
        const imgUrl = mediaTarget.getAttribute('data-cursor-img')
        if (imgUrl && imgUrl !== currentImg) {
          currentImg = imgUrl
          if (mediaImgEl) mediaImgEl.src = imgUrl
        }
        isMedia = true
        followerEl.classList.add('is-media')
        applyFollowerDimensions(136, 92, '18px', 0.35)
        return
      }

      // Magnetic hover target (data-cursor-magnetic)
      const magneticTarget = target.closest('[data-cursor-magnetic]')
      if (magneticTarget) {
        magneticEl = magneticTarget
      }

      // Standard pointer hover target (links, buttons, or explicit data-cursor-pointer)
      // Expands into a 36px sleek hollow ring with transparent center
      const pointerTarget = target.closest('a, button, [role="button"], [data-cursor-pointer]')
      if (pointerTarget) {
        followerEl.classList.add('is-pointer')
        applyFollowerDimensions(36, 36, '9999px', 0.24)
        return
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      const related = e.relatedTarget

      // Clean up hidden
      if (target.closest('[data-cursor-hidden], iframe, input, textarea, select')) {
        if (!related || !related.closest('[data-cursor-hidden], iframe, input, textarea, select')) {
          isHidden = false
          followerEl.classList.remove('is-hidden')
          dotEl.classList.remove('is-hidden')
        }
      }

      // Clean up pill
      if (target.closest('[data-cursor-pill]')) {
        if (!related || !related.closest('[data-cursor-pill]')) {
          isPill = false
          followerEl.classList.remove('is-pill')
          dotEl.classList.remove('is-pill')
          gsap.to(followerEl, {
            scale: 0.85,
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
            overwrite: 'auto',
            onComplete: () => {
              applyFollowerDimensions(9, 9, '9999px', 0.15)
              if (isVisible) {
                gsap.to(followerEl, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
              }
            },
          })
        }
      }

      // Clean up media
      if (target.closest('[data-cursor-img]')) {
        if (!related || !related.closest('[data-cursor-img]')) {
          isMedia = false
          followerEl.classList.remove('is-media')
          applyFollowerDimensions(9, 9, '9999px', 0.24)
        }
      }

      // Clean up magnetic
      if (magneticEl && target.closest('[data-cursor-magnetic]')) {
        if (!related || !related.closest('[data-cursor-magnetic]')) {
          const prevMag = magneticEl
          magneticEl = null
          gsap.to(prevMag, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          })
        }
      }

      // Clean up pointer
      if (target.closest('a, button, [role="button"], [data-cursor-pointer]')) {
        if (!related || !related.closest('a, button, [role="button"], [data-cursor-pointer]')) {
          followerEl.classList.remove('is-pointer')
          applyFollowerDimensions(9, 9, '9999px', 0.24)
        }
      }
    }

    // 6. GSAP Ticker for smooth inertial following & velocity skewing
    const lerpSpeed = prefersReducedMotion ? 0.45 : 0.22

    const tick = () => {
      // Calculate target coords
      let targetX = mouse.x
      let targetY = mouse.y

      if (isPill) {
        // Offset approximately 20-22px visual offset from the cursor so it never covers the pointer/face
        const offsetX = mouse.x > window.innerWidth - 150 ? -144 : 22
        const offsetY = mouse.y > window.innerHeight - 60 ? -54 : 22
        let pillTargetX = mouse.x + offsetX
        let pillTargetY = mouse.y + offsetY

        // Subtle magnetic pull toward pointer when nearby (6-10px max)
        if (!prefersReducedMotion) {
          const distToFollower = Math.hypot(mouse.x - follower.x, mouse.y - follower.y)
          if (distToFollower < 65) {
            const pullFactor = Math.min((65 - distToFollower) * 0.12, 8)
            const pullAngle = Math.atan2(mouse.y - follower.y, mouse.x - follower.x)
            pillTargetX += Math.cos(pullAngle) * pullFactor
            pillTargetY += Math.sin(pullAngle) * pullFactor
          }
        }

        targetX = pillTargetX
        targetY = pillTargetY
      } else if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        targetX = centerX + (mouse.x - centerX) * 0.22
        targetY = centerY + (mouse.y - centerY) * 0.22
      }

      // Inertial lag interpolation
      follower.x += (targetX - follower.x) * lerpSpeed
      follower.y += (targetY - follower.y) * lerpSpeed

      setFollowerX(follower.x)
      setFollowerY(follower.y)

      // Velocity response
      if (isPill && !prefersReducedMotion) {
        const vx = follower.x - prevFollowerX
        const vy = follower.y - prevFollowerY
        const speed = Math.hypot(vx, vy)

        if (speed > 0.1) {
          // Subtle rotation clamped to ±8 degrees (0.14 radians)
          const angle = Math.atan2(vy, vx)
          const clampedAngle = Math.max(-0.14, Math.min(0.14, angle * 0.2))
          // Subtle horizontal stretch
          const stretch = Math.min(speed * 0.015, 0.12)
          setInnerRotation(clampedAngle)
          setInnerScaleX(1 + stretch)
          setInnerScaleY(1 - stretch * 0.35)
        } else {
          setInnerRotation(0)
          setInnerScaleX(1)
          setInnerScaleY(1)
        }
      } else if (!prefersReducedMotion && !isMedia) {
        // Cuberto velocity stretch on the 9px dot / 64px circle
        const vx = follower.x - prevFollowerX
        const vy = follower.y - prevFollowerY
        const speed = Math.hypot(vx, vy)

        if (speed > 0.15) {
          const angle = Math.atan2(vy, vx)
          const stretch = Math.min(speed * 0.02, 0.36)
          setInnerRotation(angle)
          setInnerScaleX(1 + stretch)
          setInnerScaleY(1 - stretch * 0.3)
        } else {
          setInnerRotation(0)
          setInnerScaleX(1)
          setInnerScaleY(1)
        }
      } else {
        setInnerRotation(0)
        setInnerScaleX(1)
        setInnerScaleY(1)
      }

      prevFollowerX = follower.x
      prevFollowerY = follower.y
    }

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    gsap.ticker.add(tick)

    // Clean up on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)

      gsap.ticker.remove(tick)

      if (magneticEl) {
        gsap.set(magneticEl, { x: 0, y: 0 })
      }
    }
  }, [])

  return (
    <div className="mouse-tracker-container" aria-hidden="true">
      {/* 1. Precision Dot (Only active in pill mode) */}
      <div ref={dotRef} className="mouse-tracker-dot" />

      {/* 2. Unified Cuberto Cursor / Follower */}
      <div ref={followerRef} className="mouse-tracker-follower">
        <div ref={innerRef} className="mouse-tracker-follower-inner">
          {/* Contextual Text Label */}
          <span ref={textRef} className="mouse-tracker-text">
            VIEW
          </span>

          {/* Media Preview Container */}
          <div ref={mediaRef} className="mouse-tracker-media">
            <img ref={mediaImgRef} src={null} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

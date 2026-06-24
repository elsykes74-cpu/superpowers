import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const brand = brandRef.current
    const line = lineRef.current
    const subtitle = subtitleRef.current
    if (!overlay || !brand || !line || !subtitle) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setDone(true) })

      // Build letter spans
      const text = 'JENNI MADISON'
      brand.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? `<span style="display:inline-block;width:0.28em"></span>`
            : `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="char" style="display:inline-block;transform:translateY(110%)">${char}</span></span>`
        )
        .join('')

      const chars = brand.querySelectorAll<HTMLElement>('.char')

      // Phase 1: letters sweep up
      tl.to(chars, {
        y: 0,
        duration: 1.0,
        stagger: 0.045,
        ease: 'power4.out',
      }, 0.1)

      // Phase 2: gold line expands from center
      tl.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.inOut' },
        0.8
      )

      // Phase 3: subtitle fades in
      tl.from(
        subtitle,
        { y: 12, opacity: 0, duration: 0.7, ease: 'power3.out' },
        1.1
      )

      // Hold...
      tl.to({}, { duration: 0.5 })

      // Phase 4: slide entire overlay upward
      tl.to(overlay, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut',
      })
    }, overlay)

    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Brand name */}
      <div
        ref={brandRef}
        style={{
          fontSize: 'clamp(28px, 5vw, 64px)',
          fontWeight: 400,
          letterSpacing: '0.32em',
          color: '#ffffff',
          fontFamily: "'Cormorant Garamond', 'Cormorant', Georgia, serif",
          userSelect: 'none',
        }}
      >
        JENNI MADISON
      </div>

      {/* Gold line */}
      <div
        ref={lineRef}
        style={{
          width: '100px',
          height: '1px',
          backgroundColor: '#C9A96E',
          transformOrigin: 'center',
          opacity: 0,
        }}
      />

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          fontSize: '10px',
          letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
          fontFamily: '"Helvetica Neue", sans-serif',
          margin: 0,
          opacity: 0,
        }}
      >
        Transformation &middot; Identity &middot; Elevation
      </p>
    </div>
  )
}

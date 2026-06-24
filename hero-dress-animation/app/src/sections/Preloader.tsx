import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const brand = brandRef.current
    const line = lineRef.current
    const sub = subRef.current
    if (!overlay || !brand || !line || !sub) return

    const text = 'JENNI MADISON'
    brand.innerHTML = text
      .split('')
      .map((c) =>
        c === ' '
          ? '<span style="display:inline-block;width:0.3em"></span>'
          : `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="pl-char" style="display:inline-block;transform:translateY(115%)">${c}</span></span>`
      )
      .join('')

    const chars = brand.querySelectorAll<HTMLElement>('.pl-char')

    const tl = gsap.timeline({ onComplete: () => { onDone?.() } })

    tl.to(chars, { y: 0, duration: 1.05, stagger: 0.048, ease: 'power4.out' }, 0.15)
      .fromTo(line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
        0.85
      )
      .from(sub, { y: 14, opacity: 0, duration: 0.75, ease: 'power3.out' }, 1.2)
      .to({}, { duration: 0.55 })
      .to(overlay, { yPercent: -100, duration: 1.05, ease: 'power4.inOut' })

    return () => { tl.kill() }
  }, [])

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
      <div
        ref={brandRef}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(28px, 5vw, 68px)',
          fontWeight: 400,
          letterSpacing: '0.3em',
          color: '#ffffff',
          overflow: 'hidden',
          lineHeight: 1,
        }}
      />
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
      <p
        ref={subRef}
        style={{
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        Transformation &middot; Identity &middot; Elevation
      </p>
    </div>
  )
}

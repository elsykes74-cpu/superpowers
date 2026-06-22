import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [workHovered, setWorkHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    const content = contentRef.current
    if (!section || !img || !content) return

    const ctx = gsap.context(() => {
      // Content stagger reveal on load
      gsap.from(content.children, {
        y: 50,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.set(img, { y: `${self.progress * 22}%` })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="spatial"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      <img
        ref={imgRef}
        src="/images/hero-bg.jpg"
        alt="Transformation"
        style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />

      {/* Multi-layer gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />
      {/* Subtle warm vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '32px',
          padding: '0 clamp(32px, 5vw, 80px)',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              backgroundColor: '#C9A96E',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            Transformation Coach &middot; Speaker &middot; Entrepreneur
          </span>
        </div>

        {/* Main heading — serif display */}
        <h1
          style={{
            fontSize: 'clamp(52px, 8.5vw, 128px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            lineHeight: 1.0,
            color: '#ffffff',
            maxWidth: '860px',
            margin: 0,
            fontFamily: "'Cormorant Garamond', 'Cormorant', Georgia, serif",
            textShadow: '0 4px 40px rgba(0,0,0,0.3)',
          }}
        >
          Become Her.
          <br />
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>Step Into More.</span>
        </h1>

        {/* Body */}
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '480px',
            fontFamily: '"Helvetica Neue", sans-serif',
            margin: 0,
          }}
        >
          I help women become the version of themselves their next level
          requires. Through identity work, spiritual mentorship, and
          neuroscience-informed coaching — transformation does not happen
          through willpower alone.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setWorkHovered(true)}
            onMouseLeave={() => setWorkHovered(false)}
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: workHovered ? '#0b0b0b' : '#ffffff',
              backgroundColor: workHovered ? '#C9A96E' : 'transparent',
              border: `1px solid ${workHovered ? '#C9A96E' : 'rgba(255,255,255,0.6)'}`,
              padding: '16px 40px',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              letterSpacing: '0.2em',
            }}
          >
            Work With Me
          </button>
          <button
            onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.75)',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '16px 8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#C9A96E' }} />
            Explore Programs
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#ffffff',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", sans-serif',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#C9A96E',
            transformOrigin: 'top',
            animation: 'scroll-line 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scroll-line {
            0%   { transform: scaleY(0); opacity: 0; transform-origin: top; }
            50%  { transform: scaleY(1); opacity: 1; }
            100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  )
}

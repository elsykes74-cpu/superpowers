import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [exploreHovered, setExploreHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.from(content.children, {
        y: 48,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Parallax on hero image
      if (img) {
        gsap.to(img, {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="spatial"
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#0b0b0b',
        '--fabric-speed': '12s',
        '--fabric-intensity': '3px',
        '--fabric-direction': '1',
      } as React.CSSProperties}
    >
      {/* ── Base hero image ── */}
      <img
        ref={imgRef}
        src="/images/hero-bg.jpg"
        alt="Transformation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '115%',        // extra height for parallax room
          objectFit: 'cover',
          transformOrigin: 'top center',
        }}
      />

      {/* ── Layer 1: primary fabric ripple — lateral drift + skew on the dress ── */}
      <div
        className="fabric-overlay"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Mask targets the flowing fabric of the dress — center-right region
          WebkitMaskImage: 'radial-gradient(ellipse 30% 36% at 59% 54%, black 25%, rgba(0,0,0,0.6) 55%, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 30% 36% at 59% 54%, black 25%, rgba(0,0,0,0.6) 55%, transparent 78%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Layer 2: silk sheen shimmer — bright crescent sweeping across the dress ── */}
      <div
        className="fabric-shimmer-layer"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 14% 28% at 59% 52%, rgba(255,245,220,0.22) 0%, rgba(201,169,110,0.08) 45%, transparent 75%)',
          // Tighter mask inside the dress silhouette
          WebkitMaskImage: 'radial-gradient(ellipse 22% 30% at 59% 53%, black 20%, rgba(0,0,0,0.3) 55%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 22% 30% at 59% 53%, black 20%, rgba(0,0,0,0.3) 55%, transparent 80%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Cinematic gradient overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)',
          zIndex: 3,
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 65% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)',
          zIndex: 3,
        }}
      />

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '28px',
          padding: '0 clamp(32px, 4.5vw, 72px)',
          paddingTop: '88px',
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
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.72)',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            Transformation Coach &middot; Speaker &middot; Entrepreneur
          </span>
        </div>

        {/* H1 in Cormorant Garamond italic */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(52px, 8vw, 118px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            color: '#ffffff',
            maxWidth: '820px',
            textShadow: '0 4px 40px rgba(0,0,0,0.3)',
          }}
        >
          Become Her.
          <br />
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>Step Into More.</span>
        </h1>

        {/* Body copy */}
        <p
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.72,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '500px',
          }}
        >
          I help women become the version of themselves their next level
          requires. Through identity work, spiritual mentorship, and
          neuroscience-informed coaching, your transformation does not happen
          through willpower alone — it happens when you shift who you are.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: ctaHovered ? '#080808' : '#ffffff',
              backgroundColor: ctaHovered ? '#C9A96E' : 'transparent',
              border: `1px solid ${ctaHovered ? '#C9A96E' : 'rgba(255,255,255,0.7)'}`,
              padding: '16px 40px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Work With Me
          </button>
          <button
            onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.82)',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '16px 8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: exploreHovered ? '28px' : '20px',
                height: '1px',
                backgroundColor: '#C9A96E',
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                flexShrink: 0,
              }}
            />
            Explore Programs
          </button>
        </div>
      </div>

      {/* ── Animated scroll indicator ── */}
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
          zIndex: 4,
          opacity: 0.55,
        }}
      >
        <span
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#ffffff',
            textTransform: 'uppercase',
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
      </div>

      <style>{`
        @keyframes scroll-line {
          0%   { transform: scaleY(0); opacity: 0; transform-origin: top; }
          50%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const wordmarkRef = useRef<HTMLSpanElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const wm = wordmarkRef.current
    const footer = footerRef.current
    if (!wm || !footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wm,
        { x: '2vw' },
        {
          x: '-2vw',
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{
        backgroundColor: '#ffffff',
        borderTop: '2px solid #C9A96E',
        padding: '80px clamp(20px, 4vw, 60px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top info grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '80px',
        }}
      >
        <InfoColumn
          title="COACHING"
          heading="Private Sessions"
          lines={[
            'Bi-weekly 90-minute sessions',
            'Personalized identity roadmap',
            'Voxer access between sessions',
            '3-month minimum commitment',
          ]}
        />
        <InfoColumn
          title="EVENTS"
          heading="Workshops & Speaking"
          lines={[
            'Mind Renewed™ workshops',
            'Keynote presentations',
            'Corporate & private events',
            'Virtual & in-person available',
          ]}
        />
        <InfoColumn
          title="WELLNESS"
          heading="The Divine Way"
          lines={[
            'Meditation & Yoga sessions',
            'Spiritual mentorship',
            'Nervous system regulation',
            'Conscious entrepreneurship',
          ]}
        />
        <div>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              color: '#C9A96E',
              marginBottom: '24px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            CONNECT
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SocialLink href="mailto:hello@thejennimadison.com" label="hello@thejennimadison.com" />
            <SocialLink href="https://instagram.com/thejennimadison" label="@thejennimadison — Instagram" />
            <SocialLink href="https://tiktok.com/@thejennimadison" label="@thejennimadison — TikTok" />
            <SocialLink href="https://youtube.com/@thejennifermadison" label="@thejennifermadison — YouTube" />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '28px',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'rgba(0,0,0,0.38)',
          }}
        >
          © 2025 Jenni Madison. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#C9A96E',
          }}
        >
          Mind Renewed Mountain Method™
        </p>
      </div>

      {/* Giant parallax wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
        }}
      >
        <span
          ref={wordmarkRef}
          style={{
            display: 'block',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(80px, 18vw, 320px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.03em',
            color: '#000000',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          Jenni Madison
        </span>
      </div>
    </footer>
  )
}

function InfoColumn({ title, heading, lines }: { title: string; heading: string; lines: string[] }) {
  return (
    <div>
      <p
        style={{
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.28em',
          color: '#C9A96E',
          marginBottom: '20px',
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '18px',
          fontWeight: 400,
          color: '#000000',
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}
      >
        {heading}
      </p>
      <div
        style={{
          fontSize: '13px',
          color: 'rgba(0,0,0,0.52)',
          lineHeight: 2,
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
        }}
      >
        {lines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        fontSize: '12px',
        letterSpacing: '0.04em',
        color: 'rgba(0,0,0,0.55)',
        textDecoration: 'none',
        transition: 'color 0.25s ease',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E'
        const dash = e.currentTarget.querySelector('.link-dash') as HTMLSpanElement
        if (dash) dash.style.width = '20px'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(0,0,0,0.55)'
        const dash = e.currentTarget.querySelector('.link-dash') as HTMLSpanElement
        if (dash) dash.style.width = '12px'
      }}
    >
      <span
        className="link-dash"
        style={{
          display: 'inline-block',
          width: '12px',
          height: '1px',
          backgroundColor: '#C9A96E',
          flexShrink: 0,
          transition: 'width 0.25s ease',
        }}
      />
      {label}
    </a>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const wordmarkRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wordmark = wordmarkRef.current
    if (!section || !wordmark) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const translateX = (1 - self.progress) * -60
          gsap.set(wordmark, { x: `${translateX}px` })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="footer"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        padding: '100px clamp(20px, 4vw, 60px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Gold accent top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'clamp(20px, 4vw, 60px)',
          width: '80px',
          height: '2px',
          backgroundColor: '#C9A96E',
        }}
      />

      {/* Top: Info grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          paddingBottom: '80px',
        }}
      >
        {/* Brand blurb column */}
        <div style={{ gridColumn: 'span 1' }}>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              color: '#000000',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            Jenni Madison
          </span>
          <p
            style={{
              fontSize: '13px',
              color: '#888888',
              lineHeight: 1.8,
              maxWidth: '240px',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            Transformational coach, speaker, and entrepreneur helping women step into the next version of themselves.
          </p>
          <div
            style={{
              width: '32px',
              height: '1px',
              backgroundColor: '#C9A96E',
              marginTop: '24px',
            }}
          />
        </div>

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
              letterSpacing: '0.24em',
              color: '#C9A96E',
              marginBottom: '20px',
              fontFamily: '"Helvetica Neue", sans-serif',
              textTransform: 'uppercase',
            }}
          >
            Connect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SocialLink href="mailto:hello@thejennimadison.com" label="hello@thejennimadison.com" />
            <SocialLink href="https://instagram.com/thejennimadison" label="Instagram" />
            <SocialLink href="https://tiktok.com/@thejennimadison" label="TikTok" />
            <SocialLink href="https://youtube.com/@thejennifermadison" label="YouTube" />
          </div>
        </div>
      </div>

      {/* Bottom: Giant serif wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.82,
          paddingBottom: '0',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          ref={wordmarkRef}
          style={{
            display: 'block',
            fontSize: 'clamp(72px, 17vw, 300px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.03em',
            color: '#000000',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            transform: 'translateY(8%)',
          }}
        >
          Jenni Madison
        </span>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            color: '#aaaaaa',
            fontFamily: '"Helvetica Neue", sans-serif',
            whiteSpace: 'nowrap',
            marginBottom: '12px',
            paddingRight: '4px',
            flexShrink: 0,
            transform: 'translateY(-4px)',
          }}
        >
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

function InfoColumn({
  title,
  heading,
  lines,
}: {
  title: string
  heading: string
  lines: string[]
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.24em',
          color: '#C9A96E',
          marginBottom: '18px',
          fontFamily: '"Helvetica Neue", sans-serif',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </p>
      <p style={{
        fontSize: '15px',
        fontWeight: 500,
        color: '#000000',
        marginBottom: '12px',
        fontFamily: '"Helvetica Neue", sans-serif',
      }}>
        {heading}
      </p>
      <div
        style={{
          fontSize: '13px',
          color: '#888888',
          lineHeight: 2,
          fontFamily: '"Helvetica Neue", sans-serif',
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  const isEmail = href.startsWith('mailto:')

  return (
    <a
      href={href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '13px',
        color: hovered ? '#C9A96E' : '#888888',
        textDecoration: 'none',
        fontFamily: '"Helvetica Neue", sans-serif',
        transition: 'color 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: hovered ? '16px' : '0px',
          height: '1px',
          backgroundColor: '#C9A96E',
          transition: 'width 0.3s ease',
          flexShrink: 0,
        }}
      />
      {label}
    </a>
  )
}

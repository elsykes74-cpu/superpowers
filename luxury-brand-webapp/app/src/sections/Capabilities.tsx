import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars: { label: string; detail: string }[] = [
  { label: 'Identity Elevation', detail: 'Shifting who you are at the root level, not just what you do' },
  { label: 'Nervous System Regulation', detail: 'Learning to hold success without burning out or self-sabotaging' },
  { label: 'Pattern Interruption', detail: 'Breaking cycles that keep you stuck through awareness and truth' },
  { label: 'Spiritual Alignment', detail: 'Connecting to your inner wisdom and divine purpose' },
  { label: 'Mind Renewal', detail: 'Renewing the way you think through neuroscience-informed tools' },
  { label: 'Embodied Leadership', detail: 'Becoming the version of you that no longer negotiates with fear' },
  { label: 'Habit Architecture', detail: 'Aligning your daily habits with your future self' },
  { label: 'Conscious Entrepreneurship', detail: 'Building businesses that reflect your evolved identity' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const ctx = gsap.context(() => {
      gsap.from(grid.querySelectorAll('li'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#080808',
        padding: 'clamp(100px, 12vw, 160px) clamp(20px, 4vw, 60px)',
      }}
    >
      <img
        src="/images/capabilities-bg.jpg"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.35,
        }}
      />
      {/* Dark overlay with warm vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.75) 60%, rgba(8,8,8,0.88) 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Top: title row */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '60px',
            paddingBottom: '36px',
            borderBottom: '1px solid rgba(201,169,110,0.25)',
          }}
        >
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: '#C9A96E',
                }}
              />
              <p
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  color: '#C9A96E',
                  textTransform: 'uppercase',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  margin: 0,
                }}
              >
                The Framework
              </p>
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 6vw, 88px)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '28px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              What I Teach
            </h2>
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: '580px',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              My work is centered around one question: Who do you need to become
              to live the life you say you want? Through the Mind Renewed
              Mountain Method, I guide women through the exact stages of
              awareness, grounding, revelation, and renewal — so you are not
              just inspired, you are actually changed.
            </p>
          </div>
          <div
            style={{
              flex: '0 0 clamp(160px, 20vw, 240px)',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrbitalBadge />
          </div>
        </div>

        {/* Pillars grid */}
        <ul
          ref={gridRef}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(201,169,110,0.12)',
            border: '1px solid rgba(201,169,110,0.12)',
          }}
        >
          {pillars.map((pillar, i) => (
            <BulletItem key={pillar.label} index={i} {...pillar} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BulletItem({
  label,
  detail,
  index,
}: {
  label: string
  detail: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? 'rgba(201,169,110,0.06)' : 'rgba(8,8,8,0.7)',
        padding: '32px 36px',
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
        minHeight: '150px',
        transition: 'background-color 0.35s ease',
        cursor: 'default',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: '28px',
          fontSize: '10px',
          letterSpacing: '0.14em',
          color: '#C9A96E',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '8px',
          fontFamily: '"Helvetica Neue", sans-serif',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: '1 1 0%' }}>
        <h3
          style={{
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: '#ffffff',
            marginBottom: '12px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.62)',
            margin: 0,
            fontFamily: '"Helvetica Neue", sans-serif',
          }}
        >
          {detail}
        </p>
      </div>
    </li>
  )
}

function OrbitalBadge() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const pathId = `orbital-path-${Math.floor(Math.random() * 10000)}`
    const duration = 28

    const path = svg.querySelector('path')
    if (!path) return

    path.setAttribute('id', pathId)

    const textContent = 'JENNI MADISON • TRANSFORMATION • MIND RENEWED • '

    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    textEl.setAttribute('fill', 'rgba(255,255,255,0.7)')
    textEl.setAttribute('font-family', "'Helvetica Neue', sans-serif")
    textEl.setAttribute('font-size', '16px')
    textEl.setAttribute('font-weight', '400')
    textEl.setAttribute('letter-spacing', '2.5px')

    const tp1 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp1.setAttribute('href', `#${pathId}`)
    tp1.setAttribute('startOffset', '0%')
    tp1.textContent = textContent

    const tp2 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    tp2.setAttribute('href', `#${pathId}`)
    tp2.setAttribute('startOffset', '0%')
    tp2.textContent = textContent

    textEl.appendChild(tp1)
    textEl.appendChild(tp2)
    svg.appendChild(textEl)

    const textPaths = svg.querySelectorAll('textPath')

    const tween1 = gsap.fromTo(
      textPaths[0],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: '-100%' }, duration, ease: 'none', repeat: -1 }
    )
    const tween2 = gsap.fromTo(
      textPaths[1],
      { attr: { startOffset: '100%' } },
      { attr: { startOffset: '0%' }, duration, ease: 'none', repeat: -1 }
    )

    return () => {
      tween1.kill()
      tween2.kill()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Outer faint circle */}
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />
        {/* Inner gold circle */}
        <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
        {/* Text path */}
        <path
          d="M200,40 A160,160 0 1,1 199.99,40"
          fill="none"
        />
        {/* Center cross mark */}
        <line x1="194" y1="200" x2="206" y2="200" stroke="#C9A96E" strokeWidth="1" opacity="0.6" />
        <line x1="200" y1="194" x2="200" y2="206" stroke="#C9A96E" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  )
}

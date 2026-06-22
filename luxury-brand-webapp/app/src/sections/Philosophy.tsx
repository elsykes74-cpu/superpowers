import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Identity', 'Transformation', 'Elevation']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const decor = decorRef.current
    const tagsEl = tagsRef.current
    if (!section || !text || !decor || !tagsEl) return

    const ctx = gsap.context(() => {
      gsap.from(decor, {
        scaleX: 0,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })

      gsap.from(text, {
        y: 60,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      })

      gsap.from(tagsEl.children, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '160px clamp(20px, 4vw, 60px) 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background letter */}
      <span
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-20px',
          fontSize: 'clamp(200px, 30vw, 420px)',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(0,0,0,0.025)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        J
      </span>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Gold decorative rule */}
        <div
          ref={decorRef}
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: '#C9A96E',
            marginBottom: '48px',
            transformOrigin: 'left center',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: '80px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <p
            ref={textRef}
            style={{
              flex: '1 1 600px',
              fontSize: 'clamp(32px, 4.5vw, 68px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#000000',
              maxWidth: '1100px',
              fontFamily: "'Cormorant Garamond', 'Cormorant', Georgia, serif",
            }}
          >
            Who do you need to become to live the life you say you want?
            Transformation does not happen through willpower alone — it happens
            when you shift your identity.
          </p>

          <div
            ref={tagsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              paddingTop: '16px',
            }}
          >
            {tags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.26em',
                  color: i === 0 ? '#C9A96E' : '#000000',
                  padding: '10px 20px',
                  border: `1px solid ${i === 0 ? '#C9A96E' : '#1a1a1a'}`,
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  backgroundColor: i === 0 ? 'rgba(201,169,110,0.06)' : 'transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

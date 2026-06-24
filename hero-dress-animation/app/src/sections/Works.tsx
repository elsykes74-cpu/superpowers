import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programs, type Program } from '../data/programs'

gsap.registerPlugin(ScrollTrigger)

interface WorksProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  onSelectProgram: (id: string) => void
}

export default function Works({ scrollRef: _scrollRef, onSelectProgram }: WorksProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const imageLoadedRef = useRef<boolean[]>(new Array(programs.length).fill(false))
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(programs.length).fill(null))
  const strengthRef = useRef(0)
  const prevScrollYRef = useRef(0)
  const randsRef = useRef<number[][]>(
    programs.map(() => [Math.random(), Math.random(), Math.random(), Math.random()])
  )

  const setCanvasRef = useCallback((el: HTMLCanvasElement | null, index: number) => {
    canvasRefs.current[index] = el
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    programs.forEach((program, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        imagesRef.current[i] = img
        imageLoadedRef.current[i] = true
        const canvas = canvasRefs.current[i]
        if (canvas) {
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width * Math.min(window.devicePixelRatio, 2)
            canvas.height = rect.height * Math.min(window.devicePixelRatio, 2)
          }
          drawImage(canvas, img, 0, randsRef.current[i])
        }
      }
      img.src = program.img
    })
  }, [])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      const scrollY = window.scrollY
      const scrollDelta = scrollY - prevScrollYRef.current
      const dt = 1 / 60
      const targetStrength = (Math.abs(scrollDelta) * 10) / window.innerHeight
      strengthRef.current *= Math.exp(-dt * 10)
      strengthRef.current += Math.min(targetStrength, 5)
      const strength = Math.min(1, strengthRef.current)

      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !imagesRef.current[i]) return
        if (Math.random() > Math.exp(-dt * 25 * (1 + strength))) {
          randsRef.current[i] = [Math.random(), Math.random(), Math.random(), Math.random()]
        }
        drawImage(canvas, imagesRef.current[i]!, strength, randsRef.current[i])
      })

      prevScrollYRef.current = scrollY
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !canvas.parentElement) return
        const rect = canvas.parentElement.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        if (imagesRef.current[i]) drawImage(canvas, imagesRef.current[i]!, 0, randsRef.current[i])
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{ backgroundColor: '#F5F2EC', padding: '120px clamp(20px, 4vw, 60px)' }}
    >
      <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '60px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            paddingBottom: '24px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: '#C9A96E',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Featured Offerings
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#000000',
              }}
            >
              Programs &amp; Services
            </h2>
          </div>
          <span
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: '#999',
            }}
          >
            {programs.length} offerings
          </span>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 640px), 1fr))',
            gap: '2px',
          }}
        >
          {programs.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={i}
              setCanvasRef={setCanvasRef}
              onClick={() => onSelectProgram(program.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({
  program,
  index,
  setCanvasRef,
  onClick,
}: {
  program: Program
  index: number
  setCanvasRef: (el: HTMLCanvasElement | null, index: number) => void
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="work-item"
      style={{
        border: `1px solid ${hovered ? '#C9A96E' : 'rgba(0,0,0,0.12)'}`,
        backgroundColor: '#ffffff',
        boxShadow: hovered ? '0 8px 40px rgba(0,0,0,0.08)' : 'none',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        display: 'block',
        fontFamily: 'inherit',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          overflow: 'hidden',
          backgroundColor: '#e8e5e0',
        }}
      >
        <canvas
          ref={(el) => setCanvasRef(el, index)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Gold program number overlay */}
        <span
          style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#C9A96E',
            fontWeight: 500,
            zIndex: 2,
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          {program.id}
        </span>
      </div>
      <div
        style={{
          padding: '22px 28px',
          borderTop: `1px solid ${hovered ? '#C9A96E' : 'rgba(0,0,0,0.1)'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              color: '#999',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            {program.category}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '20px',
              fontWeight: 400,
              color: '#000000',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {program.title}
          </p>
        </div>
        <span
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: hovered ? '#C9A96E' : '#000000',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'color 0.3s ease',
            flexShrink: 0,
          }}
        >
          View →
        </span>
      </div>
    </button>
  )
}

function drawImage(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  strength: number,
  rands: number[]
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cw = canvas.width
  const ch = canvas.height

  const imgRatio = img.width / img.height
  const canvasRatio = cw / ch
  let sw = img.width
  let sh = img.height
  let sx = 0
  let sy = 0
  if (imgRatio > canvasRatio) {
    sw = img.height * canvasRatio
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / canvasRatio
    sy = (img.height - sh) / 2
  }

  ctx.clearRect(0, 0, cw, ch)

  if (strength < 0.01) {
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
    return
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)

  const numStrips = Math.floor(3 + strength * 12)
  for (let s = 0; s < numStrips; s++) {
    const stripY = Math.floor(rands[s % 4] * ch * (0.3 + s * 0.15)) % ch
    const stripH = Math.floor(2 + Math.random() * ch * 0.06 * strength)
    const offsetX = (rands[(s + 1) % 4] - 0.5) * cw * 0.15 * strength
    if (rands[(s + 2) % 4] > 0.7) {
      ctx.drawImage(canvas, 0, stripY, cw, stripH, offsetX, stripY, cw, stripH)
    }
  }

  if (strength > 0.05) {
    const shiftAmount = strength * 6
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = strength * 0.3
    ctx.drawImage(canvas, shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.drawImage(canvas, -shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  if (strength > 0.3) {
    // Warm gold tint on distortion (subtle)
    ctx.fillStyle = `rgba(201,169,110,${(strength - 0.3) * 0.12})`
    ctx.fillRect(0, 0, cw, ch)
  }
}

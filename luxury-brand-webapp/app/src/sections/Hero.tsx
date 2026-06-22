import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;
  vec2 st = coord;
  coord *= 10.0;

  float len;
  for (int i = 0; i < 5; i++) {
    len = length(vec2(coord.x, coord.y));
    coord.x += cos(coord.y + sin(len)) + cos(time * 0.07) * 0.2;
    coord.y += sin(coord.x + cos(len)) + sin(time * 0.1);
  }

  len *= cos(len * 0.4);
  len -= 10.0;

  for (float i = 0.0; i < 5.0; i++) {
    len += 1.0 / abs(mod(st.x, 0.09 * i) * 200.0) * 1.0;
  }

  // Warmer, more golden palette
  float r = cos(len + 0.35) * 0.35 + 0.45;
  float g = cos(len + 0.15) * 0.28 + 0.35;
  float b = cos(len - 0.1) * 0.22 + 0.28;

  vec3 color = vec3(r, g, b);
  color = smoothstep(0.08, 0.92, color);
  color *= 0.65;

  gl_FragColor = vec4(color, 1.0);
}
`

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const uniformsRef = useRef<{ resolution: THREE.Uniform; time: THREE.Uniform }>({
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    time: new THREE.Uniform(0),
  })

  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    programType: 'Private Coaching',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
    },
    onError: (err) => {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvasHostRef.current
    if (!canvas || !host) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        resolution: uniformsRef.current.resolution,
        time: uniformsRef.current.time,
      },
      depthTest: false,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleResize = () => {
      const rect = host.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      renderer.setSize(w, h, false)
      uniformsRef.current.resolution.value.set(w, h)
    }
    handleResize()

    const ro = new ResizeObserver(handleResize)
    ro.observe(host)

    let rafId: number
    const startTime = performance.now()
    const animate = () => {
      uniformsRef.current.time.value = (performance.now() - startTime) / 1000
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!formData.name || !formData.email) {
      setSubmitError('Please fill in all required fields.')
      return
    }
    createInquiry.mutate({
      programType: formData.programType,
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message || undefined,
      userId: user?.id,
    })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        backgroundColor: '#080808',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
      }}
    >
      {/* Left: shader canvas */}
      <div
        ref={canvasHostRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        {/* Overlay gradient for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(32px, 4vw, 56px)',
            left: 'clamp(32px, 4vw, 56px)',
            right: 'clamp(32px, 4vw, 56px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {/* Gold rule */}
          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: '#C9A96E',
              marginBottom: '20px',
            }}
          />
          <h2
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              lineHeight: 1.0,
              color: '#ffffff',
              marginBottom: '18px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              maxWidth: '480px',
            }}
          >
            Ready to
            <br />
            become her?
          </h2>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            JENNI MADISON &middot; Coaching &amp; Inquiries
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div
        style={{
          backgroundColor: '#080808',
          color: '#ffffff',
          padding: 'clamp(48px, 5vw, 80px) clamp(28px, 4vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderLeft: '1px solid rgba(201,169,110,0.1)',
        }}
      >
        <div style={{ maxWidth: '520px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            Get in touch
          </p>
          <h3
            style={{
              fontSize: 'clamp(26px, 3vw, 42px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginBottom: '40px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Inquire about coaching, speaking, or upcoming workshops.
          </h3>

          {submitted ? (
            <div
              style={{
                border: '1px solid rgba(201,169,110,0.4)',
                padding: '36px 32px',
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '1px',
                  backgroundColor: '#C9A96E',
                  marginBottom: '20px',
                }}
              />
              Thank you — I will be in touch within 24 hours. Your next level
              is not waiting on more time, it is waiting on your decision.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
            >
              {submitError && (
                <div
                  style={{
                    border: '1px solid rgba(255,100,100,0.4)',
                    padding: '14px 20px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'rgba(255,150,150,0.9)',
                    fontFamily: '"Helvetica Neue", sans-serif',
                  }}
                >
                  {submitError}
                </div>
              )}
              <SelectField
                label="I am interested in"
                name="programType"
                value={formData.programType}
                onChange={handleChange}
                options={[
                  'Private Coaching',
                  'Mind Renewed Workshop',
                  'Keynote Speaking',
                  'The Divine Way',
                  'Meditation & Yoga',
                  'Entrepreneur Mentorship',
                ]}
              />
              <Field label="Full name *" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
              <Field label="Email *" type="email" name="email" placeholder="you@domain.com" value={formData.email} onChange={handleChange} />
              <Field label="Phone (optional)" type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              <TextareaField
                label="Tell me about your journey (optional)"
                name="message"
                placeholder="What are you looking to transform? Where do you feel stuck?"
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={createInquiry.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '8px',
                  padding: '18px 28px',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: submitHovered ? '#080808' : '#ffffff',
                  backgroundColor: submitHovered ? '#C9A96E' : 'transparent',
                  border: `1px solid ${submitHovered ? '#C9A96E' : 'rgba(255,255,255,0.4)'}`,
                  cursor: createInquiry.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  opacity: createInquiry.isPending ? 0.6 : 1,
                }}
              >
                {createInquiry.isPending ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={fieldBase}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string
  name: string
  options: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, paddingRight: '20px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: '#000', backgroundColor: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '12px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C9A96E')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
      />
    </label>
  )
}

const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '13px 0',
  fontSize: '14px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  outline: 'none',
  fontFamily: '"Helvetica Neue", sans-serif',
  letterSpacing: '0.01em',
  appearance: 'none',
  colorScheme: 'dark',
  transition: 'border-bottom-color 0.25s ease',
}

const labelBase: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.24em',
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase',
  marginBottom: '6px',
  display: 'block',
  fontFamily: '"Helvetica Neue", sans-serif',
}

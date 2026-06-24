import { useEffect, useState } from 'react'
import { programs } from '../data/programs'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

interface ProgramDetailProps {
  programId: string
  onBack: () => void
}

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL
  const appID = import.meta.env.VITE_APP_ID
  const redirectUri = `${window.location.origin}/api/oauth/callback`
  const state = btoa(redirectUri)

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`)
  url.searchParams.set('client_id', appID)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'profile')
  url.searchParams.set('state', state)

  return url.toString()
}

export default function ProgramDetail({ programId, onBack }: ProgramDetailProps) {
  const program = programs.find((p) => p.id === programId)
  const [hovered, setHovered] = useState(false)
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitted'>('idle')
  const { user, isLoading: authLoading } = useAuth()

  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: () => {
      setInquiryStatus('submitted')
    },
  })

  const handleInquire = () => {
    if (!program) return
    if (!user) {
      // Store intended inquiry in sessionStorage, redirect to login
      sessionStorage.setItem('pending_inquiry_program_id', program.id)
      sessionStorage.setItem('pending_inquiry_program_title', program.title)
      window.location.href = getOAuthUrl()
      return
    }
    createInquiry.mutate({
      programType: program.title,
      fullName: user.name || '',
      email: user.email || '',
      message: `Interested in ${program.title}`,
    })
  }

  // Check for pending inquiry after OAuth redirect
  useEffect(() => {
    const pendingProgramId = sessionStorage.getItem('pending_inquiry_program_id')
    const pendingProgramTitle = sessionStorage.getItem('pending_inquiry_program_title')
    if (pendingProgramId && pendingProgramTitle && user && programId === pendingProgramId) {
      sessionStorage.removeItem('pending_inquiry_program_id')
      sessionStorage.removeItem('pending_inquiry_program_title')
      createInquiry.mutate({
        programType: pendingProgramTitle,
        fullName: user.name || '',
        email: user.email || '',
        message: `Interested in ${pendingProgramTitle}`,
      })
    }
  }, [user, programId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [programId])

  if (!program) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          color: '#000000',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <p style={{ fontSize: '20px' }}>Program not found.</p>
        <button
          onClick={onBack}
          style={{
            fontSize: '13px',
            letterSpacing: '0.14em',
            padding: '14px 32px',
            border: '1px solid #000',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          ← Back to programs
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(400px, 70vh, 720px)',
          overflow: 'hidden',
          backgroundColor: '#0b0b0b',
        }}
      >
        <img
          src={program.img}
          alt={program.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 'clamp(100px, 14vh, 140px)',
            left: 'clamp(24px, 4vw, 60px)',
            fontSize: '12px',
            letterSpacing: '0.16em',
            padding: '12px 24px',
            border: '1px solid #ffffff',
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: '#ffffff',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: '"Helvetica Neue", sans-serif',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          ← Back
        </button>
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(32px, 5vw, 60px)',
            left: 'clamp(24px, 4vw, 60px)',
            right: 'clamp(24px, 4vw, 60px)',
            color: '#ffffff',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.8,
              marginBottom: '12px',
            }}
          >
            Program {program.id} · {program.category}
          </p>
          <h1
            style={{
              fontSize: 'clamp(40px, 6.5vw, 92px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              lineHeight: 1.02,
              margin: 0,
              maxWidth: '900px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {program.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '80px clamp(24px, 4vw, 60px) 120px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: description + features */}
        <div style={{ flex: '2 1 600px', minWidth: 0 }}>
          {/* Gold accent */}
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }} />
          <p
            style={{
              fontSize: 'clamp(22px, 2.5vw, 36px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              color: '#000000',
              marginBottom: '48px',
              maxWidth: '680px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {program.tagline}
          </p>

          {program.description.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#333333',
                marginBottom: '24px',
                maxWidth: '680px',
              }}
            >
              {p}
            </p>
          ))}

          <div
            style={{
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid #1a1a1a',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              What&apos;s Included
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '14px 40px',
              }}
            >
              {program.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#333333',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '12px',
                      width: '8px',
                      height: '1px',
                      backgroundColor: '#000000',
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: inquiry panel */}
        <aside
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            position: 'sticky',
            top: '112px',
            border: '1px solid #000000',
            padding: '32px 28px',
            backgroundColor: '#ffffff',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#666666',
              marginBottom: '12px',
            }}
          >
            Investment
          </p>
          <p
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#000000',
              marginBottom: '6px',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {program.investment}
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#666666',
              lineHeight: 1.5,
              marginBottom: '28px',
            }}
          >
            {program.note}
          </p>

          <dl
            style={{
              borderTop: '1px solid #e5e5e5',
              borderBottom: '1px solid #e5e5e5',
              padding: '16px 0',
              margin: '0 0 28px',
              display: 'grid',
              gap: '10px',
            }}
          >
            <Row k="Duration" v={program.duration} />
            <Row k="Format" v={program.format} />
            <Row k="Includes" v={program.includes} />
          </dl>

          {inquiryStatus === 'submitted' ? (
            <div
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#1a6b3a',
                backgroundColor: '#e8f5e9',
                border: '1px solid #1a6b3a',
                textAlign: 'center',
              }}
            >
              Inquiry submitted. I will be in touch within 24 hours.
            </div>
          ) : (
            <button
              onClick={handleInquire}
              disabled={createInquiry.isPending || authLoading}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                width: '100%',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: hovered ? '#080808' : '#000000',
                backgroundColor: hovered ? '#C9A96E' : '#ffffff',
                border: `1px solid ${hovered ? '#C9A96E' : '#000000'}`,
                padding: '18px 24px',
                cursor: (createInquiry.isPending || authLoading) ? 'wait' : 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: '"Helvetica Neue", sans-serif',
                opacity: (createInquiry.isPending || authLoading) ? 0.6 : 1,
              }}
            >
              {createInquiry.isPending ? 'Submitting...' : 'Inquire Now'}
            </button>
          )}
          <button
            onClick={onBack}
            style={{
              width: '100%',
              marginTop: '14px',
              fontSize: '12px',
              letterSpacing: '0.14em',
              color: '#666666',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            ← Back to programs
          </button>
        </aside>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#333333',
      }}
    >
      <dt style={{ color: '#666666' }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 500, color: '#000000' }}>{v}</dd>
    </div>
  )
}

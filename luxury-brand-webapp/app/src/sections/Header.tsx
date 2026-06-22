import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  forceLight?: boolean
}

const navItems = ['Programs', 'About', 'Contact']
const sectionIds = ['#works', '#capabilities', '#footer']

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

export default function Header({ scrollRef, forceLight = false }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 80)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const overHero = overHeroRaw && !forceLight
  const { user, isAuthenticated, logout } = useAuth({ redirectPath: '/' })

  const handleNavClick = (index: number) => {
    const target = document.querySelector(sectionIds[index])
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const textColor = overHero ? '#ffffff' : '#000000'
  const bgColor = overHero ? 'transparent' : 'rgba(255,255,255,0.97)'
  const borderColor = overHero ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: isCompact ? '62px' : '84px',
        backgroundColor: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: overHero ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: overHero ? 'none' : 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        transition:
          'height 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Monogram */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          cursor: 'pointer',
          gap: '2px',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            fontWeight: 400,
            letterSpacing: '0.28em',
            color: textColor,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            transition: 'color 0.4s ease',
            lineHeight: 1,
          }}
        >
          JENNI MADISON
        </span>
        <span
          style={{
            display: 'block',
            width: isCompact ? '0px' : '24px',
            height: '1px',
            backgroundColor: '#C9A96E',
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            opacity: overHero ? 0.8 : 1,
          }}
        />
      </div>

      <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
        {navItems.map((item, i) => (
          <NavItem
            key={item}
            label={item}
            overHero={overHero}
            onClick={() => handleNavClick(i)}
          />
        ))}
        {isAuthenticated && user ? (
          <NavItem label="Sign Out" overHero={overHero} onClick={logout} />
        ) : (
          <NavItem
            label="Sign In"
            overHero={overHero}
            onClick={() => { window.location.href = getOAuthUrl() }}
          />
        )}
      </nav>
    </header>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)'
  const activeColor = overHero ? '#ffffff' : '#000000'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.14em',
        backgroundColor: 'transparent',
        color: hovered ? activeColor : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '20px',
          right: '20px',
          height: '1px',
          backgroundColor: '#C9A96E',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </button>
  )
}

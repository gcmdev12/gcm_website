'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  AtSign,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Phone,
  Users,
  X,
  Youtube,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { graphqlRequest, PUBLIC_SITE_SETTINGS_QUERY } from '../lib/api'

const navItems = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Our Causes', '/our-causes'],
  ['Gallery', '/gallery'],
  ['News & Updates', '/updates'],
  ['Contact Us', '/contact'],
] as const

type SiteSettings = {
  email: string
  phone1?: string | null
  phone2?: string | null
  location?: string | null
  whatsapp?: string | null
  instagram?: string | null
  facebook?: string | null
  threads?: string | null
  tiktok?: string | null
  youtube?: string | null
}

function SocialLinks({ settings }: { settings: SiteSettings }) {
  return (
    <div className="social-links" aria-label="Social media links">
      <a className="social-whatsapp" href={settings.whatsapp || "https://wa.me/message/DUM2WTJMAHSOD1"} aria-label="WhatsApp"><MessageCircle size={18} /></a>
      <a className="social-instagram" href={settings.instagram || "https://www.instagram.com/glorychildrenministry2"} aria-label="Instagram"><Instagram size={18} /></a>
      <a className="social-facebook" href={settings.facebook || "https://www.facebook.com/share/187JGBB3RM/?mibextid=wwXlfr"} aria-label="Facebook"><Facebook size={18} /></a>
      <a className="social-threads" href={settings.threads || "https://www.threads.com/@glorychildrenministry2"} aria-label="Threads"><AtSign size={18} /></a>
      <a className="social-tiktok" href={settings.tiktok || "https://www.tiktok.com/@glory_children_ministry?_r=1&_t=ZS-9A3NOxkpu3J"} aria-label="TikTok"><Music2 size={18} /></a>
      <a className="social-youtube" href={settings.youtube || "https://www.youtube.com/@GloryChildrenMinistry"} aria-label="YouTube"><Youtube size={18} /></a>
    </div>
  )
}

function MobileBrand() {
  return (
    <span className="mobile-brand" aria-hidden="true">
      <span className="mobile-brand-icon">
        <Image src="/favicon-512.png" alt="" fill sizes="52px" />
      </span>
      <span className="mobile-brand-name">
        <strong>Glory</strong>
        <span>Children Ministry</span>
      </span>
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>({ email: 'info@glorychildrenministry.org' })

  useEffect(() => {
    graphqlRequest<{ siteSettings: SiteSettings }>(PUBLIC_SITE_SETTINGS_QUERY)
      .then((data) => data?.siteSettings && setSettings(data.siteSettings))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 28)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-contact">
            {settings.phone1 && <a href={`tel:${settings.phone1.replace(/\\s+/g, "")}`}><Phone size={15} /> {settings.phone1}</a>}
            {settings.phone2 && <a href={`tel:${settings.phone2.replace(/\\s+/g, "")}`}><Phone size={15} /> {settings.phone2}</a>}
            <a href={`mailto:${settings.email}`}><Mail size={15} /> {settings.email}</a>
            <span><MapPin size={15} /> {settings.location || "Namusera, Hoima Rd, Kampala, Uganda"}</span>
          </div>
          <div className="follow"><span>Follow Us</span><SocialLinks settings={settings} /></div>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <Link className="brand" href="/" onClick={closeMenu} aria-label="Glory Children Ministry home">
            <span className="brand-desktop">
              <Image src="/images/logo.png" alt="Glory Children Ministry" width={160} height={92} priority />
            </span>
            <MobileBrand />
          </Link>

          <div className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map(([label, href]) => {
              const isActive = pathname === href

              return (
                <Link
                  key={label}
                  href={href}
                  className={isActive ? 'active' : ''}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="nav-actions">
            <Link className="button button-primary small" href="/donate">
              <Heart size={16} fill="currentColor" /> Donate
            </Link>
            <Link className="button button-purple small" href="/volunteer">
              <Users size={16} fill="currentColor" /> Volunteer
            </Link>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={29} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>
    </header>
  )
}

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

const navItems = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Our Causes', '/our-causes'],
  ['Gallery', '/gallery'],
  ['News & Updates', '/updates'],
  ['Contact Us', '/contact'],
] as const

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media links">
      <a className="social-whatsapp" href="https://wa.me/message/DUM2WTJMAHSOD1" aria-label="WhatsApp"><MessageCircle size={18} /></a>
      <a className="social-instagram" href="https://www.instagram.com/glorychildrenministry2" aria-label="Instagram"><Instagram size={18} /></a>
      <a className="social-facebook" href="https://www.facebook.com/share/187JGBB3RM/?mibextid=wwXlfr" aria-label="Facebook"><Facebook size={18} /></a>
      <a className="social-threads" href="https://www.threads.com/@glorychildrenministry2" aria-label="Threads"><AtSign size={18} /></a>
      <a className="social-tiktok" href="https://www.tiktok.com/@glory_children_ministry?_r=1&_t=ZS-9A3NOxkpu3J" aria-label="TikTok"><Music2 size={18} /></a>
      <a className="social-youtube" href="https://www.youtube.com/@GloryChildrenMinistry" aria-label="YouTube"><Youtube size={18} /></a>
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
            <a href="tel:+256755575982"><Phone size={15} /> +256 755 575 982</a>
            <a href="tel:+256767274915"><Phone size={15} /> +256 767 274 915</a>
            <a href="mailto:info@glorychildrenministry.org"><Mail size={15} /> info@glorychildrenministry.org</a>
            <span><MapPin size={15} /> Namusera, Hoima Rd, Kampala, Uganda</span>
          </div>
          <div className="follow"><span>Follow Us</span><SocialLinks /></div>
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

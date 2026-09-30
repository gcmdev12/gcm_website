'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { graphqlRequest, SUBSCRIBE_NEWSLETTER } from '../lib/api'
import { ArrowRight, AtSign, CheckCircle2, X, Facebook, Heart, Instagram, Mail, MapPin, MessageCircle, Music2, Phone, Youtube } from 'lucide-react'

const navItems = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Our Causes', '/our-causes'],
  ['Gallery', '/gallery'],
  ['News & Updates', '/updates'],
  ['Contact Us', '/contact'],
] as const

const causes = [
  { title: 'Education' }, { title: 'Health' }, { title: 'Food' },
  { title: 'Guidance & Counselling' }, { title: 'Shelter & Protection' }, { title: 'Skills & Future' },
]

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

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentYear] = useState(() => new Date().getFullYear())

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await graphqlRequest(SUBSCRIBE_NEWSLETTER, { input: { email } })
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not complete your subscription. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
      <footer className="footer" id="contact">
        <div className="footer-brush" /><div className="footer-pattern" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand"><Image src="/images/logo.png" alt="Glory Children Ministry" width={195} height={112} /><p className="footer-motto">Hope · Education · Opportunity</p><p className="footer-intro">Together, we can help children feel safe, discover their potential and build brighter futures.</p></div>
          <div><h3>Quick Links</h3>{navItems.slice(0, 5).map(([label, href]) => <a href={href} key={label}>{label}</a>)}<Link  href="/privacy-policy">Privacy Policy</Link></div>
          <div><h3>Our Causes</h3>{causes.slice(0, 6).map(({ title }) => <a href="/our-causes" key={title}>{title}</a>)}</div>
          <div><h3>Contact Us</h3><a href="tel:+256755575982"><Phone size={15} /> +256 755 575 982</a><a  href="tel:+256767274915"><Phone size={15} /> +256 767 274 915</a><a href="mailto:info@glorychildrenministry.org"><Mail size={15} /> info@glorychildrenministry.org</a><span><MapPin size={15} /> Namusera, Hoima Rd, Kampala, Uganda</span></div>
          <div><h3>Follow Us</h3><SocialLinks /><p className="footer-tagline">Together We Can Make a Difference <Heart size={17} fill="currentColor" /></p></div>
        </div>
        <div className="container newsletter">
          <div>
            <p className="eyebrow">STAY CONNECTED</p>
            <h3>Subscribe to our newsletter</h3>
            <p>Receive occasional updates, stories and ways to support children.</p>
          </div>

          <form onSubmit={subscribe}>
            <input
              type="email"
              aria-label="Email address"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? 'Subscribing…' : <>Subscribe <ArrowRight size={16} /></>}
            </button>
            {error && <p className="footer-form-error" role="alert">{error}</p>}
          </form>
        </div>

        {subscribed && (
          <div
            className="site-success-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-success-title"
            onClick={() => setSubscribed(false)}
          >
            <div className="site-success-modal" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className="site-success-close"
                aria-label="Close"
                onClick={() => setSubscribed(false)}
              >
                <X size={20} />
              </button>
              <div className="site-success-icon"><CheckCircle2 size={42} /></div>
              <p className="site-success-eyebrow">SUBSCRIPTION CONFIRMED</p>
              <h3 id="newsletter-success-title">Thank you for subscribing!</h3>
              <p>
                You’re now on the Glory Children Ministry newsletter list. We’ll share occasional
                updates, stories and ways to support children.
              </p>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setSubscribed(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="container copyright">© {currentYear ?? ''} Glory Children Ministry. All Rights Reserved.</div>
      </footer>

  )
}

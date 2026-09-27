'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  AtSign,
  BookOpen,
  ChevronRight,
  ChevronUp,
  Facebook,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Phone,
  Sparkles,
  Stethoscope,
  Users,
  Utensils,
  X,
  Wrench,
  Youtube,
} from 'lucide-react'

const causes = [
  {
    title: 'Education',
    description: 'Quality learning for a brighter future.',
    icon: GraduationCap,
    tone: 'pink',
  },
  {
    title: 'Health',
    description: 'Medical care and wellness support.',
    icon: Stethoscope,
    tone: 'blue',
  },
  {
    title: 'Food',
    description: 'Nutritious meals for healthy growth.',
    icon: Utensils,
    tone: 'orange',
  },
  {
    title: 'Guidance & Counselling',
    description: 'Emotional support and life skills.',
    icon: Users,
    tone: 'purple',
  },
  {
    title: 'Shelter & Protection',
    description: 'A safe place to call home.',
    icon: Home,
    tone: 'red',
  },
  {
    title: 'Skills & Future',
    description: 'Vocational training and empowerment.',
    icon: Wrench,
    tone: 'teal',
  },
]

const counters = [
  { value: '1000+', label: 'Children Supported', icon: HeartHandshake, tone: 'pink' },
  { value: '200+', label: 'Enrolled in School', icon: BookOpen, tone: 'blue' },
  { value: '100+', label: 'Received Medical Care', icon: Heart, tone: 'orange' },
  { value: '12+', label: 'Districts Reached', icon: Sparkles, tone: 'green' },
]

const navItems = [
  ['Home', '#home'],
  ['About Us', '#about'],
  ['Our Causes', '#causes'],
  ['Get Involved', '#get-involved'],
  ['Gallery', '#gallery'],
  ['News & Updates', '#updates'],
  ['Contact Us', '#contact'],
] as const

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media links">
      <a className="social-whatsapp" href="#social-whatsapp" aria-label="WhatsApp">
        <MessageCircle size={15} />
      </a>
      <a className="social-instagram" href="#social-instagram" aria-label="Instagram">
        <Instagram size={15} />
      </a>
      <a className="social-facebook" href="#social-facebook" aria-label="Facebook">
        <Facebook size={15} />
      </a>
      <a className="social-threads" href="#social-threads" aria-label="Threads">
        <AtSign size={15} />
      </a>
      <a className="social-tiktok" href="#social-tiktok" aria-label="TikTok">
        <Music2 size={15} />
      </a>
      <a className="social-youtube" href="#social-youtube" aria-label="YouTube">
        <Youtube size={15} />
      </a>
    </div>
  )
}

function MobileBrand() {
  return (
    <span className="mobile-brand" aria-hidden="true">
      <span className="mobile-brand-icon">
        <Image src="/images/logo.png" alt="" fill sizes="42px" />
      </span>
      <span className="mobile-brand-name">
        <strong>Glory</strong>
        <span>Children Ministry</span>
      </span>
    </span>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 28
      setScrolled(isScrolled)
      setShowScrollTop(window.scrollY > 420)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id="home">
        <div className="utility-bar">
          <div className="utility-inner">
            <div className="utility-contact">
              <a href="tel:+256755575982">
                <Phone size={15} /> +256 755 575 982
              </a>
              <a href="mailto:info@glorychildrenministry.org">
                <Mail size={15} /> info@glorychildrenministry.org
              </a>
              <span>
                <MapPin size={15} /> Namusera, Hoima Rd, Kampala, Uganda
              </span>
            </div>
            <div className="follow">
              <span>Follow Us</span>
              <SocialLinks />
            </div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          <div className="nav-inner">
            <Link
              className="brand"
              href="#home"
              onClick={closeMenu}
              aria-label="Glory Children Ministry home"
            >
              <span className="brand-desktop">
                <Image
                  src="/images/logo.png"
                  alt="Glory Children Ministry"
                  width={160}
                  height={92}
                  priority
                />
              </span>
              <MobileBrand />
            </Link>

            <div className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
              {navItems.map(([label, href], index) => (
                <a
                  key={label}
                  className={index === 0 ? 'active' : ''}
                  href={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <a className="button button-primary small" href="#donate">
                <Heart size={16} fill="currentColor" /> Donate
              </a>
              <a className="button button-purple small" href="#volunteer">
                <Users size={16} fill="currentColor" /> Volunteer
              </a>
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

      <section className="hero">
        <div className="hero-pattern pattern-dots" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-image">
          <Image
            src="/images/hero-children.png"
            alt="Children smiling together outdoors"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-brush hero-brush-one" />
        <div className="hero-brush hero-brush-two" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow">TOGETHER FOR A BRIGHTER TOMORROW</p>
            <h1>
              Giving Every Child <span>Hope, Education</span> &amp; A{' '}
              <strong>Brighter Future</strong>
            </h1>
            <p className="hero-description">
              Glory Children Ministry is an NGO dedicated to caring for orphans and street
              children, providing them with education, healthcare, nutritious food, guidance,
              counselling and more.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#donate">
                <Heart size={18} fill="currentColor" /> Donate Now
              </a>
              <a className="button button-outline" href="#causes">
                <Users size={18} fill="currentColor" /> Join Our Causes
              </a>
              <a className="button button-purple" href="#volunteer">
                <Users size={18} fill="currentColor" /> Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-wrap" id="about">
        <div className="section-pattern section-pattern-purple" aria-hidden="true" />
        <div className="container counter-card">
          {counters.map(({ value, label, icon: Icon, tone }) => (
            <div className={`counter counter-${tone}`} key={label}>
              <div className="counter-icon">
                <Icon size={28} />
              </div>
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="container about-section">
          <div className="about-photo">
            <Image
              src="/images/about-children.png"
              alt="A child smiling at school"
              fill
              sizes="(max-width: 760px) 100vw, 44vw"
            />
            <div className="photo-badge">
              <Heart size={18} fill="currentColor" /> Every Child Matters
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow pink-text">ABOUT US</p>
            <h2>
              Building a future where <span>every child can shine.</span>
            </h2>
            <p>
              Glory Children Ministry exists to walk alongside vulnerable children with practical
              care, protection and opportunities that restore hope. We believe every child
              deserves to be safe, heard, educated and equipped to thrive.
            </p>
            <p>
              From classrooms and nutritious meals to healthcare, counselling and family support,
              we work with communities to create lasting change — one child at a time.
            </p>
            <a className="button button-primary" href="#about-more">
              View More About Us <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="causes-section" id="causes">
        <div className="cause-pattern" aria-hidden="true" />
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow pink-text">OUR CAUSES</p>
              <h2>
                Changing Lives, <span>One Child</span> at a Time
              </h2>
            </div>
            <p>
              We provide holistic support to help children grow, learn and build a better future.
              Here are some of the key areas we focus on:
            </p>
          </div>

          <div className="cause-grid">
            {causes.map(({ title, description, icon: Icon, tone }) => (
              <article className={`cause-card cause-${tone}`} key={title}>
                <div className="cause-top">
                  <Icon size={40} />
                </div>
                <div className="cause-body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`}>
                    Learn More <ChevronRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-section" id="impact">
        <div className="impact-image">
          <Image src="/images/about-children.png" alt="Children at school" fill sizes="360px" />
        </div>
        <div className="container impact-inner">
          <div className="impact-copy">
            <p className="eyebrow">OUR IMPACT</p>
            <h2>Together, we are creating lasting change</h2>
            <p>
              Every contribution helps us reach more children with practical care, protection,
              education and hope.
            </p>
          </div>
          <div className="impact-stats">
            {counters.map(({ value, label, icon: Icon, tone }) => (
              <div className={`impact-stat stat-${tone}`} key={label}>
                <Icon size={28} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="get-involved">
        <div className="container cta-card">
          <div>
            <p className="eyebrow pink-text">MAKE A DIFFERENCE</p>
            <h2>Your support can change a child&apos;s story.</h2>
            <p>Donate, volunteer, partner with us or join one of our causes.</p>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#donate">
              <Heart size={18} fill="currentColor" /> Donate Now
            </a>
            <a className="button button-purple" href="#volunteer">
              <Users size={18} fill="currentColor" /> Volunteer
            </a>
          </div>
        </div>
      </section>

      <section className="simple-section gallery-section" id="gallery">
        <div className="container">
          <p className="eyebrow pink-text">GALLERY</p>
          <h2>
            Moments of <span>Hope &amp; Joy</span>
          </h2>
          <div className="gallery-grid">
            <div className="gallery-tile tile-one">
              <Image
                src="/images/hero-children.png"
                alt="Children smiling"
                fill
                sizes="33vw"
              />
            </div>
            <div className="gallery-tile tile-two">
              <Image
                src="/images/about-children.png"
                alt="Children learning"
                fill
                sizes="33vw"
              />
            </div>
            <div className="gallery-tile tile-three">
              <Image
                src="/images/hero-children.png"
                alt="Children together"
                fill
                sizes="33vw"
              />
            </div>
          </div>
          <div className="section-button-row">
            <Link className="button button-purple" href="/gallery">
              View Full Gallery <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="simple-section updates" id="updates">
        <div className="updates-pattern" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow pink-text">NEWS &amp; UPDATES</p>
          <h2>
            Stories from <span>the work</span>
          </h2>
          <div className="story-grid">
            <article>
              <span>UPDATE</span>
              <h3>Creating safe spaces for vulnerable children</h3>
              <p>
                Share field stories, programme updates and milestones from Glory Children Ministry.
              </p>
              <a href="#read">
                Read Story <ArrowRight size={15} />
              </a>
            </article>
            <article>
              <span>STORY</span>
              <h3>Education opens doors to opportunity</h3>
              <p>
                Highlight the children, mentors and partners making learning possible.
              </p>
              <a href="#read">
                Read Story <ArrowRight size={15} />
              </a>
            </article>
            <article>
              <span>IMPACT</span>
              <h3>Community support that reaches further</h3>
              <p>
                Show how donors and volunteers contribute to lasting change.
              </p>
              <a href="#read">
                Read Story <ArrowRight size={15} />
              </a>
            </article>
          </div>
          <div className="section-button-row">
            <Link className="button button-primary" href="/news-updates">
              View All News &amp; Updates <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-brush" />
        <div className="footer-pattern" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand">
            <Image src="/images/logo.png" alt="Glory Children Ministry" width={175} height={100} />
            <p className="footer-motto">Hope · Education · Opportunity</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            {navItems.slice(0, 6).map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
            <Link className="privacy-link" href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>

          <div>
            <h3>Our Causes</h3>
            {causes.slice(0, 6).map(({ title }) => (
              <a href="#causes" key={title}>
                {title}
              </a>
            ))}
          </div>

          <div>
            <h3>Contact Us</h3>
            <a href="tel:+256755575982">
              <Phone size={14} /> +256 755 575 982
            </a>
            <a href="mailto:info@glorychildrenministry.org">
              <Mail size={14} /> info@glorychildrenministry.org
            </a>
            <span>
              <MapPin size={14} /> Namusera, Hoima Rd, Kampala, Uganda
            </span>
          </div>

          <div>
            <h3>Follow Us</h3>
            <SocialLinks />
            <p className="footer-tagline">
              Together We Can Make a Difference <Heart size={16} fill="currentColor" />
            </p>
          </div>
        </div>
        <div className="container copyright">
          © 2025 Glory Children Ministry. All Rights Reserved.
        </div>
      </footer>

      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <span className="scroll-top-ring" aria-hidden="true" />
        <ChevronUp size={21} strokeWidth={2.7} />
      </button>
    </main>
  )
}

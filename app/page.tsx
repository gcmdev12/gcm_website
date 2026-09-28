'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowLeft,
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
  Play,
  Quote,
  Sparkles,
  Stethoscope,
  Target,
  Users,
  Utensils,
  X,
  Wrench,
  Youtube,
} from 'lucide-react'

const causes = [
  { title: 'Education', description: 'Quality learning for a brighter future.', icon: GraduationCap, tone: 'pink' },
  { title: 'Health', description: 'Medical care and wellness support.', icon: Stethoscope, tone: 'blue' },
  { title: 'Food', description: 'Nutritious meals for healthy growth.', icon: Utensils, tone: 'orange' },
  { title: 'Guidance & Counselling', description: 'Emotional support and life skills.', icon: Users, tone: 'purple' },
  { title: 'Shelter & Protection', description: 'A safe place to call home.', icon: Home, tone: 'red' },
  { title: 'Skills & Future', description: 'Vocational training and empowerment.', icon: Wrench, tone: 'teal' },
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
  ['Gallery', '#gallery'],
  ['News & Updates', '#updates'],
  ['Contact Us', '#contact'],
] as const

const heroSlides = [
  {
    image: '/images/4.png',
    eyebrow: 'TOGETHER FOR A BRIGHTER TOMORROW',
    title: <>Giving Every Child <span>Hope, Education</span> &amp; A <strong>Brighter Future</strong></>,
    description: 'Glory Children Ministry is an NGO dedicated to caring for vulnerable children through education, healthcare, nutritious food, guidance, counselling and opportunity.',
  },
  {
    image: '/images/hero-children.png',
    eyebrow: 'EVERY CHILD DESERVES A CHANCE',
    title: <>Nurturing <span>Hope</span>, Building <strong>Possibility</strong></>,
    description: 'We create safe, caring spaces where children can learn, grow in confidence and discover pathways toward a brighter future.',
  },
  {
    image: '/images/about-children.png',
    eyebrow: 'YOUR KINDNESS CREATES CHANGE',
    title: <>Together We Can <span>Change</span> A Child&apos;s <strong>Story</strong></>,
    description: 'Your support helps us reach children with practical care, protection, education and the encouragement they need to thrive.',
  },
]

const galleryItems = [
  { src: '/images/hero-children.png', alt: 'Children smiling together', title: 'Moments of Joy' },
  { src: '/images/about-children.png', alt: 'Children learning together', title: 'Learning Together' },
  { src: '/images/4.png', alt: 'Children outdoors', title: 'Growing With Hope' },
]

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media links">
      <a className="social-whatsapp" href="#social-whatsapp" aria-label="WhatsApp"><MessageCircle size={18} /></a>
      <a className="social-instagram" href="#social-instagram" aria-label="Instagram"><Instagram size={18} /></a>
      <a className="social-facebook" href="#social-facebook" aria-label="Facebook"><Facebook size={18} /></a>
      <a className="social-threads" href="#social-threads" aria-label="Threads"><AtSign size={18} /></a>
      <a className="social-tiktok" href="#social-tiktok" aria-label="TikTok"><Music2 size={18} /></a>
      <a className="social-youtube" href="#social-youtube" aria-label="YouTube"><Youtube size={18} /></a>
    </div>
  )
}

function MobileBrand() {
  return (
    <span className="mobile-brand" aria-hidden="true">
      <span className="mobile-brand-icon"><Image src="/favicon-512.png" alt="" fill sizes="52px" /></span>
      <span className="mobile-brand-name"><strong>Glory</strong><span>Children Ministry</span></span>
    </span>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    const updateScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(scrollY > 28)
      setShowScrollTop(scrollY > (window.innerWidth <= 760 ? 180 : 420))
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') setLightbox((value) => value === null ? null : (value + 1) % galleryItems.length)
      if (event.key === 'ArrowLeft') setLightbox((value) => value === null ? null : (value - 1 + galleryItems.length) % galleryItems.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const closeMenu = () => setMenuOpen(false)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }
  const slide = heroSlides[activeSlide]

  return (
    <main>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id="home">
        <div className="utility-bar">
          <div className="utility-inner">
            <div className="utility-contact">
              <a href="tel:+256755575982"><Phone size={15} /> +256 755 575 982</a>
              <a href="tel:+256767274915"><Phone size={15} /> MTN +256 767 274 915</a>
              <a href="mailto:info@glorychildrenministry.org"><Mail size={15} /> info@glorychildrenministry.org</a>
              <span><MapPin size={15} /> Namusera, Hoima Rd, Kampala, Uganda</span>
            </div>
            <div className="follow"><span>Follow Us</span><SocialLinks /></div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          <div className="nav-inner">
            <Link className="brand" href="#home" onClick={closeMenu} aria-label="Glory Children Ministry home">
              <span className="brand-desktop"><Image src="/images/logo.png" alt="Glory Children Ministry" width={160} height={92} priority /></span>
              <MobileBrand />
            </Link>
            <div className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
              {navItems.map(([label, href], index) => <a key={label} className={index === 0 ? 'active' : ''} href={href} onClick={closeMenu}>{label}</a>)}
            </div>
            <a className="nav-mtn" href="tel:+256767274915"><span>MTN</span> +256 767 274 915</a>
            <div className="nav-actions">
              <a className="button button-primary small" href="#donate"><Heart size={16} fill="currentColor" /> Donate</a>
              <a className="button button-purple small" href="#volunteer"><Users size={16} fill="currentColor" /> Volunteer</a>
            </div>
            <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={29} /> : <Menu size={30} />}</button>
          </div>
        </nav>
      </header>

      <section className="hero hero-carousel" aria-label="Glory Children Ministry highlights">
        <div className="hero-pattern pattern-dots" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        {heroSlides.map((item, index) => (
          <div className={`hero-slide-image ${index === activeSlide ? 'is-active' : ''}`} key={item.image} aria-hidden={index !== activeSlide}>
            <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 58vw" priority={index === 0} />
          </div>
        ))}
        <div className="hero-shade" />
        <div className="hero-brush hero-brush-one" />
        <div className="hero-brush hero-brush-two" />
        <div className="container hero-content">
          <div className="hero-copy" key={activeSlide}>
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#donate"><Heart size={18} fill="currentColor" /> Donate Now</a>
              <a className="button button-outline" href="#causes"><Users size={18} fill="currentColor" /> Join Our Causes</a>
              <a className="button button-purple" href="#volunteer"><Users size={18} fill="currentColor" /> Volunteer</a>
            </div>
          </div>
        </div>
        <div className="hero-controls">
          <button type="button" aria-label="Previous slide" onClick={() => setActiveSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}><ArrowLeft size={17} /></button>
          <div className="hero-dots">{heroSlides.map((_, index) => <button key={index} type="button" className={index === activeSlide ? 'active' : ''} aria-label={`Go to slide ${index + 1}`} onClick={() => setActiveSlide(index)} />)}</div>
          <button type="button" aria-label="Next slide" onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)}><ArrowRight size={17} /></button>
        </div>
        <div className="hero-progress" key={activeSlide} />
      </section>

      <section className="about-wrap" id="about">
        <div className="section-pattern section-pattern-purple" aria-hidden="true" />
        <div className="container counter-card">
          {counters.map(({ value, label, icon: Icon, tone }) => <div className={`counter counter-${tone}`} key={label}><div className="counter-icon"><Icon size={28} /></div><div><strong>{value}</strong><span>{label}</span></div></div>)}
        </div>
        <div className="container about-section">
          <div className="about-photo">
            <Image src="/images/2.jpg" alt="A child smiling at school" fill sizes="(max-width: 760px) 100vw, 44vw" />
            <div className="photo-badge"><Heart size={18} fill="currentColor" /><span>Since 2019</span><b>Every child matters</b></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow pink-text">ABOUT US</p>
            <h2>Building a future where <span>every child can shine.</span></h2>
            <p>Glory Children Ministry exists to walk alongside vulnerable children with practical care, protection and opportunities that restore hope. We believe every child deserves to be safe, heard, educated and equipped to thrive.</p>
            <p>From classrooms and nutritious meals to healthcare, counselling and family support, we work with communities to create lasting change — one child at a time.</p>
            <a className="button button-primary" href="#about-more">View More About Us <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="scripture-section" aria-label="Bible verses encouraging generosity">
        <div className="scripture-pattern pattern-one" aria-hidden="true" /><div className="scripture-pattern pattern-two" aria-hidden="true" />
        <div className="container">
          <div className="section-heading scripture-heading"><div><p className="eyebrow pink-text">A HEART FOR GIVING</p><h2>When we give, <span>hope grows.</span></h2></div><p>Small acts of generosity can become meaningful opportunities for children to learn, heal and flourish.</p></div>
          <div className="scripture-grid">
            <article className="scripture-card scripture-pink"><span className="quote-icon"><Quote size={25} /></span><p>“Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.”</p><strong>Proverbs 19:17</strong><a href="#donate">Give with compassion <ArrowRight size={15} /></a></article>
            <article className="scripture-card scripture-purple"><span className="quote-icon"><Quote size={25} /></span><p>“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”</p><strong>2 Corinthians 9:7</strong><a href="#donate">Help a child thrive <ArrowRight size={15} /></a></article>
          </div>
        </div>
      </section>

      <section className="causes-section" id="causes">
        <div className="cause-pattern" aria-hidden="true" />
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow pink-text">OUR CAUSES</p><h2>Changing Lives, <span>One Child</span> at a Time</h2></div><p>We provide holistic support to help children grow, learn and build a better future. Here are some of the key areas we focus on:</p></div>
          <div className="cause-grid">{causes.map(({ title, description, icon: Icon, tone }) => <article className={`cause-card cause-${tone}`} key={title}><div className="cause-top"><Icon size={40} /></div><div className="cause-body"><h3>{title}</h3><p>{description}</p><a href={`#${title.toLowerCase().replaceAll(' ', '-')}`}>Learn More <ChevronRight size={15} /></a></div></article>)}</div>
        </div>
      </section>

      <section className="values-section" id="about-more">
        <div className="values-glow" aria-hidden="true" />
        <div className="container">
          <div className="section-heading values-heading"><div><p className="eyebrow pink-text">WHO WE ARE</p><h2>Our <span>Vision, Mission</span> &amp; Core Values</h2></div><p>Everything we do is guided by a simple belief: every child matters, and every child deserves a meaningful opportunity to flourish.</p></div>
          <div className="values-grid">
            <article className="value-card vision-card"><div className="value-icon"><Sparkles size={25} /></div><p>OUR VISION</p><h3>A future where every child is safe, valued and empowered to reach their full potential.</h3><span>Hope that becomes possibility.</span></article>
            <article className="value-card mission-card"><div className="value-icon"><Target size={25} /></div><p>OUR MISSION</p><h3>To protect, nurture and equip vulnerable children through practical care, education, health and community support.</h3><span>One child. One opportunity. One brighter future.</span></article>
            <article className="value-card values-card"><div className="value-icon"><HeartHandshake size={25} /></div><p>OUR CORE VALUES</p><div className="value-list"><span>♥ Compassion</span><span>♥ Integrity</span><span>♥ Dignity</span><span>♥ Excellence</span><span>♥ Community</span><span>♥ Hope</span></div></article>
          </div>
        </div>
      </section>

      <section className="impact-section" id="impact">
        <div className="impact-image"><Image src="/images/about-children.png" alt="Children at school" fill sizes="360px" /></div>
        <div className="container impact-inner"><div className="impact-copy"><p className="eyebrow">OUR IMPACT</p><h2>Together, we are creating lasting change</h2><p>Every contribution helps us reach more children with practical care, protection, education and hope.</p></div><div className="impact-stats">{counters.map(({ value, label, icon: Icon, tone }) => <div className={`impact-stat stat-${tone}`} key={label}><Icon size={28} /><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      </section>

      <section className="cta-section" id="support"><div className="container cta-card"><div><p className="eyebrow pink-text">MAKE A DIFFERENCE</p><h2>Your support can change a child&apos;s story.</h2><p>Donate, volunteer, partner with us or support one of our causes.</p></div><div className="hero-actions"><a className="button button-primary" href="#donate"><Heart size={18} fill="currentColor" /> Donate Now</a><a className="button button-purple" href="#volunteer"><Users size={18} fill="currentColor" /> Volunteer</a></div></div></section>

      <section className="simple-section gallery-section" id="gallery">
        <div className="container"><p className="eyebrow pink-text">GALLERY</p><h2>Moments of <span>Hope &amp; Joy</span></h2><p className="section-lead">Take a closer look at the people, moments and smiles behind the work.</p>
          <div className="gallery-grid">{galleryItems.map((item, index) => <button className={`gallery-tile tile-${index + 1}`} key={item.src} type="button" onClick={() => setLightbox(index)} aria-label={`Open ${item.title}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 33vw" /><span className="gallery-overlay"><strong>{item.title}</strong><span><Play size={13} fill="currentColor" /> View photo</span></span></button>)}</div>
          <div className="section-button-row"><Link className="button button-purple" href="/gallery">View Full Gallery <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="simple-section updates" id="updates"><div className="updates-pattern" aria-hidden="true" /><div className="container"><p className="eyebrow pink-text">NEWS &amp; UPDATES</p><h2>Stories from <span>the work</span></h2><div className="story-grid"><article><span>UPDATE</span><h3>Creating safe spaces for vulnerable children</h3><p>Share field stories, programme updates and milestones from Glory Children Ministry.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article><article><span>STORY</span><h3>Education opens doors to opportunity</h3><p>Highlight the children, mentors and partners making learning possible.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article><article><span>IMPACT</span><h3>Community support that reaches further</h3><p>Show how donors and volunteers contribute to lasting change.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article></div><div className="section-button-row"><Link className="button button-primary" href="/news-updates">View All News &amp; Updates <ArrowRight size={17} /></Link></div></div></section>

      <footer className="footer" id="contact">
        <div className="footer-brush" /><div className="footer-pattern" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand"><Image src="/images/logo.png" alt="Glory Children Ministry" width={195} height={112} /><p className="footer-motto">Hope · Education · Opportunity</p><p className="footer-intro">Together, we can help children feel safe, discover their potential and build brighter futures.</p></div>
          <div><h3>Quick Links</h3>{navItems.slice(0, 5).map(([label, href]) => <a href={href} key={label}>{label}</a>)}<Link className="privacy-link" href="/privacy-policy">Privacy Policy</Link></div>
          <div><h3>Our Causes</h3>{causes.slice(0, 6).map(({ title }) => <a href="#causes" key={title}>{title}</a>)}</div>
          <div><h3>Contact Us</h3><a href="tel:+256755575982"><Phone size={15} /> +256 755 575 982</a><a className="mtn-contact" href="tel:+256767274915"><Phone size={15} /> MTN +256 767 274 915</a><a href="mailto:info@glorychildrenministry.org"><Mail size={15} /> info@glorychildrenministry.org</a><span><MapPin size={15} /> Namusera, Hoima Rd, Kampala, Uganda</span></div>
          <div><h3>Follow Us</h3><SocialLinks /><p className="footer-tagline">Together We Can Make a Difference <Heart size={17} fill="currentColor" /></p></div>
        </div>
        <div className="container newsletter"><div><p className="eyebrow">STAY CONNECTED</p><h3>Subscribe to our newsletter</h3><p>Receive occasional updates, stories and ways to support children.</p></div><form onSubmit={subscribe}>{subscribed ? <strong className="subscribed">Thank you for subscribing! ♥</strong> : <><input type="email" aria-label="Email address" placeholder="Your email address" required /><button className="button button-primary" type="submit">Subscribe <ArrowRight size={16} /></button></>}</form></div>
        <div className="container copyright">© {currentYear ?? ''} Glory Children Ministry. All Rights Reserved.</div>
      </footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={() => setLightbox(null)}><button type="button" className="lightbox-close" aria-label="Close gallery" onClick={() => setLightbox(null)}><X size={25} /></button><button type="button" className="lightbox-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length) }}><ArrowLeft /></button><div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={galleryItems[lightbox].src} alt={galleryItems[lightbox].alt} fill sizes="90vw" /></div><button type="button" className="lightbox-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % galleryItems.length) }}><ArrowRight /></button></div>}

      <button className={`scroll-top ${showScrollTop ? 'visible' : ''}`} type="button" onClick={scrollToTop} aria-label="Scroll back to top" title="Back to top"><span className="scroll-top-ring" aria-hidden="true" /><ChevronUp size={21} strokeWidth={2.7} /></button>
    </main>
  )
}

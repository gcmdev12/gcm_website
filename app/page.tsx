'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Play,
  Quote,
  Sparkles,
  Stethoscope,
  Target,
  Users,
  Utensils,
  X,
  Wrench,
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

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [youtubeOpen, setYoutubeOpen] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!youtubeOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setYoutubeOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [youtubeOpen])

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
  const slide = heroSlides[activeSlide]

  return (
    <main>
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
        <div className="hero-corner-marks" aria-hidden="true">
          <span className="hero-mark hero-mark-pink" />
          <span className="hero-mark hero-mark-orange" />
          <span className="hero-mark hero-mark-blue" />
          <span className="hero-mark hero-mark-purple" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy" key={activeSlide}>
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/donate"><Heart size={18} fill="currentColor" /> Donate Now</a>
              <a className="button button-outline" href="/our-causes"><Users size={18} fill="currentColor" /> Join Our Causes</a>
              <a className="button button-purple" href="/volunteer"><Users size={18} fill="currentColor" /> Volunteer</a>
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
            <div className="about-action-row">
              <button
                type="button"
                className="about-video-button"
                onClick={() => setYoutubeOpen(true)}
                aria-label="Watch our story on YouTube"
                title="Watch our story"
              >
                <Play size={21} fill="currentColor" />
                <span className="about-video-pulse" aria-hidden="true" />
              </button>

              <a className="button button-primary" href="/about-us">
                View More About Us
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="scripture-section" aria-label="Bible verses encouraging generosity">
        <div className="scripture-pattern pattern-one" aria-hidden="true" /><div className="scripture-pattern pattern-two" aria-hidden="true" />
        <div className="container">
          <div className="section-heading scripture-heading"><div><p className="eyebrow pink-text">A HEART FOR GIVING</p><h2>When we give, <span>hope grows.</span></h2></div><p>Small acts of generosity can become meaningful opportunities for children to learn, heal and flourish.</p></div>
          <div className="scripture-grid">
            <article className="scripture-card scripture-pink"><span className="quote-icon"><Quote size={25} /></span><p>“Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.”</p><strong>Proverbs 19:17</strong><a href="/donate">Give with compassion <ArrowRight size={15} /></a></article>
            <article className="scripture-card scripture-purple"><span className="quote-icon"><Quote size={25} /></span><p>“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”</p><strong>2 Corinthians 9:7</strong><a href="/donate">Help a child thrive <ArrowRight size={15} /></a></article>
          </div>
        </div>
      </section>

      <section className="causes-section" id="causes">
        <div className="cause-pattern" aria-hidden="true" />
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow pink-text">OUR CAUSES</p><h2>Changing Lives, <span>One Child</span> at a Time</h2></div><p>We provide holistic support to help children grow, learn and build a better future. Here are some of the key areas we focus on:</p></div>
          <div className="cause-grid">{causes.map(({ title, description, icon: Icon, tone }) => <article className={`cause-card cause-${tone}`} key={title}><div className="cause-top"><Icon size={40} /></div><div className="cause-body"><h3>{title}</h3><p>{description}</p><a href={`/our-causes#${title.toLowerCase().replaceAll(' ', '-')}`}>Learn More <ChevronRight size={15} /></a></div></article>)}</div>
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

      <section className="cta-section" id="support"><div className="container cta-card"><div><p className="eyebrow pink-text">MAKE A DIFFERENCE</p><h2>Your support can change a child&apos;s story.</h2><p>Donate, volunteer, partner with us or support one of our causes.</p></div><div className="hero-actions"><a className="button button-primary" href="/donate"><Heart size={18} fill="currentColor" /> Donate Now</a><a className="button button-purple" href="#volunteer"><Users size={18} fill="currentColor" /> Volunteer</a></div></div></section>

      <section className="simple-section gallery-section" id="gallery">
        <div className="container"><p className="eyebrow pink-text">GALLERY</p><h2>Moments of <span>Hope &amp; Joy</span></h2><p className="section-lead">Take a closer look at the people, moments and smiles behind the work.</p>
          <div className="gallery-grid">{galleryItems.map((item, index) => <button className={`gallery-tile tile-${index + 1}`} key={item.src} type="button" onClick={() => setLightbox(index)} aria-label={`Open ${item.title}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 33vw" /><span className="gallery-overlay"><strong>{item.title}</strong><span><Play size={13} fill="currentColor" /> View photo</span></span></button>)}</div>
          <div className="section-button-row"><Link className="button button-purple" href="/gallery">View Full Gallery <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="simple-section updates" id="updates"><div className="updates-pattern" aria-hidden="true" /><div className="container"><p className="eyebrow pink-text">NEWS &amp; UPDATES</p><h2>Stories from <span>the work</span></h2><div className="story-grid"><article><span>UPDATE</span><h3>Creating safe spaces for vulnerable children</h3><p>Share field stories, programme updates and milestones from Glory Children Ministry.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article><article><span>STORY</span><h3>Education opens doors to opportunity</h3><p>Highlight the children, mentors and partners making learning possible.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article><article><span>IMPACT</span><h3>Community support that reaches further</h3><p>Show how donors and volunteers contribute to lasting change.</p><a href="#read">Read Story <ArrowRight size={15} /></a></article></div><div className="section-button-row"><Link className="button button-primary" href="/updates">View All News &amp; Updates <ArrowRight size={17} /></Link></div></div></section>

      {youtubeOpen && (
        <div
          className="youtube-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Glory Children Ministry video"
          onClick={() => setYoutubeOpen(false)}
        >
          <div
            className="youtube-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="youtube-modal-close"
              onClick={() => setYoutubeOpen(false)}
              aria-label="Close video"
            >
              <X size={24} />
            </button>

            <div className="youtube-video-wrap">
              <iframe
                src="https://www.youtube.com/shorts/-swBjtaHw90?autoplay=1&rel=0"
                title="Glory Children Ministry video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={() => setLightbox(null)}><button type="button" className="lightbox-close" aria-label="Close gallery" onClick={() => setLightbox(null)}><X size={25} /></button><button type="button" className="lightbox-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length) }}><ArrowLeft /></button><div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={galleryItems[lightbox].src} alt={galleryItems[lightbox].alt} fill sizes="90vw" /></div><button type="button" className="lightbox-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % galleryItems.length) }}><ArrowRight /></button></div>}

    </main>
  )
}

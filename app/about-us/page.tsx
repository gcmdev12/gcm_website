"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Trees,
  Users,
  Utensils,
} from "lucide-react"

const impactStats = [
  { value: 2019, label: "Established", icon: Sparkles, suffix: "", tone: "pink" },
  { value: 100, label: "Children reached", icon: Users, suffix: "+", tone: "purple" },
  { value: 5, label: "Areas of support", icon: HandHeart, suffix: "", tone: "blue" },
  { value: 1, label: "Growing vision", icon: Heart, suffix: "", tone: "orange" },
]

const values = [
  {
    number: "01",
    title: "Compassion",
    text: "We respond to children and families with care, empathy and practical support.",
  },
  {
    number: "02",
    title: "Integrity",
    text: "We value honesty, accountability and responsible stewardship in the work entrusted to us.",
  },
  {
    number: "03",
    title: "Dignity",
    text: "Every child is treated with respect, protected from harm and encouraged to flourish.",
  },
  {
    number: "04",
    title: "Excellence",
    text: "We continually seek better ways to serve children and strengthen the quality of our work.",
  },
  {
    number: "05",
    title: "Community",
    text: "We believe lasting change grows through families, communities, partners and shared responsibility.",
  },
  {
    number: "06",
    title: "Hope",
    text: "We help children look beyond present circumstances toward opportunity and a brighter future.",
  },
]

const futureProspects = [
  {
    year: "01",
    title: "Secure land",
    text: "Acquire suitable land that gives the ministry a stable foundation for long-term programmes and facilities.",
    icon: MapPin,
    tone: "pink",
  },
  {
    year: "02",
    title: "Children's care centre & home",
    text: "Develop a safe, nurturing care centre and home where vulnerable children can receive consistent support.",
    icon: Home,
    tone: "purple",
  },
  {
    year: "03",
    title: "Grow food sustainably",
    text: "Establish farmland to grow food, strengthen food security and create practical learning opportunities.",
    icon: Leaf,
    tone: "green",
  },
  {
    year: "04",
    title: "Build a school",
    text: "Create an accessible learning environment designed around the educational needs and potential of the children we serve.",
    icon: GraduationCap,
    tone: "blue",
  },
  {
    year: "05",
    title: "Reach 1 million+ children",
    text: "Grow partnerships, programmes and systems capable of supporting more than one million children across Uganda.",
    icon: Trees,
    tone: "orange",
  },
]

export default function AboutUsPage() {
  const [counts, setCounts] = useState(impactStats.map(() => 0))

  useEffect(() => {
    const duration = 1200
    const start = performance.now()
    let frame = 0

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCounts(
        impactStats.map((item) =>
          Math.round(item.value * eased),
        ),
      )

      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-orb about-orb-one" aria-hidden="true" />
        <div className="about-hero-orb about-orb-two" aria-hidden="true" />
        <div className="about-hero-dots" aria-hidden="true" />

        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <div className="about-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </div>

            <p className="eyebrow about-hero-eyebrow">
              <ShieldCheck size={15} />
              WHO WE ARE
            </p>

            <h1>
              Building a future where
              <span> every child matters.</span>
            </h1>

            <p className="about-hero-lead">
              Glory Children Ministry is an established and legally registered
              children-supporting ministry committed to protecting, nurturing
              and creating opportunity for vulnerable children in Uganda.
            </p>

            <div className="about-hero-actions">
              <a className="button button-primary" href="#who-we-are">
                Discover Our Story <ArrowRight size={18} />
              </a>
              <Link className="button about-hero-outline" href="/contact">
                Partner With Us <Users size={18} />
              </Link>
            </div>

            <div className="trust-row">
              <div className="trust-icon">
                <BadgeCheck size={22} />
              </div>
              <div>
                <strong>Registered & established</strong>
                <span>A children-supporting ministry built for long-term impact.</span>
              </div>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-hero-image">
              <Image
                src="/images/about-children.png"
                alt="Children supported through education and community care"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 48vw"
              />
              <div className="about-image-shade" />
              <div className="about-image-label">
                <span>Since</span>
                <strong>2019</strong>
                <small>Every child matters.</small>
              </div>
            </div>

            <div className="hero-mini-card hero-mini-card-one">
              <Heart size={18} fill="currentColor" />
              <div>
                <strong>Hope</strong>
                <span>with action</span>
              </div>
            </div>

            <div className="hero-mini-card hero-mini-card-two">
              <GraduationCap size={18} />
              <div>
                <strong>Education</strong>
                <span>opens doors</span>
              </div>
            </div>

            <div className="hero-ring" aria-hidden="true" />
          </div>
        </div>

        <div className="about-hero-bottom" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-grid">
          <div className="trust-badge-large">
            <div className="trust-badge-icon">
              <BadgeCheck size={27} />
            </div>
            <div>
              <strong>Built on trust</strong>
              <span>Registered · Established · Child-focused</span>
            </div>
          </div>

          <div className="trust-copy">
            <p>
              For a donor, trust matters. We are committed to operating as a
              transparent, accountable and established ministry focused on
              children and the communities around them.
            </p>
          </div>

          <div className="trust-points">
            <span><CheckCircle2 size={16} /> Child-centred</span>
            <span><CheckCircle2 size={16} /> Community-rooted</span>
            <span><CheckCircle2 size={16} /> Long-term focused</span>
          </div>
        </div>
      </section>

      <section className="who-section" id="who-we-are">
        <div className="who-pattern" aria-hidden="true" />
        <div className="container who-grid">
          <div className="who-image-wrap">
            <div className="who-image">
              <Image
                src="/images/hero-children.png"
                alt="Children smiling together"
                fill
                sizes="(max-width: 850px) 90vw, 45vw"
              />
            </div>
            <div className="who-stamp">
              <Sparkles size={18} />
              <strong>Every child</strong>
              <span>has potential</span>
            </div>
          </div>

          <div className="who-copy">
            <p className="eyebrow pink-text">WHO WE ARE</p>
            <h2>
              We turn
              <span> compassion into opportunity.</span>
            </h2>
            <p>
              Glory Children Ministry exists to stand alongside vulnerable
              children and communities with practical care, protection,
              education, encouragement and opportunity.
            </p>
            <p>
              We believe supporting a child means looking beyond one immediate
              need. It means helping create an environment where children can
              learn, grow safely, discover their abilities and build a future
              with dignity.
            </p>

            <div className="who-highlight">
              <div className="who-highlight-icon"><Heart size={19} fill="currentColor" /></div>
              <div>
                <strong>Our belief is simple.</strong>
                <span>Every child matters, and every child deserves a meaningful opportunity to flourish.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="purpose-section" id="purpose">
        <div className="container">
          <div className="purpose-heading">
            <div>
              <p className="eyebrow purple-text">OUR PURPOSE</p>
              <h2>One purpose. <span>A clear direction.</span></h2>
            </div>
            <p>
              Our work is shaped by a clear vision, a practical mission and
              values that guide how we serve children, families and partners.
            </p>
          </div>

          <div className="purpose-cards">
            <article className="purpose-card purpose-vision">
              <div className="purpose-card-top">
                <div className="purpose-icon"><Sparkles size={24} /></div>
                <span>01</span>
              </div>
              <p>OUR VISION</p>
              <h3>A future where every child is safe, valued and empowered to reach their full potential.</h3>
              <div className="purpose-card-line" />
              <span className="purpose-tag">Hope that becomes possibility.</span>
            </article>

            <article className="purpose-card purpose-mission">
              <div className="purpose-card-top">
                <div className="purpose-icon"><Target size={24} /></div>
                <span>02</span>
              </div>
              <p>OUR MISSION</p>
              <h3>To protect, nurture and equip vulnerable children through practical care, education, health and community support.</h3>
              <div className="purpose-card-line" />
              <span className="purpose-tag">One child. One opportunity. One brighter future.</span>
            </article>

            <article className="purpose-card purpose-purpose">
              <div className="purpose-card-top">
                <div className="purpose-icon"><HandHeart size={24} /></div>
                <span>03</span>
              </div>
              <p>OUR PURPOSE</p>
              <h3>To create practical pathways through which children can experience safety, care, learning, dignity and opportunity.</h3>
              <div className="purpose-card-line" />
              <span className="purpose-tag">Compassion with a long-term view.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="values-section" id="values">
        <div className="container">
          <div className="values-heading">
            <div>
              <p className="eyebrow orange-text">WHAT GUIDES US</p>
              <h2>Our core <span>values.</span></h2>
            </div>
            <p>
              Values are not just words on a page. They shape how we relate to
              children, communities, partners and the resources entrusted to
              the ministry.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <article className="core-value" key={value.number}>
                <span className="core-number">{value.number}</span>
                <div className="core-icon">
                  {value.title === "Compassion" && <Heart size={20} />}
                  {value.title === "Integrity" && <ShieldCheck size={20} />}
                  {value.title === "Dignity" && <Users size={20} />}
                  {value.title === "Excellence" && <Sparkles size={20} />}
                  {value.title === "Community" && <Building2 size={20} />}
                  {value.title === "Hope" && <Target size={20} />}
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-section" id="impact">
        <div className="impact-image-panel">
          <Image
            src="/images/4.png"
            alt="Children together in community"
            fill
            sizes="(max-width: 900px) 100vw, 38vw"
          />
          <div className="impact-image-overlay" />
          <div className="impact-image-caption">
            <span>IMPACT</span>
            <strong>Growing change, one child at a time.</strong>
          </div>
        </div>

        <div className="container impact-content">
          <div className="impact-copy">
            <p className="eyebrow pink-text">OUR IMPACT</p>
            <h2>
              From caring for children today to
              <span> changing possibilities tomorrow.</span>
            </h2>
            <p>
              Our impact is about more than numbers. It is about creating
              practical opportunities for children to be safe, learn, belong
              and imagine a future beyond their current circumstances.
            </p>
            <div className="impact-note">
              <span><Heart size={16} fill="currentColor" /></span>
              <p>Every contribution helps move the work forward.</p>
            </div>
          </div>

          <div className="impact-stats">
            {impactStats.map((item, index) => {
              const Icon = item.icon
              return (
                <article className={`impact-stat impact-stat-${item.tone}`} key={item.label}>
                  <div className="impact-stat-icon"><Icon size={22} /></div>
                  <strong>
                    {counts[index]}
                    {item.suffix}
                  </strong>
                  <span>{item.label}</span>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="future-section" id="future">
        <div className="future-glow" aria-hidden="true" />
        <div className="container">
          <div className="future-heading">
            <div>
              <p className="eyebrow pink-text">OUR FUTURE PROSPECTS</p>
              <h2>
                Dreaming bigger.
                <span> Building for generations.</span>
              </h2>
            </div>
            <p>
              Our long-term vision is to build sustainable infrastructure and
              partnerships that can expand the depth and reach of our support
              for children across Uganda.
            </p>
          </div>

          <div className="future-roadmap">
            {futureProspects.map((item, index) => {
              const Icon = item.icon
              return (
                <article className={`future-card future-${item.tone}`} key={item.title}>
                  <div className="future-number">{item.year}</div>
                  <div className="future-icon"><Icon size={24} /></div>
                  <div className="future-card-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  {index < futureProspects.length - 1 && <span className="future-connector" aria-hidden="true" />}
                </article>
              )
            })}
          </div>

          <div className="million-banner">
            <div className="million-icon">
              <Users size={29} />
            </div>
            <div>
              <span>THE BIGGER VISION</span>
              <strong>Supporting over 1 million children across Uganda.</strong>
            </div>
            <p>
              A long-term ambition that depends on sustainable growth,
              strong partnerships, responsible stewardship and many people
              choosing to take part.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-pattern" aria-hidden="true" />
        <div className="about-cta-circle cta-circle-one" aria-hidden="true" />
        <div className="about-cta-circle cta-circle-two" aria-hidden="true" />

        <div className="container about-cta-inner">
          <div>
            <p className="eyebrow pink-text">JOIN THE JOURNEY</p>
            <h2>
              A bigger vision begins with
              <span> one more person saying yes.</span>
            </h2>
            <p>
              Support the work through giving, volunteering, partnership or
              simply helping more people discover the mission.
            </p>
          </div>

          <div className="about-cta-actions">
            <Link className="button button-primary" href="/donate">
              <Heart size={18} fill="currentColor" />
              Donate Now
            </Link>
            <Link className="button button-purple" href="/contact">
              <Users size={18} />
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

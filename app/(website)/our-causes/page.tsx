'use client'

import { useEffect, useState } from 'react'
import { graphqlRequest, PUBLIC_CAUSES_QUERY } from '../../../lib/api'

import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Heart,
  Home,
  Stethoscope,
  Utensils,
  Users,
  Wrench,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Apple,
  HandHeart,
  BriefcaseBusiness,
} from 'lucide-react'

const causes = [
  {
    id: 'education',
    title: 'Education',
    shortTitle: 'Education',
    description:
      'Education gives children the foundation to build confident, independent and hopeful futures. We support vulnerable children with access to learning, educational materials and opportunities that help them stay engaged in school and reach their potential.',
    impact:
      'Your support can help remove barriers that prevent children from learning and give them the tools they need to keep moving forward.',
    icon: GraduationCap,
    tone: 'pink',
    image:
      '/images/education.jpg',
    points: [
      'School access and educational support',
      'Learning materials and essential supplies',
      'Encouragement to remain engaged in education',
      'Opportunities for children to discover their potential',
    ],
  },
  {
    id: 'health',
    title: 'Health',
    shortTitle: 'Health',
    description:
      'A child cannot fully learn and thrive without good health. Our health support focuses on helping vulnerable children access essential medical care, wellness support and healthy practices that protect their development.',
    impact:
      'Giving towards health helps children receive attention when they need it and supports a healthier foundation for learning and growth.',
    icon: Stethoscope,
    tone: 'blue',
    image:
      '/images/health.jpg',
    points: [
      'Access to essential medical care',
      'Health and wellness support',
      'Attention to children\'s changing health needs',
      'Promoting healthy habits and prevention',
    ],
  },
  {
    id: 'food',
    title: 'Food & Nutrition',
    shortTitle: 'Food',
    description:
      'Nutritious food is essential for healthy growth, concentration and development. We work to ensure vulnerable children have access to nourishing meals and food support that helps them grow stronger and participate fully in school and community life.',
    impact:
      'A contribution towards food can provide practical support for a child today while helping create a healthier foundation for tomorrow.',
    icon: Utensils,
    tone: 'orange',
    image:
      '/images/food.jpg',
    points: [
      'Nutritious meals and food support',
      'Support for healthy childhood development',
      'Better conditions for concentration and learning',
      'Practical assistance for vulnerable families',
    ],
  },
  {
    id: 'guidance',
    title: 'Guidance & Counselling',
    shortTitle: 'Guidance',
    description:
      'Children need more than physical support. They also need people who listen, encourage them and help them navigate difficult experiences. Our guidance and counselling work creates space for emotional support, mentorship, confidence-building and life skills.',
    impact:
      'Your support helps create environments where children can be heard, encouraged and equipped to make positive choices.',
    icon: Users,
    tone: 'purple',
    image:
      '/images/guidance.jpg',
    points: [
      'Emotional support and attentive listening',
      'Mentorship and positive encouragement',
      'Life skills and confidence-building',
      'Support through challenging experiences',
    ],
  },
  {
    id: 'shelter',
    title: 'Shelter & Protection',
    shortTitle: 'Protection',
    description:
      'Every child deserves to feel safe, valued and protected. Our shelter and protection efforts focus on creating safe environments where vulnerable children can receive care, stability and the protection they need to grow and develop with dignity.',
    impact:
      'Supporting this cause helps strengthen safe spaces and practical protection for children facing vulnerability.',
    icon: Home,
    tone: 'red',
    image:
      '/images/shelter.jpg',
    points: [
      'Safe and supportive environments',
      'Protection from harmful and unsafe situations',
      'Stable care for vulnerable children',
      'Dignity, belonging and a sense of security',
    ],
  },
  {
    id: 'skills',
    title: 'Skills & Future',
    shortTitle: 'Skills',
    description:
      'Children and young people need pathways that extend beyond today. Through practical skills, vocational exposure and empowerment, we help young people develop abilities that can open doors to greater independence and sustainable opportunities.',
    impact:
      'Giving towards skills and empowerment invests in capabilities that can continue creating value long after the initial support.',
    icon: Wrench,
    tone: 'teal',
    image:
      '/images/skills.jpg',
    points: [
      'Practical and vocational skills',
      'Youth empowerment and confidence',
      'Preparation for future opportunities',
      'Encouragement towards independence and sustainable livelihoods',
    ],
  },
]

const quickIcons = [
  { icon: GraduationCap, label: 'Education', tone: 'pink', href: '#education' },
  { icon: Stethoscope, label: 'Health', tone: 'blue', href: '#health' },
  { icon: Utensils, label: 'Food', tone: 'orange', href: '#food' },
  { icon: Users, label: 'Guidance', tone: 'purple', href: '#guidance' },
  { icon: Home, label: 'Protection', tone: 'red', href: '#shelter' },
  { icon: Wrench, label: 'Skills', tone: 'teal', href: '#skills' },
]

export default function CausesPage() {
  const [managedCauses, setManagedCauses] = useState(causes)
  const iconMap:Record<string,typeof GraduationCap>={GraduationCap,Stethoscope,Utensils,Users,Home,Wrench}
  useEffect(() => {
    graphqlRequest<{causes:Array<{slug:string;name:string;description:string;imageUrl?:string|null;icon?:string|null;color?:string|null}>}>(PUBLIC_CAUSES_QUERY)
      .then((data) => {
        if (!data?.causes?.length) return
        setManagedCauses(data.causes.map((item,index) => {
          const fallback=causes.find(x=>x.id===item.slug)||causes[index%causes.length]
          return {...fallback,id:item.slug,title:item.name,shortTitle:item.name,description:item.description,image:item.imageUrl||fallback.image,tone:item.color||fallback.tone,icon:iconMap[item.icon||'']||fallback.icon}
        }))
      }).catch(()=>{})
  }, [])
  return (
    <div className="causes-page">
      {/* HERO */}
      <section className="causes-page-hero">
        <div className="causes-page-hero-grid" aria-hidden="true" />
        <div className="causes-page-hero-dots" aria-hidden="true" />
        <div className="causes-page-orb causes-page-orb-pink" aria-hidden="true" />
        <div className="causes-page-orb causes-page-orb-purple" aria-hidden="true" />
        <div className="causes-page-orb causes-page-orb-blue" aria-hidden="true" />

        <div className="causes-page-ring causes-page-ring-one" aria-hidden="true" />
        <div className="causes-page-ring causes-page-ring-two" aria-hidden="true" />

        <div className="causes-page-splash splash-pink" aria-hidden="true" />
        <div className="causes-page-splash splash-orange" aria-hidden="true" />
        <div className="causes-page-splash splash-blue" aria-hidden="true" />

        <div className="container causes-page-hero-inner">
          <div className="causes-page-hero-copy">
            <div className="causes-page-kicker">
              <Sparkles size={14} />
              WHERE YOUR SUPPORT CREATES CHANGE
            </div>

            <h1>
              Every child deserves
              <span> a chance to thrive.</span>
            </h1>

            <p>
              Vulnerable children face different challenges, and meaningful
              change requires more than one solution. Our work brings together
              education, health, nutrition, protection, emotional support and
              practical skills to help children build brighter futures.
            </p>

            <div className="causes-page-hero-actions">
              <a href="#our-causes" className="button button-primary">
                Explore Our Causes
                <ArrowRight size={17} />
              </a>

              <a href="/donate" className="button button-outline">
                <Heart size={17} fill="currentColor" />
                Donate Today
              </a>
            </div>

            <div className="causes-page-hero-note">
              <CheckCircle2 size={18} />
              <span>
                Every contribution supports practical care and opportunities
                for vulnerable children.
              </span>
            </div>
          </div>

          <div className="causes-page-hero-visual" aria-hidden="true">
            <div className="causes-page-visual-card causes-page-card-main">
              <div className="causes-page-visual-icon">
                <HandHeart size={32} />
              </div>

              <span>OUR APPROACH</span>

              <strong>
                Care today.
                <br />
                Opportunity tomorrow.
              </strong>

              <p>
                We bring different areas of support together around the needs
                of each child.
              </p>

              <div className="causes-page-mini-pills">
                <i>Learn</i>
                <i>Grow</i>
                <i>Thrive</i>
              </div>
            </div>

            <div className="causes-page-floating-card floating-card-one">
              <GraduationCap size={19} />
              <span>Education</span>
            </div>

            <div className="causes-page-floating-card floating-card-two">
              <Heart size={18} fill="currentColor" />
              <span>Every child matters</span>
            </div>

            <div className="causes-page-star star-one">✦</div>
            <div className="causes-page-star star-two">✦</div>
          </div>
        </div>
      </section>

      {/* QUICK NAVIGATION */}
      <section className="causes-page-navigation">
        <div className="container">
          <div className="causes-page-navigation-inner">
            <div className="causes-page-navigation-intro">
              <span>OUR FOCUS</span>
              <strong>Six areas of support</strong>
            </div>

            <div className="causes-page-navigation-list">
              {managedCauses.map((cause) => { const item=quickIcons.find(x=>x.href==='#'+cause.id)||quickIcons[0]; const Icon=item.icon; return (
                <a
                  key={cause.id}
                  href={'#'+cause.id}
                  className={`causes-page-nav-item tone-${cause.tone}`}
                >
                  <span>
                    <Icon size={18} />
                  </span>
                  {cause.shortTitle}
                </a>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="causes-page-intro" id="our-causes">
        <div className="causes-page-intro-pattern" aria-hidden="true" />

        <div className="container">
          <div className="causes-page-section-heading">
            <p className="eyebrow">OUR CAUSES</p>
            <h2>
              Support that meets children
              <span> where they are.</span>
            </h2>
            <p>
              Each cause addresses a practical area of a child&apos;s
              development. Together, they form a more complete approach to
              helping vulnerable children learn, grow, feel safe and prepare
              for the future.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED CAUSES */}
      <section className="causes-page-details">
        <div className="container">
          {managedCauses.map((cause, index) => {
            const Icon = cause.icon
            const reverse = index % 2 !== 0

            return (
              <article
                key={cause.id}
                id={cause.id}
                className={`causes-page-detail causes-page-detail-${cause.tone} ${
                  reverse ? 'is-reversed' : ''
                }`}
              >
                <div className="causes-page-detail-pattern" aria-hidden="true" />

                <div className="causes-page-image-wrap">
                  <div className="causes-page-image-frame">
                    <img
                      src={cause.image}
                      alt={`${cause.title} support at Glory Children Ministry`}
                    />
                  </div>

                  <div className="causes-page-image-badge">
                    <Icon size={19} />
                    <span>{cause.shortTitle}</span>
                  </div>

                  <div className="causes-page-image-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="causes-page-detail-content">
                  <div className={`causes-page-detail-icon icon-${cause.tone}`}>
                    <Icon size={27} />
                  </div>

                  <p className={`eyebrow causes-eyebrow-${cause.tone}`}>
                    {String(index + 1).padStart(2, '0')} · OUR CAUSE
                  </p>

                  <h2>{cause.title}</h2>

                  <p className="causes-page-detail-description">
                    {cause.description}
                  </p>

                  <div className="causes-page-impact">
                    <strong>Why it matters</strong>
                    <p>{cause.impact}</p>
                  </div>

                  <div className="causes-page-points">
                    {cause.points.map((point) => (
                      <div key={point}>
                        <CheckCircle2 size={16} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <a href="/donate" className="button button-primary causes-page-donate">
                    Donate Towards This Cause
                    <ArrowRight size={17} />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CONNECTING THE CAUSES */}
      <section className="causes-page-connection">
        <div className="causes-page-connection-orb one" aria-hidden="true" />
        <div className="causes-page-connection-orb two" aria-hidden="true" />

        <div className="container causes-page-connection-inner">
          <div className="causes-page-connection-icon">
            <ShieldCheck size={30} />
          </div>

          <p className="eyebrow">A HOLISTIC APPROACH</p>

          <h2>
            One child. Many needs.
            <span> One community of support.</span>
          </h2>

          <p>
            Education, health, food, emotional wellbeing, protection and
            practical skills are connected. Supporting one area can strengthen
            a child&apos;s ability to benefit from the others. That is why we
            work across these causes rather than treating each need in
            isolation.
          </p>

          <div className="causes-page-connection-icons">
            <span className="tone-pink">
              <BookOpen size={19} />
            </span>
            <span className="tone-blue">
              <Stethoscope size={19} />
            </span>
            <span className="tone-orange">
              <Apple size={19} />
            </span>
            <span className="tone-purple">
              <Users size={19} />
            </span>
            <span className="tone-red">
              <Home size={19} />
            </span>
            <span className="tone-teal">
              <BriefcaseBusiness size={19} />
            </span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="causes-page-cta">
        <div className="causes-page-cta-pattern" aria-hidden="true" />
        <div className="causes-page-cta-orb cta-orb-one" aria-hidden="true" />
        <div className="causes-page-cta-orb cta-orb-two" aria-hidden="true" />

        <div className="container causes-page-cta-inner">
          <div className="causes-page-cta-copy">
            <p className="eyebrow">BE PART OF THE STORY</p>

            <h2>
              Your support can help a child
              <span> move forward.</span>
            </h2>

            <p>
              Whether you support education, health, food, protection,
              counselling or skills, your generosity can help create practical
              opportunities for vulnerable children.
            </p>
          </div>

          <div className="causes-page-cta-actions">
            <a href="/donate" className="button button-primary">
              <Heart size={18} fill="currentColor" />
              Donate Now
            </a>

            <a href="/contact" className="button button-outline">
              Talk With Us
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
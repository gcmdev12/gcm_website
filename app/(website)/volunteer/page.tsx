 "use client"

import { FormEvent, useState } from "react"
import { graphqlRequest, SUBMIT_VOLUNTEER_FORM } from "../../../lib/api"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HeartHandshake,
  Home,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Music,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react"

const opportunities = [
  {
    icon: BookOpen,
    title: "Education & Tutoring",
    text: "Support children with reading, homework, basic learning, study skills and confidence-building activities.",
    tone: "purple",
  },
  {
    icon: Heart,
    title: "Child Care & Mentorship",
    text: "Spend meaningful time with children through encouragement, listening, mentoring, games and age-appropriate activities.",
    tone: "pink",
  },
  {
    icon: Utensils,
    title: "Meals & Daily Care",
    text: "Help with meal preparation, serving, hygiene routines and the practical work that keeps a children’s care centre running well.",
    tone: "orange",
  },
  {
    icon: Palette,
    title: "Creative Activities",
    text: "Bring creativity through art, crafts, storytelling, music, drama, dance and recreational activities.",
    tone: "blue",
  },
  {
    icon: Home,
    title: "Centre & Community Support",
    text: "Help with organising spaces, gardening, clean-up days, events, community outreach and practical projects.",
    tone: "green",
  },
  {
    icon: Lightbulb,
    title: "Skills & Professional Support",
    text: "Share useful skills in areas such as technology, administration, communications, health, finance, fundraising or vocational development.",
    tone: "gold",
  },
]

const volunteerSteps = [
  {
    number: "01",
    title: "Tell us about yourself",
    text: "Complete the volunteer form so we can understand your interests, skills and availability.",
  },
  {
    number: "02",
    title: "We connect with you",
    text: "Our team reviews your details and gets in touch to discuss suitable opportunities.",
  },
  {
    number: "03",
    title: "Serve with purpose",
    text: "Once aligned, you can join a volunteer activity where your time and skills can support children.",
  },
]

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      await graphqlRequest(SUBMIT_VOLUNTEER_FORM, {
        input: {
          name: String(data.get('fullName') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || '') || undefined,
          location: String(data.get('location') || '') || undefined,
          interests: String(data.get('interest') || '') || undefined,
          availability: String(data.get('availability') || '') || undefined,
          message: String(data.get('message') || '') || undefined,
        },
      })
      setSubmitted(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not send your enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="volunteer-page">
      <section className="volunteer-hero">
        <div className="volunteer-hero-pattern volunteer-pattern-one" />
        <div className="volunteer-hero-pattern volunteer-pattern-two" />

        <div className="container volunteer-hero-grid">
          <div className="volunteer-hero-copy">
            <span className="eyebrow volunteer-eyebrow">
              <HeartHandshake size={15} />
              Volunteer with Glory Children Ministry
            </span>

            <h1>
              Your time can become
              <span> a child&apos;s brighter tomorrow.</span>
            </h1>

            <p>
              Every hour, skill and act of kindness can create a meaningful
              moment in a child&apos;s life. Join us and help build a place
              where children are cared for, encouraged and given room to grow.
            </p>

            <div className="volunteer-hero-actions">
              <a href="#volunteer-form" className="button button-primary">
                Become a Volunteer
                <ArrowRight size={18} />
              </a>
              <a href="#opportunities" className="button button-light">
                Explore Opportunities
              </a>
            </div>

            <div className="volunteer-trust-row">
              <span>
                <ShieldCheck size={17} />
                Child-centred service
              </span>
              <span>
                <Users size={17} />
                Community focused
              </span>
            </div>
          </div>

          <div className="volunteer-hero-visual">
            <div className="hero-image-frame">
              <Image
                src="/images/hero-children.png"
                alt="Children supported by Glory Children Ministry"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 520px"
              />
              <div className="hero-image-overlay" />
              <div className="hero-floating-card hero-floating-top">
                <span className="floating-icon">
                  <Heart size={17} fill="currentColor" />
                </span>
                <div>
                  <strong>Give time.</strong>
                  <small>Make a difference.</small>
                </div>
              </div>
              <div className="hero-floating-card hero-floating-bottom">
                <div className="mini-avatars">
                  <span>♥</span>
                  <span>✦</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Every child matters</strong>
                  <small>Since 2019</small>
                </div>
              </div>
            </div>

            <div className="hero-spark spark-one">✦</div>
            <div className="hero-spark spark-two">•</div>
            <div className="hero-spark spark-three">✦</div>
          </div>
        </div>

        <div className="volunteer-hero-wave" />
      </section>

      <section className="volunteer-intro section-space">
        <div className="container volunteer-intro-grid">
          <div className="intro-heading">
            <span className="eyebrow">More than helping hands</span>
            <h2>
              Bring what you have.
              <span> Share what you can.</span>
            </h2>
          </div>
          <div className="intro-text">
            <p>
              A children&apos;s care centre needs more than financial support.
              It needs people who are willing to listen, teach, create,
              organise, encourage and simply be present.
            </p>
            <p>
              Whether you can volunteer regularly, occasionally or for a
              specific project, there may be a meaningful place for your time
              and talents.
            </p>
          </div>
        </div>
      </section>

      <section id="opportunities" className="opportunities-section section-space">
        <div className="container">
          <div className="section-heading centered-heading">
            <span className="eyebrow">Ways to serve</span>
            <h2>Find a place where your gifts can make a difference.</h2>
            <p>
              Our volunteer opportunities are designed around the practical,
              educational, emotional and community needs that surround
              children&apos;s care.
            </p>
          </div>

          <div className="opportunity-grid">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon
              return (
                <article
                  className={`opportunity-card opportunity-${opportunity.tone}`}
                  key={opportunity.title}
                >
                  <div className="opportunity-number">0{index + 1}</div>
                  <div className="opportunity-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{opportunity.title}</h3>
                  <p>{opportunity.text}</p>
                  <span className="opportunity-link">
                    Volunteer in this area <ChevronRight size={16} />
                  </span>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="serve-section section-space">
        <div className="container serve-card">
          <div className="serve-decoration serve-decoration-one" />
          <div className="serve-decoration serve-decoration-two" />

          <div className="serve-copy">
            <span className="eyebrow">A simple journey</span>
            <h2>From willingness to meaningful service.</h2>
            <p>
              We want volunteering to be purposeful, responsible and centred
              on the wellbeing of the children. Tell us what you can offer and
              we&apos;ll explore where it may fit.
            </p>
          </div>

          <div className="serve-steps">
            {volunteerSteps.map((step) => (
              <div className="serve-step" key={step.number}>
                <div className="step-number">{step.number}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="volunteer-form" className="volunteer-form-section section-space">
        <div className="container volunteer-form-grid">
          <div className="form-side-copy">
            <span className="eyebrow">Start your volunteer journey</span>
            <h2>Tell us how you would like to serve.</h2>
            <p>
              Complete the form and share a little about yourself. Our team can
              then understand your interests and discuss opportunities that
              match your availability and skills.
            </p>

            <div className="form-side-points">
              <div>
                <CheckCircle2 size={20} />
                <span>Share your skills and interests</span>
              </div>
              <div>
                <CheckCircle2 size={20} />
                <span>Tell us your preferred availability</span>
              </div>
              <div>
                <CheckCircle2 size={20} />
                <span>Choose the areas you would enjoy serving in</span>
              </div>
            </div>

            <div className="form-contact-note">
              <div className="contact-note-icon">
                <Mail size={19} />
              </div>
              <div>
                <strong>Let&apos;s start a conversation.</strong>
                <span>We&apos;ll use your details only to respond to your volunteer enquiry.</span>
              </div>
            </div>
          </div>

          <div className="volunteer-form-card">
            <div className="form-card-top">
              <div>
                <span className="form-kicker">Volunteer application</span>
                <h3>Join the team</h3>
              </div>
              <div className="form-heart">
                <Heart size={21} fill="currentColor" />
              </div>
            </div>

            {submitted ? (
              <div className="form-success">
                <div className="success-icon">
                  <CheckCircle2 size={34} />
                </div>
                <h3>Thank you for stepping forward!</h3>
                <p>
                  Your volunteer enquiry has been captured. Our team will
                  review your details and follow up with you.
                </p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    Full name
                    <input name="fullName" type="text" placeholder="Your full name" required />
                  </label>
                  <label>
                    Phone number
                    <input name="phone" type="tel" placeholder="+256 ..." required />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Email address
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    Location
                    <input name="location" type="text" placeholder="Town / District" required />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Area of interest
                    <select name="interest" defaultValue="" required>
                      <option value="" disabled>
                        Select an area
                      </option>
                      <option>Education & Tutoring</option>
                      <option>Child Care & Mentorship</option>
                      <option>Meals & Daily Care</option>
                      <option>Creative Activities</option>
                      <option>Centre & Community Support</option>
                      <option>Skills & Professional Support</option>
                      <option>Other / Not sure yet</option>
                    </select>
                  </label>
                  <label>
                    Availability
                    <select name="availability" defaultValue="" required>
                      <option value="" disabled>
                        Select availability
                      </option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Occasionally</option>
                      <option>For a specific project</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                </div>

                <label>
                  Tell us about yourself
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your skills, experience, interests or how you would like to help..."
                    required
                  />
                </label>

                <label className="consent-check">
                  <input type="checkbox" required />
                  <span>
                    I am interested in volunteering with Glory Children Ministry
                    and agree to be contacted about my enquiry.
                  </span>
                </label>

                                {error && <div className="site-form-error" role="alert">{error}</div>}
                <button type="submit" className="button button-primary form-submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Volunteer Enquiry"}
                  {!submitting && <Send size={17} />}
                </button>

                <p className="form-disclaimer">
                  Your submission is an enquiry and does not by itself confirm a
                  volunteer placement.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="volunteer-cta">
        <div className="cta-pattern cta-pattern-one" />
        <div className="cta-pattern cta-pattern-two" />
        <div className="container volunteer-cta-inner">
          <div className="cta-icon-cluster">
            <Heart size={20} fill="currentColor" />
            <Users size={20} />
            <Sparkles size={18} />
          </div>
          <span className="eyebrow cta-eyebrow">There is room for you</span>
          <h2>One person can make a child feel seen, supported and valued.</h2>
          <p>
            Your time could become a lesson, a meal, a listening ear, a new
            skill, a joyful afternoon or a moment a child remembers for years.
          </p>
          <div className="volunteer-cta-actions">
            <a href="#volunteer-form" className="button button-light">
              I Want to Volunteer
              <ArrowRight size={18} />
            </a>
            <Link href="/contact" className="button button-outline-light">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

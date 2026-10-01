 "use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Copy,
  Heart,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
} from "lucide-react"

const donationMethods = [
  {
    type: "mobile",
    tone: "mtn",
    brand: "MTN",
    label: "MTN Mobile Money",
    number: "+256 767 274 915",
    tel: "tel:+256767274915",
    description: "Send your donation directly through MTN Mobile Money.",
    icon: Smartphone,
  },
  {
    type: "mobile",
    tone: "airtel",
    brand: "airtel",
    label: "Airtel Money",
    number: "+256 755 575 982",
    tel: "tel:+256755575982",
    description: "Use Airtel Money to make a direct contribution.",
    icon: Smartphone,
  },
  {
    type: "bank",
    tone: "bank",
    brand: "DTB",
    label: "Diamond Trust Bank",
    number: "7389213001",
    description: "Make a bank transfer or deposit to the ministry account.",
    icon: Banknote,
  },
   {
    type: "western-union",
    tone: "western-union",
    brand: "WU",
    label: "Western Union",
    description: "Send your donation through Western Union using the recipient details below.",
    icon: Banknote,
    name: "Ssuna Khalim",
    country: "Uganda",
    city: "Kampala",
    tel: "+256755575982",
    number: "+256755575982",
  },
]

const impactItems = [
  {
    icon: Heart,
    title: "Care",
    text: "Your generosity can help provide practical care, encouragement and support for children.",
  },
  {
    icon: Users,
    title: "Opportunity",
    text: "Your support can contribute to education, skills and opportunities that help children grow.",
  },
  {
    icon: Sparkles,
    title: "Hope",
    text: "Every contribution becomes part of a bigger effort to create a brighter future for children.",
  },
]

export default function DonationPage() {
  const [copied, setCopied] = useState("")

  async function copyNumber(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(""), 2200)
    } catch {
      setCopied("")
    }
  }

  return (
    <div className="donation-page">
      <section className="donation-hero">
        <div className="donation-hero-orb donation-orb-one" />
        <div className="donation-hero-orb donation-orb-two" />
        <div className="donation-dot-pattern" />

        <div className="container donation-hero-inner">
          <div className="donation-hero-copy">
            <span className="eyebrow donation-eyebrow">
              <Heart size={15} fill="currentColor" />
              Give with purpose
            </span>

            <h1>
              Your generosity can help
              <span> a child thrive.</span>
            </h1>

            <p>
              Every contribution helps Glory Children Ministry continue
              supporting children with care, education, encouragement and
              practical opportunities for a better future.
            </p>

            <div className="donation-hero-actions">
              <a href="#donation-methods" className="button button-primary">
                Give Offline
                <ArrowRight size={18} />
              </a>
              <a href="#online-donation" className="button button-light">
                Donate Online
              </a>
            </div>

            <div className="donation-trust-row">
              <span>
                <ShieldCheck size={17} />
                Child-centred giving
              </span>
              <span>
                <LockKeyhole size={16} />
                Clear payment details
              </span>
            </div>
          </div>

          <div className="donation-hero-art">
            <div className="hero-donation-card">
              <div className="hero-card-top">
                <span className="hero-heart">
                  <Heart size={23} fill="currentColor" />
                </span>
                <span className="hero-card-label">A gift with purpose</span>
              </div>

              <div className="hero-card-illustration">
                <div className="circle circle-purple" />
                <div className="circle circle-pink" />
                <div className="circle circle-blue" />
                <div className="hero-hand">
                  <Heart size={55} fill="currentColor" />
                </div>
              </div>

              <div className="hero-card-message">
                <strong>Every child matters.</strong>
                <span>Every gift can be part of their journey.</span>
              </div>

              <div className="hero-card-footer">
                <span>Glory Children Ministry</span>
                <b>Since 2019</b>
              </div>
            </div>

            <div className="floating-donation-badge badge-one">
              <CheckCircle2 size={17} />
              <span>Give hope</span>
            </div>

            <div className="floating-donation-badge badge-two">
              <Heart size={16} fill="currentColor" />
              <span>Support a child</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <div>
            <ShieldCheck size={22} />
            <span>
              <strong>Give with confidence</strong>
              <small>Choose the payment method that works for you.</small>
            </span>
          </div>
          <div>
            <Phone size={21} />
            <span>
              <strong>Simple giving options</strong>
              <small>Mobile money and bank transfer are available.</small>
            </span>
          </div>
          <div>
            <Heart size={21} />
            <span>
              <strong>Every contribution matters</strong>
              <small>Small acts of generosity can add up to meaningful support.</small>
            </span>
          </div>
        </div>
      </section>

      <section id="donation-methods" className="offline-section section-space">
        <div className="container">
          <div className="section-heading donation-heading">
            <span className="eyebrow">Offline donation methods</span>
            <h2>Choose the way you would like to give.</h2>
            <p>
              You can support Glory Children Ministry directly using any of the
              payment options below.
            </p>
          </div>

          <div className="donation-method-grid">
            {donationMethods.map((method) => {
              const Icon = method.icon
              const isBank = method.type === "bank"
              const accName = "Ssuna Khalim"
              const isWesternUnion = method.type === "western-union"

              return (
                <article
                  className={`donation-method-card donation-${method.tone}`}
                  key={method.label}
                >
                  <div className="method-card-header">
                    <div
                      className={`donation-brand-logo donation-brand-${method.tone}`}
                      aria-label={`${method.brand} logo`}
                    >
                      <span>{method.brand}</span>
                    </div>

                    {/* <div className="method-icon" aria-hidden="true">
                      <Icon size={24} />
                    </div> */}

                    <span className="method-type">
                         {isWesternUnion ? "Western Union" : isBank ? "Bank transfer" : "Mobile money"}
                    </span>
                  </div>

                  <h3>{method.label}</h3>

                  <p>{method.description}</p>

{isWesternUnion ? (
                    <div className="bank-details">
                      <div>
                        <small>Name</small>
                        <strong>{method.name}</strong>
                      </div>
                      <div>
                        <small>Country</small>
                        <strong>{method.country}</strong>
                      </div>
                      <div>
                        <small>City</small>
                        <strong>{method.city}</strong>
                      </div>
                      <div>
                        <small>Tel</small>
                        <a href={`tel:${method.tel}`}>{method.tel}</a>
                      </div>
                    </div>
                  ) : isBank ? (
  <div className="bank-details">
    <div>
      <small>Bank</small>
      <strong>DTB</strong>
    </div>

    <div>
      <small>Account number</small>
      <strong>{method.number}</strong>
    </div>

    <div>
      <small>Account Name</small>
      <strong>{accName}</strong>
    </div>
  </div>
) : (
  <>
    <div className="mobile-number-box">
      <small>Send to</small>
      <a href={method.tel}>{method.number}</a>
    </div>

    <div className="mobile-number-box">
      <small>In Names</small>
      <strong>{accName}</strong>
    </div>
  </>
)}
                  <button
                    type="button"
                    className="copy-button"
                    onClick={() =>
                      copyNumber(
                        method.number.replace(/\s/g, ""),
                        method.label,
                      )
                    }
                  >
                    {copied === method.label ? (
                      <>
                        <CheckCircle2 size={16} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy {isBank ? "account number" : "number"}
                      </>
                    )}
                  </button>

                  {!isBank && (
                    <a className="method-call" href={method.tel}>
                      <Phone size={15} />
                      Tap to use this number
                    </a>
                  )}
                </article>
              )
            })}
          </div>

          <div className="donation-note">
            <div className="note-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <strong>Please confirm payment details before sending.</strong>
              <span>
                If you need help with a donation, please contact Glory Children
                Ministry through the official contact channels.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section-donate">
  <div className="container impact-layout-donate">
    <div className="impact-visual-donate">
      <div className="impact-image-frame-donate">
        <span className="impact-spray-donate impact-spray-one-donate" />
        <span className="impact-spray-donate impact-spray-two-donate" />
        <span className="impact-spray-donate impact-spray-three-donate" />
        <span className="impact-spray-donate impact-spray-four-donate" />

        <div className="impact-image-border-donate impact-border-one-donate">
          <div className="impact-image-border-donate impact-border-two-donate">
            <div className="impact-image-wrap-donate">
              <img
                src="/images/donate.png"
                alt="Children supported by Glory Children Ministry"
              />
            </div>
          </div>
        </div>

        <div className="impact-floating-badge-donate">
          <span>♥</span>
          <div>
            <strong>Every child</strong>
            <small>deserves hope</small>
          </div>
        </div>
      </div>
    </div>

    <div className="impact-copy-donate">
      <span className="eyebrow">Why your giving matters</span>

      <h2>
        A donation is more than a transaction.
        <span> It is a message of hope.</span>
      </h2>

      <p>
        When people give, they become part of a community that believes
        children deserve care, dignity, opportunity and the chance to
        discover their potential.
      </p>

      <div className="impact-quote">
        <span className="quote-mark">&ldquo;</span>
        <p>
          Together, we can create practical pathways for children to
          experience safety, care, learning and opportunity.
        </p>
      </div>
    </div>

    <div className="impact-list-donate">
      {impactItems.map((item) => {
        const Icon = item.icon

        return (
          <div className="impact-item-donate" key={item.title}>
            <div className="impact-icon">
              <Icon size={21} />
            </div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>

      <section id="online-donation" className="online-section">
        <div className="online-decoration online-decoration-one" />
        <div className="online-decoration online-decoration-two" />

        <div className="container online-inner">
          <div className="online-icon">
            <Heart size={26} fill="currentColor" />
          </div>
          <span className="eyebrow online-eyebrow">Online giving</span>
          <h2>Prefer to donate online?</h2>
          <p>
            Make your contribution online through our secure donation
            experience. Click below to continue.
          </p>
          <a
            href="https://gofund.me/chealuna-hill-27aug"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-light online-button"
          >
            Donate Now
            <ArrowRight size={18} />
          </a>
          <small>
            <LockKeyhole size={13} />
            Secure online donation
          </small>
        </div>
      </section>

      <section className="donation-final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow">Thank you for giving</span>
            <h2>Help us keep building a future where every child matters.</h2>
          </div>
          <div className="final-cta-actions">
            <a href="#donation-methods" className="button button-primary">
              Give Today
              <Heart size={17} fill="currentColor" />
            </a>
            <Link href="/contact" className="button button-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

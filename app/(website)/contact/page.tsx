'use client'

import { FormEvent, useState } from 'react'
import { graphqlRequest, SUBMIT_CONTACT_FORM } from '../../../lib/api'
import { ArrowRight, CheckCircle2, Clock3, Heart, Mail, MapPin, MessageCircle, Phone, Send, Sparkles, Users, X } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      await graphqlRequest(SUBMIT_CONTACT_FORM, {
        input: {
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || '') || undefined,
          subject: String(data.get('subject') || '') || undefined,
          message: String(data.get('message') || ''),
        },
      })
      setSent(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-dots" aria-hidden="true" />
        <div className="contact-orb contact-orb-one" aria-hidden="true" />
        <div className="contact-orb contact-orb-two" aria-hidden="true" />
        <div className="contact-ring contact-ring-one" aria-hidden="true" />
        <div className="contact-ring contact-ring-two" aria-hidden="true" />
        <div className="contact-splash contact-splash-pink" aria-hidden="true" />
        <div className="contact-splash contact-splash-orange" aria-hidden="true" />
        <div className="contact-splash contact-splash-blue" aria-hidden="true" />

        <div className="container contact-hero-inner">
          <div className="contact-hero-copy">
            <p className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</p>
            <h1>Let&apos;s <span>connect</span> and make a difference together.</h1>
            <p>Whether you want to ask a question, partner with us, volunteer, support a child, or learn more about our work, our team is ready to hear from you.</p>
            <div className="contact-hero-actions">
              <a className="button button-primary" href="#contact-form">Send Us a Message <Send size={17} /></a>
              <a className="button button-outline contact-outline-button" href="#location">Find Us <MapPin size={17} /></a>
            </div>
          </div>

          <div className="contact-hero-art" aria-hidden="true">
            <div className="contact-art-card contact-art-card-main">
              <div className="contact-art-icon"><MessageCircle size={28} /></div>
              <strong>We&apos;re here to listen.</strong>
              <span>Your message can be the beginning of something meaningful.</span>
            </div>
            <div className="contact-art-card contact-art-card-small"><Heart size={22} fill="currentColor" /><span>Every child matters</span></div>
            <div className="contact-art-spark spark-one"><Sparkles size={22} /></div>
            <div className="contact-art-spark spark-two"><Sparkles size={17} /></div>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container">
          <div className="contact-intro">
            <p className="eyebrow pink-text">CONTACT US</p>
            <h2>We&apos;re only a message <span>away.</span></h2>
            <p>Reach out using the form or any of the contact details below. We&apos;ll be glad to connect with you.</p>
          </div>

          <div className="contact-layout">
            <div className="contact-form-card" id="contact-form">
              <div className="contact-card-heading">
                <div className="contact-card-icon"><Send size={21} /></div>
                <div><p className="eyebrow pink-text">GET IN TOUCH</p><h3>Send us a message</h3></div>
              </div>

              {sent ? (
                <div className="contact-success">
                  <CheckCircle2 size={48} />
                  <h3>Thank you for reaching out!</h3>
                  <p>Your message has been received. We appreciate you taking the time to connect with Glory Children Ministry.</p>
                  <button className="button button-primary" type="button" onClick={() => setSent(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    <label><span>Your Name</span><input type="text" name="name" placeholder="Enter your name" required /></label>
                    <label><span>Email Address</span><input type="email" name="email" placeholder="you@example.com" required /></label>
                  </div>
                  <div className="contact-form-grid">
                    <label><span>Phone Number</span><input type="tel" name="phone" placeholder="+256 ..." /></label>
                    <label><span>Subject</span><select name="subject" defaultValue=""><option value="" disabled>Select a subject</option><option value="general">General enquiry</option><option value="donation">Donation &amp; giving</option><option value="volunteer">Volunteering</option><option value="partnership">Partnership</option><option value="causes">Our causes</option><option value="other">Other</option></select></label>
                  </div>
                  <label><span>Your Message</span><textarea name="message" rows={7} placeholder="Tell us how we can help..." required /></label>
                                    {error && <div className="site-form-error" role="alert">{error}</div>}
                  <button className="button button-primary contact-submit" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'} {!submitting && <Send size={17} />}</button>
                </form>
              )}
            </div>

            <aside className="contact-details-card">
              <div className="contact-details-heading"><p className="eyebrow">CONTACT DETAILS</p><h3>Let&apos;s stay <span>connected.</span></h3></div>
              <a className="contact-detail" href="tel:+256755575982"><span className="contact-detail-icon contact-icon-pink"><Phone size={19} /></span><span><strong>Phone</strong><small>+256 755 575 982</small></span></a>
              <a className="contact-detail" href="tel:+256767274915"><span className="contact-detail-icon contact-icon-orange"><Phone size={19} /></span><span><strong>Alternative Phone</strong><small>+256 767 274 915</small></span></a>
              <a className="contact-detail" href="mailto:info@glorychildrenministry.org"><span className="contact-detail-icon contact-icon-purple"><Mail size={19} /></span><span><strong>Email</strong><small>info@glorychildrenministry.org</small></span></a>
              <div className="contact-detail"><span className="contact-detail-icon contact-icon-blue"><MapPin size={19} /></span><span><strong>Visit Us</strong><small>Namusera, Hoima Rd, Kampala, Uganda</small></span></div>
              <div className="contact-detail"><span className="contact-detail-icon contact-icon-green"><Clock3 size={19} /></span><span><strong>Working Hours</strong><small>Monday – Friday · 8:00 AM – 5:00 PM</small></span></div>
              <div className="contact-details-note"><Heart size={19} fill="currentColor" /><p>Every conversation can help create another opportunity for a child.</p></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-location-section" id="location">
        <div className="contact-location-pattern" aria-hidden="true" />
        <div className="container">
          <div className="contact-location-heading">
            <div><p className="eyebrow pink-text">OUR LOCATION</p><h2>Come and <span>visit us.</span></h2></div>
            <p>Find Glory Children Ministry in Namusera along Hoima Road, Kampala, Uganda.</p>
          </div>
          <div className="contact-map-card">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.715479346902!2d32.45628276997053!3d0.41138186298174906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177da5b08e6ed545%3A0x1b49d3ca7a435305!2sGlory%20Children%20Ministry!5e0!3m2!1sen!2sug!4v1790597954659!5m2!1sen!2sug" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Glory Children Ministry location" />
          </div>
        </div>
      </section>

      <section className="contact-cta-section">
        <div className="contact-cta-orb contact-cta-orb-one" aria-hidden="true" />
        <div className="contact-cta-orb contact-cta-orb-two" aria-hidden="true" />
        <div className="container contact-cta-card">
          <div className="contact-cta-copy">
            <p className="eyebrow">BE PART OF THE STORY</p>
            <h2>Together, we can help more children <span>thrive.</span></h2>
            <p>There are many ways to stand with vulnerable children. Choose the way that feels meaningful to you and help create lasting opportunities.</p>
          </div>
          <div className="contact-cta-actions">
            <a className="button button-primary" href="/donate"><Heart size={18} fill="currentColor" /> Donate</a>
            <a className="button button-purple" href="/our-causes"><Users size={18} /> Support Our Causes</a>
            <a className="button button-light" href="/donate"><ArrowRight size={18} /> Support Ongoing Campaigns</a>
          </div>
        </div>
      </section>
    {sent && <div className="site-success-backdrop" role="dialog" aria-modal="true" aria-labelledby="contact-success-title" onClick={() => setSent(false)}>
      <div className="site-success-modal" onClick={e => e.stopPropagation()}>
        <button type="button" className="site-success-close" aria-label="Close" onClick={() => setSent(false)}><X size={20} /></button>
        <div className="site-success-icon"><CheckCircle2 size={42} /></div>
        <p className="site-success-eyebrow">MESSAGE SENT</p>
        <h3 id="contact-success-title">Thank you for reaching out!</h3>
        <p>Your message has been received successfully. We appreciate you taking the time to connect with Glory Children Ministry.</p>
        <button type="button" className="button button-primary" onClick={() => setSent(false)}>Continue</button>
      </div>
    </div>}
    </div>
  )
}

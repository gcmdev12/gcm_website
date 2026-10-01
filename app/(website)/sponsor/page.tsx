'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Heart, Mail, MapPin, Phone, ShieldCheck, Users } from 'lucide-react'
import { graphqlRequest, SUBMIT_SPONSOR_FORM } from '../../lib/api'

export default function SponsorPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', preferredContact: 'Email', message: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('')
    setError('')
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your name and email address.')
      return
    }
    setSubmitting(true)
    try {
      await graphqlRequest<{ submitSponsorForm: boolean }>(SUBMIT_SPONSOR_FORM, {
        input: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          location: form.location.trim() || undefined,
          preferredContact: form.preferredContact,
          message: form.message.trim() || undefined,
        },
      })
      setForm({ name: '', email: '', phone: '', location: '', preferredContact: 'Email', message: '' })
      setStatus('Thank you. Your sponsorship enquiry has been received. Our team will contact you soon.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not submit your enquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="sponsor-page">
      <section className="sponsor-hero">
        <div className="sponsor-hero-pattern" aria-hidden="true" />
        <div className="sponsor-hero-orb sponsor-orb-one" aria-hidden="true" />
        <div className="sponsor-hero-orb sponsor-orb-two" aria-hidden="true" />
        <div className="container sponsor-hero-inner">
          <div className="sponsor-hero-copy">
            <span className="eyebrow"><Heart size={15} fill="currentColor" /> Make a lasting difference</span>
            <h1>Sponsor a child. <span>Help build a brighter future.</span></h1>
            <p>Take the first step toward supporting a vulnerable child with care, education, encouragement and opportunity. Tell us how we can reach you and our team will guide you through the sponsorship process.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#sponsor-form">Sponsor a Child <ArrowRight size={18} /></a>
              <Link className="button button-outline" href="/donate">Donate Instead</Link>
            </div>
            <div className="sponsor-trust-row">
              <span><ShieldCheck size={17} /> Child-centred support</span>
              <span><Users size={17} /> Personal guidance</span>
            </div>
          </div>
          <div className="sponsor-hero-card">
            <div className="sponsor-card-icon"><Heart size={29} fill="currentColor" /></div>
            <span>Every child matters</span>
            <strong>One relationship can open a world of possibility.</strong>
            <div className="sponsor-card-points"><span><CheckCircle2 size={16} /> Education</span><span><CheckCircle2 size={16} /> Care & protection</span><span><CheckCircle2 size={16} /> Opportunity</span></div>
          </div>
        </div>
      </section>

      <section id="sponsor-form" className="sponsor-form-section section-space">
        <div className="container sponsor-form-layout">
          <div className="sponsor-form-intro">
            <span className="eyebrow">Sponsor a Child</span>
            <h2>Tell us how we can contact you.</h2>
            <p>Complete the form and our ministry team will get in touch with information about child sponsorship and the next steps.</p>
            <div className="sponsor-contact-note"><Phone size={19} /><div><strong>Prefer a conversation?</strong><span>Include your phone number and preferred contact method.</span></div></div>
            <div className="sponsor-contact-note"><Mail size={19} /><div><strong>Email updates</strong><span>We will use your email to respond to this enquiry.</span></div></div>
          </div>

          <form className="sponsor-form" onSubmit={submit}>
            {status && <div className="sponsor-message sponsor-success"><CheckCircle2 size={18} />{status}</div>}
            {error && <div className="sponsor-message sponsor-error">{error}</div>}
            <div className="sponsor-form-grid">
              <label><span>Full name *</span><input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your full name" /></label>
              <label><span>Email address *</span><input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label>
              <label><span>Phone number</span><input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+256 ..." /></label>
              <label><span>Location</span><input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="City / country" /></label>
              <label><span>Preferred contact method</span><select value={form.preferredContact} onChange={(e) => update('preferredContact', e.target.value)}><option>Email</option><option>Phone call</option><option>WhatsApp</option></select></label>
              <label className="sponsor-field-wide"><span>Message</span><textarea rows={6} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us anything you would like to know about sponsoring a child..." /></label>
            </div>
            <button type="submit" className="button button-primary sponsor-submit" disabled={submitting}>{submitting ? 'Sending enquiry…' : 'Send Sponsorship Enquiry'} <ArrowRight size={18} /></button>
            <small><ShieldCheck size={14} /> Your details are used to respond to your sponsorship enquiry.</small>
          </form>
        </div>
      </section>

      <section className="sponsor-cta">
        <div className="container sponsor-cta-inner">
          <div><span className="eyebrow">Together, we can help</span><h2>Give a child hope, education and opportunity.</h2><p>Not ready to sponsor? You can still make a difference through a donation or by volunteering with the ministry.</p></div>
          <div className="hero-actions"><Link className="button button-primary" href="/donate">Donate Now <Heart size={17} fill="currentColor" /></Link><Link className="button button-light sponsor-cta-light" href="/volunteer">Volunteer <Users size={17} /></Link></div>
        </div>
      </section>
    </main>
  )
}

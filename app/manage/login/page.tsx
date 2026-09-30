'use client'
import { FormEvent, useState } from 'react'
import { Eye, EyeOff, ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter(); const [show, setShow] = useState(false); const [loading, setLoading] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setLoading(true); window.setTimeout(() => router.push('/manage/dashboard'), 500) }
  return <div className="login-page">
    <div className="login-art"><div className="login-orb orb-one"/><div className="login-orb orb-two"/><div className="login-pattern"/>
      <div className="login-art-content"><div className="login-logo"><Heart size={28} fill="currentColor"/></div><span className="login-eyebrow">GLORY CHILDREN MINISTRY</span><h1>Every child deserves a <span>chance to shine.</span></h1><p>Welcome to your ministry workspace — a simple place to keep the stories, people and impact behind the work moving forward.</p><div className="login-art-footer"><ShieldCheck size={18}/><span>Private administrator access</span><i/><Sparkles size={17}/><span>Since 2019 · Every child matters</span></div></div>
    </div>
    <div className="login-panel"><div className="login-card"><div className="login-card-brand"><div className="login-mini-mark"><Heart size={19} fill="currentColor"/></div><span>GCM Admin</span></div><div className="login-heading"><span>WELCOME BACK</span><h2>Sign in to your <b>workspace.</b></h2><p>Use your administrator credentials to continue.</p></div>
      <form onSubmit={submit} className="login-form"><label>Email address<input type="email" placeholder="admin@example.com" required /></label><label>Password<span className="field-wrap"><input type={show ? 'text' : 'password'} placeholder="Enter your password" required /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label><div className="login-options"><label className="check"><input type="checkbox"/> <span>Remember me</span></label><a href="#forgot">Forgot password?</a></div><button className="login-submit" disabled={loading}>{loading ? 'Signing in…' : <>Sign in to dashboard <ArrowRight size={18}/></>}</button></form>
      <p className="login-security"><ShieldCheck size={16}/> Your administrator account is protected by secure authentication.</p>
    </div><p className="login-copyright">© {new Date().getFullYear()} Glory Children Ministry</p></div>
  </div>
}

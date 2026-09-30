'use client'
import { FormEvent, useEffect, useState } from 'react'
import { Eye, EyeOff, ArrowRight, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { graphqlRequest } from '../../../lib/api'
import { getAdminToken, saveAdminSession, type AdminProfile } from '../../../lib/admin-auth'

type LoginResult = { login: { accessToken: string; admin: AdminProfile } }
const LOGIN_MUTATION = `mutation Login(\$input: LoginInput!) { login(input: \$input) { accessToken admin { id email firstName lastName role isActive } } }`

export default function LoginPage() {
  const router=useRouter()
  const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState('')
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [remember,setRemember]=useState(false)
  useEffect(()=>{ if(getAdminToken()) router.replace('/manage/dashboard') },[router])
  const submit=async(e:FormEvent)=>{
    e.preventDefault(); setLoading(true); setError('')
    try { const data=await graphqlRequest<LoginResult>(LOGIN_MUTATION,{input:{email,password}}); saveAdminSession(data.login.accessToken,data.login.admin,remember); router.replace('/manage/dashboard') }
    catch(err){ setError(err instanceof Error?err.message:'Unable to sign in. Please try again.') }
    finally{ setLoading(false) }
  }
  return <div className="login-page">
    <div className="login-art"><div className="login-orb orb-one"/><div className="login-orb orb-two"/><div className="login-pattern"/>
      <div className="login-art-content"><div className="login-logo"><Heart size={28} fill="currentColor"/></div><span className="login-eyebrow">GLORY CHILDREN MINISTRY</span><h1>Every child deserves a <span>chance to shine.</span></h1><p>Welcome to your ministry workspace — a simple place to keep the stories, people and impact behind the work moving forward.</p><div className="login-art-footer"><ShieldCheck size={18}/><span>Private administrator access</span><i/><Sparkles size={17}/><span>Since 2019 · Every child matters</span></div></div>
    </div>
    <div className="login-panel"><div className="login-card"><div className="login-card-brand"><div className="login-mini-mark"><Heart size={19} fill="currentColor"/></div><span>GCM Admin</span></div><div className="login-heading"><span>WELCOME BACK</span><h2>Sign in to your <b>workspace.</b></h2><p>Use your administrator credentials to continue.</p></div>
      <form onSubmit={submit} className="login-form"><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required /></label><label>Password<span className="field-wrap"><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required /><button type="button" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></span></label><div className="login-options"><label className="check"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> <span>Remember me</span></label><span className="login-forgot">Forgot password?</span></div>{error&&<div className="login-error" role="alert">{error}</div>}<button className="login-submit" disabled={loading}>{loading?'Signing in…':<>Sign in to dashboard <ArrowRight size={18}/></>}</button></form>
      <p className="login-security"><ShieldCheck size={16}/> Your administrator account is protected by secure authentication.</p>
    </div><p className="login-copyright">© {new Date().getFullYear()} Glory Children Ministry</p></div>
  </div>
}
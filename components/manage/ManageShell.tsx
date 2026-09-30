'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Bell, ChevronDown, Heart, LayoutDashboard, UserRound, Globe2, Image, Newspaper, BarChart3, HandHeart, Inbox, Settings, LogOut, Menu, X, Phone, Share2, Target, Landmark, Users, Mail, Sparkles } from 'lucide-react'

const groups = [
  { label: 'Overview', items: [{ href: '/manage/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'Website', items: [
    { href: '/manage/home', label: 'Homepage', icon: Globe2 },
    { href: '/manage/about', label: 'About Us', icon: Heart },
    { href: '/manage/causes', label: 'Our Causes', icon: Target },
    { href: '/manage/gallery', label: 'Gallery', icon: Image },
    { href: '/manage/news', label: 'News & Updates', icon: Newspaper },
  ] },
  { label: 'Content', items: [
    { href: '/manage/impact', label: 'Impact Statistics', icon: BarChart3 },
    { href: '/manage/donations', label: 'Donation Details', icon: Landmark },
  ] },
  { label: 'Inbox', items: [
    { href: '/manage/submissions/contact', label: 'Contact Forms', icon: Inbox, badge: 12 },
    { href: '/manage/submissions/volunteers', label: 'Volunteers', icon: Users, badge: 5 },
    { href: '/manage/submissions/newsletter', label: 'Newsletter', icon: Mail },
    { href: '/manage/notifications', label: 'Notifications', icon: Bell, badge: 8 },
  ] },
  { label: 'Settings', items: [
    { href: '/manage/profile', label: 'Admin Profile', icon: UserRound },
    { href: '/manage/website/contact', label: 'Contact Details', icon: Phone },
    { href: '/manage/website/socials', label: 'Social Media', icon: Share2 },
  ] },
]

export default function ManageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const logout = () => router.push('/manage/login')

  return <div className="manage-app">
    <aside className={`manage-sidebar ${open ? 'is-open' : ''}`}>
      <div className="manage-brand">
        <div className="manage-brand-mark"><Heart size={22} fill="currentColor" /></div>
        <div><strong>Glory Children</strong><span>MINISTRY · ADMIN</span></div>
        <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
      </div>
      <nav className="manage-nav">
        {groups.map(group => <div className="nav-group" key={group.label}>
          <p>{group.label}</p>
          {group.items.map(item => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/manage/dashboard' && pathname.startsWith(item.href))
            return <Link onClick={() => setOpen(false)} className={`nav-link ${active ? 'active' : ''}`} href={item.href} key={item.href}>
              <Icon size={18} /><span>{item.label}</span>{item.badge ? <em>{item.badge}</em> : null}
            </Link>
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help"><Sparkles size={17}/><div><strong>Keep the story moving</strong><span>Every update helps the team.</span></div></div>
        <button className="nav-link logout" onClick={logout}><LogOut size={18}/><span>Sign out</span></button>
      </div>
    </aside>
    {open && <button className="sidebar-overlay" onClick={() => setOpen(false)} aria-label="Close navigation" />}
    <div className="manage-main">
      <header className="manage-topbar">
        <button className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        <div className="topbar-title"><span>Glory Children Ministry</span><strong>Admin workspace</strong></div>
        <div className="topbar-actions">
          <Link href="/manage/notifications" className="icon-button" aria-label="Notifications"><Bell size={19}/><i /></Link>
          <Link href="/manage/profile" className="admin-chip"><span className="avatar">GC</span><span className="admin-name"><strong>Administrator</strong><small>Super admin</small></span><ChevronDown size={16}/></Link>
        </div>
      </header>
      <main className="manage-content">{children}</main>
    </div>
  </div>
}

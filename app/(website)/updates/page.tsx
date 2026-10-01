"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CalendarDays, Clock3, Heart, Newspaper, X } from "lucide-react"
import { graphqlRequest } from "../../../lib/api"

type NewsItem={id:string;category:string;title:string;excerpt:string;body:string[];image:string;date:string;time:string}

const NEWS_QUERY=`query { newsArticles { id title slug category excerpt content imageUrl published publishedAt createdAt } }`

function mapNewsItem(item:{
 id:string
 category:string
 title:string
 excerpt?:string|null
 content:string
 imageUrl?:string|null
 publishedAt?:string|null
 createdAt:string
}):NewsItem{
 const timestamp=item.publishedAt||item.createdAt
 const date=new Date(timestamp)
 return {
  id:item.id,
  category:item.category||"PROGRAMME UPDATE",
  title:item.title,
  excerpt:item.excerpt||item.content.split(/\n\s*\n/)[0]||"",
  body:item.content.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean),
  image:item.imageUrl||"/images/hero-children.png",
  date:date.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),
  time:date.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})
 }
}

export default function UpdatesPage(){
 const[selectedNews,setSelectedNews]=useState<NewsItem|null>(null)
 const[newsItems,setNewsItems]=useState<NewsItem[]>([])
 const[loading,setLoading]=useState(true)
 const[error,setError]=useState("")
 useEffect(()=>{
  graphqlRequest<{newsArticles:Array<{
   id:string;category:string;title:string;excerpt?:string|null;content:string;imageUrl?:string|null;publishedAt?:string|null;createdAt:string
  }> }>(NEWS_QUERY)
   .then(data=>setNewsItems(data.newsArticles.map(mapNewsItem)))
   .catch(e=>setError((e as Error).message||"Unable to load news updates."))
   .finally(()=>setLoading(false))
 },[])
 useEffect(()=>{if(!selectedNews)return;const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setSelectedNews(null)};document.addEventListener("keydown",key);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=""}},[selectedNews])
 return <main className="updates-page">
  <section className="updates-hero">
   <div className="updates-hero-orb updates-hero-orb-one"/><div className="updates-hero-orb updates-hero-orb-two"/><div className="updates-hero-dots"/>
   <div className="updates-hero-brush updates-hero-brush-one"/><div className="updates-hero-brush updates-hero-brush-two"/>
   <div className="container updates-hero-inner">
    <div className="updates-hero-copy">
     <div className="updates-breadcrumb"><Link href="/">Home</Link><span>/</span><span>News &amp; Updates</span></div>
     <p className="eyebrow">NEWS &amp; UPDATES</p><h1>Stories of <span>hope, progress</span> &amp; possibility.</h1>
     <p>Follow the people, moments and programme updates behind the work of Glory Children Ministry.</p>
     <div className="updates-hero-actions"><a href="#latest-news" className="button button-primary">Explore Latest News <ArrowRight size={17}/></a><Link href="/donate" className="button button-outline"><Heart size={17} fill="currentColor"/> Support the Work</Link></div>
    </div>
    <div className="updates-hero-card"><div className="updates-hero-card-image"><Image src="/images/hero-children.png" alt="Children smiling together" fill priority sizes="(max-width:760px) 88vw,430px"/></div><div className="updates-hero-card-content"><span>KEEP UP WITH THE JOURNEY</span><strong>Every story is a reminder that every child matters.</strong></div></div>
   </div>
  </section>

  <section className="updates-list-section" id="latest-news"><div className="updates-list-pattern"/>
   <div className="container">
    <div className="updates-section-heading"><div><p className="eyebrow pink-text">LATEST STORIES</p><h2>News from <span>the work</span></h2></div><p>Read programme updates, community stories and moments that show how people are coming together to support vulnerable children.</p></div>
    {error&&<div className="login-error">{error}</div>}
    {loading?<div className="updates-news-loading">Loading the latest stories…</div>:newsItems.length===0?<div className="updates-news-loading">No news updates have been published yet.</div>:<div className="news-grid">{newsItems.map((item,index)=><article className={`news-card ${index===0?"news-card-featured":""}`} key={item.id}>
     <button type="button" className="news-card-button" onClick={()=>setSelectedNews(item)} aria-label={`Read ${item.title}`}>
      <div className="news-card-image"><Image src={item.image} alt={item.title} fill sizes="(max-width:760px) 100vw,(max-width:1050px) 50vw,33vw"/><span className="news-category">{item.category}</span></div>
      <div className="news-card-body"><div className="news-meta"><span><CalendarDays size={13}/>{item.date}</span><span><Clock3 size={13}/>{item.time}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="news-read-more">Read full story <ArrowRight size={15}/></span></div>
     </button>
    </article>)}</div>}
   </div>
  </section>

  <section className="updates-cta-section"><div className="updates-cta-shape updates-cta-shape-one"/><div className="updates-cta-shape updates-cta-shape-two"/>
   <div className="container"><div className="updates-cta-card"><div className="updates-cta-icon"><Newspaper size={25}/></div><div className="updates-cta-copy"><p className="eyebrow">BE PART OF THE STORY</p><h2>Help turn the next update into a story of hope.</h2><p>Your support helps us continue providing care, education, healthcare, guidance and opportunities for vulnerable children.</p></div><div className="updates-cta-actions"><Link href="/donate" className="button button-primary">Donate Now <Heart size={17} fill="currentColor"/></Link><Link href="/volunteer" className="button button-purple">Volunteer <ArrowRight size={17}/></Link></div></div></div>
  </section>

  {selectedNews&&<div className="news-modal" role="dialog" aria-modal="true" aria-labelledby="news-modal-title" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedNews(null)}}>
   <div className="news-modal-panel"><button type="button" className="news-modal-close" onClick={()=>setSelectedNews(null)} aria-label="Close news story"><X size={22}/></button>
    <div className="news-modal-image"><Image src={selectedNews.image} alt={selectedNews.title} fill sizes="(max-width:760px) 100vw,820px"/><span>{selectedNews.category}</span></div>
    <div className="news-modal-content"><div className="news-modal-meta"><span><CalendarDays size={14}/>{selectedNews.date}</span><span><Clock3 size={14}/>{selectedNews.time}</span></div><h2 id="news-modal-title">{selectedNews.title}</h2><div className="news-modal-body">{selectedNews.body.map(p=><p key={p}>{p}</p>)}</div><div className="news-modal-footer"><span>Glory Children Ministry</span><Link href="/donate" onClick={()=>setSelectedNews(null)}>Support this work <Heart size={15} fill="currentColor"/></Link></div></div>
   </div>
  </div>}
 </main>
}

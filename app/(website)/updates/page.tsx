"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CalendarDays, Clock3, Heart, Newspaper, X } from "lucide-react"

type NewsItem={id:number;category:string;title:string;excerpt:string;body:string[];image:string;date:string;time:string}

const newsItems:NewsItem[]=[
{id:1,category:"PROGRAMME UPDATE",title:"Creating safe spaces where every child can grow",excerpt:"Our work continues to focus on creating caring environments where vulnerable children feel protected, supported and encouraged to learn.",body:["At Glory Children Ministry, creating a safe and caring environment is at the heart of everything we do. Our programmes bring together practical care, guidance and opportunities for children who need additional support.","Through community engagement, counselling, education support and day-to-day care, we continue working alongside families and local communities to help children build confidence and discover new possibilities.","Every small step matters — from a child returning to school to a young person finding encouragement, belonging and a reason to dream again."],image:"/images/hero-children.png",date:"September 24, 2026",time:"10:30 AM"},
{id:2,category:"EDUCATION",title:"Education opens doors to opportunity",excerpt:"Supporting children in school means more than providing a classroom. It means helping them access the tools, encouragement and confidence to keep learning.",body:["Education remains one of the practical ways we can help children build a stronger future. Our support focuses on helping vulnerable children stay connected to learning and experience the encouragement that comes with being supported.","We celebrate teachers, caregivers, families, volunteers and partners who make these opportunities possible. Their commitment helps children approach school with greater confidence and hope.","We believe every child deserves the opportunity to discover their abilities and develop the skills they need for the future."],image:"/images/about-children.png",date:"September 15, 2026",time:"2:15 PM"},
{id:3,category:"COMMUNITY",title:"When a community comes together, hope reaches further",excerpt:"Partnership and community support allow us to respond to practical needs while building longer-term opportunities for children and families.",body:["Lasting change is rarely achieved alone. Our work depends on relationships with families, community members, volunteers and people who choose to support children in practical ways.","From food and healthcare support to education, counselling and skills development, every contribution becomes part of a wider network of care.","We are grateful to everyone who gives time, resources, encouragement or expertise. Together, these acts of support help us reach further."],image:"/images/4.png",date:"September 6, 2026",time:"9:00 AM"},
{id:4,category:"IMPACT STORY",title:"Small acts of kindness can become lasting opportunities",excerpt:"A meal, a school opportunity, a listening ear or a helping hand can be the beginning of a much bigger story for a child.",body:["Our impact is often found in moments that may look small from the outside. A child receiving support to continue school, access healthcare or simply feel heard can be an important step forward.","These moments remind us why practical compassion matters. We continue to look for ways to respond to immediate needs while creating opportunities that can have a lasting effect.","Your encouragement helps make these moments possible and keeps hope moving from one child to another."],image:"/images/hero-children.png",date:"August 28, 2026",time:"11:45 AM"},
{id:5,category:"FIELD UPDATE",title:"Nurturing hope through care, guidance and opportunity",excerpt:"Our programmes bring together several areas of support because children need more than one kind of help to thrive.",body:["Children and families can face several challenges at the same time. That is why our approach brings together practical care, education, health, guidance and opportunities to develop useful skills.","By listening to the needs around us and working with communities, we can direct support toward areas where it can make a meaningful difference.","Our goal remains simple: help children feel safe, valued and equipped to take their next step."],image:"/images/about-children.png",date:"August 17, 2026",time:"3:20 PM"},
{id:6,category:"VOLUNTEER NEWS",title:"People who give their time help keep hope moving",excerpt:"Volunteers bring energy, skills and compassion that strengthen the work happening in communities.",body:["There are many ways to contribute to the wellbeing of children. Volunteers can bring practical skills, encouragement, creativity and time to programmes that support children and families.","We value every person who chooses to stand with the work. Their involvement helps turn plans into real experiences for the children we serve.","If you would like to become part of the journey, there are opportunities to volunteer, partner or support a specific area of our work."],image:"/images/4.png",date:"August 8, 2026",time:"1:05 PM"}
]

export default function UpdatesPage(){
 const[selectedNews,setSelectedNews]=useState<NewsItem|null>(null)
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
    <div className="news-grid">{newsItems.map((item,index)=><article className={`news-card ${index===0?"news-card-featured":""}`} key={item.id}>
     <button type="button" className="news-card-button" onClick={()=>setSelectedNews(item)} aria-label={`Read ${item.title}`}>
      <div className="news-card-image"><Image src={item.image} alt="" fill sizes="(max-width:760px) 100vw,(max-width:1050px) 50vw,33vw"/><span className="news-category">{item.category}</span></div>
      <div className="news-card-body"><div className="news-meta"><span><CalendarDays size={13}/>{item.date}</span><span><Clock3 size={13}/>{item.time}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="news-read-more">Read full story <ArrowRight size={15}/></span></div>
     </button>
    </article>)}</div>
   </div>
  </section>

  <section className="updates-cta-section"><div className="updates-cta-shape updates-cta-shape-one"/><div className="updates-cta-shape updates-cta-shape-two"/>
   <div className="container"><div className="updates-cta-card"><div className="updates-cta-icon"><Newspaper size={25}/></div><div className="updates-cta-copy"><p className="eyebrow">BE PART OF THE STORY</p><h2>Help turn the next update into a story of hope.</h2><p>Your support helps us continue providing care, education, healthcare, guidance and opportunities for vulnerable children.</p></div><div className="updates-cta-actions"><Link href="/donate" className="button button-primary">Donate Now <Heart size={17} fill="currentColor"/></Link><Link href="/volunteer" className="button button-purple">Volunteer <ArrowRight size={17}/></Link></div></div></div>
  </section>

  {selectedNews&&<div className="news-modal" role="dialog" aria-modal="true" aria-labelledby="news-modal-title" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedNews(null)}}>
   <div className="news-modal-panel"><button type="button" className="news-modal-close" onClick={()=>setSelectedNews(null)} aria-label="Close news story"><X size={22}/></button>
    <div className="news-modal-image"><Image src={selectedNews.image} alt="" fill sizes="(max-width:760px) 100vw,820px"/><span>{selectedNews.category}</span></div>
    <div className="news-modal-content"><div className="news-modal-meta"><span><CalendarDays size={14}/>{selectedNews.date}</span><span><Clock3 size={14}/>{selectedNews.time}</span></div><h2 id="news-modal-title">{selectedNews.title}</h2><div className="news-modal-body">{selectedNews.body.map(p=><p key={p}>{p}</p>)}</div><div className="news-modal-footer"><span>Glory Children Ministry</span><Link href="/donate" onClick={()=>setSelectedNews(null)}>Support this work <Heart size={15} fill="currentColor"/></Link></div></div>
   </div>
  </div>}
 </main>
}

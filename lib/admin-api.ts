const getGraphqlUrl = () => process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql'

import { getAdminToken } from './admin-auth'

export type Cause = {
  id:string; slug:string; name:string; description:string; imageUrl?:string|null; icon?:string|null; color?:string|null; isActive:boolean; sortOrder:number
}
export type Impact = { id:string; key:string; label:string; value:string; description?:string|null; sortOrder:number }
export type GalleryItem = { id:string; title:string; description?:string|null; imageUrl:string; category:'DAILY_LIFE_GROWTH'|'COMMUNITY_FELLOWSHIP'|'LEARNING_CREATIVITY'|'EVENTS_MILESTONES'|'OTHERS'|'EDUCATION'|'HEALTH'|'COMMUNITY'|'OTHER'; isPublished:boolean; sortOrder:number }
export type MediaAsset = { id:string; key:string; page:string; title?:string|null; altText?:string|null; url:string; description?:string|null }
export type NewsArticle = { id:string; title:string; slug:string; category:string; excerpt?:string|null; content:string; imageUrl?:string|null; published:boolean; publishedAt?:string|null; createdAt:string }
export type DashboardStats = { newContacts:number; newVolunteers:number; newSubscribers:number; causes:number; galleryItems:number; newsArticles:number }

export async function adminGraphql<T>(query:string, variables?:Record<string, unknown>):Promise<T>{
  const token=getAdminToken()
  if(!token) throw new Error('Your admin session has expired. Please sign in again.')
  const response=await fetch(getGraphqlUrl(),{
    method:'POST',
    headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
    body:JSON.stringify({query,variables}),
    cache:'no-store',
  })
  const payload=await response.json() as {data?:T;errors?:{message:string}[]}
  if(response.status===401 || response.status===403) throw new Error('Your admin session has expired. Please sign in again.')
  if(!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || 'Request failed')
  if(!payload.data) throw new Error('No data returned from the API')
  return payload.data
}

export const DASHBOARD_QUERY=`query { dashboardStats { newContacts newVolunteers newSubscribers causes galleryItems newsArticles } }`
export const CAUSES_QUERY=`query { adminCauses { id slug name description imageUrl icon color isActive sortOrder } }`
export const IMPACT_QUERY=`query { impactStatistics { id key label value description sortOrder } }`
export const GALLERY_QUERY=`query { adminGalleryItems { id title description imageUrl category isPublished sortOrder } }`
export const NEWS_QUERY=`query { adminNewsArticles { id title slug category excerpt content imageUrl published publishedAt createdAt } }`
export const MEDIA_QUERY=`query { mediaAssets { id key page title altText url description } }`
export const UPSERT_MEDIA=`mutation UpsertMedia($id:String,$input:MediaAssetInput!) { upsertMediaAsset(id:$id,input:$input) { id key page title altText url description } }`
export const DELETE_MEDIA=`mutation DeleteMedia($id:String!) { deleteMediaAsset(id:$id) }`

export const CREATE_CAUSE=`mutation CreateCause($input: CauseInput!) { createCause(input:$input) { id slug name description imageUrl icon color isActive sortOrder } }`
export const UPDATE_CAUSE=`mutation UpdateCause($id:String!,$input:CauseInput!) { updateCause(id:$id,input:$input) { id slug name description imageUrl icon color isActive sortOrder } }`
export const DELETE_CAUSE=`mutation DeleteCause($id:String!) { deleteCause(id:$id) }`

export const UPSERT_IMPACT=`mutation UpsertImpact($id:String,$input:ImpactStatisticInput!) { upsertImpactStatistic(id:$id,input:$input) { id key label value description sortOrder } }`
export const DELETE_IMPACT=`mutation DeleteImpact($id:String!) { deleteImpactStatistic(id:$id) }`

export const CREATE_GALLERY=`mutation CreateGallery($input:GalleryItemInput!) { createGalleryItem(input:$input) { id title description imageUrl category isPublished sortOrder } }`
export const UPDATE_GALLERY=`mutation UpdateGallery($id:String!,$input:GalleryItemInput!) { updateGalleryItem(id:$id,input:$input) { id title description imageUrl category isPublished sortOrder } }`
export const DELETE_GALLERY=`mutation DeleteGallery($id:String!) { deleteGalleryItem(id:$id) { id } }`

export const CREATE_NEWS=`mutation CreateNews($input:NewsArticleInput!) { createNewsArticle(input:$input) { id title slug category excerpt content imageUrl published publishedAt createdAt } }`
export const UPDATE_NEWS=`mutation UpdateNews($id:String!,$input:NewsArticleInput!) { updateNewsArticle(id:$id,input:$input) { id title slug category excerpt content imageUrl published publishedAt createdAt } }`
export const DELETE_NEWS=`mutation DeleteNews($id:String!) { deleteNewsArticle(id:$id) { id } }`


export type SiteSettings = { id:number; siteName:string; tagline:string; email:string; phone1?:string|null; phone2?:string|null; location?:string|null; whatsapp?:string|null; instagram?:string|null; facebook?:string|null; threads?:string|null; tiktok?:string|null; youtube?:string|null }
export type DonationMethod = { id:string; name:string; accountName?:string|null; accountNumber?:string|null; instructions?:string|null; logoUrl?:string|null; country?:string|null; city?:string|null; contactNumber?:string|null; isActive:boolean; sortOrder:number }
export type ContactSubmission = { id:string; name:string; email:string; phone?:string|null; subject?:string|null; message:string; status:string; createdAt:string }
export type VolunteerSubmission = { id:string; name:string; email:string; phone?:string|null; location?:string|null; interests?:string|null; availability?:string|null; experience?:string|null; message?:string|null; status:string; createdAt:string }
export type NewsletterSubscriber = { id:string; email:string; name?:string|null; status:string; subscribedAt:string }
export type SponsorSubmission = { id:string; name:string; email:string; phone?:string|null; location?:string|null; preferredContact?:string|null; message?:string|null; status:string; createdAt:string }
export type SubmissionSummary = { contacts:number; volunteers:number; subscribers:number; sponsors:number }
export const SITE_SETTINGS_QUERY=`query { siteSettings { id siteName tagline email phone1 phone2 location whatsapp instagram facebook threads tiktok youtube } }`
export const UPDATE_SITE_SETTINGS=`mutation UpdateSiteSettings($input:SiteSettingsInput!) { updateSiteSettings(input:$input) { id siteName tagline email phone1 phone2 location whatsapp instagram facebook threads tiktok youtube } }`
export const DONATION_METHODS_QUERY=`query { adminDonationMethods { id name accountName accountNumber instructions logoUrl country city contactNumber isActive sortOrder } }`
export const CREATE_DONATION=`mutation CreateDonation($input:DonationMethodInput!) { createDonationMethod(input:$input) { id name accountName accountNumber instructions logoUrl country city contactNumber isActive sortOrder } }`
export const UPDATE_DONATION=`mutation UpdateDonation($id:String!,$input:DonationMethodInput!) { updateDonationMethod(id:$id,input:$input) { id name accountName accountNumber instructions logoUrl country city contactNumber isActive sortOrder } }`
export const DELETE_DONATION=`mutation DeleteDonation($id:String!) { deleteDonationMethod(id:$id) }`
export const SUBMISSION_SUMMARY=`query { submissionSummary { contacts volunteers subscribers } }`
export const CONTACT_SUBMISSIONS=`query { contactSubmissions { id name email phone subject message status createdAt } }`
export const VOLUNTEER_SUBMISSIONS=`query { volunteerSubmissions { id name email phone location interests availability experience message status createdAt } }`
export const NEWSLETTER_SUBSCRIBERS=`query { newsletterSubscribers { id email name status subscribedAt } }`
export const SPONSOR_SUBMISSIONS=`query { sponsorSubmissions { id name email phone location preferredContact message status createdAt } }`
export const UPDATE_CONTACT_STATUS=`mutation UpdateContact($id:String!,$input:SubmissionStatusInput!) { updateContactSubmissionStatus(id:$id,input:$input) { id status } }`
export const UPDATE_VOLUNTEER_STATUS=`mutation UpdateVolunteer($id:String!,$input:SubmissionStatusInput!) { updateVolunteerSubmissionStatus(id:$id,input:$input) { id status } }`
export const UPDATE_NEWSLETTER_STATUS=`mutation UpdateNewsletter($id:String!,$input:SubmissionStatusInput!) { updateNewsletterSubscriberStatus(id:$id,input:$input) { id status } }`
export const UPDATE_SPONSOR_STATUS=`mutation UpdateSponsor($id:String!,$input:SubmissionStatusInput!) { updateSponsorSubmissionStatus(id:$id,input:$input) { id status } }`
export const ME_QUERY=`query { me { id email firstName lastName role isActive } }`
export const UPDATE_PROFILE=`mutation UpdateProfile($input:UpdateProfileInput!) { updateMyProfile(input:$input) { id email firstName lastName role isActive } }`
export const CHANGE_PASSWORD=`mutation ChangePassword($input:ChangePasswordInput!) { changeMyPassword(input:$input) }`

export async function deleteAdminImage(path:string, sha:string){
  const token=getAdminToken(); if(!token) throw new Error('Your admin session has expired. Please sign in again.')
  const response=await fetch(`${new URL(getGraphqlUrl()).origin}/api/admin/media/image`,{method:'DELETE',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({path,sha}),cache:'no-store'})
  const payload=await response.json().catch(()=>({})) as {message?:string}
  if(response.status===401||response.status===403) throw new Error('Your admin session has expired. Please sign in again.')
  if(!response.ok) throw new Error(payload.message||'Image deletion failed.')
  return payload as {deleted:boolean;commitSha:string}
}

export async function uploadAdminImage(file: File, folder: 'news' | 'gallery' | 'uploads' = 'uploads') {
  const token = getAdminToken()
  if (!token) throw new Error('Your admin session has expired. Please sign in again.')

  const graphqlUrl = getGraphqlUrl()
  const apiBase = new URL(graphqlUrl).origin
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch(`${apiBase}/api/admin/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: 'no-store',
  })

  const rawBody = await response.text()
  let payload: {
    imageUrl?: string
    path?: string
    commitSha?: string
    message?: string
    error?: string
    statusCode?: number
  } = {}

  try {
    payload = rawBody ? JSON.parse(rawBody) : {}
  } catch {
    payload = { message: rawBody }
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error('Your admin session has expired. Please sign in again.')
  }

  if (!response.ok || !payload.imageUrl) {
    const detail = payload.message || payload.error || rawBody || `HTTP ${response.status}`
    throw new Error(`Image upload failed (${response.status}): ${detail}`)
  }

  return {
    imageUrl: payload.imageUrl,
    path: payload.path || '',
    commitSha: payload.commitSha || '',
  }
}

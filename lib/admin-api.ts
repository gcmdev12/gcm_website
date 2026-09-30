const getGraphqlUrl = () => process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql'

import { getAdminToken } from './admin-auth'

export type Cause = {
  id:string; slug:string; name:string; description:string; imageUrl?:string|null; icon?:string|null; color?:string|null; isActive:boolean; sortOrder:number
}
export type Impact = { id:string; key:string; label:string; value:string; description?:string|null; sortOrder:number }
export type GalleryItem = { id:string; title:string; description?:string|null; imageUrl:string; category:'EDUCATION'|'HEALTH'|'COMMUNITY'|'OTHER'; isPublished:boolean; sortOrder:number }
export type NewsArticle = { id:string; title:string; slug:string; excerpt?:string|null; content:string; imageUrl?:string|null; published:boolean; publishedAt?:string|null; createdAt:string }
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
export const NEWS_QUERY=`query { adminNewsArticles { id title slug excerpt content imageUrl published publishedAt createdAt } }`

export const CREATE_CAUSE=`mutation CreateCause($input: CauseInput!) { createCause(input:$input) { id slug name description imageUrl icon color isActive sortOrder } }`
export const UPDATE_CAUSE=`mutation UpdateCause($id:String!,$input:CauseInput!) { updateCause(id:$id,input:$input) { id slug name description imageUrl icon color isActive sortOrder } }`
export const DELETE_CAUSE=`mutation DeleteCause($id:String!) { deleteCause(id:$id) }`

export const UPSERT_IMPACT=`mutation UpsertImpact($id:String,$input:ImpactStatisticInput!) { upsertImpactStatistic(id:$id,input:$input) { id key label value description sortOrder } }`
export const DELETE_IMPACT=`mutation DeleteImpact($id:String!) { deleteImpactStatistic(id:$id) }`

export const CREATE_GALLERY=`mutation CreateGallery($input:GalleryItemInput!) { createGalleryItem(input:$input) { id title description imageUrl category isPublished sortOrder } }`
export const UPDATE_GALLERY=`mutation UpdateGallery($id:String!,$input:GalleryItemInput!) { updateGalleryItem(id:$id,input:$input) { id title description imageUrl category isPublished sortOrder } }`
export const DELETE_GALLERY=`mutation DeleteGallery($id:String!) { deleteGalleryItem(id:$id) }`

export const CREATE_NEWS=`mutation CreateNews($input:NewsArticleInput!) { createNewsArticle(input:$input) { id title slug excerpt content imageUrl published publishedAt createdAt } }`
export const UPDATE_NEWS=`mutation UpdateNews($id:String!,$input:NewsArticleInput!) { updateNewsArticle(id:$id,input:$input) { id title slug excerpt content imageUrl published publishedAt createdAt } }`
export const DELETE_NEWS=`mutation DeleteNews($id:String!) { deleteNewsArticle(id:$id) }`

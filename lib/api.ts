const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://gcmbackend.up.railway.app/graphql'
export type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }
export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>, token?: string): Promise<T> {
  const response = await fetch(GRAPHQL_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ query, variables }), cache: 'no-store' })
  const payload = (await response.json()) as GraphQLResponse<T>
  if (!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || 'Request failed')
  if (!payload.data) throw new Error('No data returned from the API')
  return payload.data
}


export const SUBMIT_CONTACT_FORM = `mutation SubmitContactForm($input:ContactSubmissionInput!) { submitContactForm(input:$input) }`
export const SUBMIT_VOLUNTEER_FORM = `mutation SubmitVolunteerForm($input:VolunteerSubmissionInput!) { submitVolunteerForm(input:$input) }`
export const SUBSCRIBE_NEWSLETTER = `mutation SubscribeNewsletter($input:NewsletterInput!) { subscribeNewsletter(input:$input) }`


export const PUBLIC_MEDIA_QUERY = `query { mediaAssets { id key page title altText url description } }`

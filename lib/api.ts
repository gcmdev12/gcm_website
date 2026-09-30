const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://gcmbackend.up.railway.app/graphql'
export type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }
export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>, token?: string): Promise<T> {
  const response = await fetch(GRAPHQL_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ query, variables }), cache: 'no-store' })
  const payload = (await response.json()) as GraphQLResponse<T>
  if (!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || 'Request failed')
  if (!payload.data) throw new Error('No data returned from the API')
  return payload.data
}

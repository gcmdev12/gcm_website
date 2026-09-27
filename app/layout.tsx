import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glory Children Ministry | Hope, Education & Opportunity',
  description:
    'Glory Children Ministry is an NGO caring for vulnerable children with education, healthcare, nutritious food, guidance, counselling and opportunities to thrive.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

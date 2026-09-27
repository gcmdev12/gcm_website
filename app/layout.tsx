import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glory Children Ministry | Hope, Education & Opportunity',
  description:
    'Glory Children Ministry is an NGO caring for vulnerable children with education, healthcare, nutritious food, guidance, counselling and opportunities to thrive.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      },
      {
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        url: '/favicon-512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
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
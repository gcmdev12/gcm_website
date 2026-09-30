import type { ReactNode } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <ScrollToTop />
    </>
  )
}
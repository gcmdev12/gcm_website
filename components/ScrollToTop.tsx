'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const threshold = window.innerWidth <= 760 ? 180 : 420
      setVisible(window.scrollY > threshold)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <span className="scroll-top-ring" aria-hidden="true" />
      <ChevronUp size={21} strokeWidth={2.7} />
    </button>
  )
}

import type { ReactNode } from 'react'

import '../../styles/manage.css'

export default function ManageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return children
}
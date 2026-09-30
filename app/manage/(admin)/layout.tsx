import type { ReactNode } from 'react'
import '../../../styles/manage.css'
import ManageShell from '../../../components/manage/ManageShell'

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <ManageShell>{children}</ManageShell>
}

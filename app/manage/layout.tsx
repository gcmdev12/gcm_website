'use client'

import { usePathname } from 'next/navigation'
import '../../styles/manage.css'
import ManageShell from '../../components/manage/ManageShell'

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/manage/login') return <>{children}</>
  return <ManageShell>{children}</ManageShell>
}

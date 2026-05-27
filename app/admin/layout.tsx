import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

const ADMIN_COOKIE = 'veloria_admin'

export const metadata = {
  title: 'Admin — Velória Imóveis',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE)
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret || !session?.value || session.value !== secret) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-deep text-off-white">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

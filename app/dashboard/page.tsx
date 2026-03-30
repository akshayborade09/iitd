import { prisma } from '@/lib/prisma'
import DashboardClient from '@/components/DashboardClient'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const rows = await prisma.registration.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const registrations = rows.map(r => ({
    id: r.id,
    name: r.name,
    whatsapp: r.whatsapp,
    city: r.city,
    duration: r.duration,
    travelStatus: r.travelStatus,
    accommodation: r.accommodation,
    createdAt: r.createdAt.toISOString(),
  }))

  return <DashboardClient registrations={registrations} />
}

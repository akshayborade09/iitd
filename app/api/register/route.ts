import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, whatsapp, city, duration, travelStatus, accommodation } = body

    if (!name || !whatsapp || !city || !duration || !travelStatus || !accommodation) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const registration = await prisma.registration.create({
      data: { name, whatsapp, city, duration, travelStatus, accommodation },
    })

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 })
  } catch (err) {
    console.error('[register] DB error:', err)
    return NextResponse.json({ error: 'Failed to save registration', detail: String(err) }, { status: 500 })
  }
}

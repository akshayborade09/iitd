import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.TURSO_DATABASE_URL
  const hasToken = !!process.env.TURSO_AUTH_TOKEN

  let dbResult: unknown = null
  let dbError: string | null = null

  try {
    const rows = await prisma.registration.findMany()
    dbResult = { count: rows.length, rows }
  } catch (e) {
    dbError = String(e)
  }

  return NextResponse.json({
    TURSO_DATABASE_URL: url ?? 'NOT SET',
    TURSO_AUTH_TOKEN: hasToken ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    db: dbResult,
    dbError,
  })
}

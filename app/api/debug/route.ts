import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.TURSO_DATABASE_URL
  const hasToken = !!process.env.TURSO_AUTH_TOKEN
  return NextResponse.json({
    TURSO_DATABASE_URL: url ?? 'NOT SET',
    TURSO_AUTH_TOKEN: hasToken ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  })
}

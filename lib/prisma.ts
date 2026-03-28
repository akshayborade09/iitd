import path from 'node:path'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

function createPrismaClient() {
  const libsql = createClient({ url: `file:${dbPath}` })
  const adapter = new PrismaLibSql(libsql)
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

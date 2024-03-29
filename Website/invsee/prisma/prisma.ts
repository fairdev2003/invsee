import { PrismaClient as pc } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: pc | undefined;
};

const db = globalForPrisma.prisma ?? new pc();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export { db };







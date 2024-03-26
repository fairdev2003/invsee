import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

const trpc = initTRPC.create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;

export const createContext = async (req: NextRequest, opts?: CreateNextContextOptions) => {
    const session = await getServerSession({});
   
    return {
        session
    };
};
   
const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
    errorFormatter: ({ shape }) => {
        return shape;
    }
});

export const protectedProcedure = t.procedure.use(async function isAuthed({ ctx, next }) {
    if (!ctx?.session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            cause: "No account in the session",
            message: "You need to log in to view this content!"
        });
    }

    return next({ ctx });
});




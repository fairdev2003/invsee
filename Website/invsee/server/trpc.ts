import { db } from '@/prisma/prisma';
import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { LogAuthorized, LogUnAuthorized } from './trafficLogger';

const trpc = initTRPC.create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;

type IP = {
    dns: {
        ip: string;
        geo: string;
    }
}

export const createContext = async (req: NextRequest, opts?: CreateNextContextOptions) => {

    const session = await getServerSession({});

    const ip: IP = (await axios.get("http://edns.ip-api.com/json")).data
    console.log("IP", ip)
   
    return {
        ip,
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

        console.log((await LogUnAuthorized(ctx?.ip.dns.ip, 401, ctx?.ip.dns.geo, "UNAUTHORIZED")).message)

        throw new TRPCError({
            code: "UNAUTHORIZED",
            cause: "No account in the session",
            message: "You need to log in to view this content!"
        });
    }

    const user = await db.user.findFirst({
        where: {
            email: `${ctx?.session?.user?.email}`
        }
    })

    console.log((await LogAuthorized(ctx?.ip.dns.ip, 200, ctx?.ip.dns.geo, "AUTHORIZED", user?.id)).message)

    return next({ ctx: {
        user
    } });
});




'use server'

import { db } from "@/prisma/prisma"

export const LogUnAuthorized = async (ip: string, code: number, geo: string, code_message: string, user_id?: string) => {
    const message = `User with IP address ${ip} was not authorized with code ${code}`

    const date = new Date().toTimeString()

    const create = await db.traffic.create({data: {
        ip, code, geo, code_message, createdAt: date, user_id
    }})

    return message

}

export const LogAuthorized = async (ip: string, code: number, geo: string, code_message: string, user_id?: string) => {
    const message = `User with IP address ${ip} was authorized with code ${code}`

    const date = new Date().toTimeString()

    const create = await db.traffic.create({data: {
        ip, code, geo, code_message, message, createdAt: date, user_id
    }})

    return message

}


'use client'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ApiProvider from "@/api/ApiProvider";

const poppins = Poppins({ weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["devanagari"], preload: true})

type Props = {
    params: { nick: string };
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <ApiProvider>
                <div className={poppins.className}>{children}</div>
            </ApiProvider>
        </html>
    )
}
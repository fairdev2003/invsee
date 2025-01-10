'use client'
import Provider from '@/app/_trpc/TRPCProvider'
import { AuthProvider } from '@/components/AuthProviders'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";

const poppins = Poppins({ weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["devanagari"], preload: true})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={poppins.className}>
          <QueryClientProvider client={queryClient}>
           { children }
          </QueryClientProvider>
      </body>
    </html>
  )
}
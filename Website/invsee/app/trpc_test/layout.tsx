import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProviders';
import Provider from '../_trpc/TRPCProvider';
import { Suspense } from 'react';


const poppins = Poppins({ weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["devanagari"], preload: true})

export const metadata: Metadata = {
  title: 'Trpc test',
  description: 'Test website for typed RPC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        
      </body>
      {children}
    </html>
  )
}
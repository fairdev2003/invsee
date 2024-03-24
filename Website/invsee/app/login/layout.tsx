import { AuthProvider } from '@/components/AuthProviders'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Poppins } from 'next/font/google'


const poppins = Poppins({ weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["devanagari"], preload: true})

export const metadata: Metadata = {
  title: 'Login',
  description: 'You can log in here!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <div className={poppins.className}>{children}</div>
    </html>
  )
}
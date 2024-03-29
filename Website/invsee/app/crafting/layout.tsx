import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google';


const poppins = Poppins({ weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"], subsets: ["devanagari"], preload: true})

export const metadata: Metadata = {
  title: 'Crafting',
  description: 'Wiki about your favorite mods!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GoogleOAuthProvider clientId="nmvlat653jk92gqajvik5mcep4rb0kv5.apps.googleusercontent.com">
          <Navbar/>
          {children}
        </GoogleOAuthProvider>;
      </body>
    </html>
  )
}
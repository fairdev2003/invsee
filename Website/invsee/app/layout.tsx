import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/AuthProviders";
import Provider from "./_trpc/TRPCProvider";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["devanagari"],
  preload: true,
});

export const metadata: Metadata = {
  title: "LookAtYourServer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Provider>
            
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}

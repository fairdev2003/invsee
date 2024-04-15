'use server'

import Navbar from '@/components/navbar'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import BackgroundImage from '@/assets/background.jpg'
import ExploreSection from '@/components/mainpage/ExploreSection';
import InfoSection from '@/components/mainpage/InfoSection';
import LiveChatPresentSection from '@/components/mainpage/LiveChatPresentSection';
import ApiComponent from '@/components/mainpage/ApiSection';
import MoreComingComponent from '@/components/mainpage/MoreComingSection';
import AccountSwitchComponent from '@/components/mainpage/SwitchExplainSection';
import AboutMeSection from '@/components/dashboard/sections/AboutAuthorSection';
import Footer from '@/components/footer';



export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center mb-[100px]" id='mainpage'>
      <ExploreSection/>
      <InfoSection/>
      <LiveChatPresentSection/>
      <ApiComponent/>
      <AccountSwitchComponent/>
      <MoreComingComponent/>
      <AboutMeSection/>
      <Footer/>
    </main>
  )
}

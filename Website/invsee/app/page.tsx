'use server'

import Navbar from '@/components/navbar';
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
    <main className="flex flex-col justify-center items-center" id='mainpage'>
      <Navbar/>
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

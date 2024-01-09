'use client'

import Navbar from '@/components/navbar';
import { CopyBlock, a11yDark, CodeBlock } from 'react-code-blocks';

function Page() {
  return (
    <main className=''>
        <Navbar></Navbar>
        <div className='px-[100px] py-5 flex flex-col gap-2'>
            <h1 className='text-white text-[40px] font-[700]'>Intrudaction</h1>
            <div className='h-[0.1px] bg-white'></div>
            <h2 className='text-white text-[25px] font-[600] my-3'>What the mod offers: </h2>
            <div className='mx-10 text-[19px]'>
                <p className='text-white'>• Live Data from the server</p>
                <p className='text-white'>• Admin Panel</p>
                <p className='text-white'>• Command Prompt to manage players on the server</p>
                <p className='text-white'>• Live chat on the both sides {`(webiste > minecraft,  minecraft > webiste)`}</p>
                <p className='text-white'>• Players and admins can log in safely from special id which is assigned to each player on the server when join</p>
                <p className='text-white'>• Player which is logged in can make auctions for items he has in the inventory (ae2 & rs including)</p>
                <p className='text-white'>• Each item in player inventory and system can be inspected on the Modded Items Wiki</p>
            </div>
        </div>

        
        
    </main>
  )
}

export default Page;
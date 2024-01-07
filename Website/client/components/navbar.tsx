'use client'

import Image from "next/image"
import controller from '@/assets/controller.gif'
import { Button } from "./ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import React from "react"
import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center">
            <Image alt="controller" src={controller} width={76} height={57}></Image>
            <h1 className="text-white text-[25px] font-[600]">LookAtYourServer</h1>
        </div>
        <div className="flex gap-2">
            <HoverCard openDelay={1} closeDelay={1}>
                <HoverCardTrigger><Link href='/installation' className="text-white"><b>Installation</b></Link></HoverCardTrigger>
                <HoverCardContent className="">
                    Learn how to install the mod and use on the server
                </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={1} closeDelay={1}>
                <HoverCardTrigger><Link href='/installation' className="text-white"><b>Wiki</b></Link></HoverCardTrigger>
                <HoverCardContent className="">
                    Learn more about modded world and explore new horizons!
                </HoverCardContent>
            </HoverCard>
        </div>
    </nav>
  )
}

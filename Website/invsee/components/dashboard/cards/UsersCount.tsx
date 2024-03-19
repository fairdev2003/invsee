import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { User, Wrench, Database, Newspaper, Group, Tag, Grid3X3, Music } from "lucide-react";
import Meatball from '@/assets/meatball.svg'
import Image from "next/image";
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'


interface UserCountProps {
    card_name: string
    count: number | undefined
    link: string
}

const UsersCount = ({
    card_name = "Users",
    count = 230,
    link = "allies"
}: UserCountProps) => {

    const router = useRouter()

    const handlePhoto = () => {
        switch (card_name) {
            case "Users" : return (<User className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Items": return (<Wrench className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Mods": return (<Database className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Wiki Pages": return (<Newspaper className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Authors": return (<Group className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Tags": return (<Tag className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Crafting": return (<Grid3X3 className="text-white group-hover:text-emerald-500 transition-colors"/>);
            case "Music": return (<Music className="text-white group-hover:text-emerald-500 transition-colors"/>);
            
        }
    }

    return (
        <Card onClick={() => {
            router.push(
                `/dashboard?section=${link}`
            );
        }} id='user_card' className="relative group border-[2px] flex overflow-hidden flex-col gap-10 border-gray-900/50 rounded-md text-white p-5 h-[150px] cursor-pointer hover:border-emerald-500 transition-colors duration-300">
            <div className="flex gap-2 group-hover:font-[600]">
                {handlePhoto()}
                <h1 className="group-hover:text-emerald-500 transition-colors">{card_name}</h1>
                <Image src={Meatball} id="spin-meat" className="w-[200px] text-white h-[200px] opacity-10 group-hover:opacity-80 transition-opacity absolute left-5 top-10" alt="meatball"/>
            </div>
            <h1 className="flex justify-end font-[800] text-4xl text-white group-hover:text-emerald-500 transition-colors">{count}</h1>
        </Card>
    )
}

export default UsersCount;
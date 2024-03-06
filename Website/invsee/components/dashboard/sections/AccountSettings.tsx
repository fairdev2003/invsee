

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/stores/user_store';
import { Crown, Hammer, Star } from 'lucide-react';

export default function AccountSettings() {
    const { data: token, status } = useSession()

    const { account_data, setAccountData } = useUserStore()

    return (
        <section>
            {account_data ? <div>
                <h1 className="text-2xl text-white font-[600]">Account Seetings</h1>
                <div className="bg-gray-900/80 h-[150px] w-[400px] mt-5 rounded-lg flex gap-x-5 items-center p-5 px-7">
                    <div className='relative'>
                        <Image alt='profile image' src={account_data[0]?.image_src || "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"} height={100} width={100} className='rounded-lg'></Image>
                    </div>
                    <div>
                        <p className="text-white font-[600] text-xl">{account_data.length > 0 ? account_data[0].nick : null}</p>
                        <p className="text-blue-500 font-[400] text-md">{account_data.length > 0 ? account_data[0].first_name : null}{" "}{account_data.length > 0 ? account_data[0].last_name : null}</p>
                        <div className="flex gap-1">
                            {account_data.length > 0 && account_data[0].role === "Editor" ? <Hammer className='text-orange-400 w-5 h-5'/> : null}
                            {account_data.length > 0 && account_data[0].role === "Mod" ?<Star className='text-orange-400 w-5 h-5'/> : null}
                            {account_data.length > 0 && account_data[0].role === "Admin" ?<Crown className='text-orange-400 w-5 h-5'/> : null}
                            <p className="text-white font-[400] text-sm">{account_data.length > 0 ? account_data[0].role : null}</p>
                        </div>
                    </div>
                </div>
            </div> : null}
        </section>
    )
}
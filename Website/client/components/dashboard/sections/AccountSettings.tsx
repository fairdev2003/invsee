

import Image from 'next/image';
import PFP from '@/assets/Avatar.png';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'mongoose';

interface AccountSettingsProps {
    account_data?: any;
}

export default function AccountSettings({account_data} : AccountSettingsProps) {
    const { data: token, status } = useSession()

    const [accountData, setAccountData] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const getAccountData = async () => {
        try {
            const response = await axios.get(
              `/api/user?search_by=email&name=${token?.user?.email}`
            );
            setAccountData(response.data[0])
          } catch (error) {
            console.error("Error checking role:", error);
          } finally {
            setLoading(false);
          }
    }

    useEffect(() => {
        getAccountData()
    }, [])

    return (
        <section>
            {accountData ? <div>
                <h1 className="text-2xl text-white font-[600]">Account Seetings</h1>
                <div className="bg-[#32343a] w-full h-[150px] mt-5 rounded-lg flex gap-x-5 items-center p-5 px-7">
                    <div className='relative'>
                        <Image alt='profile image' src={PFP} height={100} width={100} className='rounded-lg'></Image>
                    </div>
                    <div>
                        <p className="text-white font-[600] text-lg">{accountData.nick}</p>
                        <div className="flex gap-1">
                            <p className="text-white font-[400] text-sm">{accountData.role}</p>
                        </div>
                    </div>
                </div>
            </div> : null}
        </section>
    )
}
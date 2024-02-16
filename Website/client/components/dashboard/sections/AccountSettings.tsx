
import Image from 'next/image';
import PFP from '@/assets/Avatar.png';

import { MdChangeCircle } from "react-icons/md";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';

export default function AccountSettings() {

    const [account, setAccount] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getAccountInfo = async () => {

        setLoading(true);

        try {
            const response = await axios.post("/api/login/get_user", { id: localStorage.getItem("user_id")});
            setAccount(response.data[0]);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    useEffect(() => {
        getAccountInfo();
    }, [])

    return (
        <section>
            {loading === false ? <div>
                <h1 className="text-2xl text-white font-[600]">Account Seetings</h1>
                <div className="bg-[#32343a] w-full h-[150px] mt-5 rounded-lg flex gap-x-5 items-center p-5 px-7">
                    <div className='relative'>
                        <Image alt='profile image' src={PFP} height={100} width={100} className='rounded-lg'></Image>
                    </div>
                    <div>
                        <p className="text-white font-[600] text-lg">{account.nick}</p>
                        <div className="flex gap-1">
                            <p className="text-white font-[400] text-sm">{account.role}</p>
                        </div>
                    </div>
                </div>
            </div> : <div>Loading...</div>}
        </section>
    )
}
'use server'

import Image from 'next/image';
import PFP from '@/assets/Avatar.png';
import { connect } from 'http2';
import { connectMongo } from '@/app/api/mongo/mongo';


const getAccountInfo = async () => {
    const client = await connectMongo();
    const db = await client.db("test");

    const account_info = await db.collection("users").findOne({email: ""});
    return account_info;
}


export default async function AccountSettings() {

    const acc = await getAccountInfo();

    return (
        <section>
            {acc ? <div>
                <h1 className="text-2xl text-white font-[600]">Account Seetings</h1>
                <div className="bg-[#32343a] w-full h-[150px] mt-5 rounded-lg flex gap-x-5 items-center p-5 px-7">
                    <div className='relative'>
                        <Image alt='profile image' src={PFP} height={100} width={100} className='rounded-lg'></Image>
                    </div>
                    <div>
                        <p className="text-white font-[600] text-lg">{acc.nick}</p>
                        <div className="flex gap-1">
                            <p className="text-white font-[400] text-sm">{acc.role}</p>
                        </div>
                    </div>
                </div>
            </div> : <div>Loading...</div>}
        </section>
    )
}
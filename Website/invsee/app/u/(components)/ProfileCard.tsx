'use client'

import Image from "next/image";
import {AccessPower, UserType} from "@/types";
import {useUserStore} from "@/stores/user_store";
import {EditProvider} from "@/app/u/(components)/tools/EditProvider";

/**
 * ```js
 *  const InfoCard = ({ _id, firstName, lastName, nick, image, email, role }: Omit<UserType, "password">) => JSX.Element
 * ```
 * @constructor
 * @access public
 * */

type ProfileCardProps = Omit<UserType, "password"> & {
    accessPower: AccessPower;
}
const ProfileCard = ({ _id, firstName, lastName, nick, image, email, role, backgroundImage, accessPower }: ProfileCardProps) => {

    const { account_data } = useUserStore()

    return (
        <div className='flex flex-col gap-[10px] h-[500px]'>

            {!backgroundImage && <div className='gap-2 bg-lime-200 h-[200px] w-full relative'>
                <Image alt={`profile-pfp-${nick}`} src={image} className="w-[150px] h-[150px] rounded-full absolute bottom-[-50px] left-[30px] border-black border-[10px]" width={150} height={150} />
            </div>}
            <div className="flex items-center w-full h-[40px] px-[200px]">

            </div>
            <div className='mt-5 px-5 flex flex-col gap-2'>
                <p>{role}</p>
                <p className='flex gap-1 text-2xl font-semibold items-center'>{firstName} {lastName} {account_data?._id === _id && <span className='text-sm font-normal'>{"(You)"}</span>}</p>
                <EditProvider onSave={(e) => {
                    console.log("profile", e)
                    return true
                }} access={accessPower === "admin" || accessPower === "secure"}>
                    <p className='text-md font-md flex gap-1'>{nick}</p>
                </EditProvider>
            </div>

        </div>
    )
}

export default ProfileCard;

const AdminBadge = () => {
    return (
        <span className="">Admin</span>
    )
}

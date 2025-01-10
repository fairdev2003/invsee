import {motion} from 'framer-motion'
import {UserType} from "@/types";

type AdminViewProps = {
    viewName: string
    user: Omit<UserType, "password">
}

const AdminView = ({viewName, user}: AdminViewProps) => {
    return (
        <motion.div>
            <div className='flex justify-between gap-4 items-center py-3 w-full bg-blue-600 text-white px-10 text-sm'>
                <div className='flex gap-4 items-center'>
                    <p className="text-lg font-semibold">{AdminView.displayName}</p>
                    <p className='bg-gray-700 p-1 px-4 rounded-md text-gray-300'>
                        {viewName}
                    </p>
                </div>
                <div>
                    <p className='flex gap-1 p-1 px-4 rounded-md text-gray-300 items-center'>
                        <p>Your current role is</p>
                        <span className="bg-green-500 p-1 rounded-md">
                        {user.role}
                    </span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

AdminView.displayName = "Admin View"

export default AdminView
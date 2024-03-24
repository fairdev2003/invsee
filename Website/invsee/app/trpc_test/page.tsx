'use client'

import { trpc } from "../_trpc/client"

const TestTRPC = () => {

    const trpc_data = trpc.user.getUser.useQuery()
    console.log(trpc_data.data)

    return (
        <div className="mb-10">
            <h1 className="text-4xl text-white font-[700] p-5">Prisma Test</h1>
            <div className="text-white flex flex-col gap-4 mx-4">
                {trpc_data?.isSuccess ? trpc_data?.data?.map((item: any, index: number) => {
                    return <>
                        {item.posts && item.posts.length > 0 ? <div className="flex gap-2 bg-green-500 p-5 rounded-lg text-black text-lg font-bold">
                            <p>User {item.firstName} {item.lastName}</p>
                        </div> : null}
                        {item.posts && item.posts.length > 0 ? <div className="flex flex-col bg-gray-700 p-5 rounded-lg">
                            <h1 className="font-bold text-2xl">Posts:</h1>
                            {item.posts && item.posts.length > 0 ? item.posts.map((post: any) => {
                                return (<div className="mt-4">
                                    <div className='flex flex-col mb-3'>
                                        <p>{post.title}</p>
                                        <p>{post.description}</p>
                                    </div>
                                
                                </div>)
                            }) : null}
                        </div> : null}
                    </>
                }) : <div className="flex justify-center"><span className="loader"></span></div>}
                    
            </div>
        </div>
    )


}

export default TestTRPC
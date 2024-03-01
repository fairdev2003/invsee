'use client'

import { useSession } from "next-auth/react";

function Session() {
    const session = useSession()
    console.log(session)

    return (
        <div></div>
    )
}

export default Session;
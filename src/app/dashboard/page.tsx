
import React from 'react'
import Link from 'next/link'

function Page() {
    return (
        <>
            <div className='h-screen flex justify-center items-center  flex-col gap-3'>
                <h1>Welcome to Dashboard</h1>
                <Link href='/' className='p-2 rounded-md bg-green-500'>Return | go back</Link>
            </div>
        </>
    )
}

export default Page
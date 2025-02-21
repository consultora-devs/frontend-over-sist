import React from 'react'
import Image from 'next/image'
function Header() {
    return (
        <header className=" text-white w-full py-2 px-10  font-bold text-2xl text-right flex items-center justify-end">   

                <Image src="/logo-overhaul.jpg" alt="logo" width={120} height={120}
                    className="rounded-md p-1 bg-white"
                />
        </header>
    )
}

export default Header
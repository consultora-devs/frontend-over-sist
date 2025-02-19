
import { Sidebar } from '@/app/components/slider'
import LogoutButton from "@/app/components/LogoutButton"

export default function EmpresasLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            <header className="bg-gray-800 text-white w-full py-5 px-10  font-bold text-2xl text-right flex items-center justify-between">
                <LogoutButton />
                <p>OVERSIST</p>
            </header>
           <div className='flex'>
           <Sidebar />
            {children}
           </div>
        </div>
    );
}

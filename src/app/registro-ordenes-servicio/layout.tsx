
import { Sidebar } from '@/app/components/slider'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>


            <div className='flex'>
                <Sidebar />

                <div className='w-full'>
                    <header className="bg-gray-800 text-white w-full py-5 pr-10  font-bold text-2xl text-right ">
                        OVERSIST
                    </header>
                    {children}
                </div>
            </div>
        </>

    );
}

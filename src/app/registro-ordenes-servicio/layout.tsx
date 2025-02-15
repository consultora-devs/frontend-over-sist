
import { Sidebar } from '@/app/components/slider'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="bg-gray-800 text-white w-full py-5 px-6 md:px-16 font-bold text-2xl text-center md:text-left">
                OVERSIST
            </header>

            <div className='flex'>
                <Sidebar />
                {children}
            </div>
        </>

    );
}


import { Sidebar } from '@/app/components/slider'
import Header from '@/app/components/header';

export default function EmpresasLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            <Header/>
           <div className='flex'>
           <Sidebar />
            {children}
           </div>
        </div>
    );
}


import { Sidebar } from '@/app/components/slider'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        {children}
        </>

    );
}

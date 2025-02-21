
import Sidevar from "@/app/components/sidebar"

export default function EmpresasLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            <Sidevar />
            <div className="py-12 sm:ml-64">
                {children}
            </div>

        </div>
    );
}

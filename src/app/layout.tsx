import "./globals.css";
import { Providers } from "./providers";
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'
import { Sidebar } from '@/app/components/slider'
import LogoutButton from "../app/components/LogoutButton"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark  bg-background">
      <body>
        <Providers>
          <div className='flex'>
            <Sidebar />
            <div className='w-full'>
              <header className="bg-gray-800 text-white w-full py-5 px-10  font-bold text-2xl text-right flex items-center justify-between">
                <LogoutButton/>
                <p>OVERSIST</p>
              </header>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

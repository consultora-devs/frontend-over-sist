import "./globals.css";
import { Providers } from "./providers";
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'

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
            <div className='w-full'>

              {children}
            </div>
        </Providers>
      </body>
    </html>
  );
}

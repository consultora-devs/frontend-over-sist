import "./globals.css";
import { Providers } from "./providers";
import {ThemeSwitcher} from '@/app/components/ThemeSwitcher'
import {Sidebar} from '@/app/components/slider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark  bg-background">
      <body>
        <Providers>
        
        {children}
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import { Providers } from "./providers";
import {ThemeSwitcher} from '@/app/components/ThemeSwitcher'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark  bg-background">
      <body>
        <Providers>
        <ThemeSwitcher/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

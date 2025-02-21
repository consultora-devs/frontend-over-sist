"use client";
import "./globals.css"
import { useState, useEffect } from "react";
import { Providers } from "./providers";
import ButtonTheme from "@/app/components/ButtonTheme"; // Importa el componente ButtonTheme

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);

  // Comprobar el estado guardado en localStorage al cargar la página
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setDarkMode(savedMode === "dark");
    }
  }, []);

  // Cambiar el tema y guardarlo en localStorage
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className="bg-white dark:bg-gray-800 transition-colors duration-300">
        <Providers>

          <div className="w-full flex flex-col gap-10">

            <div>
              <ButtonTheme darkMode={darkMode} toggleTheme={toggleTheme} />
            </div>
            
            <div>
              {children}
            </div>

          </div>

        </Providers>
      </body>
    </html>
  );
}

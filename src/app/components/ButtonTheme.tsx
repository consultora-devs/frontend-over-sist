"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

// Actualizamos el componente ButtonTheme para recibir darkMode y toggleTheme como props
const ButtonTheme = ({ darkMode, toggleTheme }: { darkMode: boolean, toggleTheme: () => void }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 m-3 text-white bg-gray-800 dark:bg-gray-200 rounded-full fixed right-4 top-20 transform -translate-y-1/2 focus:outline-none z-50"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-400" />
      )}
    </button>
  );
};

export default ButtonTheme;

// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  function ModoDark() {
    setTheme('dark')
  }

  function ModoLight() {
    setTheme('light')
  }

  return (
    <div className="bg-gray-800 p-2 max-w-max rounded-lg flex gap-2">
      <button className="bg-green-500 rounded-md p-2" onClick={ModoLight}>{theme === 'light' ? 'Light' : 'Light'}</button>
      <button className="bg-orange-500 rounded-md p-2" onClick={ModoDark}>{theme === 'dark' ? 'Dark' : 'Dark'}</button>
    </div>
  )
};
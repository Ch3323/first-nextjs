"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

function Darkmode() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button size={'icon'}
    variant={'secondary'}
      onClick={toggleTheme}
      className="rounded-full"
    >
      <Moon className="w-6 h-6 dark:hidden" />
      <Sun className="w-6 h-6 hidden dark:block" />
    </Button>
  )
}
export default Darkmode
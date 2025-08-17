"use client"

import { Input } from "../ui/input"
import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div className="relative w-full max-w-xl select-none">

      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>

      <Input
        type="text"
        placeholder="Search anime..."
        className="pl-10 w-full"
      />
    </div>
  )
}

export default SearchBar

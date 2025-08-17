"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() != "") {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-xl select-none">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>

      <Input
        type="text"
        placeholder="Search anime..."
        className="pl-10 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 pl-3 text-muted-foreground"
        onClick={handleSearch}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}

export default SearchBar;

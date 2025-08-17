"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AnimeCard from "@/components/AnimeList/AnimeCard";
import Loading from "@/components/Loading";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}&limit=12`
        );
        const data = await res.json();
        setResults(data.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-12 lg:px-24 py-8">
        <h1 className="text-2xl font-bold mb-3">
          Search results for &quot;{query}&quot;
        </h1>
        <hr />

        {loading && (
          <div className="w-full h-screen">
            <Loading />
          </div>
        )}

        {!loading && results.length === 0 && <p>No results found.</p>}

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {results.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

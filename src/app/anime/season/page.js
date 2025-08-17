"use client";

import { useState, useEffect } from "react";
import AnimeCard from "@/components/AnimeList/AnimeCard";
import Loading from "@/components/Loading";

function Page({ apiUrl = "https://api.jikan.moe/v4/seasons/now" }) {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const cached = localStorage.getItem(apiUrl);
        if (cached) {
          setAnimeList(JSON.parse(cached));
          setLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch(apiUrl);
        const data = await res.json();

        setAnimeList(data.data || []);
        localStorage.setItem(apiUrl, JSON.stringify(data.data || []));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (animeList.length > 0) return;
    fetchTrending();
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loading ? (
        <div className="absolute top-0 w-full h-screen">
          <Loading />
        </div>
      ) : (
        <main className="container mx-auto px-4 sm:px-12 lg:px-24 py-8">
          <div className="flex items-end justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              {`${animeList[0].season
                .charAt(0)
                .toUpperCase()}${animeList[0].season.slice(1)} ${
                animeList[0].year
              } Anime`}
            </h1>
          </div>
          <hr />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {animeList.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
export default Page;

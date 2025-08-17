"use client";

import { useState, useEffect } from "react";
import AnimeCardCompact from "./AnimeCardCompact";

export default function AnimeRanking({ apiUrl, header, limit = 5 }) {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const cached = localStorage.getItem(apiUrl);
        if (cached) {
          setAnimeList(JSON.parse(cached));
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch(apiUrl);
        const data = await res.json();

        setAnimeList(data.data || []);
        localStorage.setItem(apiUrl, JSON.stringify(data.data || []));
      } catch (error) {
        console.error(error);
      }
    }

    if (animeList.length > 0) return;
    fetchAnime();
  }, [apiUrl]);

  const displayList = limit ? animeList.slice(0, limit) : animeList;

  return (
    <div className="mb-8 min-w-xs">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium px-2">{header}</h2>
      </div>
      <hr className="mb-3" />

      <div className="flex flex-col rounded-lg overflow-hidden">
        {displayList.map((anime, idx) => (
          <div
            key={anime.mal_id}
            className="flex items-center p-2 shadow hover:shadow-lg transition cursor-pointer bg-card border-b-2"
          >
            {/* อันดับ */}
            <span className="text-xl font-bold text-center w-6 mx-2">{idx + 1}</span>

            {/* การ์ดแบบกระชับ */}
            <div className="flex-1">
              <AnimeCardCompact anime={anime}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

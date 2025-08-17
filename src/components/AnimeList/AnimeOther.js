"use client";

import { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AnimeOther({
  apiUrl = "https://api.jikan.moe/v4/top/anime?filter=bypopularity",
  totalPages = 200,
}) {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true);
        const url = `${apiUrl}&page=${page}`;
        const cached = localStorage.getItem(url);
        if (cached) {
          setAnimeList(JSON.parse(cached));
          setLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await fetch(url);
        const data = await res.json();

        setAnimeList(data.data || []);
        localStorage.setItem(url, JSON.stringify(data.data || []));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [apiUrl, page]);

  const goPrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const goNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const getPageNumbers = () => {
    let start = Math.max(page - 2, 1);
    let end = Math.min(start + 4, totalPages);
    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const handleInputPage = (e) => {
    e.preventDefault();
    let num = parseInt(inputPage);
    if (!isNaN(num)) {
      if (num < 1) num = 1;
      if (num > totalPages) num = totalPages;
      setPage(num);
      setInputPage("");
    }
  };

  return (
    <div className="select-none">
      <div className="flex items-end justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 px-2">
          Other Anime
        </h1>
      </div>
      <hr />
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {animeList.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={goPrev}
              disabled={page === 1}
            >
              Prev
            </Button>

            {getPageNumbers().map((num) => (
              <Button
                key={num}
                size="sm"
                variant={page === num ? "default" : "outline"}
                onClick={() => setPage(num)}
              >
                {num}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              onClick={goNext}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>

          {/* Input page */}
          <form onSubmit={handleInputPage} className="flex items-center gap-1 mt-3">
            <Input
              type="number"
              min={1}
              max={totalPages}
              placeholder={page}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-16 text-center"
            />
            <Button size="sm" type="submit">
              Go
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AnimeOther;

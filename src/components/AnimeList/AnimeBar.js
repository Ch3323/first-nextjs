"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "../Loading";
import AnimeCard from "./AnimeCard";
import Link from "next/link";

function AnimeBar({ apiUrl }) {
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

  const title =
    animeList[0]?.season && animeList[0]?.year
      ? `${animeList[0].season.charAt(0).toUpperCase()}${animeList[0].season.slice(1)} ${animeList[0].year} Anime`
      : "This Season Anime";

  return loading ? (
    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
      <Loading />
    </div>
  ) : (
    <div>
      <div className="flex items-end justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <Link className="mb-3" href={"/anime/season"}>
          <span>View more</span>
        </Link>
      </div>
      <hr />
      <div className="relative w-full mx-auto mt-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {animeList.map((anime) => (
              <CarouselItem className="basis-1/5 aspect-[3/4]" key={anime.mal_id}>
                <AnimeCard anime={anime} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default AnimeBar;

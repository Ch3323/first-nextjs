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

function AnimeBar({ apiUrl, header }) {
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

  return loading ? (
    <div className="absolute left-0 w-full">
      <Loading />
    </div>
  ) : (
    <div>
      <div className="flex items-end justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 px-2">{header}</h1>
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
              <CarouselItem className="basis-1/3 md:basis-1/4 2xl:basis-1/5 aspect-[3/4]" key={anime.mal_id}>
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

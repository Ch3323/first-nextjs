"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Loading from "../Loading";
import Link from "next/link";

function Banner({
  apiUrl = "https://api.jikan.moe/v4/top/anime?filter=bypopularity",
}) {
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
    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
      <Loading />
    </div>
  ) : (
    <div className="container mx-auto px-4 sm:px-12 lg:px-24 py-8">
      <div className="relative w-full mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {animeList.map((anime) => (
              <CarouselItem key={anime.mal_id}>
                <Link href={`anime/${anime.mal_id}`}>
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg select-none">
                    <img
                      src={anime.images?.jpg?.large_image_url}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white max-w-xl animate-slideUp">
                      <h2 className="text-lg sm:text-2xl font-bold">
                        {anime.title}
                      </h2>
                      {anime.synopsis && (
                        <p className="text-sm sm:text-base mt-1 line-clamp-3">
                          {anime.synopsis}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
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

export default Banner;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../Loading";
import AnimeCharacter from "./AnimeCharacter";

function AnimeDetail() {
  const params = useParams();
  const animeId = params.id;

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const data = await res.json();
        setAnime(data.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [animeId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="w-full h-40 flex justify-center items-center text-primary">
        Anime not found
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
          <img
            src={anime.images?.jpg?.large_image_url || "/fallback.jpg"}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {anime.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm sm:text-base text-muted-foreground">
            <span>
              <strong>Type:</strong> {anime.type}
            </span>
            <span>
              <strong>Episodes:</strong> {anime.episodes || "?"}
            </span>
            <span>
              <strong>Status:</strong> {anime.status}
            </span>
            <span>
              <strong>Year:</strong> {anime.year || "?"}
            </span>
            {anime.producers?.length > 0 && (
              <span>
                <strong>Producers:</strong>{" "}
                {anime.producers.map((p) => p.name).join(", ")}
              </span>
            )}
            {anime.genres?.length > 0 && (
              <span>
                <strong>Genres:</strong>{" "}
                {anime.genres.map((g) => g.name).join(", ")}
              </span>
            )}
          </div>

          {anime.synopsis && (
            <p className="mt-4 text-sm sm:text-base line-clamp-10">
              {anime.synopsis}
            </p>
          )}

          {anime.trailer?.embed_url && (
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Trailer
              </h2>
              <div className="w-full aspect-video">
                <iframe
                  src={anime.trailer.embed_url}
                  title={`${anime.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full h-full mt-12">
        <h1 className="text-2xl font-bold mb-3">Character</h1>
        <hr />
        <div className="mt-6">
          <AnimeCharacter />
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;

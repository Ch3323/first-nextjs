"use client";

import Link from "next/link";

function AnimeCard({ anime }) {
  return (
    <div className="relative h-full rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Link href={`/anime/${anime.mal_id}`}>

        <img
          src={anime.images.webp.image_url}
          alt={anime.title}
          className="w-full h-full object-cover select-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white select-none">
          <h3 className="font-semibold text-lg truncate">{anime.title}</h3>
          <p className="text-sm mt-1 line-clamp-2">
            {anime.synopsis || "No description available."}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AnimeCard;

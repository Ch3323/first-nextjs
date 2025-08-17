"use client";

import Link from "next/link";

export default function AnimeCardCompact({ anime }) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="flex w-full items-center gap-3 p-2 rounded-lg cursor-pointer bg-card">
        {/* Thumbnail */}
        <img
          src={anime.images?.jpg?.image_url}
          alt={anime.title}
          className="w-16 h-24 object-cover rounded"
        />

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
            {anime.title}
          </h3>
          <div className="text-xs">
            <p>
              {anime.type} {anime.episodes && anime.episodes + " Eps"}{" "}
              {anime.score && "Scored " + anime.score}
            </p>
            <p>{anime.members.toLocaleString()} members</p>
            <p>{anime.status}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

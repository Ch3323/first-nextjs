"use client";

import Banner from "./Banner";
import AnimeBar from "./AnimeBar";

function AnimeList() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Banner />
      <main className="container mx-auto px-4 sm:px-12 lg:px-24 py-8">

        <AnimeBar apiUrl={"https://api.jikan.moe/v4/seasons/now"} />
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {animeList.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div> */}
      </main>
    </div>
  );
}
export default AnimeList;

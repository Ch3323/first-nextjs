"use client";

import Banner from "./Banner";
import AnimeBar from "./AnimeBar";
import AnimeRanking from "./AnimeRanking";
import AnimeOther from "./AnimeOther";

function AnimeList() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Banner />
      <main className="container flex xl:flex-row flex-col gap-20 mx-auto px-4 sm:px-12 lg:px-24 py-8">
        <div className="flex flex-col gap-6">
          {/* ซีซั่นปัจจุบัน - แบบ carousel */}
          <AnimeBar
            apiUrl={"https://api.jikan.moe/v4/seasons/now"}
            header="Current Season Anime"
          />
          <AnimeOther/>
        </div>
        <div>
          <AnimeRanking
            apiUrl="https://api.jikan.moe/v4/top/anime?filter=upcoming"
            header="Top Upcoming Anime"
          />

          <AnimeRanking
            apiUrl="https://api.jikan.moe/v4/top/anime?filter=bypopularity"
            header="Most Popular Anime"
          />
        </div>
      </main>
    </div>
  );
}

export default AnimeList;

import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

// เก็บ mapping ของ platform -> logo path
const platformLogos = {
  Crunchyroll: "/logos/crunchyroll.svg",
  Netflix: "/logos/netflix.svg",
  "Bilibili Global": "/logos/bilibili.svg",
  "Hulu": "/logos/hulu.svg",
  "Disney+": "/logos/disney.svg",
  "Aniplus TV": "/logos/aniplus.svg",
  "Anime Digital Network": "/logos/adn.svg",
  "Bahamut Anime Crazy": "https://i2.bahamut.com.tw/anime/logo.svg",
  "CatchPlay": "/logos/catchplay.png",
  "Laftel": "/logos/laftel.svg",
  "Muse Asia": "/logos/muse.png",
  "iQIYI": "/logos/iqiyi.png",
  "Ani-One Asia":  "/logos/anione.webp",
  "Animax Mongolia": "https://www.animax.co.jp/assets/img/common/logo.svg",
  "Shahid":  "/logos/shahid.svg",
};

function StreamingSite({ animeId }) {
  const [streamingList, setStreamingList] = useState([]);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/streaming`
        );
        const data = await res.json();
        setStreamingList(data.data || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAnime();
  }, [animeId]);

  if (!streamingList || streamingList.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4 text-sm">
        No streaming sources available.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Available on</h2>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {streamingList.map((s, index) => {
            console.log(s.name);
            const logoPath = platformLogos[s.name];
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 aspect-square flex items-center justify-center rounded-full bg-card transition shadow-sm overflow-hidden"
                  >
                    {logoPath ? (
                      <Image
                        src={logoPath}
                        alt={s.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xs font-medium">
                        {s.name.length > 6 ? s.name.slice(0, 5) + "…" : s.name}
                      </span>
                    )}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}

export default StreamingSite;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../Loading";
import CharacterCard from "./CharacterCard";

function AnimeCharacter() {
  const params = useParams();
  const animeId = params.id;

  const [characters, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/characters`
        );
        const data = await res.json();
        setCharacter(data.data || null);
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

  if (!characters) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-500">
        Characters not found
      </div>
    );
  }

  return (
    <div className="w-full h-full">
  


      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
        {characters.map((char) => (
          <CharacterCard key={char.character.mal_id} char={char} />
        ))}
      </div>
    </div>
  );
}

export default AnimeCharacter;

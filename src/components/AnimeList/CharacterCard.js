"use client";

export default function CharacterCard({ char }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer bg-card">
      {/* ตัวละครหลัก */}
      <div className="relative">
        <img
          src={char.character.images?.jpg?.image_url}
          alt={char.character.name}
          className="w-full h-56 object-cover select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className="font-semibold text-lg truncate">
            {char.character.name}
          </h3>
          {char.role && <p className="text-sm truncate">{char.role}</p>}
        </div>
      </div>

      {/* Voice actors */}
      {char.voice_actors && char.voice_actors.length > 0 && (
        <div className="p-2 grid grid-cols-3 gap-2">
          {char.voice_actors
            .filter(
              (va) => va.language === "Japanese" || va.language === "English"
            )
            .map((va) => (
              <div
                key={va.person.mal_id}
                className="relative h-36 flex-shrink-0 rounded-lg overflow-hidden"
              >
                <img
                  src={va.person.images?.jpg?.image_url}
                  alt={va.person.name}
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-1 left-1 right-1 p-1 text-white text-xs font-semibold truncate">
                  {va.person.name}
                  <p className="font-light">{va.language}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

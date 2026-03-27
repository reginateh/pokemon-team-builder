import { X } from "lucide-react";
import { Pokemon } from "../types/Pokemon";

interface TeamGridProps {
  team: Pokemon[];
  onRemove: (id: number) => void;
}

export const TeamGrid = ({ team, onRemove }: TeamGridProps) => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {team.map((pokemon) => (
        <div
          key={pokemon.id}
          className="min-w-[160px] w-[160px] bg-slate-800 border border-slate-700 rounded-xl p-4 relative group hover:border-yellow-500/50 transition-all shrink-0"
        >
          <button
            onClick={() => onRemove(pokemon.id)}
            className="absolute top-2 right-2 p-1 bg-slate-700/50 rounded-full hover:bg-red-500 text-slate-300 hover:text-white transition-colors z-10"
          >
            <X size={14} />
          </button>

          <div className="flex flex-col items-center text-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-20 h-20 mb-2 drop-shadow-md"
            />
            <h3 className="capitalize font-bold text-sm truncate w-full">
              {pokemon.name}
            </h3>

            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {pokemon.types.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-slate-900 text-slate-300 border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {Array.from({ length: 6 - team.length }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="min-w-[160px] w-[160px] border-2 border-dashed border-slate-800 rounded-xl h-[168px] flex items-center justify-center text-slate-700 shrink-0"
        >
          <span className="text-2xl font-bold">+</span>
        </div>
      ))}
    </div>
  );
};

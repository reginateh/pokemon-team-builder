import { X, Activity, BarChart3 } from "lucide-react";
import { Pokemon } from "../types/Pokemon";

interface TeamGridProps {
  team: Pokemon[];
  onRemove: (id: number) => void;
}

export const TeamGrid = ({ team, onRemove }: TeamGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {team.map((pokemon) => (
        <div
          key={pokemon.id}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-5 relative group hover:border-yellow-500/50 transition-all flex flex-col shadow-lg"
        >
          <button
            onClick={() => onRemove(pokemon.id)}
            className="absolute top-3 right-3 p-1.5 bg-slate-900/80 rounded-full hover:bg-red-500 text-slate-400 hover:text-white transition-colors z-10"
          >
            <X size={14} />
          </button>

          {/* Sprite & Name */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 drop-shadow-md"
            />
            <h3 className="capitalize font-black text-lg text-white truncate w-full text-center">
              {pokemon.name}
            </h3>
            <div className="flex gap-1.5 mt-2">
              {pokemon.types.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-yellow-500 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-4 bg-slate-900/30 p-2 rounded-xl border border-slate-700/30">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1">
              <Activity size={12} /> Abilities
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pokemon.abilities.map((a) => (
                <span key={a.ability.name} className="text-[11px] text-slate-300 capitalize">
                  • {a.ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Base Stats Grid */}
          <div className="mt-auto">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1">
              <BarChart3 size={12} /> Base Stats
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex justify-between items-center border-b border-slate-700/50 pb-1">
                  <span className="text-[10px] uppercase text-slate-500 font-semibold">
                    {s.stat.name === 'special-attack' ? 'SpA' : 
                     s.stat.name === 'special-defense' ? 'SpD' : 
                     s.stat.name}
                  </span>
                  <span className="text-xs font-bold text-slate-200">{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Empty Slots */}
      {Array.from({ length: 6 - team.length }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="border-2 border-dashed border-slate-800 rounded-2xl h-[380px] flex flex-col items-center justify-center text-slate-700 group hover:border-slate-700 transition-colors"
        >
          <span className="text-4xl font-thin mb-2">+</span>
          <span className="text-xs uppercase tracking-widest">Available Slot</span>
        </div>
      ))}
    </div>
  );
};
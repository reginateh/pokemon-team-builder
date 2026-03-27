import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Pokemon, PokemonType } from '../types/Pokemon';

interface SearchBarProps {
  onAdd: (pokemon: Pokemon) => void;
  currentTeam: Pokemon[];
}

const mapPokemonData = (data: any): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default
    },
    types: data.types.map((t: any) => t.type.name as PokemonType),
    stats: data.stats.map((s: any) => ({
      base_stat: s.base_stat,
      stat: {
        name: s.stat.name
      }
    })),
    abilities: data.abilities.map((a: any) => ({
      ability: {
        name: a.ability.name
      }
    }))
  };
};

export const SearchBar = ({ onAdd, currentTeam }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchName = query.toLowerCase().trim();
    if (!searchName) return;

    setLoading(true);
    setError('');

    if (currentTeam.length >= 6) {
      setError("Your team is full! Remove a Pokémon first.");
      setLoading(false);
      return;
    }

    if (currentTeam.some(p => p.name.toLowerCase() === searchName)) {
      setError(`${searchName} is already in your team!`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
      if (!response.ok) throw new Error('Pokemon not found');
      const data = await response.json();
      onAdd(mapPokemonData(data));
      setQuery('');
    } catch (err) {
      setError('Could not find that Pokemon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. Pikachu..."
          className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
        />
        <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
        <button 
          disabled={loading}
          className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2 rounded-lg transition-colors flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Add to Team'}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
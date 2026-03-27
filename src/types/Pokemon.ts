export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: PokemonType[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export type Team = Pokemon[];

export interface TypeEffectiveness {
  weakTo: string[];
  resistantTo: string[];
  immuneTo: string[];
}
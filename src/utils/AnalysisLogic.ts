import { Pokemon } from "../types/Pokemon";
import { TYPE_CHART } from "./TypeChart";

export const calculateTeamWeaknesses = (team: Pokemon[]) => {
  const weaknessMap: Record<string, number> = {};

  team.forEach((pokemon) => {
    pokemon.types.forEach((t) => {
      const typeName = t.toLowerCase();
      const info = TYPE_CHART[typeName];
      if (info) {
        info.weaknesses.forEach((w) => {
          weaknessMap[w] = (weaknessMap[w] || 0) + 1;
        });
      }
    });
  });

  return weaknessMap;
};

export const calculateTeamStrengths = (team: Pokemon[]) => {
  const strengthsMap: Record<string, number> = {};

  team.forEach((pokemon) => {
    pokemon.types.forEach((t) => {
      const typeName = t.toLowerCase();
      const info = TYPE_CHART[typeName];
      if (info) {
        info.strengths.forEach((s) => {
          strengthsMap[s] = (strengthsMap[s] || 0) + 1;
        });
      }
    });
  });

  return strengthsMap;
};

export const getTeamStats = (team: Pokemon[]) => {
  if (team.length === 0) return [];

  // Get average stats for the team to show in a chart
  const statsTemplate = [
    { name: "HP", total: 0 },
    { name: "ATK", total: 0 },
    { name: "DEF", total: 0 },
    { name: "SPA", total: 0 },
    { name: "SPD", total: 0 },
    { name: "SPEED", total: 0 },
  ];

  team.forEach((p) => {
    p.stats.forEach((s, i) => {
      statsTemplate[i].total += s.base_stat;
    });
  });

  return statsTemplate.map((s) => ({
    name: s.name,
    value: Math.round(s.total / team.length),
  }));
};

export type PokemonRole = 'Attacker' | 'Special Attacker' | 'Defender' | 'High Speed' | 'Balanced';

export const getTeamRoles = (team: Pokemon[]) => {
  if (team.length === 0) return [];

  // 1. Find the highest stat values in the current team
  const maxStats = {
    atk: Math.max(...team.map(p => p.stats.find(s => s.stat.name === 'attack')?.base_stat || 0)),
    spa: Math.max(...team.map(p => p.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0)),
    def: Math.max(...team.map(p => p.stats.find(s => s.stat.name === 'defense')?.base_stat || 0)),
    spd: Math.max(...team.map(p => p.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0)),
    spe: Math.max(...team.map(p => p.stats.find(s => s.stat.name === 'speed')?.base_stat || 0)),
  };

  // 2. Classify each Pokémon based on those peaks
  return team.map(p => {
    const stats = {
      atk: p.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
      spa: p.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
      def: p.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
      spd: p.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
      spe: p.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
    };

    // Heuristic: If a stat is within 10% of the team's max, it defines the role
    if (stats.spe >= maxStats.spe * 0.9 && stats.spe > 50) return 'High Speed';
    if (stats.atk >= maxStats.atk * 0.9) return 'Attacker';
    if (stats.spa >= maxStats.spa * 0.9) return 'Special Attacker';
    if (stats.def >= maxStats.def * 0.9 || stats.spd >= maxStats.spd * 0.9) return 'Defender';
    
    return 'Balanced';
  });
};
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

import { BarChart3, Users } from "lucide-react";
import { Pokemon } from "../types/Pokemon";
import {
  getTeamRoles,
  getTeamStats,
  calculateTeamStrengths,
  calculateTeamWeaknesses,
} from "../utils/AnalysisLogic";

export const AnalysisDashboard = ({ team }: { team: Pokemon[] }) => {
  const roles = getTeamRoles(team);
  const averages = getTeamStats(team);
  const strengths = calculateTeamStrengths(team);
  const weaknesses = calculateTeamWeaknesses(team);

  const roleCounts = roles.reduce(
    (acc, role) => {
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const roleColors: Record<string, string> = {
    Attacker: "bg-red-500",
    "Special Attacker": "bg-blue-500",
    Defender: "bg-emerald-500",
    "High Speed": "bg-yellow-500",
    Balanced: "bg-slate-500",
  };

  // Simple recommendations logic
  const recommendations: string[] = [];
  Object.entries(weaknesses).forEach(([type, count]) => {
    if (count >= 3)
      recommendations.push(`Multiple Pokémon are weak to ${type}!`);
  });
  Object.entries(strengths).forEach(([type, count]) => {
    if (count >= 3)
      recommendations.push(`Multiple Pokémon are strong against ${type}!`);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* AVERAGE STATS INSIGHT */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BarChart3 size={16} className="text-yellow-500" /> Team Average Stats
        </h3>

        <div className="space-y-4 flex-1">
          {averages.map((stat) => (
            <div key={stat.name} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                <span>{stat.name.replace("-", " ")}</span>
                <span className="text-slate-200">{stat.value}</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500/80 h-full transition-all duration-1000"
                  style={{ width: `${(stat.value / 150) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROLE COMPOSITION */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Users size={16} className="text-yellow-500" /> Role Composition
        </h3>

        {/* The Composition Bar */}
        <div className="flex h-6 w-full rounded-lg overflow-hidden bg-slate-900 mb-8 border border-slate-700">
          {Object.entries(roleCounts).map(([role, count]) => (
            <div
              key={role}
              style={{ width: `${(count / team.length) * 100}%` }}
              className={`${roleColors[role]} h-full transition-all duration-700 border-r border-slate-900/50 last:border-0`}
            />
          ))}
        </div>

        {/* Role Legend Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          {Object.keys(roleColors).map((role) => (
            <div key={role} className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${roleColors[role]} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
                />
                <span className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                  {role}
                </span>
              </div>
              <span className="text-sm font-black text-white">
                {roleCounts[role] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            Insights
          </h3>
          <ul className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm bg-slate-700/50 p-3 rounded-lg border-l-4 border-yellow-500"
                >
                  <span>💡</span>
                  {rec}
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic text-sm">
                Team is well-balanced with no glaring weaknesses or strengths. Great work!
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Pokemon } from '../types/Pokemon';
import { calculateTeamWeaknesses, getTeamStats } from '../utils/AnalysisLogic';

interface Props {
  team: Pokemon[];
}

export const AnalysisDashboard = ({ team }: Props) => {
  if (!team ||team.length === 0) return null;

  const weaknesses = calculateTeamWeaknesses(team);
  const chartData = getTeamStats(team);

  // Simple recommendations logic
  const recommendations = [];
  if (team.length > 0 && !team.some(p => p.stats[5].base_stat > 100)) {
    recommendations.push("Your team is quite slow. Consider adding a 'Speedster'.");
  }
  Object.entries(weaknesses).forEach(([type, count]) => {
    if (count >= 3) recommendations.push(`Multiple Pokémon are weak to ${type}!`);
  });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Stat Chart */}
        <div className="h-64">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase">Average Team Stats</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
              <Bar dataKey="value" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase">Insights</h3>
          <ul className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm bg-slate-700/50 p-3 rounded-lg border-l-4 border-yellow-500">
                  <span>💡</span>
                  {rec}
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic text-sm">Add more Pokémon for insights...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Pokemon } from "./types/Pokemon";
import { SearchBar } from "./components/SearchBar";
import { TeamGrid } from "./components/TeamGrid";
import { AnalysisDashboard } from "./components/AnalysisDashboard";
import { ShieldCheck, Info, LayoutDashboard } from "lucide-react";

function App() {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const addToTeam = (pokemon: Pokemon) => {
    setTeam([...team, pokemon]);
  };

  const removeFromTeam = (id: number) => {
    setTeam(team.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-yellow-500 w-8 h-8" />
            <h1 className="text-xl font-extrabold tracking-tight">
              POKE<span className="text-yellow-500">ANALYZER</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Team Capacity
            </span>
            <div className="bg-slate-800 px-4 py-1 rounded-full border border-slate-700 text-sm font-bold">
              {team.length} / 6
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Search Bar */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                Build Your Team
              </h2>
              <SearchBar onAdd={addToTeam} currentTeam={team} />

              <div className="mt-6 p-4 bg-slate-900/40 rounded-xl border border-slate-700/50">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-yellow-500 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Search by name (e.g., "lucario"). Your team's
                    strengths, weaknesses, and stat averages will update in
                    real-time below.
                  </p>
                </div>
              </div>
            </section>
          </aside>

          {/* 3. Main Content: Grid & Live Analysis */}
          <div className="lg:col-span-8 space-y-4">
            {team.length > 0 ? (
              <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                <AnalysisDashboard team={team} />
              </section>
            ) : (
              <div className="h-64 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600">
                <p>Add a Pokémon to unlock team insights</p>
              </div>
            )}
          </div>
        </div>
        <div className="my-10 border-t border-slate-800" />
        {/* Team Display Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Current Squad
            </h2>
            {team.length > 0 && (
              <button
                onClick={() => setTeam([])}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <TeamGrid team={team} onRemove={removeFromTeam} />
        </section>
      </main>
    </div>
  );
}

export default App;

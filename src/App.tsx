import { useState } from "react";
import { Pokemon } from "./types/Pokemon";
import { TYPE_CHART } from "./utils/TypeChart";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const addToTeam = (pokemon: Pokemon) => {
    if (team.length >= 6) return alert("Team is full!");
    if (team.find((p) => p.id === pokemon.id)) return alert("Already in team!");
    setTeam([...team, pokemon]);
  };

  const removeFromTeam = (id: number) => {
    setTeam(team.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">PokeAnalyzer</h1>
        <div className="text-slate-400">Team: {team.length}/6</div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Search & Selection */}
        <section className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700">
          {
            <section className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Add Pokemon</h2>
              <SearchBar onAdd={addToTeam} />
            </section>
          }
        </section>

        {/* Column 2 & 3: Team Display & Analysis */}
        <section className="lg:col-span-2 space-y-8">
          {/* We will build TeamGrid and AnalysisDashboard here */}
        </section>
      </main>
    </div>
  );
}

export default App;

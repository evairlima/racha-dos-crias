'use client';

import React, { useState, useEffect } from 'react';

interface Team {
  id: string;
  name: string;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}

export default function RachaDosCriasSite() {
  const [tab, setTab] = useState<'home' | 'tabelas' | 'admin'>('home');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');

  // Carregar equipas salvas no navegador ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('racha_teams');
    if (saved) {
      setTeams(JSON.parse(saved));
    }
  }, []);

  // Salvar equipas sempre que houver alteração
  const saveTeams = (newTeams: Team[]) => {
    setTeams(newTeams);
    localStorage.setItem('racha_teams', JSON.stringify(newTeams));
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };

    saveTeams([...teams, newTeam]);
    setTeamName('');
  };

  const handleDeleteTeam = (id: string) => {
    saveTeams(teams.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Cabeçalho do Site */}
      <header className="bg-emerald-800 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black uppercase tracking-wider">Racha dos Crias</h1>
            <p className="text-emerald-200 text-sm italic">"Nem melhor, nem pior, apenas diferente."</p>
          </div>
          <nav className="flex gap-3 bg-emerald-900/60 p-2 rounded-2xl">
            <button 
              onClick={() => setTab('home')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${tab === 'home' ? 'bg-white text-emerald-900 shadow' : 'text-white hover:bg-emerald-700'}`}
            >
              Início / Notícias
            </button>
            <button 
              onClick={() => setTab('tabelas')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${tab === 'tabelas' ? 'bg-white text-emerald-900 shadow' : 'text-white hover:bg-emerald-700'}`}
            >
              Tabela & Classificação
            </button>
            <button 
              onClick={() => setTab('admin')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${tab === 'admin' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'}`}
            >
              Painel Admin ⚙️
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Dinâmico */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {tab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Futebol Amador</span>
              <h2 className="text-2xl font-black text-slate-800 mt-3 mb-2">Moura brilha, marca no final e garante vitória suada</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Numa partida marcada pelo equilíbrio e forte marcação, o talento individual fez a diferença nos acréscimos. A equipa assume a liderança provisória do campeonato.
              </p>
              <div className="text-xs text-slate-400 font-medium">Por Redação Racha dos Crias &bull; Há 2 horas</div>
            </div>
          </div>
        )}

        {tab === 'tabelas' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-black uppercase text-slate-800">Classificação do Campeonato</h2>
            </div>
            {teams.length === 0 ? (
              <p className="p-8 text-center text-slate-400 text-sm">Nenhuma equipa cadastrada ainda. Vá ao Painel Admin para adicionar.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-100">
                    <th className="p-4">Equipa</th>
                    <th className="p-4 text-center">Pontos</th>
                    <th className="p-4 text-center">GP</th>
                    <th className="p-4 text-center">GC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {teams.map((t, index) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-700 flex items-center gap-3">
                        <span className="text-xs text-slate-400">#{index + 1}</span> {t.name}
                      </td>
                      <td className="p-4 text-center font-black text-emerald-700">{t.points}</td>
                      <td className="p-4 text-center text-slate-600">{t.goalsFor}</td>
                      <td className="p-4 text-center text-slate-600">{t.goalsAgainst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wide">Cadastrar Equipa</h2>
              <form onSubmit={handleAddTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nome da Equipa</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Ex: Argentina FC"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-md"
                >
                  Adicionar Equipa
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wide">Gerenciar Equipas</h2>
              {teams.length === 0 ? (
                <p className="text-sm text-slate-400 italic py-8 text-center">Nenhuma equipa cadastrada.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {teams.map((t) => (
                    <div key={t.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-700 text-sm">{t.name}</span>
                      <button
                        onClick={() => handleDeleteTeam(t.id)}
                        className="text-xs bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg hover:bg-red-200 transition"
                      >
                        Excluir
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
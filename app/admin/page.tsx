'use client';

import React, { useState, useEffect } from 'react';

interface Team {
  id: string;
  name: string;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
}

export default function RachaDosCriasSite() {
  const [tab, setTab] = useState<'home' | 'tabelas' | 'elenco' | 'admin'>('home');
  const [teams, setTeams] = useState<Team[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop', caption: 'Dia de racha e muita resenha!' },
    { id: '2', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop', caption: 'Momento decisivo da partida.' }
  ]);
  const [teamName, setTeamName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop');
  const [tempBg, setTempBg] = useState('');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&auto=format&fit=crop');
  const [tempLogo, setTempLogo] = useState('');

  // Carregar dados salvos no navegador
  useEffect(() => {
    const savedTeams = localStorage.getItem('racha_teams');
    if (savedTeams) setTeams(JSON.parse(savedTeams));

    const savedPhotos = localStorage.getItem('racha_photos');
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

    const savedBg = localStorage.getItem('racha_bg');
    if (savedBg) setBgImage(savedBg);

    const savedLogo = localStorage.getItem('racha_logo');
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  const saveTeams = (newTeams: Team[]) => {
    setTeams(newTeams);
    localStorage.setItem('racha_teams', JSON.stringify(newTeams));
  };

  const savePhotos = (newPhotos: Photo[]) => {
    setPhotos(newPhotos);
    localStorage.setItem('racha_photos', JSON.stringify(newPhotos));
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    const newTeam: Team = { id: Date.now().toString(), name: teamName, points: 0, goalsFor: 0, goalsAgainst: 0 };
    saveTeams([...teams, newTeam]);
    setTeamName('');
  };

  const handleDeleteTeam = (id: string) => {
    saveTeams(teams.filter(t => t.id !== id));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;
    const newPhoto: Photo = { id: Date.now().toString(), url: photoUrl, caption: photoCaption || 'Racha dos Crias' };
    savePhotos([newPhoto, ...photos]);
    setPhotoUrl('');
    setPhotoCaption('');
  };

  const handleDeletePhoto = (id: string) => {
    savePhotos(photos.filter(p => p.id !== id));
  };

  const handleSaveBg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempBg.trim()) return;
    setBgImage(tempBg);
    localStorage.setItem('racha_bg', tempBg);
    setTempBg('');
    alert('Fundo atualizado com sucesso!');
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempLogo.trim()) return;
    setLogoUrl(tempLogo);
    localStorage.setItem('racha_logo', tempLogo);
    setTempLogo('');
    alert('Logo atualizada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Cabeçalho Moderno com Logo */}
      <header 
        className="relative bg-cover bg-center border-b border-slate-800 shadow-2xl z-20"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.95)), url('${bgImage}')` }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-30">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img 
              src={logoUrl} 
              alt="Logo Racha dos Crias" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg bg-slate-800"
            />
            <div>
              <h1 className="text-3xl font-black uppercase tracking-wider text-white">
                Racha dos Crias
              </h1>
              <p className="text-emerald-400 text-xs font-medium mt-1 italic">"Nem melhor, nem pior, apenas diferente."</p>
            </div>
          </div>
          
          {/* Navegação atualizada com ponteiro e z-index garantido */}
          <nav className="flex flex-wrap justify-center gap-2 bg-slate-800/90 p-2 rounded-2xl backdrop-blur-md border border-slate-700 relative z-40">
            <button 
              type="button"
              onClick={() => setTab('home')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${tab === 'home' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              Início
            </button>
            <button 
              type="button"
              onClick={() => setTab('tabelas')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${tab === 'tabelas' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              Tabela
            </button>
            <button 
              type="button"
              onClick={() => setTab('elenco')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${tab === 'elenco' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              Galeria & Elenco
            </button>
            <button 
              type="button"
              onClick={() => setTab('admin')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${tab === 'admin' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'}`}
            >
              Painel Admin ⚙️
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        
        {/* ABA INÍCIO */}
        {tab === 'home' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Destaque da Rodada</span>
                  <h2 className="text-3xl font-black text-white mt-4 mb-3">Moura brilha, marca no final e garante vitória épica!</h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Numa partida eletrizante e de muita transpiração, o artilheiro apareceu nos acréscimos para estufar a rede e colocar a equipe no topo da tabela. A resenha pós-jogo foi garantida!
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
                  <span>Por Redação Oficial</span>
                  <span className="text-emerald-400 font-bold">Campina Grande - PB</span>
                </div>
              </div>

              {/* Card Rápido de Classificação */}
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Top Equipes</h3>
                  {teams.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Nenhuma equipe cadastrada.</p>
                  ) : (
                    <div className="space-y-3">
                      {teams.slice(0, 3).map((t, index) => (
                        <div key={t.id} className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                          <span className="font-bold text-sm text-slate-200">#{index + 1} {t.name}</span>
                          <span className="text-emerald-400 font-black text-sm">{t.points} pts</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => setTab('tabelas')} className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer">
                  Ver Tabela Completa
                </button>
              </div>
            </div>

            {/* Galeria na Home */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase text-white">📸 Momentos do Racha</h3>
                <button type="button" onClick={() => setTab('elenco')} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">Ver todas →</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.slice(0, 3).map((p) => (
                  <div key={p.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg group">
                    <div className="h-48 overflow-hidden bg-slate-900">
                      <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-slate-200">{p.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA TABELAS */}
        {tab === 'tabelas' && (
          <div className="bg-slate-800/50 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-700 bg-slate-800/80">
              <h2 className="text-xl font-black uppercase text-white tracking-wide">Classificação Geral</h2>
            </div>
            {teams.length === 0 ? (
              <p className="p-12 text-center text-slate-400 text-sm">Nenhuma equipe cadastrada. Vá até o Painel Admin para adicionar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50 text-xs uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-4">Equipe</th>
                      <th className="p-4 text-center">Pontos</th>
                      <th className="p-4 text-center">GP</th>
                      <th className="p-4 text-center">GC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50 text-sm">
                    {teams.map((t, index) => (
                      <tr key={t.id} className="hover:bg-slate-700/30 transition">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${index === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>#{index + 1}</span> 
                          {t.name}
                        </td>
                        <td className="p-4 text-center font-black text-emerald-400">{t.points}</td>
                        <td className="p-4 text-center text-slate-300">{t.goalsFor}</td>
                        <td className="p-4 text-center text-slate-300">{t.goalsAgainst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ABA GALERIA */}
        {tab === 'elenco' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase text-white">Galeria de Fotos dos Crias</h2>
              <span className="text-xs text-slate-400">Adicione fotos pelo Painel Admin</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((p) => (
                <div key={p.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
                  <div className="h-56 overflow-hidden bg-slate-900">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-slate-200">{p.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAINEL ADMIN */}
        {tab === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cadastrar Equipe */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Cadastrar Equipe</h3>
              <form onSubmit={handleAddTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome da Equipe</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Ex: Argentina FC"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-lg cursor-pointer">
                  Adicionar Equipe
                </button>
              </form>
            </div>

            {/* Alterar Logo */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Alterar Logo do Site</h3>
              <form onSubmit={handleSaveLogo} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">URL Direta da Logo</label>
                  <input
                    type="url"
                    value={tempLogo}
                    onChange={(e) => setTempLogo(e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-lg cursor-pointer">
                  Salvar Nova Logo
                </button>
              </form>
            </div>

            {/* Adicionar Foto */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Adicionar Foto à Galeria</h3>
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">URL Direta da Imagem</label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Legenda da Foto</label>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="Ex: Galera reunida após o jogo"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-lg cursor-pointer">
                  Publicar Foto
                </button>
              </form>
            </div>

            {/* Alterar Fundo */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Alterar Fundo do Site</h3>
              <form onSubmit={handleSaveBg} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">URL da Imagem de Fundo</label>
                  <input
                    type="url"
                    value={tempBg}
                    onChange={(e) => setTempBg(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition text-sm uppercase tracking-wider shadow-lg cursor-pointer">
                  Salvar Fundo
                </button>
              </form>
            </div>

            {/* Gerenciamento Rápido */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Gerenciamento Rápido</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                {teams.map((t) => (
                  <div key={t.id} className="flex justify-between items-center p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-200 text-sm">{t.name}</span>
                    <button type="button" onClick={() => handleDeleteTeam(t.id)} className="text-xs bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition cursor-pointer">Excluir Equipe</button>
                  </div>
                ))}
                {photos.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="font-medium text-slate-300 text-xs truncate max-w-[200px]">{p.caption}</span>
                    <button type="button" onClick={() => handleDeletePhoto(p.id)} className="text-xs bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition cursor-pointer">Excluir Foto</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
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

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function RachaDosCriasSite() {
  const [tab, setTab] = useState<'home' | 'tabelas' | 'elenco' | 'admin'>('home');
  const [teams, setTeams] = useState<Team[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop', caption: 'Dia de racha e muita resenha!' },
    { id: '2', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop', caption: 'Momento decisivo da partida.' }
  ]);
  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', title: 'Moura brilha, marca no final e garante vitória suada', content: 'Numa partida marcada pelo equilíbrio e forte marcação, o talento individual fez a diferença nos acréscimos. A equipe assume a liderança provisória.', date: 'Há 2 horas' }
  ]);
  
  const [teamName, setTeamName] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Carregar dados salvos no navegador (localStorage)
  useEffect(() => {
    const savedTeams = localStorage.getItem('racha_teams');
    if (savedTeams) setTeams(JSON.parse(savedTeams));

    const savedPhotos = localStorage.getItem('racha_photos');
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

    const savedNews = localStorage.getItem('racha_news');
    if (savedNews) setNews(JSON.parse(savedNews));
  }, []);

  const saveTeams = (newTeams: Team[]) => {
    setTeams(newTeams);
    localStorage.setItem('racha_teams', JSON.stringify(newTeams));
  };

  const savePhotos = (newPhotos: Photo[]) => {
    setPhotos(newPhotos);
    localStorage.setItem('racha_photos', JSON.stringify(newPhotos));
  };

  const saveNews = (newNews: NewsItem[]) => {
    setNews(newNews);
    localStorage.setItem('racha_news', JSON.stringify(newNews));
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    const newTeam: Team = { id: Date.now().toString(), name: teamName, points: 0, goalsFor: 0, goalsAgainst: 0 };
    saveTeams([...teams, newTeam]);
    setTeamName('');
    alert('Equipa adicionada com sucesso!');
  };

  const handleDeleteTeam = (id: string) => {
    saveTeams(teams.filter(t => t.id !== id));
  };

  // Converter imagem local em Base64 para guardar no navegador
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Por favor, seleciona uma foto do teu dispositivo.');
      return;
    }
    const newPhoto: Photo = { 
      id: Date.now().toString(), 
      url: selectedFile, 
      caption: photoCaption || 'Racha dos Crias' 
    };
    savePhotos([newPhoto, ...photos]);
    setSelectedFile(null);
    setPhotoCaption('');
    alert('Foto enviada e publicada com sucesso!');
  };

  const handleDeletePhoto = (id: string) => {
    savePhotos(photos.filter(p => p.id !== id));
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: newsTitle,
      content: newsContent,
      date: 'Agora mesmo'
    };
    saveNews([newItem, ...news]);
    setNewsTitle('');
    setNewsContent('');
    alert('Notícia publicada com sucesso!');
  };

  const handleDeleteNews = (id: string) => {
    saveNews(news.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Cabeçalho */}
      <header className="bg-slate-950 border-b border-slate-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-white">
              ⚽ Racha dos Crias
            </h1>
            <p className="text-emerald-400 text-xs italic mt-0.5">"Nem melhor, nem pior, apenas diferente."</p>
          </div>
          
          {/* Menu de Navegação */}
          <div className="flex flex-wrap gap-2">
            <button 
              type="button"
              onClick={() => setTab('home')}
              className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition ${tab === 'home' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Início
            </button>
            <button 
              type="button"
              onClick={() => setTab('tabelas')}
              className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition ${tab === 'tabelas' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Tabela
            </button>
            <button 
              type="button"
              onClick={() => setTab('elenco')}
              className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition ${tab === 'elenco' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Galeria 📸
            </button>
            <button 
              type="button"
              onClick={() => setTab('admin')}
              className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition ${tab === 'admin' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'}`}
            >
              Painel Admin ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* ABA INÍCIO (Com Notícias e Destaques) */}
        {tab === 'home' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Notícia Principal em Destaque */}
              <div className="md:col-span-2 bg-slate-800/60 border border-slate-700 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Última Resenha</span>
                  {news.length > 0 ? (
                    <>
                      <h2 className="text-3xl font-black text-white mt-4 mb-3">{news[0].title}</h2>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">{news[0].content}</p>
                    </>
                  ) : (
                    <p className="text-slate-400 text-sm mt-4">Nenhuma notícia publicada ainda.</p>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
                  <span>Por Administração Oficial</span>
                  <span className="text-emerald-400 font-bold">{news[0]?.date || ''}</span>
                </div>
              </div>

              {/* Card Rápido de Classificação */}
              <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Top Equipes</h3>
                  {teams.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Nenhuma equipa cadastrada.</p>
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

            {/* Prévia da Galeria na Home */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black uppercase text-white">📸 Momentos do Racha</h3>
                <button type="button" onClick={() => setTab('elenco')} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">Ver galeria completa →</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.slice(0, 3).map((p) => (
                  <div key={p.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
                    <div className="h-48 bg-slate-900 overflow-hidden">
                      <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
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

        {/* ABA TABELA */}
        {tab === 'tabelas' && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-700 bg-slate-800">
              <h2 className="text-xl font-black uppercase text-white">Classificação Geral</h2>
            </div>
            {teams.length === 0 ? (
              <p className="p-12 text-center text-slate-400 text-sm">Nenhuma equipa cadastrada. Vai ao Painel Admin para adicionar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/50 text-xs uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-4">Equipa</th>
                      <th className="p-4 text-center">Pontos</th>
                      <th className="p-4 text-center">GP</th>
                      <th className="p-4 text-center">GC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-sm">
                    {teams.map((t, index) => (
                      <tr key={t.id} className="hover:bg-slate-700/30">
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
              <h2 className="text-2xl font-black uppercase text-white">Galeria de Fotos</h2>
              <button type="button" onClick={() => setTab('admin')} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl cursor-pointer">
                + Enviar Foto do Dispositivo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((p) => (
                <div key={p.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                  <div className="h-56 bg-slate-900 overflow-hidden">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
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
            
            {/* Cadastrar Equipa */}
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Cadastrar Equipa</h3>
              <form onSubmit={handleAddTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome da Equipa</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Ex: Argentina FC"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm cursor-pointer uppercase tracking-wider shadow-lg">
                  Adicionar Equipa
                </button>
              </form>
            </div>

            {/* Publicar Notícia */}
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Publicar Notícia / Resenha</h3>
              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Título da Notícia</label>
                  <input
                    type="text"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    placeholder="Ex: Vitória emocionante nos acréscimos"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Conteúdo / Resumo</label>
                  <textarea
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    placeholder="Escreve os detalhes da partida ou resenha..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm cursor-pointer uppercase tracking-wider shadow-lg">
                  Publicar Notícia
                </button>
              </form>
            </div>

            {/* Enviar Foto Local */}
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-3xl shadow-xl md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Enviar Foto do Dispositivo</h3>
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Selecionar Imagem</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                    required
                  />
                </div>

                {selectedFile && (
                  <div className="h-32 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img src={selectedFile} alt="Pré-visualização" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Legenda da Foto</label>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="Ex: Resenha de domingo"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm cursor-pointer uppercase tracking-wider shadow-lg">
                  Publicar Foto
                </button>
              </form>
            </div>

            {/* Gerenciamento / Exclusão */}
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-3xl shadow-xl md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Gerir Itens Existentes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                {teams.map((t) => (
                  <div key={t.id} className="flex justify-between items-center p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-200 text-sm">{t.name}</span>
                    <button type="button" onClick={() => handleDeleteTeam(t.id)} className="text-xs bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-xl hover:bg-red-500/20 cursor-pointer">Excluir</button>
                  </div>
                ))}
                {news.map((n) => (
                  <div key={n.id} className="flex justify-between items-center p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="font-medium text-slate-300 text-xs truncate max-w-[200px]">{n.title}</span>
                    <button type="button" onClick={() => handleDeleteNews(n.id)} className="text-xs bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-xl hover:bg-red-500/20 cursor-pointer">Excluir Notícia</button>
                  </div>
                ))}
                {photos.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="font-medium text-slate-300 text-xs truncate max-w-[200px]">{p.caption}</span>
                    <button type="button" onClick={() => handleDeletePhoto(p.id)} className="text-xs bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-xl hover:bg-red-500/20 cursor-pointer">Excluir Foto</button>
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
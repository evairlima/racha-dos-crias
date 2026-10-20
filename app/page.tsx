import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-3xl font-black uppercase tracking-wider">Racha dos Crias</h1>
            <span className="text-xs text-emerald-300 font-medium italic tracking-wide">
              "Nem melhor, nem pior, apenas diferente."
            </span>
          </div>
          <nav className="flex gap-6 font-semibold text-sm">
            <a href="#" className="hover:text-emerald-300 transition border-b-2 border-transparent hover:border-emerald-300 pb-1">Início</a>
            <a href="#" className="hover:text-emerald-300 transition border-b-2 border-transparent hover:border-emerald-300 pb-1">A Resenha</a>
            <a href="#" className="hover:text-emerald-300 transition border-b-2 border-transparent hover:border-emerald-300 pb-1">Tabelas</a>
            <a href="#" className="hover:text-emerald-300 transition border-b-2 border-transparent hover:border-emerald-300 pb-1">Elenco</a>
          </nav>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 rounded-lg font-bold text-sm shadow transition">
            Painel Admin
          </button>
        </div>
      </header>

      <section className="bg-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80 z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Portal Oficial</span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Onde o Futebol <br className="hidden md:block" /> Encontra a Resenha.
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Acompanhe as últimas do futebol amador e profissional, as resenhas pós-jogo e as estatísticas exclusivas do maior racha da cidade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-900/50">
              Classificação Atual
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition border border-slate-700 shadow-lg">
              Últimas Notícias
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-6">
            <h3 className="text-2xl font-black text-slate-800 uppercase flex items-center gap-2">
              <span className="w-3 h-8 bg-emerald-600 rounded-sm"></span>
              A Resenha
            </h3>
            <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Ver todas &rarr;</a>
          </div>
          
          <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition cursor-pointer group">
            <div className="bg-slate-200 md:w-2/5 h-56 md:h-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-800/10 group-hover:bg-transparent transition z-10"></div>
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-sm bg-slate-300">
                [Imagem da Partida]
              </div>
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Futebol Amador</span>
              <h4 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-emerald-700 transition">
                Moura brilha, marca no final e garante vitória suada
              </h4>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                Em uma partida marcada pelo equilíbrio e forte marcação, o talento individual fez a diferença nos acréscimos. A equipe assume a liderança provisória.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-slate-400">Por Evair Velez</span>
                <span className="text-xs font-medium text-slate-400">Há 2 horas</span>
              </div>
            </div>
          </article>
        </div>

        <aside className="space-y-8">
          <div className="bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-slate-950 p-3 text-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Último Confronto</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-center w-1/3 flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-700 rounded-full mb-3 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                  <span className="font-bold text-sm">Time A</span>
                </div>
                <div className="text-center w-1/3 flex flex-col items-center">
                  <span className="text-4xl font-black mb-1">2 <span className="text-slate-500 mx-1">-</span> 1</span>
                  <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">Encerrado</span>
                </div>
                <div className="text-center w-1/3 flex flex-col items-center">
                  <div className="w-14 h-14 bg-slate-700 rounded-full mb-3 border-2 border-slate-600"></div>
                  <span className="font-bold text-sm">Time B</span>
                </div>
              </div>
              <div className="text-xs text-center text-slate-400 border-t border-slate-800 pt-4">
                <span className="text-emerald-400 font-semibold">Gols:</span> Moura (12'), Lucas (89') <span className="mx-2">|</span> Carlos (45')
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2, Droplets } from 'lucide-react';

interface SoilPlot {
  id: number;
  label: string;
  isPlanted: boolean;
  isWatered: boolean;
}

interface PlantingGameProps {
  onComplete: () => void;
}

export const PlantingGame: React.FC<PlantingGameProps> = ({ onComplete }) => {
  const [plots, setPlots] = useState<SoilPlot[]>([
    { id: 1, label: 'Lubang 1 (Cabai)', isPlanted: false, isWatered: false },
    { id: 2, label: 'Lubang 2 (Tomat)', isPlanted: false, isWatered: false },
    { id: 3, label: 'Lubang 3 (Sawi)', isPlanted: false, isWatered: false },
    { id: 4, label: 'Lubang 4 (Cabai)', isPlanted: false, isWatered: false },
    { id: 5, label: 'Lubang 5 (Tomat)', isPlanted: false, isWatered: false },
    { id: 6, label: 'Lubang 6 (Terong)', isPlanted: false, isWatered: false },
  ]);

  const [activeTool, setActiveTool] = useState<'seed' | 'water'>('seed');
  const [showGrowingTransition, setShowGrowingTransition] = useState(false);

  const plantedCount = plots.filter((p) => p.isPlanted).length;
  const wateredCount = plots.filter((p) => p.isWatered).length;
  const totalPlots = plots.length;

  const handlePlotClick = (plotId: number) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id !== plotId) return p;

        if (activeTool === 'seed' && !p.isPlanted) {
          sound.playPop();
          return { ...p, isPlanted: true };
        }

        if (activeTool === 'water' && p.isPlanted && !p.isWatered) {
          sound.playWater();
          const isLastWater = wateredCount + 1 === totalPlots;
          if (isLastWater) {
            setTimeout(() => {
              sound.playSuccess();
              sound.playApplause();
              setShowGrowingTransition(true);
            }, 1000);
          }
          return { ...p, isWatered: true };
        }

        return p;
      })
    );
  };

  const renderDirtMound = (isPlanted: boolean, isWatered: boolean) => (
    <svg viewBox="0 0 100 60" className="w-full h-full max-h-32 drop-shadow-xl transition-all duration-300">
      {/* Base Dirt */}
      <path d="M 10 50 Q 50 10 90 50 Z" fill={isWatered ? '#451A03' : '#78350F'} stroke="#000" strokeWidth="3" strokeLinecap="round" />
      {/* Hole */}
      {!isPlanted && <ellipse cx="50" cy="40" rx="15" ry="5" fill="#290a00" />}
      {/* Seed */}
      {isPlanted && !isWatered && (
        <g>
          <circle cx="48" cy="38" r="3" fill="#FDE047" />
          <circle cx="52" cy="40" r="3" fill="#FDE047" />
        </g>
      )}
      {/* Sprout (Watered) */}
      {isWatered && (
        <g className="animate-bounce-subtle">
          <path d="M 50 40 Q 40 20 50 10" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 25 Q 35 25 35 15 Q 45 15 50 25 Z" fill="#4ADE80" stroke="#000" strokeWidth="2" />
          <path d="M 50 30 Q 65 30 65 20 Q 55 20 50 30 Z" fill="#22C55E" stroke="#000" strokeWidth="2" />
        </g>
      )}
    </svg>
  );

  return (
    <div className="w-full h-full flex flex-col p-4 animate-fadeIn select-none relative">
      {/* Growing Transition Overlay */}
      {showGrowingTransition && (
        <div className="absolute inset-0 bg-emerald-400 z-50 flex flex-col items-center justify-center animate-fadeIn p-6 rounded-3xl border-4 border-black">
          <Sparkles className="w-24 h-24 text-yellow-300 mb-6 animate-spin-slow" />
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-900 mb-4 drop-shadow-md text-center">
            Yeayyy! Bibit Mulai Bertumbuh! 🌱✨
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-800 mb-10 text-center">
            Tanaman menyerap air dan perlahan menjadi besar...
          </p>
          <div className="flex gap-4 mb-10">
            <div className="text-6xl animate-bounce-subtle" style={{animationDelay: '0s'}}>🌱</div>
            <div className="text-6xl animate-bounce-subtle" style={{animationDelay: '0.2s'}}>🌿</div>
            <div className="text-6xl animate-bounce-subtle" style={{animationDelay: '0.4s'}}>🌳</div>
          </div>
          <button
            onClick={onComplete}
            className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-10 py-4 text-2xl flex items-center gap-3 animate-pulse"
          >
            <CheckCircle2 className="w-8 h-8" /> Lanjut Panen
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white p-4 rounded-2xl border-4 border-black neo-shadow-strong">
        <div>
          <h3 className="font-extrabold text-lg md:text-2xl text-slate-900">
            Menanam & Menyiram 🌱
          </h3>
          <p className="text-sm md:text-base text-slate-700 font-bold mt-1">
            Pilih alat (Bibit/Air) dan klik gundukan tanah untuk menanam!
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="neo-badge bg-yellow-300 text-black px-4 py-1 text-sm md:text-base border-2 border-black font-black whitespace-nowrap">
            Tertanam: {plantedCount} / {totalPlots}
          </div>
          <div className="neo-badge bg-sky-300 text-black px-4 py-1 text-sm md:text-base border-2 border-black font-black whitespace-nowrap">
            Tersiram: {wateredCount} / {totalPlots}
          </div>
        </div>
      </div>

      {/* TOOLS */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => { sound.playClick(); setActiveTool('seed'); }}
          className={`neo-btn px-6 py-3 text-lg md:text-xl flex items-center gap-3 transition-all ${
            activeTool === 'seed' ? 'bg-amber-300 scale-110 border-4 ring-4 ring-black z-10' : 'bg-white hover:bg-slate-100 opacity-75'
          }`}
        >
          <span className="text-3xl">🌱</span> <span className="font-black">1. Bibit</span>
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTool('water'); }}
          className={`neo-btn px-6 py-3 text-lg md:text-xl flex items-center gap-3 transition-all ${
            activeTool === 'water' ? 'bg-sky-400 scale-110 border-4 ring-4 ring-black z-10' : 'bg-white hover:bg-slate-100 opacity-75'
          }`}
        >
          <span className="text-3xl">🪣</span> <span className="font-black">2. Siram</span>
        </button>
      </div>

      {/* DIRT PLOTS */}
      <div className="relative flex-1 bg-gradient-to-b from-amber-700 to-amber-900 border-4 border-black rounded-3xl p-4 md:p-8 shadow-inner min-h-[300px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 h-full">
          {plots.map((plot) => (
            <div
              key={plot.id}
              onClick={() => handlePlotClick(plot.id)}
              className={`relative cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-end justify-center ${
                activeTool === 'seed' && !plot.isPlanted ? 'hover:brightness-125' : 
                activeTool === 'water' && plot.isPlanted && !plot.isWatered ? 'hover:brightness-125' : ''
              }`}
            >
              {renderDirtMound(plot.isPlanted, plot.isWatered)}
              
              {/* Tooltip Action Hint */}
              {!plot.isWatered && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 neo-badge bg-white text-xs font-black px-2 py-1 flex items-center gap-1 animate-bounce">
                  {!plot.isPlanted ? 'Tanam Bibit' : 'Siram Air'}
                  {!plot.isPlanted ? '🌱' : <Droplets className="w-3 h-3 text-sky-500 fill-current" />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

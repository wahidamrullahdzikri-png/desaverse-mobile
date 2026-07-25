import React, { useState, useCallback } from 'react';
import { Indicators } from '../types';
import { Volume2, VolumeX, BookOpen, RefreshCw, Maximize, Minimize } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderHUDProps {
  indicators: Indicators;
  act: number;
  sceneTitle: string;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenFacilitatorMode: () => void;
  onResetGame: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  indicators,
  act,
  sceneTitle,
  isAudioMuted,
  onToggleAudio,
  onOpenFacilitatorMode,
  onResetGame,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  }, []);

  // Helper to render visual indicator bars (1-5 segments)
  const renderValueBar = (value: number, colorClass: string, icon: string, label: string) => {
    const bars = Math.min(5, Math.max(1, Math.round((value / 100) * 5)));
    return (
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]" title={`${label}: ${value}%`}>
        <span className="text-sm select-none">{icon}</span>
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-3.5 rounded-xs border border-black transition-all ${
                i <= bars ? colorClass : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="w-full bg-yellow-300 border-b-4 border-black px-3 py-2 md:px-6 md:py-2.5 shadow-[0px_4px_0px_#000] z-30 relative">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Logo & Act Badge */}
        <div className="flex items-center gap-2">
          <div className="neo-btn bg-white px-3 py-1 text-sm md:text-base font-extrabold text-slate-900 tracking-wider flex items-center gap-1.5">
            <span className="text-yellow-500 text-lg">🌾</span> DESAVERSE
          </div>
          <span className="hidden sm:inline-block neo-badge bg-amber-400 text-slate-900 px-2.5 py-0.5 text-xs">
            Babak {act}
          </span>
          <span className="text-xs md:text-sm font-extrabold text-slate-800 truncate max-w-[150px] md:max-w-[220px]">
            {sceneTitle}
          </span>
        </div>

        {/* 4 Indicators */}
        <div className="flex flex-wrap items-center gap-2">
          {renderValueBar(indicators.ekonomi, 'bg-amber-400', '💰', 'Ekonomi')}
          {renderValueBar(indicators.lingkungan, 'bg-emerald-400', '🌿', 'Lingkungan')}
          {renderValueBar(indicators.pangan, 'bg-lime-400', '🌾', 'Ketahanan Pangan')}
          {renderValueBar(indicators.kemandirian, 'bg-sky-400', '🤝', 'Kemandirian Desa')}
        </div>

        {/* Facilitator & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenFacilitatorMode();
            }}
            className="neo-btn bg-indigo-300 hover:bg-indigo-200 text-black px-2.5 py-1.5 text-xs md:text-sm flex items-center gap-1"
            title="Panduan Fasilitator KKN"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Panduan KKN</span>
          </button>

          <button
            onClick={onToggleAudio}
            className="neo-btn bg-white hover:bg-slate-100 p-1.5 text-black"
            title={isAudioMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="neo-btn bg-yellow-400 hover:bg-yellow-300 p-1.5 text-black"
            title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-black" /> : <Maximize className="w-4 h-4 text-black" />}
          </button>

          <button
            onClick={() => {
              if (confirm('Ulangi permainan dari awal?')) {
                sound.playClick();
                onResetGame();
              }
            }}
            className="neo-btn bg-white hover:bg-red-100 p-1.5 text-black"
            title="Ulangi Game"
          >
            <RefreshCw className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

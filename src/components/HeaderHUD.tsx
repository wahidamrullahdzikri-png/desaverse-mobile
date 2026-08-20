import React, { useState, useEffect, useCallback } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(
    !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
      );
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
    if (!isFs) {
      // Must be called synchronously within user gesture
      const el = document.documentElement as any;
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (req) {
        req.call(el).then(() => {
          setIsFullscreen(true);
          try {
            if (screen.orientation && typeof (screen.orientation as any).lock === 'function') {
              (screen.orientation as any).lock('landscape').catch(() => {});
            }
          } catch (_) {}
        }).catch(() => {});
      }
    } else {
      const exit = (document as any).exitFullscreen || (document as any).webkitExitFullscreen || (document as any).mozCancelFullScreen || (document as any).msExitFullscreen;
      if (exit) {
        exit.call(document).then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  }, []);

  // Helper to render visual indicator bars (1-5 segments)
  const renderValueBar = (value: number, colorClass: string, icon: string, label: string) => {
    const bars = Math.min(5, Math.max(1, Math.round((value / 100) * 5)));
    return (
      <div className="flex items-center gap-0.5 md:gap-1 bg-white px-1 md:px-2.5 py-0.5 md:py-1 rounded-md md:rounded-xl border border-black shadow-[1px_1px_0px_#000] md:shadow-[2px_2px_0px_#000]" title={`${label}: ${value}%`}>
        <span className="text-[10px] md:text-sm select-none">{icon}</span>
        <div className="flex gap-0.25 md:gap-1 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-0.5 md:w-2 h-1.5 md:h-3.5 rounded-xs border border-black transition-all ${
                i <= bars ? colorClass : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="w-full bg-yellow-300 border-b-2 border-black px-1.5 py-0 h-8 sm:h-9 md:h-14 flex items-center shadow-[0px_2px_0px_#000] z-30 relative">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-1 h-full">
        {/* Logo & Act Badge */}
        <div className="flex items-center gap-1">
          <div className="neo-btn bg-white px-1 py-0.5 md:px-3 md:py-1 text-[10px] md:text-base font-extrabold text-slate-900 tracking-wider flex items-center gap-0.5 md:gap-1.5">
            <span className="text-yellow-500 text-xs md:text-lg">🌾</span> <span className="hidden sm:inline">DESAVERSE</span>
          </div>
          <span className="neo-badge bg-amber-400 text-slate-900 px-1 py-0.25 text-[8px] md:text-xs">
            B{act}
          </span>
        </div>

        {/* 4 Indicators */}
        <div className="flex items-center gap-0.5 md:gap-2">
          {renderValueBar(indicators.ekonomi, 'bg-amber-400', '💰', 'Ekonomi')}
          {renderValueBar(indicators.lingkungan, 'bg-emerald-400', '🌿', 'Lingkungan')}
          {renderValueBar(indicators.pangan, 'bg-lime-400', '🌾', 'Ketahanan Pangan')}
          {renderValueBar(indicators.kemandirian, 'bg-sky-400', '🤝', 'Kemandirian')}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenFacilitatorMode();
            }}
            className="neo-btn bg-indigo-300 hover:bg-indigo-200 text-black px-1.5 py-1 md:px-2.5 md:py-1.5 text-[10px] md:text-sm flex items-center gap-1"
            title="Panduan Fasilitator KKN"
          >
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline">Panduan KKN</span>
          </button>

          <button
            onClick={onToggleAudio}
            className="neo-btn bg-white hover:bg-slate-100 p-1 md:p-1.5 text-black"
            title={isAudioMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isAudioMuted ? <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-red-500" /> : <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex neo-btn bg-yellow-400 hover:bg-yellow-300 p-1 md:p-1.5 text-black"
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
            className="neo-btn bg-white hover:bg-red-100 p-1 md:p-1.5 text-black"
            title="Ulangi Game"
          >
            <RefreshCw className="w-3 h-3 md:w-4 md:h-4 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

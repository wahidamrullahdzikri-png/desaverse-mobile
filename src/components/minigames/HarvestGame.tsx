import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2, Timer, Flame, Target } from 'lucide-react';

interface HarvestGameProps {
  onComplete: () => void;
}

// SVG Vegetable Components
const CabaiSVG = () => (
  <svg viewBox="0 0 40 80" className="w-12 h-24 md:w-16 md:h-32 drop-shadow-lg pointer-events-none">
    <path d="M 20 5 Q 18 0 20 -2 Q 22 0 20 5" fill="#22C55E" stroke="#000" strokeWidth="1.5" />
    <path d="M 16 8 Q 14 5 18 3 L 22 3 Q 26 5 24 8 Z" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 16 8 Q 14 30 12 50 Q 11 65 15 75 Q 18 80 20 78 Q 22 75 20 65 Q 18 50 20 30 Q 22 50 24 65 Q 26 75 24 78 Q 26 80 28 75 Q 30 65 28 50 Q 26 30 24 8 Z" fill="#EF4444" stroke="#000" strokeWidth="2" />
    <path d="M 18 15 Q 17 25 16 40" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
  </svg>
);

const TomatSVG = () => (
  <svg viewBox="0 0 50 55" className="w-14 h-16 md:w-20 md:h-24 drop-shadow-lg pointer-events-none">
    <path d="M 22 8 Q 20 2 25 0 Q 30 2 28 8" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 15 10 Q 12 8 18 5 L 25 3 L 32 5 Q 38 8 35 10 Z" fill="#22C55E" stroke="#000" strokeWidth="1.5" />
    <ellipse cx="25" cy="32" rx="20" ry="18" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
    <path d="M 10 28 Q 25 22 40 28" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="18" cy="28" rx="3" ry="2" fill="#FCA5A5" opacity="0.5" />
  </svg>
);

const TerongSVG = () => (
  <svg viewBox="0 0 40 80" className="w-12 h-24 md:w-16 md:h-32 drop-shadow-lg pointer-events-none">
    <path d="M 16 12 Q 14 6 20 2 Q 26 6 24 12 Z" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 14 12 Q 10 30 12 50 Q 14 68 20 75 Q 26 68 28 50 Q 30 30 26 12 Z" fill="#7C3AED" stroke="#000" strokeWidth="2.5" />
    <path d="M 16 20 Q 14 35 15 50" fill="none" stroke="#6D28D9" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="17" cy="25" rx="3" ry="4" fill="#A78BFA" opacity="0.3" />
  </svg>
);

const SawiSVG = () => (
  <svg viewBox="0 0 50 60" className="w-14 h-16 md:w-20 md:h-24 drop-shadow-lg pointer-events-none">
    <path d="M 25 55 L 23 35 Q 10 30 8 15 Q 12 8 25 20 Z" fill="#4ADE80" stroke="#000" strokeWidth="2" />
    <path d="M 25 55 L 27 35 Q 40 30 42 15 Q 38 8 25 20 Z" fill="#22C55E" stroke="#000" strokeWidth="2" />
    <path d="M 25 55 L 25 25 Q 25 10 25 5 Q 20 15 22 30 Z" fill="#16A34A" stroke="#000" strokeWidth="2" />
    <path d="M 24 50 L 22 55 L 28 55 L 26 50 Z" fill="#A3E635" stroke="#000" strokeWidth="1.5" />
  </svg>
);

type VeggieType = 'cabai' | 'tomat' | 'terong' | 'sawi';
const VEGGIE_TYPES: VeggieType[] = ['cabai', 'tomat', 'terong', 'sawi'];

interface ActiveVeggie {
  id: number;
  type: VeggieType;
  x: number;
  y: number;
  spawnTime: number;
}

export const HarvestGame: React.FC<HarvestGameProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [activeVeggies, setActiveVeggies] = useState<ActiveVeggie[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const targetScore = 15;
  const veggieIdCounter = useRef(0);

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('finished');
          sound.playApplause();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [gameState]);

  // Spawning & Despawning loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      const now = Date.now();
      
      setActiveVeggies((prev) => {
        // Despawn veggies that have been alive for > 3 seconds
        const alive = prev.filter(v => now - v.spawnTime < 3000);
        
        // If any were missed (despawned without being clicked)
        if (alive.length < prev.length) {
          setCombo(0);
        }
        
        // Spawn new veggies if there are fewer than 4 on screen
        if (alive.length < 4 && Math.random() > 0.3) {
          const newType = VEGGIE_TYPES[Math.floor(Math.random() * VEGGIE_TYPES.length)];
          // Ensure they spawn nicely inside the bounds (padding % for safe click area)
          const newX = 10 + Math.random() * 80;
          const newY = 30 + Math.random() * 55;
          alive.push({
            id: veggieIdCounter.current++,
            type: newType,
            x: newX,
            y: newY,
            spawnTime: now
          });
        }
        
        return [...alive]; // Return new array reference to trigger re-render
      });
    }, 600);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  // Check win condition
  useEffect(() => {
    if (score >= targetScore && gameState === 'playing') {
      setGameState('finished');
      sound.playSuccess();
      setTimeout(() => sound.playApplause(), 500);
    }
  }, [score, targetScore, gameState]);

  const handleHarvest = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (gameState !== 'playing') return;
    
    sound.playPop();
    
    setActiveVeggies((prev) => prev.filter((v) => v.id !== id));
    setScore((s) => s + 1);
    
    setCombo((c) => {
      const newCombo = c + 1;
      if (newCombo >= 3 && newCombo % 3 === 0) {
        sound.playSuccess(); // bonus sound for combo milestones
      }
      return newCombo;
    });
  };

  const renderVegetableSVG = (type: VeggieType) => {
    switch (type) {
      case 'cabai': return <CabaiSVG />;
      case 'tomat': return <TomatSVG />;
      case 'terong': return <TerongSVG />;
      case 'sawi': return <SawiSVG />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-3 md:p-4 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-wrap sm:flex-row items-center justify-between gap-3 mb-3 bg-white p-3 md:p-4 rounded-2xl border-4 border-black neo-shadow-strong relative">
        <div className="flex-1">
          <h3 className="font-extrabold text-base md:text-xl text-slate-900 flex items-center gap-2">
            <Timer className="w-6 h-6 text-red-500" />
            Ayo Panen Cepat! ({timeLeft}s)
          </h3>
          <p className="text-xs md:text-sm text-slate-700 font-bold mt-1">
            Tap sayuran yang muncul sebelum mereka menghilang!
          </p>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="neo-badge bg-blue-300 text-black px-4 py-2 border-4 border-black font-black whitespace-nowrap flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider">Target</span>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" /> {score} / {targetScore}
            </div>
          </div>
        </div>

        {/* Combo Indicator */}
        {combo >= 3 && (
          <div className="absolute -top-3 -right-3 md:top-2 md:right-1/3 animate-bounce neo-badge bg-orange-400 text-black px-3 py-1 border-4 border-black font-black flex items-center gap-1 rotate-12 z-20">
            <Flame className="w-5 h-5 text-red-600 fill-red-500" />
            COMBO x{combo}!
          </div>
        )}
      </div>

      {/* Farm Field */}
      <div className="relative flex-1 flex flex-col overflow-hidden rounded-3xl border-4 border-black shadow-inner min-h-[400px] cursor-crosshair">
        {/* Sky Background */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-sky-400 to-sky-200">
          <div className="absolute top-3 right-6 text-4xl md:text-5xl animate-pulse">☀️</div>
          <div className="absolute top-8 left-10 text-3xl animate-float-cloud-1">☁️</div>
          <div className="absolute top-4 left-1/2 text-2xl animate-float-cloud-2 opacity-80">☁️</div>
        </div>

        {/* Ground Background */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-b from-amber-700 to-amber-900 border-t-8 border-amber-950"></div>
        
        {/* Farm Rows */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] opacity-30 flex flex-col justify-around py-4">
          <div className="w-full h-4 bg-amber-950 rounded-full blur-sm" />
          <div className="w-full h-4 bg-amber-950 rounded-full blur-sm" />
          <div className="w-full h-4 bg-amber-950 rounded-full blur-sm" />
          <div className="w-full h-4 bg-amber-950 rounded-full blur-sm" />
        </div>

        {/* Crops Container */}
        <div className="relative z-10 w-full h-full">
          {activeVeggies.map((veggie) => (
            <div
              key={veggie.id}
              onMouseDown={(e) => handleHarvest(veggie.id, e)}
              onTouchStart={(e) => handleHarvest(veggie.id, e)}
              className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-90 transition-transform duration-100 animate-bounce-subtle"
              style={{ left: `${veggie.x}%`, top: `${veggie.y}%` }}
            >
              {renderVegetableSVG(veggie.type)}
              {/* Dirt mound for aesthetic */}
              <svg viewBox="0 0 80 20" className="w-16 h-4 -mt-2 opacity-80 pointer-events-none">
                <path d="M 5 18 Q 40 0 75 18 Z" fill="#451A03" stroke="#000" strokeWidth="2" />
              </svg>
            </div>
          ))}
        </div>

        {/* Completion Overlay */}
        {gameState === 'finished' && (
          <div className="absolute inset-0 bg-emerald-400/95 flex flex-col items-center justify-center p-6 animate-fadeIn z-30">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mb-4 animate-spin-slow" />
            <h2 className="font-extrabold text-3xl md:text-4xl text-slate-900 mb-2 drop-shadow-md text-center leading-tight">
              {score >= targetScore ? 'Luar Biasa! 🧺✨' : 'Waktu Habis! ⏰'}
            </h2>
            <p className="text-base md:text-lg font-bold text-slate-800 mb-6 text-center max-w-sm">
              {score >= targetScore 
                ? `Hebat! Kamu berhasil memanen ${score} sayuran dengan cepat!`
                : `Kamu memanen ${score} sayuran. Ayo coba lebih cepat lagi nanti!`}
            </p>
            
            <div className="neo-box bg-white mb-6 text-center">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Skor Akhir</p>
              <p className="text-4xl font-black text-emerald-600">{score}</p>
            </div>

            <button
              onClick={onComplete}
              className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 text-xl flex items-center gap-3 active:scale-95 transition-transform"
            >
              <CheckCircle2 className="w-7 h-7" /> Lanjut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

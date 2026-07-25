import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface CropSlot {
  id: number;
  name: string;
  type: 'cabai' | 'tomat' | 'terong' | 'sawi';
  harvested: boolean;
}

interface HarvestGameProps {
  onComplete: () => void;
}

// SVG Vegetable Components
const CabaiSVG = () => (
  <svg viewBox="0 0 40 80" className="w-8 h-16 md:w-10 md:h-20 drop-shadow-lg">
    <path d="M 20 5 Q 18 0 20 -2 Q 22 0 20 5" fill="#22C55E" stroke="#000" strokeWidth="1.5" />
    <path d="M 16 8 Q 14 5 18 3 L 22 3 Q 26 5 24 8 Z" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 16 8 Q 14 30 12 50 Q 11 65 15 75 Q 18 80 20 78 Q 22 75 20 65 Q 18 50 20 30 Q 22 50 24 65 Q 26 75 24 78 Q 26 80 28 75 Q 30 65 28 50 Q 26 30 24 8 Z" fill="#EF4444" stroke="#000" strokeWidth="2" />
    <path d="M 18 15 Q 17 25 16 40" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.5" />
  </svg>
);

const TomatSVG = () => (
  <svg viewBox="0 0 50 55" className="w-10 h-11 md:w-12 md:h-14 drop-shadow-lg">
    <path d="M 22 8 Q 20 2 25 0 Q 30 2 28 8" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 15 10 Q 12 8 18 5 L 25 3 L 32 5 Q 38 8 35 10 Z" fill="#22C55E" stroke="#000" strokeWidth="1.5" />
    <ellipse cx="25" cy="32" rx="20" ry="18" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
    <path d="M 10 28 Q 25 22 40 28" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="18" cy="28" rx="3" ry="2" fill="#FCA5A5" opacity="0.5" />
  </svg>
);

const TerongSVG = () => (
  <svg viewBox="0 0 40 80" className="w-8 h-16 md:w-10 md:h-20 drop-shadow-lg">
    <path d="M 16 12 Q 14 6 20 2 Q 26 6 24 12 Z" fill="#16A34A" stroke="#000" strokeWidth="1.5" />
    <path d="M 14 12 Q 10 30 12 50 Q 14 68 20 75 Q 26 68 28 50 Q 30 30 26 12 Z" fill="#7C3AED" stroke="#000" strokeWidth="2.5" />
    <path d="M 16 20 Q 14 35 15 50" fill="none" stroke="#6D28D9" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="17" cy="25" rx="3" ry="4" fill="#A78BFA" opacity="0.3" />
  </svg>
);

const SawiSVG = () => (
  <svg viewBox="0 0 50 60" className="w-10 h-12 md:w-12 md:h-14 drop-shadow-lg">
    <path d="M 25 55 L 23 35 Q 10 30 8 15 Q 12 8 25 20 Z" fill="#4ADE80" stroke="#000" strokeWidth="2" />
    <path d="M 25 55 L 27 35 Q 40 30 42 15 Q 38 8 25 20 Z" fill="#22C55E" stroke="#000" strokeWidth="2" />
    <path d="M 25 55 L 25 25 Q 25 10 25 5 Q 20 15 22 30 Z" fill="#16A34A" stroke="#000" strokeWidth="2" />
    <path d="M 24 50 L 22 55 L 28 55 L 26 50 Z" fill="#A3E635" stroke="#000" strokeWidth="1.5" />
  </svg>
);

export const HarvestGame: React.FC<HarvestGameProps> = ({ onComplete }) => {
  const [crops, setCrops] = useState<CropSlot[]>([
    { id: 1, name: 'Cabai Merah', type: 'cabai', harvested: false },
    { id: 2, name: 'Cabai Merah', type: 'cabai', harvested: false },
    { id: 3, name: 'Tomat Segar', type: 'tomat', harvested: false },
    { id: 4, name: 'Tomat Segar', type: 'tomat', harvested: false },
    { id: 5, name: 'Terong Ungu', type: 'terong', harvested: false },
    { id: 6, name: 'Terong Ungu', type: 'terong', harvested: false },
    { id: 7, name: 'Sawi Hijau', type: 'sawi', harvested: false },
    { id: 8, name: 'Sawi Hijau', type: 'sawi', harvested: false },
  ]);

  const harvestedCount = crops.filter((c) => c.harvested).length;
  const totalCrops = crops.length;
  const isFinished = harvestedCount === totalCrops;

  const handleHarvest = (id: number) => {
    sound.playPop();
    setCrops((prev) =>
      prev.map((c) => (c.id === id ? { ...c, harvested: true } : c))
    );
    if (harvestedCount + 1 === totalCrops) {
      setTimeout(() => {
        sound.playSuccess();
        sound.playApplause();
      }, 500);
    }
  };

  const renderVegetableSVG = (type: string) => {
    switch (type) {
      case 'cabai': return <CabaiSVG />;
      case 'tomat': return <TomatSVG />;
      case 'terong': return <TerongSVG />;
      case 'sawi': return <SawiSVG />;
      default: return <CabaiSVG />;
    }
  };

  // Full plant with vegetable growing on it
  const renderPlantWithCrop = (crop: CropSlot) => (
    <div
      key={crop.id}
      onClick={() => !crop.harvested && handleHarvest(crop.id)}
      className={`relative flex flex-col items-center justify-end cursor-pointer transition-all duration-300 ${
        crop.harvested ? 'opacity-60 scale-95' : 'hover:scale-110 active:scale-90'
      }`}
    >
      {/* The plant stem & leaves */}
      <svg viewBox="0 0 60 50" className="w-16 h-12 md:w-20 md:h-14">
        <path d="M 30 48 Q 28 30 30 15" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
        <path d="M 30 35 Q 15 30 10 20" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
        <path d="M 30 25 Q 45 20 50 12" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="10" cy="18" rx="8" ry="5" fill="#4ADE80" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="50" cy="10" rx="8" ry="5" fill="#4ADE80" stroke="#000" strokeWidth="1.5" />
      </svg>

      {/* The vegetable hanging */}
      {!crop.harvested ? (
        <div className="absolute -top-4 animate-bounce-subtle">
          {renderVegetableSVG(crop.type)}
        </div>
      ) : (
        <div className="absolute -top-2 text-2xl">✅</div>
      )}

      {/* Dirt mound */}
      <svg viewBox="0 0 80 20" className="w-20 h-5">
        <path d="M 5 18 Q 40 0 75 18 Z" fill="#78350F" stroke="#000" strokeWidth="2" />
      </svg>

      {/* Label */}
      <span className={`text-[10px] md:text-xs font-black mt-0.5 px-1.5 py-0.5 rounded border border-black ${
        crop.harvested ? 'bg-gray-200 text-gray-500' : 'bg-white text-slate-900'
      }`}>
        {crop.harvested ? '✓ Dipetik' : crop.name}
      </span>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col p-3 md:p-4 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 bg-white p-3 md:p-4 rounded-2xl border-4 border-black neo-shadow-strong">
        <div>
          <h3 className="font-extrabold text-base md:text-xl text-slate-900">
            🧺 Waktunya Panen Sayuran!
          </h3>
          <p className="text-xs md:text-sm text-slate-700 font-bold mt-1">
            Klik sayuran yang sudah matang untuk memetiknya ke keranjang.
          </p>
        </div>
        <div className="neo-badge bg-yellow-300 text-black px-5 py-2 text-base md:text-lg border-4 border-black font-black whitespace-nowrap">
          🧺 {harvestedCount} / {totalCrops}
        </div>
      </div>

      {/* Farm Field */}
      <div className="relative flex-1 flex flex-col overflow-hidden rounded-3xl border-4 border-black shadow-inner min-h-[400px]">
        {/* Sky Background (Top 40%) */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100">
          <div className="absolute top-3 right-6 text-4xl md:text-5xl">☀️</div>
          <div className="absolute top-4 left-10 text-3xl animate-float-cloud-1">☁️</div>
        </div>

        {/* Ground Background (Bottom 60%) */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-amber-700 to-amber-900 border-t-4 border-amber-950"></div>

        {/* Crops Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-y-4 md:gap-y-8 gap-x-2 p-2 md:p-6 h-full w-full">
          {crops.map((crop) => renderPlantWithCrop(crop))}
        </div>

        {/* Basket */}
        <div className="absolute bottom-1 left-4 neo-box bg-yellow-200 px-3 py-1 flex items-center gap-2 z-20 text-sm md:text-base">
          <span className="text-2xl">🧺</span>
          <span className="font-black text-slate-900">{harvestedCount} Hasil</span>
        </div>

        {/* Completion Overlay */}
        {isFinished && (
          <div className="absolute inset-0 bg-emerald-400/95 flex flex-col items-center justify-center p-6 animate-fadeIn z-30">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mb-4 animate-spin-slow" />
            <h2 className="font-extrabold text-2xl md:text-4xl text-slate-900 mb-2 drop-shadow-md">
              Horeee! Panen Melimpah Ruah! 🧺✨
            </h2>
            <p className="text-base md:text-lg font-bold text-slate-800 mb-6">
              Semua sayuran berhasil dipetik segar langsung dari kebun!
            </p>
            <button
              onClick={onComplete}
              className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 text-xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-7 h-7" /> Lanjut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

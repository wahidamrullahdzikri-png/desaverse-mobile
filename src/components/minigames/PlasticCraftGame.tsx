import React, { useState, useRef, useCallback } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2, Scissors, Paintbrush } from 'lucide-react';

interface PlasticCraftGameProps {
  onComplete: () => void;
}

type CraftStage = 'choose' | 'clean' | 'cut' | 'decorate' | 'plant' | 'done';
type BotolType = 'mineral' | 'soda' | 'soap';
type PlantType = 'kertas' | 'matahari' | 'daun';

interface DirtSpot {
  id: number;
  cx: number;
  cy: number;
  cleaned: boolean;
}

interface Sticker {
  id: number;
  icon: string;
  x: number;
  y: number;
}

// ─── SVG BOTTLE COMPONENTS ─────────────────────────────────
const BotolMineralSVG = ({ fillColor = '#bfdbfe', opacity = 1 }: { fillColor?: string; opacity?: number }) => (
  <svg viewBox="0 0 60 130" className="w-full h-full" style={{ opacity }}>
    {/* Cap */}
    <rect x="19" y="2" width="22" height="10" rx="4" fill="#60a5fa" stroke="#000" strokeWidth="1.5" />
    {/* Neck */}
    <rect x="22" y="10" width="16" height="18" rx="3" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Shoulder */}
    <path d="M14,28 Q22,24 30,24 Q38,24 46,28 L46,36 Q38,30 30,30 Q22,30 14,36 Z" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Body */}
    <rect x="10" y="34" width="40" height="76" rx="5" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Label */}
    <rect x="14" y="52" width="32" height="36" rx="4" fill="white" stroke="#93c5fd" strokeWidth="1" />
    <text x="30" y="66" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e40af">AQUA</text>
    <text x="30" y="77" textAnchor="middle" fontSize="5" fill="#3b82f6">600 ml</text>
    {/* Bottom */}
    <rect x="10" y="108" width="40" height="4" rx="2" fill={fillColor} stroke="#000" strokeWidth="1.5" />
  </svg>
);

const BotolSodaSVG = ({ fillColor = '#bbf7d0', opacity = 1 }: { fillColor?: string; opacity?: number }) => (
  <svg viewBox="0 0 60 130" className="w-full h-full" style={{ opacity }}>
    {/* Cap */}
    <rect x="17" y="2" width="26" height="11" rx="5" fill="#16a34a" stroke="#000" strokeWidth="1.5" />
    {/* Neck */}
    <rect x="20" y="11" width="20" height="15" rx="3" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Shoulder wider */}
    <path d="M10,26 Q20,22 30,22 Q40,22 50,26 L52,38 Q40,32 30,32 Q20,32 8,38 Z" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Wider body */}
    <rect x="8" y="36" width="44" height="72" rx="6" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Label */}
    <rect x="12" y="52" width="36" height="38" rx="4" fill="white" stroke="#86efac" strokeWidth="1" />
    <text x="30" y="67" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#166534">SODA</text>
    <text x="30" y="79" textAnchor="middle" fontSize="5" fill="#16a34a">Hijau Segar</text>
    {/* Bottom */}
    <rect x="8" y="106" width="44" height="6" rx="3" fill={fillColor} stroke="#000" strokeWidth="1.5" />
  </svg>
);

const BotolSabunSVG = ({ fillColor = '#f9a8d4', opacity = 1 }: { fillColor?: string; opacity?: number }) => (
  <svg viewBox="0 0 60 130" className="w-full h-full" style={{ opacity }}>
    {/* Pump head */}
    <rect x="24" y="2" width="12" height="6" rx="2" fill="#db2777" stroke="#000" strokeWidth="1.5" />
    {/* Pump tube */}
    <rect x="27" y="8" width="6" height="18" rx="2" fill="#f472b6" stroke="#000" strokeWidth="1" />
    {/* Pump dispenser nozzle */}
    <rect x="27" y="6" width="18" height="5" rx="2" fill="#db2777" stroke="#000" strokeWidth="1.5" />
    {/* Shoulder */}
    <path d="M14,26 Q22,22 30,22 Q38,22 46,26 L46,34 Q38,28 30,28 Q22,28 14,34 Z" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Body */}
    <rect x="12" y="32" width="36" height="78" rx="8" fill={fillColor} stroke="#000" strokeWidth="1.5" />
    {/* Label */}
    <rect x="16" y="52" width="28" height="38" rx="4" fill="white" stroke="#f9a8d4" strokeWidth="1" />
    <text x="30" y="67" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#9d174d">SABUN</text>
    <text x="30" y="79" textAnchor="middle" fontSize="5" fill="#be185d">Cair</text>
    {/* Bottom */}
    <rect x="12" y="108" width="36" height="4" rx="2" fill={fillColor} stroke="#000" strokeWidth="1.5" />
  </svg>
);

// Half-bottle pot SVG
const PotSVG = ({ fillColor, stickers }: { fillColor: string; stickers: Sticker[] }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Rope holes */}
    <circle cx="18" cy="10" r="5" fill="#78716c" stroke="#000" strokeWidth="2" />
    <circle cx="102" cy="10" r="5" fill="#78716c" stroke="#000" strokeWidth="2" />
    {/* Rope lines */}
    <line x1="18" y1="5" x2="18" y2="0" stroke="#78716c" strokeWidth="3" />
    <line x1="102" y1="5" x2="102" y2="0" stroke="#78716c" strokeWidth="3" />
    {/* Pot body (half bottle shape) */}
    <path d="M15,10 L105,10 L92,90 Q60,100 28,90 Z" fill={fillColor} stroke="#000" strokeWidth="2.5" />
    {/* Top rim */}
    <rect x="13" y="8" width="94" height="8" rx="4" fill={fillColor} stroke="#000" strokeWidth="2" />
    {/* Soil */}
    <ellipse cx="60" cy="15" rx="44" ry="7" fill="#92400e" stroke="#000" strokeWidth="1.5" />
    {/* Sticker labels */}
    {stickers.map(st => (
      <text key={st.id} x={st.x} y={st.y} textAnchor="middle" fontSize="14">{st.icon}</text>
    ))}
  </svg>
);

const BOTTLE_COLORS: Record<BotolType, string> = {
  mineral: '#bfdbfe',
  soda: '#bbf7d0',
  soap: '#f9a8d4',
};

const BOTTLE_LABELS: Record<BotolType, string> = {
  mineral: 'Botol Air Mineral',
  soda: 'Botol Minuman Ringan',
  soap: 'Botol Sabun Cair',
};

const POT_COLORS = [
  { name: 'Kuning', hex: '#fde047' },
  { name: 'Hijau', hex: '#86efac' },
  { name: 'Pink', hex: '#f9a8d4' },
  { name: 'Biru', hex: '#93c5fd' },
  { name: 'Oranye', hex: '#fdba74' },
  { name: 'Ungu', hex: '#d8b4fe' },
];

const STICKER_OPTIONS = ['🌸', '🌼', '⭐', '🦋', '🌈', '💎', '🍀', '🌺'];

const PLANTS: { type: PlantType; emoji: string; label: string; color: string }[] = [
  { type: 'kertas', emoji: '🌺', label: 'Bunga Kertas', color: 'bg-rose-100 hover:bg-rose-200' },
  { type: 'matahari', emoji: '🌻', label: 'Bunga Matahari', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { type: 'daun', emoji: '🌿', label: 'Tanaman Hias', color: 'bg-emerald-100 hover:bg-emerald-200' },
];

export const PlasticCraftGame: React.FC<PlasticCraftGameProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<CraftStage>('choose');
  const [selectedBotol, setSelectedBotol] = useState<BotolType>('mineral');

  // Clean stage
  const [dirtSpots, setDirtSpots] = useState<DirtSpot[]>([
    { id: 1, cx: 20, cy: 50, cleaned: false },
    { id: 2, cx: 40, cy: 43, cleaned: false },
    { id: 3, cx: 44, cy: 70, cleaned: false },
    { id: 4, cx: 18, cy: 80, cleaned: false },
    { id: 5, cx: 38, cy: 95, cleaned: false },
    { id: 6, cx: 28, cy: 65, cleaned: false },
  ]);

  // Cut stage
  const [cutProgress, setCutProgress] = useState(0);
  const [isCutting, setIsCutting] = useState(false);
  const [cutDone, setCutDone] = useState(false);
  const cutAreaRef = useRef<HTMLDivElement>(null);

  // Decorate stage
  const [potColor, setPotColor] = useState('#fde047');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedSticker, setSelectedSticker] = useState('🌸');

  // Plant stage
  const [selectedPlant, setSelectedPlant] = useState<PlantType | null>(null);
  const [plantGrowing, setPlantGrowing] = useState(false);

  const cleanedCount = dirtSpots.filter(s => s.cleaned).length;
  const allCleaned = cleanedCount === dirtSpots.length;

  const handleChooseBotol = (type: BotolType) => {
    sound.playClick();
    setSelectedBotol(type);
    setTimeout(() => setStage('clean'), 200);
  };

  const handleCleanSpot = (id: number) => {
    sound.playPop();
    setDirtSpots(prev => prev.map(s => s.id === id ? { ...s, cleaned: true } : s));
    const newCount = dirtSpots.filter(s => s.cleaned).length + 1;
    if (newCount === dirtSpots.length) {
      sound.playSuccess();
      setTimeout(() => setStage('cut'), 1200);
    }
  };

  const handleCutMove = useCallback((clientX: number) => {
    if (!isCutting || cutDone) return;
    const area = cutAreaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const progress = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setCutProgress(progress);
    if (progress >= 95) {
      setCutDone(true);
      setIsCutting(false);
      sound.playSuccess();
      setTimeout(() => setStage('decorate'), 1200);
    }
  }, [isCutting, cutDone]);

  const handleAddSticker = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 120;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (y > 18 && y < 90 && x > 15 && x < 105) {
      sound.playPop();
      setStickers(prev => [...prev, { id: Date.now(), icon: selectedSticker, x, y }]);
    }
  };

  const handleSelectPlant = (type: PlantType) => {
    sound.playSuccess();
    setSelectedPlant(type);
    setPlantGrowing(true);
    setTimeout(() => setStage('done'), 2000);
  };

  const stageNames: Record<CraftStage, string> = {
    choose: '1/5 — Pilih Botol',
    clean: '2/5 — Cuci Botol',
    cut: '3/5 — Potong Botol',
    decorate: '4/5 — Hias Pot',
    plant: '5/5 — Tanam Bunga',
    done: '🎉 Selesai!',
  };

  const BotolComponent = selectedBotol === 'mineral' ? BotolMineralSVG
    : selectedBotol === 'soda' ? BotolSodaSVG : BotolSabunSVG;

  return (
    <div className="w-full max-w-4xl mx-auto p-1 md:p-4 animate-fadeIn select-none">
      <div className="neo-box-lg bg-amber-50 p-1.5 md:p-5 text-center">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between gap-1.5 mb-2 md:mb-4 bg-white px-2 py-1 md:p-3 rounded-lg md:rounded-xl border border-black">
          <div className="text-left">
            <h3 className="font-extrabold text-xs md:text-xl text-slate-900 flex items-center gap-1 leading-none">
              🌺 Membuat Pot Bunga dari Botol Plastik
            </h3>
            <p className="text-[9px] md:text-sm text-slate-600 font-bold leading-tight mt-0.5">
              {stage === 'choose' && 'Pilih botol plastik bekas yang ingin kamu daur ulang.'}
              {stage === 'clean' && 'Ketuk setiap noda coklat untuk membersihkan botol!'}
              {stage === 'cut' && 'Geser gunting dari kiri ke kanan untuk memotong botol!'}
              {stage === 'decorate' && 'Pilih warna, lalu klik pot untuk menempel stiker hiasan!'}
              {stage === 'plant' && 'Pilih bunga yang ingin ditanam di pot barumu!'}
              {stage === 'done' && 'Kamu berhasil membuat pot bunga dari sampah plastik!'}
            </p>
          </div>
          <div className="neo-badge bg-yellow-300 text-black px-2 py-0.5 text-[9px] md:text-sm border border-black font-black uppercase whitespace-nowrap">
            {stageNames[stage]}
          </div>
        </div>

        {/* ──────── STAGE 1: CHOOSE BOTTLE ──────── */}
        {stage === 'choose' && (
          <div className="space-y-2 md:space-y-4">
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {([
                { type: 'mineral' as BotolType, Component: BotolMineralSVG, desc: 'Ukuran standar, paling mudah dibentuk jadi pot!' },
                { type: 'soda' as BotolType, Component: BotolSodaSVG, desc: 'Lebih lebar dan kokoh, pot bisa menampung lebih banyak tanah.' },
                { type: 'soap' as BotolType, Component: BotolSabunSVG, desc: 'Bentuk unik, pot hasil akhir terlihat cantik dan berbeda!' },
              ]).map(({ type, Component, desc }) => (
                <button
                  key={type}
                  onClick={() => handleChooseBotol(type)}
                  className="neo-btn p-1.5 md:p-5 flex flex-col items-center justify-between border-2 md:border-4 border-black text-center transition-all transform hover:-translate-y-1 hover:shadow-lg bg-white hover:bg-amber-100 group"
                >
                  <div className="w-10 h-20 md:w-20 md:h-36 mb-1">
                    <Component />
                  </div>
                  <h4 className="font-extrabold text-[10px] md:text-base text-slate-900 mb-0.5 leading-none">{BOTTLE_LABELS[type]}</h4>
                  <p className="text-[8px] md:text-xs text-slate-600 font-medium leading-tight hidden md:block">{desc}</p>
                  <span className="mt-1 text-[9px] font-black text-amber-700 bg-amber-100 border border-amber-400 px-1.5 py-0.25 rounded-full group-hover:bg-amber-200">
                    Pilih →
                  </span>
                </button>
              ))}
            </div>
            {/* Preview hasil */}
            <div className="bg-white border border-black rounded-xl p-1.5 md:p-3 flex items-center gap-2 max-w-sm mx-auto">
              <img src="/images/pot_bunga_real.jpg" alt="Contoh pot bunga" className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-lg border border-black flex-shrink-0" />
              <div className="text-left">
                <p className="font-black text-xs md:text-sm text-slate-900 leading-none">Ini hasil akhirnya! 🌺</p>
                <p className="text-[9px] md:text-xs text-slate-600 font-medium mt-0.5 leading-tight">Pot gantung cantik dari botol plastik bekas. Bisa dijual Rp 5.000!</p>
              </div>
            </div>
          </div>
        )}

        {/* ──────── STAGE 2: CLEAN ──────── */}
        {stage === 'clean' && (
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="bg-sky-50 border border-sky-300 rounded-xl p-1.5 md:p-3 text-[10px] sm:text-xs md:text-sm font-bold text-sky-800 text-center max-w-xs">
              🧽 Ketuk setiap noda coklat untuk membersihkan botol! ({cleanedCount}/{dirtSpots.length})
            </div>
            <div className="relative w-auto h-[35vh] min-h-[160px] max-h-[260px] aspect-[60/130]">
              {/* Bottle SVG */}
              <div className="absolute inset-0">
                <BotolComponent fillColor={BOTTLE_COLORS[selectedBotol]} />
              </div>
              {/* Dirt spots overlaid as clickable SVG circles */}
              <svg viewBox="0 0 60 130" className="absolute inset-0 w-full h-full">
                {dirtSpots.map(spot => !spot.cleaned && (
                  <g key={spot.id} onClick={() => handleCleanSpot(spot.id)} style={{ cursor: 'pointer' }}>
                    <circle cx={spot.cx} cy={spot.cy} r="8" fill="#92400e" stroke="#000" strokeWidth="1" opacity="0.85" />
                    <text x={spot.cx} y={spot.cy + 4} textAnchor="middle" fontSize="7">💩</text>
                  </g>
                ))}
                {allCleaned && (
                  <g>
                    <circle cx="30" cy="65" r="25" fill="#4ade80" opacity="0.85" stroke="#000" strokeWidth="2" />
                    <text x="30" y="60" textAnchor="middle" fontSize="16">✨</text>
                    <text x="30" y="78" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#14532d">Bersih!</text>
                  </g>
                )}
              </svg>
            </div>
            {/* Progress */}
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 border border-black overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{ width: `${(cleanedCount / dirtSpots.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ──────── STAGE 3: CUT ──────── */}
        {stage === 'cut' && (
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="bg-red-50 border border-red-300 rounded-xl p-1.5 md:p-3 text-[10px] sm:text-xs md:text-sm font-bold text-red-800 text-center max-w-xs">
              ✂️ Geser gunting dari kiri ke kanan untuk memotong botol!
            </div>
 
            {/* Visual: bottle with cut line */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                {/* Top half */}
                <div
                  className="w-auto h-[12vh] min-h-[48px] max-h-[90px] aspect-[60/55] transition-all duration-500"
                  style={{
                    opacity: cutDone ? 0.3 : 1,
                    transform: cutDone ? 'translateY(-15px)' : 'translateY(0px)',
                  }}
                >
                  <svg viewBox="0 0 60 55" className="w-full h-full">
                    <rect x="19" y="2" width="22" height="10" rx="4" fill="#60a5fa" stroke="#000" strokeWidth="1.5" />
                    <rect x="22" y="10" width="16" height="18" rx="3" fill={BOTTLE_COLORS[selectedBotol]} stroke="#000" strokeWidth="1.5" />
                    <path d="M14,28 Q22,24 30,24 Q38,24 46,28 L46,36 Q38,30 30,30 Q22,30 14,36 Z" fill={BOTTLE_COLORS[selectedBotol]} stroke="#000" strokeWidth="1.5" />
                    <rect x="10" y="34" width="40" height="22" rx="4" fill={BOTTLE_COLORS[selectedBotol]} stroke="#000" strokeWidth="1.5" />
                  </svg>
                </div>
 
                {/* Bottom half */}
                <div className="w-auto h-[14vh] min-h-[56px] max-h-[110px] aspect-[60/55]">
                  <svg viewBox="0 0 60 55" className="w-full h-full">
                    <rect x="10" y="0" width="40" height="46" rx="4" fill={BOTTLE_COLORS[selectedBotol]} stroke="#000" strokeWidth="1.5" />
                    <rect x="10" y="44" width="40" height="8" rx="4" fill={BOTTLE_COLORS[selectedBotol]} stroke="#000" strokeWidth="1.5" />
                  </svg>
                </div>
 
                {/* Cut line overlay */}
                <div
                  ref={cutAreaRef}
                  className="absolute top-[46%] w-40 md:w-52 h-8 flex items-center cursor-ew-resize touch-none z-10 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  onMouseDown={() => setIsCutting(true)}
                  onMouseUp={() => setIsCutting(false)}
                  onMouseLeave={() => setIsCutting(false)}
                  onMouseMove={e => handleCutMove(e.clientX)}
                  onTouchStart={() => setIsCutting(true)}
                  onTouchEnd={() => setIsCutting(false)}
                  onTouchMove={e => handleCutMove(e.touches[0].clientX)}
                >
                  <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-red-500" />
                  <div
                    className="absolute left-0 top-1/2 h-0.5 bg-red-500 transition-none"
                    style={{ width: `${cutProgress}%`, transform: 'translateY(-50%)' }}
                  />
                  <div
                    className="absolute text-xl transition-none"
                    style={{ left: `${cutProgress}%`, transform: 'translate(-50%, -50%)', top: '50%' }}
                  >
                    ✂️
                  </div>
                  {!isCutting && cutProgress < 5 && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xl animate-bounce">✂️</div>
                  )}
                </div>
              </div>
            </div>
 
            {/* Cut progress bar */}
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 border border-black overflow-hidden">
              <div
                className="h-full bg-red-400 transition-all"
                style={{ width: `${cutProgress}%` }}
              />
            </div>
            <p className="text-[10px] font-black text-slate-700">
              {cutDone ? '✅ Botol berhasil dipotong!' : cutProgress < 5 ? 'Geser ke kanan...' : `Memotong... ${Math.round(cutProgress)}%`}
            </p>
          </div>
        )}

        {/* ──────── STAGE 4: DECORATE ──────── */}
        {stage === 'decorate' && (
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {/* Color palette */}
            <div className="bg-white border border-black p-1.5 md:p-3 rounded-xl flex flex-col gap-1 md:gap-2 justify-center">
              <h4 className="font-extrabold text-[10px] md:text-sm text-slate-900 flex items-center gap-1 justify-center leading-none">
                <Paintbrush className="w-3.5 h-3.5 text-indigo-500" /> Warna Cat
              </h4>
              <div className="grid grid-cols-3 gap-1 md:gap-2">
                {POT_COLORS.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => { sound.playClick(); setPotColor(c.hex); }}
                    style={{ backgroundColor: c.hex }}
                    className={`h-6 md:h-10 rounded border border-black transform active:scale-95 transition-transform ${potColor === c.hex ? 'ring-2 ring-black scale-105' : ''}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Pot canvas */}
            <div className="flex flex-col items-center gap-0.5 md:gap-2">
              <p className="text-[9px] md:text-xs font-bold text-slate-600 leading-none">👇 Klik pot tempel stiker</p>
              <div className="w-28 h-24 md:w-52 md:h-44 cursor-pointer">
                <svg viewBox="0 0 120 100" className="w-full h-full" onClick={handleAddSticker}>
                  <circle cx="18" cy="10" r="5" fill="#78716c" stroke="#000" strokeWidth="2" />
                  <circle cx="102" cy="10" r="5" fill="#78716c" stroke="#000" strokeWidth="2" />
                  <path d="M15,10 L105,10 L92,90 Q60,100 28,90 Z" fill={potColor} stroke="#000" strokeWidth="2.5" />
                  <rect x="13" y="8" width="94" height="8" rx="4" fill={potColor} stroke="#000" strokeWidth="2" />
                  <ellipse cx="60" cy="15" rx="44" ry="7" fill="#92400e" stroke="#000" strokeWidth="1.5" />
                  {stickers.map(st => (
                    <text key={st.id} x={st.x} y={st.y} textAnchor="middle" fontSize="14">{st.icon}</text>
                  ))}
                </svg>
              </div>
              <p className="text-[9px] text-slate-500 font-medium leading-none">{stickers.length} stiker</p>
            </div>

            {/* Sticker palette */}
            <div className="bg-white border border-black p-1.5 md:p-3 rounded-xl flex flex-col gap-1 md:gap-2 justify-center">
              <h4 className="font-extrabold text-[10px] md:text-sm text-slate-900 text-center leading-none">⭐ Pilih Stiker</h4>
              <div className="grid grid-cols-4 gap-0.5 md:gap-1">
                {STICKER_OPTIONS.map(icon => (
                  <button
                    key={icon}
                    onClick={() => { sound.playClick(); setSelectedSticker(icon); }}
                    className={`h-6 md:h-10 text-base md:text-2xl border border-black rounded flex items-center justify-center transform active:scale-95 transition-transform ${selectedSticker === icon ? 'bg-yellow-200 ring-1 ring-black scale-105' : 'bg-slate-50 hover:bg-yellow-50'}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => { sound.playPop(); setStickers([]); }}
                  className="neo-btn bg-stone-200 hover:bg-stone-300 text-[8px] py-1 px-1.5 border border-black font-black"
                >
                  Reset
                </button>
                <button
                  onClick={() => { sound.playSuccess(); setStage('plant'); }}
                  disabled={stickers.length < 2}
                  className={`neo-btn flex-1 text-[8px] py-1 px-1.5 border border-black font-black flex items-center justify-center gap-0.5 ${stickers.length >= 2 ? 'bg-emerald-400 hover:bg-emerald-300 text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {stickers.length < 2 ? `+${2 - stickers.length}` : 'Selesai 🌟'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ──────── STAGE 5: PLANT ──────── */}
        {stage === 'plant' && (
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <p className="text-xs md:text-base font-black text-slate-800 leading-none">🌱 Pilih bunga yang mau kamu tanam:</p>
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs md:max-w-md">
              {PLANTS.map(p => (
                <button
                  key={p.type}
                  onClick={() => handleSelectPlant(p.type)}
                  disabled={selectedPlant !== null}
                  className={`neo-btn p-2 md:p-4 flex flex-col items-center border-2 md:border-4 border-black transition-all transform hover:-translate-y-1 ${p.color} ${selectedPlant === p.type ? 'scale-105 ring-2 ring-yellow-400' : ''}`}
                >
                  <span className="text-3xl md:text-5xl mb-1">{p.emoji}</span>
                  <span className="font-black text-[9px] md:text-sm text-slate-800 leading-none">{p.label}</span>
                </button>
              ))}
            </div>

            {/* Pot + plant preview */}
            {selectedPlant && (
              <div className="flex items-center gap-2 animate-fadeIn">
                <div
                  className="text-4xl md:text-6xl transition-all duration-700"
                  style={{ transform: plantGrowing ? 'translateY(0)' : 'translateY(20px)', opacity: plantGrowing ? 1 : 0 }}
                >
                  {PLANTS.find(p => p.type === selectedPlant)?.emoji}
                </div>
                <div className="w-20 h-16 md:w-36 md:h-28">
                  <PotSVG fillColor={potColor} stickers={stickers} />
                </div>
                <p className="font-black text-green-700 text-xs md:text-base animate-bounce">Tumbuh... 🌱</p>
              </div>
            )}
          </div>
        )}

        {/* ──────── STAGE 6: DONE ──────── */}
        {stage === 'done' && (
          <div className="flex flex-col items-center gap-2 md:gap-5 animate-fadeIn py-1 md:py-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 md:w-12 md:h-12 text-yellow-400 animate-spin" />
              <h2 className="text-lg md:text-3xl font-black text-slate-900 uppercase leading-none">
                Pot Bunga Selesai! 🎉
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4 w-full max-w-xs md:max-w-lg">
              {/* Your pot */}
              <div className="bg-white border border-black rounded-xl p-2 md:p-4 flex flex-col items-center gap-1 md:gap-2">
                <p className="font-black text-[9px] md:text-xs text-slate-500 uppercase leading-none">Pot Buatanmu</p>
                <div className="text-3xl md:text-5xl">
                  {PLANTS.find(p => p.type === selectedPlant)?.emoji}
                </div>
                <div className="w-20 h-14 md:w-32 md:h-24">
                  <PotSVG fillColor={potColor} stickers={stickers} />
                </div>
              </div>
              {/* Real photo */}
              <div className="bg-white border border-black rounded-xl p-2 md:p-4 flex flex-col items-center gap-1 md:gap-2">
                <p className="font-black text-[9px] md:text-xs text-slate-500 uppercase leading-none">Contoh Nyata</p>
                <img src="/images/pot_bunga_real.jpg" alt="Pot bunga asli" className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-lg border border-black" />
                <p className="text-[8px] md:text-xs font-bold text-slate-600 text-center leading-tight">Pot asli dari botol plastik bekas! 🌺</p>
              </div>
            </div>

            {/* Economic value */}
            <div className="bg-yellow-50 border border-black rounded-xl p-2 md:p-4 w-full max-w-xs md:max-w-sm text-left space-y-1 md:space-y-2">
              <div className="flex justify-between font-bold text-[9px] md:text-sm">
                <span>🗑️ Bahan:</span>
                <span className="text-slate-900">{BOTTLE_LABELS[selectedBotol]}</span>
              </div>
              <div className="flex justify-between font-bold text-[9px] md:text-sm">
                <span>💰 Biaya:</span>
                <span className="text-green-700 font-black">Rp 0 (daur ulang!)</span>
              </div>
              <div className="flex justify-between font-bold text-[9px] md:text-sm border-t border-dashed border-stone-300 pt-1">
                <span className="font-black">🏷️ Harga Jual:</span>
                <span className="text-base md:text-xl font-black text-indigo-600">Rp 5.000</span>
              </div>
            </div>

            <p className="text-[9px] md:text-sm font-bold text-center text-slate-700 max-w-xs leading-tight">
              🌟 Sampah plastik jadi karya indah yang bisa dijual dan memperindah desa!
            </p>

            <button
              onClick={onComplete}
              className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-4 py-2 md:px-8 md:py-3 text-xs md:text-xl font-black flex items-center gap-1.5 transform active:scale-95 transition-transform border border-black"
            >
              <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 stroke-[3]" /> Simpan Hasil Kerajinan!
            </button>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}} />
    </div>
  );
};

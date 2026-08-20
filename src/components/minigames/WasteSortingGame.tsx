import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface WasteItem {
  id: number;
  name: string;
  emoji: string;
  category: 'organik' | 'anorganik' | 'b3';
  description: string;
  color: string;
}

interface WasteSortingGameProps {
  onComplete: () => void;
}

const RAW_WASTE_ITEMS: WasteItem[] = [
  { id: 1, name: 'Kulit Pisang', emoji: '🍌', category: 'organik', description: 'Sampah alami yang mudah membusuk', color: 'bg-yellow-100' },
  { id: 2, name: 'Botol Plastik', emoji: '🍶', category: 'anorganik', description: 'Dapat didaur ulang menjadi kerajinan', color: 'bg-blue-100' },
  { id: 3, name: 'Baterai Bekas', emoji: '🔋', category: 'b3', description: 'Mengandung zat beracun berbahaya', color: 'bg-red-100' },
  { id: 4, name: 'Daun Kering', emoji: '🍂', category: 'organik', description: 'Bagus untuk kompos dan pupuk', color: 'bg-orange-100' },
  { id: 5, name: 'Kaleng Soda', emoji: '🥫', category: 'anorganik', description: 'Logam ringan bisa didaur ulang', color: 'bg-blue-100' },
  { id: 6, name: 'Lampu Bekas', emoji: '💡', category: 'b3', description: 'Mengandung bahan kimia berbahaya', color: 'bg-red-100' },
  { id: 7, name: 'Sisa Sayuran', emoji: '🥬', category: 'organik', description: 'Sisa dapur yang mudah terurai', color: 'bg-green-100' },
  { id: 8, name: 'Kardus Bekas', emoji: '📦', category: 'anorganik', description: 'Kertas & karton bisa didaur ulang', color: 'bg-blue-100' },
];

const BIN_CONFIG = {
  organik: {
    label: 'ORGANIK',
    sublabel: 'Daun, Kulit Buah, Sisa Makanan',
    bg: 'bg-emerald-500',
    bgHover: 'bg-emerald-400',
    bgActive: 'bg-emerald-300',
    border: 'border-emerald-700',
    lidColor: '#059669',
    bodyColor: '#10b981',
    shadow: 'shadow-emerald-700',
    ringColor: 'ring-emerald-300',
    textColor: 'text-white',
  },
  anorganik: {
    label: 'ANORGANIK',
    sublabel: 'Plastik, Botol, Kaleng, Kardus',
    bg: 'bg-sky-500',
    bgHover: 'bg-sky-400',
    bgActive: 'bg-sky-300',
    border: 'border-sky-700',
    lidColor: '#0369a1',
    bodyColor: '#0ea5e9',
    shadow: 'shadow-sky-700',
    ringColor: 'ring-sky-300',
    textColor: 'text-white',
  },
  b3: {
    label: 'B3 / BERBAHAYA',
    sublabel: 'Baterai, Lampu, Obat-obatan',
    bg: 'bg-rose-500',
    bgHover: 'bg-rose-400',
    bgActive: 'bg-rose-300',
    border: 'border-rose-700',
    lidColor: '#be123c',
    bodyColor: '#f43f5e',
    shadow: 'shadow-rose-700',
    ringColor: 'ring-rose-300',
    textColor: 'text-white',
  },
};

export const WasteSortingGame: React.FC<WasteSortingGameProps> = ({ onComplete }) => {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [activeBin, setActiveBin] = useState<'organik' | 'anorganik' | 'b3' | null>(null);
  const [shake, setShake] = useState(false);

  const binOrganikRef = useRef<HTMLDivElement>(null);
  const binAnorganikRef = useRef<HTMLDivElement>(null);
  const binB3Ref = useRef<HTMLDivElement>(null);

  const activeDragRef = useRef<{ id: number; startX: number; startY: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const shuffled = [...RAW_WASTE_ITEMS].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []);

  const currentItem = items[currentIndex];

  const handleSortItem = (targetCategory: 'organik' | 'anorganik' | 'b3') => {
    if (!currentItem) return;

    if (currentItem.category === targetCategory) {
      const newIndex = currentIndex + 1;
      if (newIndex >= items.length) {
        setTimeout(() => {
          sound.playSuccess();
          sound.playApplause();
        }, 500);
      } else {
        sound.playSuccess();
      }
      setFeedback({ text: '✅ Mantap! Masuk tempat yang tepat! 🎉', isError: false });
      setSortedCount((prev) => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => prev + 1);
        setActiveBin(null);
        setDragOffset(null);
      }, 700);
    } else {
      sound.playError();
      setShake(true);
      setFeedback({ text: '❌ Bukan di sana! Lihat lagi jenis sampahnya ya! 🧐', isError: true });
      setTimeout(() => {
        setFeedback(null);
        setActiveBin(null);
        setDragOffset(null);
        setShake(false);
      }, 900);
    }
  };

  // HTML5 Drag
  const handleDragOver = (e: React.DragEvent, category: 'organik' | 'anorganik' | 'b3') => {
    e.preventDefault();
    setActiveBin(category);
  };
  const handleDragLeave = () => setActiveBin(null);
  const handleDrop = (e: React.DragEvent, category: 'organik' | 'anorganik' | 'b3') => {
    e.preventDefault();
    handleSortItem(category);
  };

  // Pointer Drag (Touch-friendly)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!currentItem) return;
    activeDragRef.current = { id: currentItem.id, startX: e.clientX, startY: e.clientY };
    sound.playClick();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragRef.current) return;
    const { startX, startY } = activeDragRef.current;
    setDragOffset({ x: e.clientX - startX, y: e.clientY - startY });

    const checkTarget = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      }
      return false;
    };

    if (checkTarget(binOrganikRef)) setActiveBin('organik');
    else if (checkTarget(binAnorganikRef)) setActiveBin('anorganik');
    else if (checkTarget(binB3Ref)) setActiveBin('b3');
    else setActiveBin(null);
  };

  const handlePointerUp = () => {
    if (!activeDragRef.current) return;
    if (activeBin) handleSortItem(activeBin);
    activeDragRef.current = null;
    setDragOffset(null);
  };

  const isFinished = items.length > 0 && currentIndex >= items.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 animate-fadeIn select-none">
      <div className="neo-box-lg bg-amber-50 p-3 md:p-5 text-center relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 bg-white p-3 rounded-xl border-2 border-black">
          <div className="text-left">
            <h3 className="font-extrabold text-base md:text-xl text-slate-900 flex items-center gap-2">
              ♻️ Pilah Sampah Bersama Yanti!
            </h3>
            <p className="text-xs md:text-sm text-slate-700 font-bold">
              ✋ <strong>SERET</strong> sampah ke tong yang tepat, atau <strong>KLIK</strong> tong-nya!
            </p>
          </div>
          <div className="neo-badge bg-emerald-300 text-black px-4 py-1 text-sm md:text-base border-2 border-black font-black">
            {sortedCount} / {items.length} Sampah
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedback && (
          <div
            className={`p-3 rounded-xl font-extrabold text-base mb-3 border-2 border-black ${
              feedback.isError ? 'bg-rose-300 text-black' : 'bg-emerald-300 text-black'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {!isFinished && currentItem ? (
          <div className="flex flex-col items-center gap-5">
            {/* ITEM TO SORT — clean float without box */}
            <div
              draggable
              onDragStart={(e) => { e.dataTransfer.setData('text/plain', 'waste_item'); sound.playClick(); }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{
                touchAction: 'none',
                transform: dragOffset
                  ? `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.25) rotate(5deg)`
                  : 'none',
                zIndex: dragOffset ? 50 : 'auto',
              }}
              className={`flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-transform ${shake ? 'animate-bounce' : 'hover:scale-110'}`}
            >
              {/* Big floating emoji — NO box around it */}
              <div className="text-8xl md:text-9xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)] animate-bounce-subtle leading-none">
                {currentItem.emoji}
              </div>
              <h4 className="font-black text-xl md:text-2xl text-slate-900 mt-2">{currentItem.name}</h4>
              <p className="text-xs text-slate-800 font-extrabold bg-amber-200 px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] mt-1">
                {currentItem.description}
              </p>
            </div>

            {/* 3 TRASH BINS — visual tong sampah shape, no square emoji icons */}
            <div className="grid grid-cols-3 gap-3 w-full mt-1">
              {(['organik', 'anorganik', 'b3'] as const).map((cat, i) => {
                const refs = [binOrganikRef, binAnorganikRef, binB3Ref];
                const cfg = BIN_CONFIG[cat];
                const isActive = activeBin === cat;
                return (
                  <div
                    key={cat}
                    ref={refs[i]}
                    onDragOver={(e) => handleDragOver(e, cat)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, cat)}
                    onClick={() => handleSortItem(cat)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-150 rounded-2xl p-2 border-2 border-black
                      ${isActive ? `${cfg.bgActive} scale-110 ring-4 ${cfg.ringColor} shadow-lg` : `${cfg.bg} hover:scale-105 hover:brightness-105`}`}
                  >
                    {/* Trash Bin SVG-like illustration using CSS */}
                    <div className="relative w-16 md:w-20 h-20 md:h-24 flex flex-col items-center justify-end">
                      {/* Lid */}
                      <div
                        className={`absolute top-0 w-full h-5 rounded-t-lg border-2 border-black transition-transform ${isActive ? '-translate-y-2' : ''}`}
                        style={{ backgroundColor: cfg.lidColor }}
                      />
                      {/* Handle on lid */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-6 h-3 rounded-full border-2 border-black"
                        style={{ backgroundColor: cfg.lidColor }}
                      />
                      {/* Bin body */}
                      <div
                        className="w-full h-16 md:h-20 rounded-b-xl border-2 border-t-0 border-black flex items-center justify-center relative mt-4"
                        style={{ backgroundColor: cfg.bodyColor }}
                      >
                        {/* Vertical lines on bin */}
                        <div className="absolute inset-0 flex justify-evenly items-stretch px-2 opacity-30">
                          {[0,1,2].map(n => (
                            <div key={n} className="w-0.5 bg-black rounded-full my-2" />
                          ))}
                        </div>
                        {/* Drop zone indicator */}
                        {isActive && (
                          <div className="text-3xl animate-bounce">⬇️</div>
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <div className={`mt-2 text-center ${cfg.textColor}`}>
                      <span className="font-black text-xs md:text-sm block leading-tight">{cfg.label}</span>
                      <span className="text-[9px] md:text-[11px] font-bold block opacity-90 leading-tight">{cfg.sublabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* COMPLETION MODAL */
          <div className="bg-emerald-300 p-6 md:p-8 rounded-2xl border-4 border-black text-center animate-fadeIn">
            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-2 animate-spin" />
            <h2 className="font-extrabold text-2xl md:text-3xl text-slate-900 mb-2">
              Yeayyy! Semua Sampah Sudah Dipilah! 🎉
            </h2>
            <p className="text-sm md:text-base font-bold text-slate-900 mb-2 max-w-lg mx-auto">
              Hebat! Kamu berhasil memilah semua sampah dengan benar!
            </p>
            <p className="text-sm font-bold text-slate-800 mb-6 max-w-lg mx-auto bg-yellow-200 p-3 rounded-xl border-2 border-black">
              🌿 Sampah organik siap jadi kompos & pakan maggot!<br/>
              ♻️ Sampah anorganik siap ke Bank Sampah PKK!<br/>
              ⚠️ Sampah B3 dibuang ke tempat khusus!
            </p>
            <button
              onClick={onComplete}
              className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 text-lg md:text-xl flex items-center gap-2 mx-auto"
            >
              <CheckCircle2 className="w-6 h-6" /> Lanjut ke Bank Sampah PKK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

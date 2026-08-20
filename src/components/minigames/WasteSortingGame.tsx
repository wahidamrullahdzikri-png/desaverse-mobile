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
    <div className="w-full max-w-4xl mx-auto p-1.5 md:p-4 animate-fadeIn select-none minigame-scroll-wrapper overflow-y-auto">
      <div className="neo-box-lg bg-amber-50 p-2 md:p-5 text-center relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-2 mb-2 bg-white px-2 py-1 md:p-3 rounded-xl border-2 border-black game-header-box">
          <div className="text-left">
            <h3 className="font-extrabold text-xs md:text-xl text-slate-900 flex items-center gap-1 leading-tight">
              ♻️ Pilah Sampah Bersama Yanti!
            </h3>
            <p className="text-[8px] md:text-sm text-slate-700 font-bold leading-tight">
              ✋ <strong>SERET</strong> atau <strong>KLIK</strong> tong yang tepat!
            </p>
          </div>
          <div className="neo-badge bg-emerald-300 text-black px-2 py-0.5 text-[9px] md:text-base border-2 border-black font-black whitespace-nowrap flex-shrink-0">
            {sortedCount} / {items.length}
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedback && (
          <div
            className={`px-2 py-1 rounded-lg font-extrabold text-[10px] md:text-base mb-2 border-2 border-black ${
              feedback.isError ? 'bg-rose-300 text-black' : 'bg-emerald-300 text-black'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {!isFinished && currentItem ? (
          <div className="flex flex-col items-center gap-2 md:gap-5">
            {/* ITEM TO SORT */}
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
              <div className="waste-item-emoji text-5xl md:text-8xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-bounce-subtle leading-none">
                {currentItem.emoji}
              </div>
              <h4 className="font-black text-sm md:text-2xl text-slate-900 mt-1">{currentItem.name}</h4>
              <p className="text-[8px] md:text-xs text-slate-800 font-extrabold bg-amber-200 px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000] mt-0.5">
                {currentItem.description}
              </p>
            </div>

            {/* 3 TRASH BINS */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 w-full mt-1">
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
                    className={`flex flex-col items-center cursor-pointer transition-all duration-150 rounded-xl p-1 md:p-2 border-2 border-black
                      ${isActive ? `${cfg.bgActive} scale-110 ring-4 ${cfg.ringColor} shadow-lg` : `${cfg.bg} hover:scale-105 hover:brightness-105`}`}
                  >
                    {/* Trash Bin */}
                    <div className="waste-bin-container relative w-10 md:w-20 h-14 md:h-24 flex flex-col items-center justify-end">
                      {/* Lid */}
                      <div
                        className={`waste-bin-lid absolute top-0 w-full h-4 md:h-5 rounded-t-lg border-2 border-black transition-transform ${isActive ? '-translate-y-1' : ''}`}
                        style={{ backgroundColor: cfg.lidColor }}
                      />
                      {/* Handle */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-4 h-2 md:w-6 md:h-3 rounded-full border-2 border-black"
                        style={{ backgroundColor: cfg.lidColor }}
                      />
                      {/* Body */}
                      <div
                        className="waste-bin-body w-full h-10 md:h-20 rounded-b-xl border-2 border-t-0 border-black flex items-center justify-center relative mt-3"
                        style={{ backgroundColor: cfg.bodyColor }}
                      >
                        <div className="absolute inset-0 flex justify-evenly items-stretch px-1 opacity-30">
                          {[0,1,2].map(n => (
                            <div key={n} className="w-0.5 bg-black rounded-full my-1" />
                          ))}
                        </div>
                        {isActive && <div className="text-xl md:text-3xl animate-bounce">⬇️</div>}
                      </div>
                    </div>

                    {/* Label */}
                    <div className={`mt-1 text-center ${cfg.textColor}`}>
                      <span className="font-black text-[7px] md:text-sm block leading-tight">{cfg.label}</span>
                      <span className="text-[6px] md:text-[11px] font-bold block opacity-90 leading-tight hidden md:block">{cfg.sublabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* COMPLETION MODAL */
          <div className="bg-emerald-300 p-4 md:p-8 rounded-2xl border-4 border-black text-center animate-fadeIn">
            <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-yellow-300 mx-auto mb-2 animate-spin" />
            <h2 className="font-extrabold text-lg md:text-3xl text-slate-900 mb-1">
              Yeayyy! Semua Sampah Sudah Dipilah! 🎉
            </h2>
            <p className="text-xs md:text-base font-bold text-slate-900 mb-2 max-w-lg mx-auto">
              Hebat! Kamu berhasil memilah semua sampah dengan benar!
            </p>
            <p className="text-xs font-bold text-slate-800 mb-4 max-w-lg mx-auto bg-yellow-200 p-2 rounded-xl border-2 border-black">
              🌿 Sampah organik siap jadi kompos &amp; pakan maggot!<br/>
              ♻️ Sampah anorganik siap ke Bank Sampah PKK!<br/>
              ⚠️ Sampah B3 dibuang ke tempat khusus!
            </p>
            <button
              onClick={onComplete}
              className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-2 md:px-8 md:py-3 text-sm md:text-xl flex items-center gap-2 mx-auto"
            >
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> Lanjut ke Bank Sampah PKK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface WasteItem {
  id: number;
  name: string;
  icon: string;
  category: 'organik' | 'anorganik' | 'b3';
  description: string;
}

interface WasteSortingGameProps {
  onComplete: () => void;
}

const RAW_WASTE_ITEMS: WasteItem[] = [
  { id: 1, name: 'Kulit Pisang', icon: '🍌', category: 'organik', description: 'Sampah alami yang mudah membusuk' },
  { id: 2, name: 'Botol Plastik', icon: '🍾', category: 'anorganik', description: 'Dapat didaur ulang menjadi barang berguna' },
  { id: 3, name: 'Baterai Bekas', icon: '🔋', category: 'b3', description: 'Mengandung zat beracun dan berbahaya' },
  { id: 4, name: 'Daun Kering', icon: '🍂', category: 'organik', description: 'Bahan alami bagus untuk kompos' },
  { id: 5, name: 'Kaleng Soda', icon: '🥫', category: 'anorganik', description: 'Logam ringan dapat diolah kembali' },
  { id: 6, name: 'Lampu Bohlam', icon: '💡', category: 'b3', description: 'Mengandung merkuri cair berbahaya' },
  { id: 7, name: 'Sisa Sayuran', icon: '🥬', category: 'organik', description: 'Sampah dapur yang mudah membusuk' },
  { id: 8, name: 'Kardus Bekas', icon: '📦', category: 'anorganik', description: 'Kertas & karton bisa didaur ulang' },
];

export const WasteSortingGame: React.FC<WasteSortingGameProps> = ({ onComplete }) => {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [activeBin, setActiveBin] = useState<'organik' | 'anorganik' | 'b3' | null>(null);

  const binOrganikRef = useRef<HTMLDivElement>(null);
  const binAnorganikRef = useRef<HTMLDivElement>(null);
  const binB3Ref = useRef<HTMLDivElement>(null);

  // Touch / pointer drag state
  const activeDragRef = useRef<{ id: number; startX: number; startY: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  // Randomize sequence on mount
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
      setFeedback({ text: 'Mantap! Masuk tempat sampah yang tepat! 🎉', isError: false });
      setSortedCount((prev) => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => prev + 1);
        setActiveBin(null);
        setDragOffset(null);
      }, 700);
    } else {
      sound.playError();
      setFeedback({ text: 'Hmm... coba lihat lagi jenis sampahnya ya! 🧐', isError: true });
      setTimeout(() => {
        setFeedback(null);
        setActiveBin(null);
        setDragOffset(null);
      }, 900);
    }
  };

  // HTML5 Drag
  const handleDragOver = (e: React.DragEvent, category: 'organik' | 'anorganik' | 'b3') => {
    e.preventDefault();
    setActiveBin(category);
  };

  const handleDragLeave = () => {
    setActiveBin(null);
  };

  const handleDrop = (e: React.DragEvent, category: 'organik' | 'anorganik' | 'b3') => {
    e.preventDefault();
    handleSortItem(category);
  };

  // Pointer Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!currentItem) return;
    activeDragRef.current = { id: currentItem.id, startX: e.clientX, startY: e.clientY };
    sound.playClick();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragRef.current) return;
    const { startX, startY } = activeDragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    setDragOffset({ x: dx, y: dy });

    const checkTarget = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
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

    if (activeBin) {
      handleSortItem(activeBin);
    }

    activeDragRef.current = null;
    setDragOffset(null);
  };

  const isFinished = items.length > 0 && currentIndex >= items.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 animate-fadeIn select-none">
      <div className="neo-box-lg bg-teal-50 p-3 md:p-5 text-center relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 bg-white p-3 rounded-xl border-2 border-black">
          <div className="text-left">
            <h3 className="font-extrabold text-base md:text-xl text-slate-900 flex items-center gap-2">
              <span>♻️</span> Memilah Sampah Bersama Pak Jaya
            </h3>
            <p className="text-xs md:text-sm text-slate-700 font-bold">
              ✋ <strong>SERET (DRAG & DROP)</strong> sampah ke tong yang tepat, atau klik pada tong sampah!
            </p>
          </div>

          <div className="neo-badge bg-emerald-300 text-black px-4 py-1 text-sm md:text-base border-2 border-black font-black">
            Kemajuan: {sortedCount} / {items.length} Sampah
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedback && (
          <div
            className={`p-3 rounded-xl font-extrabold text-base mb-3 border-2 border-black animate-bounce-subtle ${
              feedback.isError ? 'bg-rose-300 text-black' : 'bg-emerald-300 text-black'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* GAME CONTENT AREA */}
        {!isFinished && currentItem ? (
          <div className="flex flex-col items-center gap-4">
            {/* ITEM TO SORT - NATURAL LOOK WITHOUT HEAVY CARD */}
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', 'waste_item');
                sound.playClick();
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{
                touchAction: 'none',
                transform: dragOffset ? `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.2)` : 'none',
              }}
              className="flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-20"
            >
              <div className="text-7xl md:text-8xl drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)] animate-bounce-subtle">
                {currentItem.icon}
              </div>
              <h4 className="font-black text-xl md:text-2xl text-slate-900 mt-1">{currentItem.name}</h4>
              <p className="text-xs text-slate-800 font-extrabold bg-amber-200 px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] mt-1">
                {currentItem.description}
              </p>
            </div>

            {/* 3 COLOR-CODED REALISTIC TRASH BINS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-2">
              {/* ORGANIK - HIJAU */}
              <div
                ref={binOrganikRef}
                onDragOver={(e) => handleDragOver(e, 'organik')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'organik')}
                onClick={() => handleSortItem('organik')}
                className={`neo-box p-4 flex flex-col items-center cursor-pointer transition-all ${
                  activeBin === 'organik' ? 'bg-emerald-400 scale-105 ring-4 ring-yellow-300' : 'bg-emerald-200 hover:bg-emerald-300'
                }`}
              >
                <div className="text-5xl mb-1">🟩 🌿</div>
                <span className="neo-badge bg-emerald-700 text-white text-sm font-black mb-1 border-2 border-black">
                  ORGANIK (HIJAU)
                </span>
                <p className="text-[11px] font-extrabold text-slate-800">Daun, Kulit Buah, Sisa Makanan</p>
              </div>

              {/* ANORGANIK - BIRU */}
              <div
                ref={binAnorganikRef}
                onDragOver={(e) => handleDragOver(e, 'anorganik')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'anorganik')}
                onClick={() => handleSortItem('anorganik')}
                className={`neo-box p-4 flex flex-col items-center cursor-pointer transition-all ${
                  activeBin === 'anorganik' ? 'bg-sky-400 scale-105 ring-4 ring-yellow-300' : 'bg-sky-200 hover:bg-sky-300'
                }`}
              >
                <div className="text-5xl mb-1">🟦 🍾</div>
                <span className="neo-badge bg-sky-700 text-white text-sm font-black mb-1 border-2 border-black">
                  ANORGANIK (BIRU)
                </span>
                <p className="text-[11px] font-extrabold text-slate-800">Plastik, Botol, Kaleng, Kardus</p>
              </div>

              {/* B3 - MERAH */}
              <div
                ref={binB3Ref}
                onDragOver={(e) => handleDragOver(e, 'b3')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'b3')}
                onClick={() => handleSortItem('b3')}
                className={`neo-box p-4 flex flex-col items-center cursor-pointer transition-all ${
                  activeBin === 'b3' ? 'bg-rose-400 scale-105 ring-4 ring-yellow-300' : 'bg-rose-200 hover:bg-rose-300'
                }`}
              >
                <div className="text-5xl mb-1">🟥 ⚠️</div>
                <span className="neo-badge bg-rose-700 text-white text-sm font-black mb-1 border-2 border-black">
                  B3 (BERBAHAYA)
                </span>
                <p className="text-[11px] font-extrabold text-slate-800">Baterai, Bohlam, Obat-obatan</p>
              </div>
            </div>
          </div>
        ) : (
          /* COMPLETION MODAL */
          <div className="bg-emerald-300 p-6 md:p-8 rounded-2xl border-4 border-black text-center animate-fadeIn">
            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-2 animate-spin" />
            <h2 className="font-extrabold text-2xl md:text-3xl text-slate-900 mb-2">
              Yeayyy! Pemilahan Sampah Selesai! 🎉
            </h2>
            <p className="text-sm md:text-base font-bold text-slate-900 mb-6 max-w-lg mx-auto">
              Pak Jaya memberikan Imbalan Bank Sampah sebesar <strong>Rp 50.000</strong> untuk modal pembangunan desa!
            </p>
            <button
              onClick={onComplete}
              className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 text-lg md:text-xl flex items-center gap-2 mx-auto"
            >
              <CheckCircle2 className="w-6 h-6" /> Lanjut ke Bank Sampah Pak Jaya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

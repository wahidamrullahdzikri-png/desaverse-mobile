import React, { useState, useRef } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface TrashItem {
  id: number;
  name: string;
  icon: string;
  top: number;
  left: number;
  rotate: number;
}

interface TrashCleanupGameProps {
  onComplete: () => void;
}

export const TrashCleanupGame: React.FC<TrashCleanupGameProps> = ({ onComplete }) => {
  const [items, setItems] = useState<TrashItem[]>([
    { id: 1, name: 'Botol Plastik', icon: '🍾', top: 30, left: 18, rotate: 12 },
    { id: 2, name: 'Kulit Pisang', icon: '🍌', top: 62, left: 24, rotate: -25 },
    { id: 3, name: 'Kaleng Minuman', icon: '🥫', top: 38, left: 42, rotate: 45 },
    { id: 4, name: 'Kardus Bekas', icon: '📦', top: 72, left: 52, rotate: -10 },
    { id: 5, name: 'Daun Kering', icon: '🍂', top: 22, left: 68, rotate: 30 },
    { id: 6, name: 'Kantong Plastik', icon: '🛍️', top: 58, left: 74, rotate: -15 },
    { id: 7, name: 'Sedotan Plastik', icon: '🥤', top: 76, left: 32, rotate: 60 },
    { id: 8, name: 'Bungkus Makanan', icon: '🍿', top: 32, left: 84, rotate: -35 },
    { id: 9, name: 'Puntung Kayu', icon: '🪵', top: 68, left: 12, rotate: 15 },
    { id: 10, name: 'Botol Kaca', icon: '🫙', top: 45, left: 30, rotate: -8 },
  ]);

  const [cleanedCount, setCleanedCount] = useState(0);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [isOverBin, setIsOverBin] = useState(false);

  // Touch / pointer drag state
  const activeDragRef = useRef<{ id: number; startX: number; startY: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ id: number; x: number; y: number } | null>(null);

  const trashBinRef = useRef<HTMLDivElement>(null);

  const handleCleanItem = (id: number) => {
    sound.playPop();
    setItems((prev) => prev.filter((item) => item.id !== id));
    setCleanedCount((prev) => {
      const updated = prev + 1;
      if (updated === 10) {
        setTimeout(() => {
          sound.playSuccess();
          sound.playApplause();
        }, 500);
      }
      return updated;
    });
    setDraggedItemId(null);
    setDragOffset(null);
    setIsOverBin(false);
  };

  // HTML5 Drag Events
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
    setDraggedItemId(id);
    sound.playClick();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverBin(true);
  };

  const handleDragLeave = () => {
    setIsOverBin(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    const id = parseInt(idStr, 10);
    if (!isNaN(id)) {
      handleCleanItem(id);
    }
  };

  // Touch / Pointer Dragging
  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    activeDragRef.current = { id, startX: e.clientX, startY: e.clientY };
    setDraggedItemId(id);
    sound.playClick();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragRef.current) return;
    const { id, startX, startY } = activeDragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    setDragOffset({ id, x: dx, y: dy });

    if (trashBinRef.current) {
      const rect = trashBinRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setIsOverBin(true);
      } else {
        setIsOverBin(false);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeDragRef.current) return;
    const { id } = activeDragRef.current;

    if (trashBinRef.current) {
      const rect = trashBinRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        handleCleanItem(id);
      }
    }

    activeDragRef.current = null;
    setDragOffset(null);
    setIsOverBin(false);
  };

  const isFinished = cleanedCount === 10;

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 animate-fadeIn select-none">
      <div className="neo-box-lg bg-amber-50 p-3 md:p-5 text-center relative overflow-hidden">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 bg-white p-3 rounded-xl border-2 border-black">
          <div className="text-left">
            <h3 className="font-extrabold text-base md:text-xl text-slate-900 flex items-center gap-2">
              <span>🧹</span> Membersihkan Sampah Jalanan
            </h3>
            <p className="text-xs md:text-sm text-slate-700 font-bold">
              ✋ <strong>SERET (DRAG & DROP)</strong> sampah langsung dari jalanan ke tempat sampah! (Atau klik sampah).
            </p>
          </div>

          <div className="neo-badge bg-yellow-300 text-black px-4 py-1 text-sm md:text-base border-2 border-black font-black">
            Terkumpul: {cleanedCount} / 10 Sampah
          </div>
        </div>

        {/* Natural Scenery Road Area */}
        <div className="relative w-full h-80 md:h-96 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-700 border-4 border-black rounded-2xl overflow-hidden shadow-inner">
          {/* Muddy Road Lines */}
          <div className="absolute inset-x-0 bottom-10 h-40 bg-stone-700 border-y-4 border-dashed border-stone-500 flex items-center justify-center">
            <div className="w-full border-t-4 border-dashed border-yellow-400 opacity-60"></div>
          </div>

          {/* TRASH BIN DROP ZONE */}
          <div
            ref={trashBinRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`absolute bottom-4 right-6 z-20 transition-all duration-200 neo-box p-3 md:p-4 flex flex-col items-center justify-center ${
              isOverBin ? 'bg-emerald-300 scale-110 ring-4 ring-yellow-400' : 'bg-yellow-300'
            }`}
          >
            <span className="text-5xl md:text-6xl animate-bounce-subtle">🗑️</span>
            <span className="neo-badge bg-white text-black px-2.5 py-0.5 text-xs md:text-sm font-black mt-1">
              {isOverBin ? 'LEPAS DI SINI! ✨' : 'TEMPAT SAMPAH'}
            </span>
          </div>

          {/* NATURAL SCATTERED TRASH ITEMS (NO WHITE BOX CARDS) */}
          {items.map((item) => {
            const isOffseting = dragOffset && dragOffset.id === item.id;
            const styleTransform = isOffseting
              ? `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.3) rotate(0deg)`
              : `rotate(${item.rotate}deg)`;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onPointerDown={(e) => handlePointerDown(e, item.id)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={() => handleCleanItem(item.id)}
                style={{
                  top: `${item.top}%`,
                  left: `${item.left}%`,
                  touchAction: 'none',
                  transform: styleTransform,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl cursor-grab active:cursor-grabbing hover:scale-125 transition-transform drop-shadow-[0_6px_6px_rgba(0,0,0,0.5)] ${
                  draggedItemId === item.id ? 'z-30 opacity-90' : 'z-10'
                }`}
                title={`Seret ${item.name} ke Tempat Sampah`}
              >
                {item.icon}
              </div>
            );
          })}

          {/* SUCCESS MODAL */}
          {isFinished && (
            <div className="absolute inset-0 bg-emerald-400/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 animate-fadeIn z-30">
              <Sparkles className="w-16 h-16 text-yellow-300 mb-2 animate-spin" />
              <h2 className="font-extrabold text-2xl md:text-4xl text-slate-900 mb-1">
                Horeee! Jalanan Desa Sukamaju Bersih! ✨
              </h2>
              <p className="text-sm md:text-lg font-extrabold text-slate-900 mb-6">
                Wah hebat! 10 Sampah berhasil dibersihkan! Indikator Lingkungan +10!
              </p>
              <button
                onClick={onComplete}
                className="neo-btn bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 text-xl flex items-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" /> Lanjut ke Pemilahan Sampah
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

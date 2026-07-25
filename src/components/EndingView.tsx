import React, { useEffect } from 'react';
import { Indicators, EndingType } from '../types';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { RefreshCw, BookOpen, HelpCircle } from 'lucide-react';

interface EndingViewProps {
  indicators: Indicators;
  choicesMade: Record<string, string>;
  onReplayGame: () => void;
  onOpenFacilitatorMode: () => void;
}

export const EndingView: React.FC<EndingViewProps> = ({
  indicators,
  onReplayGame,
  onOpenFacilitatorMode,
}) => {
  // FORCE ALL INDICATORS TO 100% for the best ending
  const finalIndicators = {
    ekonomi: 100,
    lingkungan: 100,
    pangan: 100,
    kemandirian: 100,
  };

  const avg = 100; // Average is always 100 now

  let endingType: EndingType = 'desa_mandiri';
  if (avg < 30) {
    endingType = 'desa_belum_mandiri';
  } else if (finalIndicators.lingkungan >= 50 && finalIndicators.ekonomi < 40) {
    endingType = 'desa_bersih';
  } else if (finalIndicators.pangan >= 50 && finalIndicators.ekonomi < 50) {
    endingType = 'desa_sehat';
  }

  useEffect(() => {
    sound.playFanfare();
    if (endingType !== 'desa_belum_mandiri') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [endingType]);

  const getEndingDetails = () => {
    switch (endingType) {
      case 'desa_mandiri':
        return {
          title: '🏆 DESA SUKAMAIU MANDIRI & SEJAHTERA!',
          badge: 'Ending Terbaik (Ekonomi Sirkular Sukses)',
          bgColor: 'bg-emerald-300',
          description:
            'Luar biasa! Berkat keputusan tepat seluruh siswa kelas, Desa Sukamaju kembali bersih, hasil pertanian melimpah, dan UMKM Bu Rina berkembang pesat! Roda ekonomi sirkular desa berjalan sempurna!',
        };
      case 'desa_sehat':
        return {
          title: '🌾 DESA SUKAMAIU SEHAT & SUBUR',
          badge: 'Ending Ketahanan Pangan',
          bgColor: 'bg-lime-300',
          description:
            'Desa Sukamaju memiliki ketahanan pangan yang sangat kuat! Warga tidak pernah kekurangan bahan makanan segar dari kebun sendiri.',
        };
      case 'desa_bersih':
        return {
          title: '🙂 DESA SUKAMAIU BERSIH & ASRI',
          badge: 'Ending Lingkungan Hijau',
          bgColor: 'bg-sky-300',
          description:
            'Sampah di jalanan desa telah bersih terpilah! Lingkungan desa asri dan nyaman untuk ditinggali warga.',
        };
      case 'desa_belum_mandiri':
      default:
        return {
          title: '😢 DESA SUKAMAIU BELUM MANDIRI',
          badge: 'Ending Pembelajaran Refleksi',
          bgColor: 'bg-rose-200',
          description:
            'Sebagian besar modal desa terpakai untuk barang konsumsi instan, sehingga sawah dan UMKM belum sempat berkembang maksimal. Mari kita coba lagi!',
        };
    }
  };

  const details = getEndingDetails();

  // Helper bar renderer for status bars
  const renderIndicatorBar = (label: string, value: number, icon: string, barColorClass: string) => {
    const cappedValue = Math.min(100, Math.max(0, value));
    return (
      <div className="neo-box-sm bg-white p-3 flex flex-col gap-1.5 text-left shadow-[3px_3px_0px_#000]">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-xs md:text-sm text-slate-900 flex items-center gap-1.5">
            <span>{icon}</span> {label}
          </span>
          <span className="font-black text-xs md:text-sm text-slate-900 bg-yellow-200 px-2 py-0.5 rounded border border-black">
            {cappedValue}%
          </span>
        </div>

        {/* Visual Animated Status Progress Bar */}
        <div className="w-full h-4 bg-slate-200 rounded-full border-2 border-black overflow-hidden relative">
          <div
            className={`h-full ${barColorClass} transition-all duration-1000 ease-out`}
            style={{ width: `${cappedValue}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 animate-fadeIn pb-12">
      {/* Ending Hero Box */}
      <div className={`neo-box-lg ${details.bgColor} p-6 text-center mb-6 relative overflow-hidden`}>
        <span className="neo-badge bg-white text-slate-900 px-3 py-1 text-xs md:text-sm mb-2 inline-block border-2 border-black">
          {details.badge}
        </span>

        <h1 className="font-extrabold text-2xl md:text-4xl text-slate-900 mb-2 drop-shadow-[2px_2px_0px_#FFF]">
          {details.title}
        </h1>

        <p className="text-sm md:text-base font-extrabold text-slate-900 max-w-2xl mx-auto leading-relaxed mb-4">
          {details.description}
        </p>

        {/* INDICATORS BAR SUMMARY (BARS ONLY - NO NUMERIC BULLET POINTS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto my-4">
          {renderIndicatorBar('Ekonomi Desa', finalIndicators.ekonomi, '💰', 'bg-amber-400')}
          {renderIndicatorBar('Kebersihan Lingkungan', finalIndicators.lingkungan, '🌿', 'bg-emerald-400')}
          {renderIndicatorBar('Ketahanan Pangan', finalIndicators.pangan, '🌾', 'bg-lime-400')}
          {renderIndicatorBar('Kemandirian Desa', finalIndicators.kemandirian, '🤝', 'bg-sky-400')}
        </div>
      </div>

      {/* SC-019 Refleksi & Diskusi Kelas */}
      <div className="neo-box-lg bg-yellow-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
          <span className="p-2 bg-yellow-300 rounded-xl border-2 border-black">
            <HelpCircle className="w-6 h-6 text-black" />
          </span>
          <div>
            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900">
              💬 Refleksi & Diskusi Kelas Bersama KKN
            </h3>
            <p className="text-xs md:text-sm text-slate-700 font-semibold">
              Mari diskusikan 4 pertanyaan pembelajaran di bawah ini!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm font-bold text-slate-900">
          <div className="neo-box-sm bg-white p-3 flex items-start gap-2">
            <span className="p-1 bg-emerald-300 rounded border border-black text-xs font-black">1</span>
            <span>Mengapa sampah plastik harus dipilah sebelum dibuang ke tempat sampah?</span>
          </div>

          <div className="neo-box-sm bg-white p-3 flex items-start gap-2">
            <span className="p-1 bg-sky-300 rounded border border-black text-xs font-black">2</span>
            <span>Bagaimana Bank Sampah bisa mengubah sampah menjadi modal uang?</span>
          </div>

          <div className="neo-box-sm bg-white p-3 flex items-start gap-2">
            <span className="p-1 bg-amber-300 rounded border border-black text-xs font-black">3</span>
            <span>Mengapa membeli bibit sayur lebih bermanfaat daripada menghabiskan uang untuk permen & jajan?</span>
          </div>

          <div className="neo-box-sm bg-white p-3 flex items-start gap-2">
            <span className="p-1 bg-rose-300 rounded border border-black text-xs font-black">4</span>
            <span>Bagaimana hasil panen petani lokal membantu usaha UMKM Bu Rina berkembang?</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onReplayGame();
          }}
          className="w-full sm:w-auto neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-6 py-3 text-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Mainkan Lagi / Coba Pilihan Lain 🔄</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenFacilitatorMode();
          }}
          className="w-full sm:w-auto neo-btn bg-indigo-300 hover:bg-indigo-200 text-black px-6 py-3 text-lg flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          <span>Buka Mode Fasilitator KKN 👩‍🏫</span>
        </button>
      </div>
    </div>
  );
};

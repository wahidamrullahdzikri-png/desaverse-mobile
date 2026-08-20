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
          title: '🏆 DESA SADASARI MANDIRI & SEJAHTERA!',
          badge: 'Ending Terbaik (Ekonomi Sirkular Sukses)',
          bgColor: 'bg-emerald-300',
          description:
            'Luar biasa! Berkat keputusan tepat seluruh siswa kelas, Desa Sadasari kembali bersih, hasil pertanian melimpah, dan UMKM Bu Rina berkembang pesat! Roda ekonomi sirkular desa berjalan sempurna!',
        };
      case 'desa_sehat':
        return {
          title: '🌾 DESA SADASARI SEHAT & SUBUR',
          badge: 'Ending Ketahanan Pangan',
          bgColor: 'bg-lime-300',
          description:
            'Desa Sadasari memiliki ketahanan pangan yang sangat kuat! Warga tidak pernah kekurangan bahan makanan segar dari kebun sendiri.',
        };
      case 'desa_bersih':
        return {
          title: '🙂 DESA SADASARI BERSIH & ASRI',
          badge: 'Ending Lingkungan Hijau',
          bgColor: 'bg-sky-300',
          description:
            'Sampah di jalanan desa telah bersih terpilah! Lingkungan desa asri dan nyaman untuk ditinggali warga.',
        };
      case 'desa_belum_mandiri':
      default:
        return {
          title: '😢 DESA SADASARI BELUM MANDIRI',
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
    <div className="w-full max-w-4xl mx-auto p-2 md:p-6 animate-fadeIn pb-6">
      {/* Ending Hero Box */}
      <div className={`neo-box-lg ${details.bgColor} p-3 md:p-6 text-center mb-3 md:mb-6 relative overflow-hidden`}>
        <span className="neo-badge bg-white text-slate-900 px-2 py-0.5 text-[10px] md:text-sm mb-1.5 inline-block border border-black">
          {details.badge}
        </span>

        <h1 className="font-extrabold text-lg md:text-4xl text-slate-900 mb-1 drop-shadow-[1px_1px_0px_#FFF] md:drop-shadow-[2px_2px_0px_#FFF]">
          {details.title}
        </h1>

        <p className="text-xs md:text-base font-extrabold text-slate-900 max-w-2xl mx-auto leading-tight mb-2">
          {details.description}
        </p>

        {/* INDICATORS BAR SUMMARY */}
        <div className="grid grid-cols-2 gap-2 max-w-3xl mx-auto my-2">
          {renderIndicatorBar('Ekonomi Desa', finalIndicators.ekonomi, '💰', 'bg-amber-400')}
          {renderIndicatorBar('Kebersihan Lingkungan', finalIndicators.lingkungan, '🌿', 'bg-emerald-400')}
          {renderIndicatorBar('Ketahanan Pangan', finalIndicators.pangan, '🌾', 'bg-lime-400')}
          {renderIndicatorBar('Kemandirian Desa', finalIndicators.kemandirian, '🤝', 'bg-sky-400')}
        </div>
      </div>

      {/* SC-019 Refleksi & Diskusi Kelas */}
      <div className="neo-box-lg bg-yellow-100 p-3 md:p-6 mb-3 md:mb-6">
        <div className="flex items-center gap-1.5 mb-2 border-b border-black pb-1.5">
          <span className="p-1 md:p-2 bg-yellow-300 rounded-lg border border-black">
            <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-black" />
          </span>
          <div>
            <h3 className="font-extrabold text-xs md:text-2xl text-slate-900 leading-tight">
              💬 Refleksi & Diskusi Kelas Bersama KKN
            </h3>
            <p className="text-[10px] md:text-sm text-slate-700 font-semibold leading-none">
              Mari diskusikan 4 pertanyaan pembelajaran di bawah ini!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] md:text-sm font-bold text-slate-900">
          <div className="neo-box-sm bg-white p-2 flex items-start gap-1">
            <span className="p-0.5 bg-emerald-300 rounded border border-black text-[9px] font-black leading-none">1</span>
            <span className="leading-tight">Mengapa sampah plastik harus dipilah sebelum dibuang ke tempat sampah?</span>
          </div>

          <div className="neo-box-sm bg-white p-2 flex items-start gap-1">
            <span className="p-0.5 bg-sky-300 rounded border border-black text-[9px] font-black leading-none">2</span>
            <span className="leading-tight">Bagaimana Bank Sampah bisa mengubah sampah menjadi modal uang?</span>
          </div>

          <div className="neo-box-sm bg-white p-2 flex items-start gap-1">
            <span className="p-0.5 bg-amber-300 rounded border border-black text-[9px] font-black leading-none">3</span>
            <span className="leading-tight">Mengapa membeli bibit sayur lebih bermanfaat daripada menghabiskan uang untuk permen & jajan?</span>
          </div>

          <div className="neo-box-sm bg-white p-2 flex items-start gap-1">
            <span className="p-0.5 bg-rose-300 rounded border border-black text-[9px] font-black leading-none">4</span>
            <span className="leading-tight">Bagaimana hasil panen petani lokal membantu usaha UMKM Bu Rina berkembang?</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            onReplayGame();
          }}
          className="flex-1 neo-btn bg-emerald-400 hover:bg-emerald-300 text-black py-2 text-[10px] md:text-lg flex items-center justify-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5 md:w-5 md:h-5" />
          <span>Main Lagi 🔄</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenFacilitatorMode();
          }}
          className="flex-1 neo-btn bg-indigo-300 hover:bg-indigo-200 text-black py-2 text-[10px] md:text-lg flex items-center justify-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5 md:w-5 md:h-5" />
          <span>Panduan KKN 👩‍🏫</span>
        </button>
      </div>
    </div>
  );
};

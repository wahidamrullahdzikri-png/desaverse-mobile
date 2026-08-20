import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, XCircle, ChevronRight, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface MaggotGameProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Apa itu Maggot? 🪱',
    content: 'Maggot BSF adalah ulat kecil dari lalat tentara hitam. Jangan jijik ya! Mereka pahlawan cilik yang doyan makan sampah sisa makanan kita!',
    image: '/images/maggot_real.jpg',
    fact: '💡 1 kg maggot bisa menghabiskan 2 kg sampah organik dalam 1 hari!'
  },
  {
    title: 'Makanan Kesukaan Maggot 🍌',
    content: 'Maggot suka banget makan sisa makanan! Seperti sisa nasi, kulit buah, dan sayuran layu. Mereka makan sampai bersih dan tidak bau!',
    image: '/images/bg_maggot_bin_real.jpg',
    fact: '💡 Maggot tidak boleh diberi plastik, baterai, atau logam — bisa mati!'
  },
  {
    title: 'Manfaat Hebat Maggot! 🐔🐟',
    content: 'Maggot yang sudah gemuk bisa jadi makanan ayam dan ikan yang bergizi. Ternak jadi sehat dan tumbuh cepat tanpa beli pakan mahal!',
    image: '/images/bg_chickens_maggot_real.jpg',
    fact: '💡 Peternak bisa hemat jutaan rupiah per bulan dengan maggot!'
  }
];

interface QuizItem {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  color: string;
  bgHover: string;
  isCorrect: boolean;
  errorMsg?: string;
}

const quizItems: QuizItem[] = [
  { id: 'nasi', label: 'Sisa Nasi', emoji: '🍚', desc: 'Nasi sisa makan tadi', color: 'bg-yellow-50', bgHover: 'hover:bg-yellow-100', isCorrect: true },
  { id: 'pisang', label: 'Kulit Pisang', emoji: '🍌', desc: 'Kulit buah segar', color: 'bg-yellow-100', bgHover: 'hover:bg-yellow-200', isCorrect: true },
  { id: 'daun', label: 'Daun Kering', emoji: '🍂', desc: 'Daun gugur dari pohon', color: 'bg-amber-50', bgHover: 'hover:bg-amber-100', isCorrect: true },
  { id: 'sayur', label: 'Sisa Sayuran', emoji: '🥬', desc: 'Sayur layu tak terpakai', color: 'bg-green-50', bgHover: 'hover:bg-green-100', isCorrect: true },
  { id: 'botol', label: 'Botol Plastik', emoji: '🍾', desc: 'Kemasan plastik bekas', color: 'bg-blue-50', bgHover: 'hover:bg-blue-100', isCorrect: false, errorMsg: '❌ Maggot tidak bisa makan plastik!' },
  { id: 'baterai', label: 'Baterai Bekas', emoji: '🔋', desc: 'Baterai sudah habis', color: 'bg-slate-100', bgHover: 'hover:bg-slate-200', isCorrect: false, errorMsg: '❌ Awas! Baterai itu racun buat maggot.' },
  { id: 'besi', label: 'Besi Berkarat', emoji: '⚙️', desc: 'Potongan besi tua', color: 'bg-stone-100', bgHover: 'hover:bg-stone-200', isCorrect: false, errorMsg: '❌ Besi keras tidak bisa dimakan maggot!' },
  { id: 'snack', label: 'Bungkus Snack', emoji: '🍬', desc: 'Plastik kemasan jajanan', color: 'bg-pink-50', bgHover: 'hover:bg-pink-100', isCorrect: false, errorMsg: '❌ Bungkus plastik tidak bisa dimakan maggot.' },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const MaggotGame: React.FC<MaggotGameProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'slides' | 'quiz'>('slides');
  const [slideIndex, setSlideIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState<QuizItem[]>([]);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [wrongMessage, setWrongMessage] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setShuffledItems(shuffleArray(quizItems));
  }, []);

  const handleNextSlide = () => {
    sound.playClick();
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep('quiz');
    }
  };

  const handleItemClick = (item: QuizItem) => {
    if (foundItems.includes(item.id) || isFinished) return;

    if (item.isCorrect) {
      sound.playSuccess();
      const newFound = [...foundItems, item.id];
      setFoundItems(newFound);
      setWrongMessage(null);
      if (newFound.length === 4) {
        sound.playApplause();
        setIsFinished(true);
      }
    } else {
      sound.playError();
      setShakeId(item.id);
      setWrongMessage(item.errorMsg || 'Salah!');
      setTimeout(() => setShakeId(null), 600);
      setTimeout(() => setWrongMessage(null), 2500);
    }
  };

  if (step === 'slides') {
    const slide = slides[slideIndex];
    return (
      <div className="w-full max-w-2xl mx-auto p-1 animate-fadeIn minigame-scroll-wrapper overflow-y-auto">
        <div className="neo-box-lg bg-white relative overflow-hidden p-2.5 md:p-5">
          {/* Slide indicator dots */}
          <div className="flex justify-center gap-1.5 mb-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full border border-black transition-all ${
                  i === slideIndex ? 'bg-yellow-400 scale-110' : i < slideIndex ? 'bg-green-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
 
          {/* Slide image — real photo */}
          <div className="relative overflow-hidden rounded-xl border-2 border-black mb-2 h-28 sm:h-36 md:h-48">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-1.5 left-3 right-3 text-white font-black text-sm md:text-2xl drop-shadow-lg">
              {slide.title}
            </h2>
          </div>
 
          {/* Content */}
          <p className="text-xs md:text-lg font-semibold text-slate-700 text-center leading-relaxed mb-2 px-1">
            {slide.content}
          </p>
 
          {/* Fun fact box */}
          <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-2 mb-3 text-[10px] sm:text-sm font-bold text-yellow-900 text-center leading-tight">
            {slide.fact}
          </div>
 
          <div className="flex justify-center">
            <button
              onClick={handleNextSlide}
              className="neo-btn bg-yellow-400 hover:bg-yellow-300 text-black text-xs md:text-lg font-black py-2 px-6 flex items-center gap-1.5 transform transition-transform hover:scale-105 active:scale-95"
            >
              {slideIndex === slides.length - 1 ? '🎮 Mulai Main!' : 'Lanjut'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-1 animate-fadeIn minigame-scroll-wrapper overflow-y-auto">
      {/* Header */}
      <div className="neo-box bg-lime-50 text-center p-2 md:p-4">
        <h2 className="text-xs md:text-2xl font-black text-green-800 uppercase mb-0.5">
          🪱 Kasih Makan Maggotnya!
        </h2>
        <p className="text-[10px] md:text-base font-semibold text-slate-700 leading-tight">
          Pilih <strong className="text-green-700">4 makanan</strong> yang boleh dimakan maggot.
        </p>
        <div className="flex justify-center gap-1.5 mt-2">
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs font-black transition-all ${
                i < foundItems.length ? 'bg-green-400 scale-105' : 'bg-gray-100'
              }`}
            >
              {i < foundItems.length ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Wrong message */}
      {wrongMessage && !isFinished && (
        <div className="neo-box bg-red-100 border-red-500 text-red-900 p-2 font-bold text-center text-[10px] md:text-base flex items-center justify-center gap-1.5 mt-2">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          {wrongMessage}
        </div>
      )}

      {/* Finished celebration */}
      {isFinished ? (
        <div className="neo-box-lg bg-green-200 text-center py-4 md:py-8 animate-fadeIn mt-2">
          <Sparkles className="w-8 h-8 md:w-14 md:h-14 text-yellow-500 mx-auto mb-2 animate-spin" />
          <h3 className="text-lg md:text-3xl font-black text-green-900 mb-1 uppercase leading-none">
            Hebat Sekali! 🎉
          </h3>
          <p className="text-xs md:text-lg font-bold text-green-800 mb-2">
            Kamu berhasil menemukan semua makanan maggot!
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {foundItems.map(id => {
              const item = quizItems.find(q => q.id === id)!;
              return (
                <span key={id} className="bg-white border border-green-700 rounded-full px-2 py-0.5 text-lg md:text-2xl">
                  {item.emoji}
                </span>
              );
            })}
          </div>
          <button
            onClick={() => { sound.playClick(); onComplete(); }}
            className="neo-btn bg-blue-500 hover:bg-blue-400 text-white text-xs md:text-lg font-black py-2 px-6 flex items-center gap-1.5 mx-auto"
          >
            <CheckCircle2 className="w-4 h-4" /> Lanjutkan!
          </button>
        </div>
      ) : (
        /* Quiz grid — 4 columns on desktop, 4 columns on mobile landscape as well to keep height low */
        <div className="grid grid-cols-4 gap-1.5 md:gap-3 mt-2">
          {shuffledItems.map((item) => {
            const isFound = foundItems.includes(item.id);
            const isShaking = shakeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={isFound || isFinished}
                className={`
                  relative neo-box border border-black p-1 md:p-3 h-20 sm:h-28 md:h-44
                  flex flex-col items-center justify-center gap-0.5
                  transition-all duration-150 select-none
                  ${isFound
                    ? 'bg-green-300 border-green-700 scale-95 opacity-90 cursor-default'
                    : `${item.color} ${item.bgHover} active:scale-95 hover:-translate-y-0.5 cursor-pointer`
                  }
                  ${isShaking ? 'animate-[shake_0.6s_ease-in-out] bg-red-200 border-red-500' : ''}
                `}
              >
                {/* Found checkmark badge */}
                {isFound && (
                  <div className="absolute top-1 right-1 bg-green-700 text-white rounded-full p-0.25">
                    <Check className="w-2 h-2" />
                  </div>
                )}

                {/* Main emoji visual */}
                <span className={`text-2xl md:text-6xl transition-all ${isFound ? 'grayscale-0' : ''}`} role="img" aria-label={item.label}>
                  {item.emoji}
                </span>

                {/* Item name */}
                <span className={`text-center font-black text-[9px] md:text-sm leading-none ${isFound ? 'text-green-900' : 'text-slate-800'}`}>
                  {item.label}
                </span>

                {/* Small description */}
                <span className="text-center text-[7px] md:text-xs text-slate-500 font-medium leading-none hidden sm:block">
                  {item.desc}
                </span>

                {/* Found indicator */}
                {isFound && (
                  <span className="text-green-800 font-black text-[8px] md:text-xs">✓ Benar!</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-8px) rotate(-4deg); }
          40% { transform: translateX(8px) rotate(4deg); }
          60% { transform: translateX(-6px) rotate(-3deg); }
          80% { transform: translateX(6px) rotate(3deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}} />
    </div>
  );
};

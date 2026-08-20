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
      <div className="w-full max-w-2xl mx-auto space-y-4 animate-fadeIn">
        <div className="neo-box-lg bg-white relative overflow-hidden">
          {/* Slide indicator dots */}
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border-2 border-black transition-all ${
                  i === slideIndex ? 'bg-yellow-400 scale-125' : i < slideIndex ? 'bg-green-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Slide image — real photo */}
          <div className="relative overflow-hidden rounded-2xl border-4 border-black mb-4" style={{ height: '200px' }}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-3 left-4 right-4 text-white font-black text-xl md:text-2xl drop-shadow-lg">
              {slide.title}
            </h2>
          </div>

          {/* Content */}
          <p className="text-base md:text-lg font-semibold text-slate-700 text-center leading-relaxed mb-4 px-2">
            {slide.content}
          </p>

          {/* Fun fact box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-5 text-sm font-bold text-yellow-900 text-center">
            {slide.fact}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNextSlide}
              className="neo-btn bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-black py-3 px-8 flex items-center gap-2 transform transition-transform hover:scale-105 active:scale-95"
            >
              {slideIndex === slides.length - 1 ? '🎮 Mulai Main!' : 'Lanjut'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="neo-box bg-lime-50 text-center p-4">
        <h2 className="text-xl md:text-2xl font-black text-green-800 uppercase mb-1">
          🪱 Kasih Makan Maggotnya!
        </h2>
        <p className="text-sm md:text-base font-semibold text-slate-700">
          Pilih <strong className="text-green-700">4 makanan</strong> yang <strong>boleh</strong> dimakan maggot. Hati-hati salah pilih!
        </p>
        <div className="flex justify-center gap-3 mt-3">
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-sm font-black transition-all ${
                i < foundItems.length ? 'bg-green-400 scale-110' : 'bg-gray-100'
              }`}
            >
              {i < foundItems.length ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Wrong message */}
      {wrongMessage && !isFinished && (
        <div className="neo-box bg-red-100 border-red-500 text-red-900 p-3 font-bold text-center text-sm md:text-base flex items-center justify-center gap-2">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          {wrongMessage}
        </div>
      )}

      {/* Finished celebration */}
      {isFinished ? (
        <div className="neo-box-lg bg-green-200 text-center py-8 animate-fadeIn">
          <Sparkles className="w-14 h-14 text-yellow-500 mx-auto mb-3 animate-spin" />
          <h3 className="text-2xl md:text-3xl font-black text-green-900 mb-2 uppercase">
            Hebat Sekali! 🎉
          </h3>
          <p className="text-base md:text-lg font-bold text-green-800 mb-2">
            Kamu berhasil menemukan semua makanan maggot!
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {foundItems.map(id => {
              const item = quizItems.find(q => q.id === id)!;
              return (
                <span key={id} className="bg-white border-2 border-green-700 rounded-full px-3 py-1 text-2xl">
                  {item.emoji}
                </span>
              );
            })}
          </div>
          <button
            onClick={() => { sound.playClick(); onComplete(); }}
            className="neo-btn bg-blue-500 hover:bg-blue-400 text-white text-lg font-black py-3 px-10 flex items-center gap-2 mx-auto"
          >
            <CheckCircle2 className="w-6 h-6" /> Lanjutkan!
          </button>
        </div>
      ) : (
        /* Quiz grid — 4 columns on desktop, 2 on mobile */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shuffledItems.map((item) => {
            const isFound = foundItems.includes(item.id);
            const isShaking = shakeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={isFound || isFinished}
                className={`
                  relative neo-box border-4 border-black p-3 h-36 md:h-44
                  flex flex-col items-center justify-center gap-1
                  transition-all duration-150 select-none
                  ${isFound
                    ? 'bg-green-300 border-green-700 scale-95 opacity-90 cursor-default'
                    : `${item.color} ${item.bgHover} active:scale-95 hover:-translate-y-1 cursor-pointer`
                  }
                  ${isShaking ? 'animate-[shake_0.6s_ease-in-out] bg-red-200 border-red-500' : ''}
                `}
              >
                {/* Found checkmark badge */}
                {isFound && (
                  <div className="absolute top-2 right-2 bg-green-700 text-white rounded-full p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                )}

                {/* Main emoji visual */}
                <span className={`text-5xl md:text-6xl transition-all ${isFound ? 'grayscale-0' : ''}`} role="img" aria-label={item.label}>
                  {item.emoji}
                </span>

                {/* Item name */}
                <span className={`text-center font-black text-xs md:text-sm leading-tight ${isFound ? 'text-green-900' : 'text-slate-800'}`}>
                  {item.label}
                </span>

                {/* Small description */}
                <span className="text-center text-[10px] md:text-xs text-slate-500 font-medium leading-tight">
                  {item.desc}
                </span>

                {/* Found indicator */}
                {isFound && (
                  <span className="text-green-800 font-black text-xs">✅ Benar!</span>
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

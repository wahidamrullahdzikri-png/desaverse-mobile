import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

interface InteractiveQuizProps {
  onComplete: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onComplete }) => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Sisa makanan termasuk jenis sampah…',
      options: [
        { key: 'A', text: 'Anorganik' },
        { key: 'B', text: 'B3' },
        { key: 'C', text: 'Organik' },
        { key: 'D', text: 'Elektronik' },
      ],
      correctAnswer: 'C',
      explanation: 'Sampah sisa makanan mudah membusuk dan terurai secara alami, sehingga tergolong sampah Organik yang bisa dijadikan pupuk atau pakan maggot.',
    },
    {
      id: 2,
      question: 'Botol plastik sebaiknya dimasukkan ke…',
      options: [
        { key: 'A', text: 'Bank Sampah Organik' },
        { key: 'B', text: 'Bank Sampah Plastik' },
        { key: 'C', text: 'Tempat sampah B3' },
        { key: 'D', text: 'Sungai' },
      ],
      correctAnswer: 'B',
      explanation: 'Botol plastik adalah sampah plastik yang dapat didaur ulang, sehingga harus disetorkan ke Bank Sampah Plastik agar memiliki nilai ekonomi.',
    },
    {
      id: 3,
      question: 'Maggot dapat dimanfaatkan sebagai…',
      options: [
        { key: 'A', text: 'Bahan bakar' },
        { key: 'B', text: 'Pakan ayam dan ikan' },
        { key: 'C', text: 'Mainan' },
        { key: 'D', text: 'Pewarna pakaian' },
      ],
      correctAnswer: 'B',
      explanation: 'Maggot mengandung protein tinggi yang menjadikannya pakan alami sangat baik untuk hewan ternak seperti ayam dan ikan.',
    },
    {
      id: 4,
      question: 'Mengubah botol plastik menjadi pot bunga termasuk kegiatan…',
      options: [
        { key: 'A', text: 'Membakar sampah' },
        { key: 'B', text: 'Membuang sampah' },
        { key: 'C', text: 'Memanfaatkan kembali limbah plastik' },
        { key: 'D', text: 'Mencemari lingkungan' },
      ],
      correctAnswer: 'C',
      explanation: 'Mengubah botol plastik bekas menjadi pot bunga gantung adalah salah satu cara kreatif memanfaatkan kembali (reuse) limbah plastik agar bernilai jual.',
    },
    {
      id: 5,
      question: 'Sampah berbahaya seperti baterai harus dibuang ke…',
      options: [
        { key: 'A', text: 'Organik' },
        { key: 'B', text: 'Anorganik' },
        { key: 'C', text: 'B3' },
        { key: 'D', text: 'Bank Sampah Plastik' },
      ],
      correctAnswer: 'C',
      explanation: 'Baterai bekas mengandung racun kimia berbahaya, sehingga digolongkan sebagai B3 (Bahan Berbahaya dan Beracun) yang harus dikelola khusus.',
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isClassDiscussionActive, setIsClassDiscussionActive] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelectOption = (optionKey: string) => {
    if (showFeedback && isCorrect) return; // Prevent clicking after correct answer

    sound.playClick();
    setSelectedOption(optionKey);
    const correct = optionKey === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      sound.playSuccess();
    } else {
      sound.playPop(); // Or warning sound
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      sound.playSuccess();
      onComplete();
    }
  };

  const handleTryAgain = () => {
    sound.playClick();
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-1 animate-fadeIn select-none minigame-scroll-wrapper overflow-y-auto">
      <div className="neo-box-lg bg-amber-50 p-2 md:p-6 text-center relative overflow-hidden">
        {/* Progress Bar & Header */}
        <div className="flex items-center justify-between gap-2 mb-2 bg-white px-2 py-1 rounded-xl border border-black game-header-box">
          <div className="text-left flex items-center gap-1">
            <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-indigo-500" />
            <h3 className="font-extrabold text-xs md:text-xl text-slate-900 leading-none">
              Kuis Interaktif Sadasari
            </h3>
          </div>
          <span className="neo-badge bg-yellow-300 text-black px-2 py-0.5 text-[10px] md:text-base border border-black font-black uppercase tracking-wider">
            Soal {currentIdx + 1}/{questions.length}
          </span>
        </div>
 
        {/* Question Panel */}
        <div className="bg-white border-2 border-black rounded-xl p-3 md:p-8 shadow-[3px_3px_0px_#000] text-left mb-3">
          <p className="quiz-question text-sm md:text-2xl font-black text-slate-900 leading-snug mb-3">
            {currentQuestion.question}
          </p>
 
          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isOptionCorrect = opt.key === currentQuestion.correctAnswer;
              
              let btnClass = 'bg-white hover:bg-slate-100 border-black';
              if (showFeedback) {
                if (isSelected) {
                  btnClass = isCorrect
                    ? 'bg-emerald-200 border-black ring-2 ring-emerald-500'
                    : 'bg-rose-200 border-black ring-2 ring-rose-500';
                } else if (isOptionCorrect && isCorrect) {
                  btnClass = 'bg-emerald-100 border-black';
                }
              }
 
              return (
                <button
                  key={opt.key}
                  disabled={showFeedback && isCorrect}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`quiz-choice-btn neo-btn p-2 md:p-4 text-left transition-all flex items-center gap-2 relative group transform hover:-translate-y-0.5 active:translate-y-0 ${btnClass}`}
                >
                  <span className="neo-badge bg-black text-white px-2 py-0.5 text-xs md:text-lg font-black flex-shrink-0">
                    {opt.key}
                  </span>
                  <span className="text-xs md:text-xl font-bold text-slate-900 leading-tight">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Class Discussion Mode Trigger */}
        {!showFeedback && (
          <div className="mb-2">
            <button
              onClick={() => setIsClassDiscussionActive(!isClassDiscussionActive)}
              className="neo-btn px-3 py-1.5 text-xs font-black flex items-center gap-1.5 mx-auto transform active:scale-95 transition-all bg-white hover:bg-slate-50"
            >
              <span>🗳️</span> {isClassDiscussionActive ? 'Tutup Diskusi Kelas' : 'Diskusi Kelas'}
            </button>

            {isClassDiscussionActive && (
              <div className="mt-2 p-2 bg-indigo-50 border border-dashed border-indigo-400 rounded-lg max-w-sm mx-auto text-left text-[9px] md:text-sm font-bold text-indigo-900 animate-fadeIn leading-tight">
                📢 Minta seluruh siswa berdiskusi, lakukan pemungutan suara, lalu klik pilihan terbanyak.
              </div>
            )}
          </div>
        )}

        {/* Feedback Panel */}
        {showFeedback && (
          <div
            className={`border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_#000] text-left animate-fadeIn ${
              isCorrect ? 'bg-emerald-100' : 'bg-rose-100'
            }`}
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
              )}
              <div>
                <h4 className="font-extrabold text-xs md:text-xl text-slate-900 mb-0.5 leading-none">
                  {isCorrect ? 'Jawaban Benar! 🎉' : 'Jawaban Kurang Tepat... 😅'}
                </h4>
                <p className="text-[10px] md:text-base font-bold text-slate-800 leading-snug mb-2">
                  {currentQuestion.explanation}
                </p>

                {isCorrect ? (
                  <button
                    onClick={handleNext}
                    className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-4 py-1.5 text-xs md:text-lg flex items-center gap-1.5 font-black"
                  >
                    <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Selesaikan Kuis'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="neo-btn bg-yellow-300 hover:bg-yellow-200 text-black px-4 py-1.5 text-xs md:text-lg font-black"
                  >
                    🔄 Coba Pilihan Lain
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

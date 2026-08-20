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
    <div className="w-full max-w-3xl mx-auto p-2 md:p-4 animate-fadeIn select-none">
      <div className="neo-box-lg bg-amber-50 p-4 md:p-6 text-center relative overflow-hidden">
        {/* Progress Bar & Header */}
        <div className="flex items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl border-2 border-black">
          <div className="text-left flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-500" />
            <h3 className="font-extrabold text-base md:text-xl text-slate-900">
              Kuis Interaktif Sadasari
            </h3>
          </div>
          <span className="neo-badge bg-yellow-300 text-black px-3.5 py-1 text-sm md:text-base border-2 border-black font-black uppercase tracking-wider">
            Soal {currentIdx + 1} / {questions.length}
          </span>
        </div>

        {/* Question Panel */}
        <div className="bg-white border-4 border-black rounded-2xl p-5 md:p-8 shadow-[6px_6px_0px_#000] text-left mb-6">
          <p className="text-lg md:text-2xl font-black text-slate-900 leading-snug mb-6">
            {currentQuestion.question}
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isOptionCorrect = opt.key === currentQuestion.correctAnswer;
              
              let btnClass = 'bg-white hover:bg-slate-100 border-black';
              if (showFeedback) {
                if (isSelected) {
                  btnClass = isCorrect
                    ? 'bg-emerald-200 border-black ring-4 ring-emerald-500'
                    : 'bg-rose-200 border-black ring-4 ring-rose-500';
                } else if (isOptionCorrect && isCorrect) {
                  // highlight correct answer when finished
                  btnClass = 'bg-emerald-100 border-black';
                }
              }

              return (
                <button
                  key={opt.key}
                  disabled={showFeedback && isCorrect}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`neo-btn p-4 text-left transition-all flex items-center gap-4 relative group transform hover:-translate-y-0.5 active:translate-y-0 ${btnClass}`}
                >
                  <span className="neo-badge bg-black text-white px-3 py-1 text-lg font-black flex-shrink-0">
                    {opt.key}
                  </span>
                  <span className="text-base md:text-xl font-bold text-slate-900 leading-normal">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Class Discussion Mode Trigger */}
        {!showFeedback && (
          <div className="mb-4">
            <button
              onClick={() => setIsClassDiscussionActive(!isClassDiscussionActive)}
              className={`neo-btn px-4 py-2 text-sm md:text-base font-black flex items-center gap-2 mx-auto transform active:scale-95 transition-all ${
                isClassDiscussionActive ? 'bg-amber-300' : 'bg-white hover:bg-slate-50'
              }`}
            >
              <span>🗳️</span> {isClassDiscussionActive ? 'Tutup Diskusi Kelas' : 'Diskusikan Bersama Teman-Teman'}
            </button>

            {isClassDiscussionActive && (
              <div className="mt-3 p-4 bg-indigo-50 border-2 border-dashed border-indigo-400 rounded-xl max-w-md mx-auto text-left text-sm md:text-base font-bold text-indigo-900 animate-fadeIn">
                📢 <strong>Fasilitator (Mahasiswa KKM):</strong> Minta seluruh siswa berdiskusi, lakukan pemungutan suara (tunjuk tangan), lalu klik jawaban yang paling banyak dipilih siswa.
              </div>
            )}
          </div>
        )}

        {/* Feedback Panel */}
        {showFeedback && (
          <div
            className={`border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] text-left animate-fadeIn ${
              isCorrect ? 'bg-emerald-100' : 'bg-rose-100'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
              )}
              <div>
                <h4 className="font-extrabold text-lg md:text-xl text-slate-900 mb-1">
                  {isCorrect ? 'Jawaban Benar! 🎉' : 'Jawaban Kurang Tepat... 😅'}
                </h4>
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed mb-4">
                  {currentQuestion.explanation}
                </p>

                {isCorrect ? (
                  <button
                    onClick={handleNext}
                    className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-6 py-2.5 text-base md:text-lg flex items-center gap-2 font-black"
                  >
                    <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Selesaikan Kuis'}</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    onClick={handleTryAgain}
                    className="neo-btn bg-yellow-300 hover:bg-yellow-200 text-black px-6 py-2.5 text-base md:text-lg font-black"
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

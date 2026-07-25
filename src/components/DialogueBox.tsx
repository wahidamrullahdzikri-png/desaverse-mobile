import React, { useState, useEffect } from 'react';
import { DialogueLine, ChoiceOption } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../utils/audio';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface DialogueBoxProps {
  dialogues: DialogueLine[];
  choices?: ChoiceOption[];
  onDialogueComplete: () => void;
  onSelectChoice: (choice: ChoiceOption) => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogues,
  choices,
  onDialogueComplete,
  onSelectChoice,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentDialogue = dialogues[currentIdx];

  useEffect(() => {
    setCurrentIdx(0);
  }, [dialogues]);

  // Typewriter effect synced with synthetic audio
  useEffect(() => {
    if (!currentDialogue) return;

    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;
    const fullText = currentDialogue.text;

    const timer = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        if (charIndex % 3 === 0) {
          audioService.playTypewriter();
        }
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [currentIdx, dialogues]);

  if (!currentDialogue && (!choices || choices.length === 0)) {
    return null;
  }

  const handleNextDialogue = () => {
    audioService.playClick();
    if (isTyping && currentDialogue) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    if (currentIdx < dialogues.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onDialogueComplete();
    }
  };

  const showChoices = currentIdx === dialogues.length - 1 && choices && choices.length > 0 && !isTyping;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 md:px-4 pb-4 z-30">
      <div className="neo-box-lg bg-amber-50 p-4 md:p-6 relative transition-all shadow-2xl">
        {/* Dialogue Body & Avatar */}
        {currentDialogue && (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <CharacterAvatar
                character={currentDialogue.character}
                expression={currentDialogue.expression}
                size="md"
              />
            </div>

            {/* Content & Name Badge */}
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="neo-badge bg-yellow-300 text-slate-900 px-3.5 py-1 text-sm md:text-base border-2 border-black font-black uppercase tracking-wider">
                  {currentDialogue.speaker}
                </span>

                {dialogues.length > 1 && (
                  <span className="text-xs font-black bg-white px-2 py-0.5 border-2 border-black rounded-lg text-slate-700">
                    {currentIdx + 1} / {dialogues.length}
                  </span>
                )}
              </div>

              {/* Speech Text */}
              <p className="text-lg md:text-2xl font-bold text-slate-900 leading-relaxed min-h-[60px] pt-1">
                {displayedText}
                {isTyping && <span className="animate-pulse inline-block w-3 h-6 bg-amber-500 ml-1 rounded-sm"></span>}
              </p>

              {/* Next Dialogue Button */}
              {!showChoices && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextDialogue}
                    className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-5 py-2.5 text-base md:text-lg flex items-center gap-2 font-black transform active:scale-95 transition-transform"
                  >
                    <span>{isTyping ? '⏩ Tampilkan Semua' : currentIdx < dialogues.length - 1 ? 'Lanjut ⏩' : 'Lanjut ⏩'}</span>
                    <ChevronRight className="w-6 h-6 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Choice Options Buttons - Direct A & B Buttons on Page */}
        {showChoices && (
          <div className="mt-4 pt-4 border-t-4 border-black space-y-3 animate-fadeIn">
            <p className="text-base md:text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="text-2xl">🤔</span> Diskusi Kelas! Pilih Keputusan (Klik A atau B):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {choices.map((choice, index) => {
                const optionLetter = index === 0 ? 'A' : index === 1 ? 'B' : `${index + 1}`;
                return (
                  <button
                    key={choice.id}
                    onClick={() => {
                      audioService.playClick();
                      if (choice.isConsumptiveChoice) {
                        audioService.playClick();
                      } else {
                        audioService.playMagicChime();
                      }
                      onSelectChoice(choice);
                    }}
                    className={`neo-btn p-4 text-left transition-all flex items-start gap-3 relative group transform hover:-translate-y-1 ${
                      choice.isConsumptiveChoice
                        ? 'bg-rose-100 hover:bg-rose-200 border-black'
                        : 'bg-emerald-100 hover:bg-emerald-200 border-black'
                    }`}
                  >
                    <span className="neo-badge bg-black text-white px-3 py-1 text-lg font-black flex-shrink-0">
                      {optionLetter}
                    </span>

                    <span className="text-4xl p-2 bg-white rounded-2xl border-2 border-black flex-shrink-0 drop-shadow-md">
                      {choice.icon}
                    </span>

                    <div className="flex-1">
                      <h4 className="font-extrabold text-base md:text-xl text-slate-900 flex items-center gap-1">
                        {choice.label}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-800 font-bold mt-1 leading-snug">
                        {choice.description}
                      </p>
                      {choice.softBranchWarning && (
                        <span className="inline-block mt-2 text-xs bg-rose-200 text-rose-950 px-2.5 py-1 rounded-md font-black border-2 border-rose-400">
                          ⚠️ {choice.softBranchWarning}
                        </span>
                      )}
                    </div>

                    <ArrowRight className="w-6 h-6 text-black self-center flex-shrink-0 group-hover:translate-x-1 transition-transform stroke-[3]" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

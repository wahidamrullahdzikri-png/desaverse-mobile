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
  skipTypewriter?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogues,
  choices,
  onDialogueComplete,
  onSelectChoice,
  skipTypewriter,
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

    if (skipTypewriter) {
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

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
  }, [currentIdx, dialogues, skipTypewriter]);

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
    <div className="w-full max-w-4xl mx-auto px-1 lg:px-4 pb-0.5 lg:pb-4 z-30">
      <div className="neo-box-lg bg-amber-50 p-1.5 sm:p-3 md:p-5 lg:p-6 relative transition-all shadow-2xl">
        {/* Dialogue Body & Avatar */}
        {currentDialogue && (
          <div className="flex flex-row items-start gap-1.5 md:gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0 scale-50 sm:scale-75 md:scale-100 origin-top-left">
              <CharacterAvatar
                character={currentDialogue.character}
                expression={currentDialogue.expression}
                size="sm"
              />
            </div>

            {/* Content & Name Badge */}
            <div className="flex-1 w-full space-y-0.5 md:space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <span className="neo-badge bg-yellow-300 text-slate-900 px-1 py-0.25 md:px-3.5 md:py-1 text-[9px] md:text-base border border-black font-black uppercase tracking-wider">
                  {currentDialogue.speaker}
                </span>

                {dialogues.length > 1 && (
                  <span className="text-[7px] md:text-xs font-black bg-white px-1 py-0.25 border border-black rounded text-slate-700">
                    {currentIdx + 1} / {dialogues.length}
                  </span>
                )}
              </div>

              {/* Speech Text */}
              <p className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-bold text-slate-900 leading-tight md:leading-relaxed min-h-[16px] md:min-h-[50px] pt-0.5">
                {displayedText}
                {isTyping && <span className="animate-pulse inline-block w-1 h-2 md:w-3 md:h-6 bg-amber-500 ml-0.5 rounded-sm"></span>}
              </p>

              {/* Next Dialogue Button */}
              {!showChoices && (
                <div className="flex justify-end pt-0.5">
                  <button
                    onClick={handleNextDialogue}
                    className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black px-1.5 py-0.5 md:px-5 md:py-2.5 text-[9px] sm:text-xs md:text-lg flex items-center gap-0.5 font-black transform active:scale-95 transition-transform"
                  >
                    <span>{isTyping ? '⏩ Semua' : 'Lanjut ⏩'}</span>
                    <ChevronRight className="w-3 h-3 md:w-6 md:h-6 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Choice Options Buttons - Direct A & B Buttons on Page */}
        {showChoices && (() => {
          const useSingleColumn = choices && choices.some(c => 
            (c.description && c.description.length > 70) || 
            (c.label && c.label.length > 25)
          );
          const gridClass = useSingleColumn ? "grid-cols-1" : "grid-cols-2";
          return (
            <div className="mt-1.5 md:mt-4 pt-1.5 md:pt-4 border-t-2 md:border-t-4 border-black space-y-1 md:space-y-3 animate-fadeIn">
              <p className="text-[10px] md:text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-sm md:text-2xl">🤔</span> Diskusi Kelas! Pilih Keputusan:
              </p>

              <div className={`grid ${gridClass} gap-2 md:gap-4`}>
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
                      className={`neo-btn p-2 md:p-4 text-left transition-all flex items-start gap-2 relative group transform hover:-translate-y-0.5 md:hover:-translate-y-1 ${
                        choice.isConsumptiveChoice
                          ? 'bg-rose-100 hover:bg-rose-200 border-black'
                          : 'bg-emerald-100 hover:bg-emerald-200 border-black'
                      }`}
                    >
                      <span className="neo-badge bg-black text-white px-2 py-0.5 text-xs md:text-lg font-black flex-shrink-0">
                        {optionLetter}
                      </span>

                      <span className="text-xl md:text-4xl p-1 md:p-2 bg-white rounded-lg md:rounded-2xl border-2 border-black flex-shrink-0 drop-shadow-md">
                        {choice.icon}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-xs md:text-xl text-slate-900 flex items-center gap-1 truncate">
                          {choice.label}
                        </h4>
                        <p className="text-[9px] md:text-sm text-slate-800 font-bold mt-0.5 leading-snug line-clamp-2 md:line-clamp-none">
                          {choice.description}
                        </p>
                        {choice.softBranchWarning && (
                          <span className="inline-block mt-1 text-[8px] md:text-xs bg-rose-200 text-rose-950 px-1.5 py-0.5 rounded-md font-black border border-rose-400">
                            ⚠️ {choice.softBranchWarning}
                          </span>
                        )}
                      </div>

                      <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-black self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform stroke-[3]" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

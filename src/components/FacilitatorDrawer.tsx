import React from 'react';
import { FacilitatorGuide, Indicators } from '../types';
import { STORY_SCENES } from '../data/storyData';
import { sound } from '../utils/audio';
import { X, BookOpen, HelpCircle, Target, Sparkles, Navigation } from 'lucide-react';

interface FacilitatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  guide?: FacilitatorGuide;
  currentSceneId: string;
  indicators: Indicators;
  onJumpToScene: (sceneId: string) => void;
}

export const FacilitatorDrawer: React.FC<FacilitatorDrawerProps> = ({
  isOpen,
  onClose,
  guide,
  currentSceneId,
  indicators,
  onJumpToScene,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-end z-50 animate-fadeIn">
      <div className="neo-box-lg bg-amber-50 w-full max-w-lg h-full p-5 flex flex-col justify-between overflow-y-auto rounded-none md:rounded-l-2xl border-y-0 border-r-0 border-l-4 border-black">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-300 rounded-xl border-2 border-black">
                <BookOpen className="w-6 h-6 text-black" />
              </span>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">
                  👩‍🏫 Panduan Fasilitator KKN
                </h3>
                <p className="text-xs text-slate-700 font-semibold">
                  Catatan instruktur & panduan diskusi interaktif kelas.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 bg-white hover:bg-slate-200 rounded-lg border-2 border-black"
            >
              <X className="w-5 h-5 text-slate-800" />
            </button>
          </div>

          {/* Current Indicators Box */}
          <div className="neo-box-sm bg-yellow-200 p-3 mb-4">
            <h4 className="text-xs font-black uppercase text-slate-800 mb-2 flex items-center gap-1">
              <span>📊</span> Status Indikator Desa Saat Ini:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-slate-900">
              <div className="bg-white p-2 rounded-lg border border-black flex justify-between">
                <span>💰 Ekonomi:</span> <span>{indicators.ekonomi}/100</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-black flex justify-between">
                <span>🌿 Lingkungan:</span> <span>{indicators.lingkungan}/100</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-black flex justify-between">
                <span>🌾 Pangan:</span> <span>{indicators.pangan}/100</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-black flex justify-between">
                <span>🤝 Mandiri:</span> <span>{indicators.kemandirian}/100</span>
              </div>
            </div>
          </div>

          {/* Active Guide */}
          {guide ? (
            <div className="space-y-4">
              {/* Objective */}
              <div className="neo-box-sm bg-white p-3.5">
                <div className="flex items-center gap-2 mb-1 text-indigo-700">
                  <Target className="w-5 h-5" />
                  <h4 className="font-extrabold text-sm uppercase">Tujuan Pembelajaran</h4>
                </div>
                <p className="text-sm font-semibold text-slate-800">{guide.objective}</p>
              </div>

              {/* Discussion Prompts */}
              <div className="neo-box-sm bg-indigo-100 p-3.5">
                <div className="flex items-center gap-2 mb-2 text-indigo-900">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="font-extrabold text-sm uppercase">Pertanyaan Diskusi Kelas</h4>
                </div>
                <ul className="space-y-1.5">
                  {guide.discussionPrompts.map((prompt, idx) => (
                    <li key={idx} className="text-xs md:text-sm font-bold text-slate-900 flex items-start gap-2">
                      <span className="bg-indigo-300 text-indigo-950 text-xs px-1.5 py-0.5 rounded border border-black flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Takeaway */}
              <div className="neo-box-sm bg-emerald-100 p-3.5">
                <div className="flex items-center gap-2 mb-1 text-emerald-900">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-extrabold text-sm uppercase">Pesan Kunci</h4>
                </div>
                <p className="text-xs md:text-sm font-extrabold text-emerald-950">{guide.keyTakeaway}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-600 font-medium">Pilih scene untuk melihat panduan fasilitator.</p>
          )}

          {/* Scene Jump Selector */}
          <div className="mt-6 pt-4 border-t-2 border-black">
            <h4 className="font-extrabold text-sm text-slate-900 uppercase mb-2 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-indigo-600" /> Lompat ke Scene (Operator KKN):
            </h4>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1 bg-white rounded-xl border-2 border-black">
              {Object.values(STORY_SCENES).map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    sound.playPop();
                    onJumpToScene(sc.id);
                    onClose();
                  }}
                  className={`text-left px-2 py-1.5 rounded-lg text-xs font-bold border transition-all truncate ${
                    sc.id === currentSceneId
                      ? 'bg-yellow-300 border-black font-black'
                      : 'bg-slate-50 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  <span className="opacity-60">{sc.id}:</span> {sc.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t-2 border-black text-center text-xs text-slate-600 font-bold">
          DESAVERSE KKN Facilitator Tool v1.0 • Universitas & KKN Desa Mandiri
        </div>
      </div>
    </div>
  );
};

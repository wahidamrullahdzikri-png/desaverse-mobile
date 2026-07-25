import React, { useState, useEffect } from 'react';
import { SceneData, ChoiceOption } from '../types';
import { DialogueBox } from './DialogueBox';
import { TrashCleanupGame } from './minigames/TrashCleanupGame';
import { WasteSortingGame } from './minigames/WasteSortingGame';
import { PlantingGame } from './minigames/PlantingGame';
import { HarvestGame } from './minigames/HarvestGame';
import { audioService } from '../utils/audio';

interface SceneRendererProps {
  scene: SceneData;
  onNextScene: (targetSceneId?: string) => void;
  onSelectChoice: (choice: ChoiceOption) => void;
}

// Growing transition component for SC-013
const GrowingTransition: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=seed, 1=sprout, 2=small, 3=big, 4=done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4500),
      setTimeout(() => onComplete(), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const getPlantHeight = () => {
    switch (phase) {
      case 0: return 10;
      case 1: return 30;
      case 2: return 55;
      case 3: return 85;
      case 4: return 100;
      default: return 10;
    }
  };

  const renderGrowingPlant = (offsetX: number, delay: number) => (
    <div
      className="absolute bottom-20 transition-all duration-1000 ease-out"
      style={{
        left: `${offsetX}%`,
        transform: `translateX(-50%)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <svg
        viewBox="0 0 80 120"
        className="drop-shadow-xl transition-all duration-1000 ease-out"
        style={{
          width: '80px',
          height: `${getPlantHeight() * 1.5}px`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Stem */}
        <path
          d={`M 40 ${120 - getPlantHeight()} Q 38 ${120 - getPlantHeight() * 0.5} 40 120`}
          fill="none" stroke="#166534" strokeWidth="5" strokeLinecap="round"
        />

        {/* Leaves - appear at phase 2+ */}
        {phase >= 2 && (
          <g className="animate-fadeIn">
            <path d="M 40 80 Q 15 70 10 55 Q 25 55 40 80 Z" fill="#4ADE80" stroke="#000" strokeWidth="2" />
            <path d="M 40 70 Q 65 60 70 45 Q 55 45 40 70 Z" fill="#22C55E" stroke="#000" strokeWidth="2" />
          </g>
        )}

        {/* More leaves & fruit at phase 3+ */}
        {phase >= 3 && (
          <g className="animate-fadeIn">
            <path d="M 40 55 Q 10 45 5 30 Q 20 30 40 55 Z" fill="#16A34A" stroke="#000" strokeWidth="2" />
            <path d="M 40 45 Q 70 35 75 20 Q 60 20 40 45 Z" fill="#4ADE80" stroke="#000" strokeWidth="2" />
            {/* Fruits */}
            <circle cx="12" cy="52" r="5" fill="#EF4444" stroke="#000" strokeWidth="1.5" />
            <circle cx="68" cy="42" r="5" fill="#EF4444" stroke="#000" strokeWidth="1.5" />
            <circle cx="8" cy="28" r="4" fill="#F59E0B" stroke="#000" strokeWidth="1.5" />
          </g>
        )}

        {/* Seed/Sprout at bottom */}
        {phase === 0 && (
          <g>
            <circle cx="40" cy="115" r="4" fill="#FDE047" stroke="#000" strokeWidth="1.5" />
            <circle cx="36" cy="117" r="3" fill="#FDE047" stroke="#000" strokeWidth="1" />
          </g>
        )}

        {phase === 1 && (
          <g className="animate-fadeIn">
            <path d="M 40 110 Q 35 100 30 95 Q 40 92 40 110 Z" fill="#86EFAC" stroke="#000" strokeWidth="1.5" />
          </g>
        )}
      </svg>

      {/* Dirt mound */}
      <svg viewBox="0 0 80 20" className="w-20 h-5 -mt-1">
        <path d="M 5 18 Q 40 2 75 18 Z" fill="#78350F" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );

  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100" />

      {/* Sun */}
      <div className="absolute top-6 right-12 text-6xl animate-spin-slow">☀️</div>

      {/* Ground */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-amber-800 to-amber-700 border-t-4 border-amber-900" />

      {/* Growing plants */}
      {renderGrowingPlant(15, 0)}
      {renderGrowingPlant(30, 200)}
      {renderGrowingPlant(45, 400)}
      {renderGrowingPlant(60, 100)}
      {renderGrowingPlant(75, 300)}
      {renderGrowingPlant(88, 500)}

      {/* Phase text overlay */}
      <div className="absolute inset-x-0 top-8 flex justify-center z-40 pointer-events-none">
        <div className="neo-box-lg bg-white/90 px-8 py-4 text-center">
          <p className="font-extrabold text-xl md:text-3xl text-slate-900 transition-all duration-500">
            {phase === 0 && '🌱 Bibit ditanam di tanah yang subur...'}
            {phase === 1 && '🌿 Tunas mulai muncul dari tanah!'}
            {phase === 2 && '☀️ Tumbuhan semakin tinggi berkat sinar matahari...'}
            {phase === 3 && '🌶️🍅 Buah mulai tumbuh lebat di setiap batang!'}
            {phase === 4 && '🎉 Tanaman sudah siap dipanen!'}
          </p>
        </div>
      </div>

      {/* Animated day-night cycle indicator */}
      <div className="absolute bottom-28 inset-x-0 flex justify-center gap-4 z-30 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`text-3xl transition-all duration-500 ${phase > i ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}
          >
            {i % 2 === 0 ? '☀️' : '🌙'}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  onNextScene,
  onSelectChoice,
}) => {
  const [showGrowingTransition, setShowGrowingTransition] = useState(false);
  const [growingDone, setGrowingDone] = useState(false);

  // Show growing transition for SC-013 before dialogue
  useEffect(() => {
    if (scene.id === 'SC-013' && !growingDone) {
      setShowGrowingTransition(true);
    } else {
      setShowGrowingTransition(false);
    }
  }, [scene.id, growingDone]);

  // Reset growing state when leaving SC-013
  useEffect(() => {
    if (scene.id !== 'SC-013') {
      setGrowingDone(false);
    }
  }, [scene.id]);

  // Map scene background to our generated image paths
  const getBackgroundImage = (bg: string) => {
    switch (bg) {
      case 'village_dirty': return '/images/bg_village_dirty.jpg';
      case 'village_clean': return '/images/bg_village_clean.jpg';
      case 'bank_sampah': return '/images/bg_bank_sampah.jpg';
      case 'kebun':
      case 'sawah': return '/images/bg_kebun.jpg';
      case 'kebun_lebat': return '/images/bg_kebun_lebat.jpg';
      case 'toko':
      case 'umkm': return '/images/bg_umkm.jpg';
      default: return '';
    }
  };

  const bgUrl = getBackgroundImage(scene.background);

  // Determine dialog placement container classes
  const getDialogContainerClasses = () => {
    const pos = scene.dialogPosition || 'bottom';
    if (pos === 'top') return 'justify-start pt-12';
    if (pos === 'center') return 'justify-center items-center';
    if (pos === 'left') return 'justify-center items-start pl-8';
    if (pos === 'right') return 'justify-center items-end pr-8';
    return 'justify-end pb-4'; // default bottom
  };

  const isMinigameScene = scene.category === 'minigame' && scene.miniGameType;

  // ─── MINIGAME SCENES: scrollable, no background image overlap ───
  if (isMinigameScene) {
    return (
      <div className="relative w-full h-full flex flex-col overflow-y-auto bg-gradient-to-b from-amber-100 via-amber-50 to-emerald-100">
        {/* Minigame content - scrollable, takes full space */}
        <div className="flex-shrink-0 w-full max-w-5xl mx-auto p-2 md:p-4">
          {scene.miniGameType === 'trash_cleanup' && (
            <TrashCleanupGame onComplete={() => {
              audioService.playMagicChime();
              onNextScene(scene.nextSceneId);
            }} />
          )}
          {scene.miniGameType === 'waste_sorting' && (
            <WasteSortingGame onComplete={() => {
              audioService.playMagicChime();
              onNextScene(scene.nextSceneId);
            }} />
          )}
          {scene.miniGameType === 'planting' && (
            <PlantingGame onComplete={() => {
              audioService.playPlantGrow();
              onNextScene(scene.nextSceneId);
            }} />
          )}
          {scene.miniGameType === 'harvest' && (
            <HarvestGame onComplete={() => {
              audioService.playFanfare();
              onNextScene(scene.nextSceneId);
            }} />
          )}
        </div>

        {/* Dialogue below minigame - also scrollable */}
        {scene.dialogues && scene.dialogues.length > 0 && (
          <div className="flex-shrink-0 w-full max-w-4xl mx-auto px-2 md:px-4 pb-4">
            <DialogueBox
              dialogues={scene.dialogues}
              choices={scene.choices}
              onDialogueComplete={() => onNextScene(scene.nextSceneId)}
              onSelectChoice={onSelectChoice}
            />
          </div>
        )}
      </div>
    );
  }

  // ─── STORY / DECISION SCENES: fixed background, no scroll ───
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-sky-200">

      {/* Growing Transition for SC-013 */}
      {showGrowingTransition && (
        <GrowingTransition onComplete={() => {
          audioService.playPlantGrow();
          setShowGrowingTransition(false);
          setGrowingDone(true);
        }} />
      )}

      {/* Dynamic Background */}
      {!showGrowingTransition && bgUrl ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center animate-bg-pan-slow scale-105"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      ) : !showGrowingTransition ? (
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-amber-300 flex items-center justify-center select-none z-0">
          <span className="text-7xl animate-spin-slow">🌾</span>
        </div>
      ) : null}

      {/* Main Interactive Stage: Story Dialogue */}
      {!showGrowingTransition && (
        <div className={`relative z-10 flex-1 flex flex-col p-4 pointer-events-none ${getDialogContainerClasses()}`}>
          <div className={`pointer-events-auto w-full max-w-4xl flex flex-col ${scene.dialogPosition === 'left' || scene.dialogPosition === 'right' ? 'w-1/2' : 'mx-auto'}`}>
            {/* Story Dialogue Box */}
            {scene.dialogues && scene.dialogues.length > 0 && (
              <DialogueBox
                dialogues={scene.dialogues}
                choices={scene.choices}
                onDialogueComplete={() => onNextScene(scene.nextSceneId)}
                onSelectChoice={onSelectChoice}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

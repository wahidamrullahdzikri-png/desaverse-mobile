import React, { useState, useEffect } from 'react';
import { GameState, Indicators, ChoiceOption } from './types';
import { STORY_SCENES, INITIAL_INDICATORS } from './data/storyData';
import { HeaderHUD } from './components/HeaderHUD';
import { MainMenu } from './components/MainMenu';
import { SceneRenderer } from './components/SceneRenderer';
import { FacilitatorDrawer } from './components/FacilitatorDrawer';
import { EndingView } from './components/EndingView';
import { WelcomeInstallModal } from './components/WelcomeInstallModal';
import { sound } from './utils/audio';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'SC-002', // Main menu default
    indicators: { ...INITIAL_INDICATORS },
    history: ['SC-002'],
    choicesMade: {},
    isAudioMuted: false,
    bgmVolume: 0.5,
    sfxVolume: 0.8,
    isFacilitatorModeOpen: false,
    isVotingOpen: false,
    votingCounts: {},
  });

  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [hasChosenBrowser, setHasChosenBrowser] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
 
  useEffect(() => {
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                            (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);
    if (checkStandalone) {
      setHasChosenBrowser(true);
    }

    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const currentScene = STORY_SCENES[gameState.currentSceneId] || STORY_SCENES['SC-002'];

  const handleToggleAudio = () => {
    const newMuted = !gameState.isAudioMuted;
    sound.setMuted(newMuted);
    setGameState((prev) => ({ ...prev, isAudioMuted: newMuted }));
  };

  const handleNextScene = (targetSceneId?: string) => {
    const nextId = targetSceneId || currentScene.nextSceneId || 'SC-002';
    setGameState((prev) => ({
      ...prev,
      currentSceneId: nextId,
      history: [...prev.history, nextId],
    }));
  };

  const handleSelectChoice = (choice: ChoiceOption) => {
    // Apply indicator impacts
    setGameState((prev) => {
      const newIndicators: Indicators = { ...prev.indicators };
      if (choice.indicatorImpact) {
        if (choice.indicatorImpact.ekonomi !== undefined) {
          newIndicators.ekonomi = Math.min(100, Math.max(0, newIndicators.ekonomi + choice.indicatorImpact.ekonomi));
        }
        if (choice.indicatorImpact.lingkungan !== undefined) {
          newIndicators.lingkungan = Math.min(100, Math.max(0, newIndicators.lingkungan + choice.indicatorImpact.lingkungan));
        }
        if (choice.indicatorImpact.pangan !== undefined) {
          newIndicators.pangan = Math.min(100, Math.max(0, newIndicators.pangan + choice.indicatorImpact.pangan));
        }
        if (choice.indicatorImpact.kemandirian !== undefined) {
          newIndicators.kemandirian = Math.min(100, Math.max(0, newIndicators.kemandirian + choice.indicatorImpact.kemandirian));
        }
      }

      return {
        ...prev,
        indicators: newIndicators,
        choicesMade: { ...prev.choicesMade, [currentScene.id]: choice.id },
        currentSceneId: choice.nextSceneId,
        history: [...prev.history, choice.nextSceneId],
      };
    });
  };

  const handleResetGame = () => {
    setGameState({
      currentSceneId: 'SC-002',
      indicators: { ...INITIAL_INDICATORS },
      history: ['SC-002'],
      choicesMade: {},
      isAudioMuted: gameState.isAudioMuted,
      bgmVolume: 0.5,
      sfxVolume: 0.8,
      isFacilitatorModeOpen: false,
      isVotingOpen: false,
      votingCounts: {},
    });
  };

  const handleJumpToScene = (sceneId: string) => {
    setGameState((prev) => ({
      ...prev,
      currentSceneId: sceneId,
      history: [...prev.history, sceneId],
    }));
  };

  const isEndingScene = currentScene.id === 'SC-018' || currentScene.id === 'SC-019';

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center bg-stone-900 select-none">
      {/* 1. Welcome Install / Browser choice Modal for mobile browsers */}
      {!hasChosenBrowser && (
        <WelcomeInstallModal onContinueToBrowser={() => setHasChosenBrowser(true)} />
      )}

      {/* Orientation Blocker (Only shown if user chose browser option, not standalone PWA, and HP is portrait) */}
      {hasChosenBrowser && !isStandalone && isPortrait && (
        <div className="fixed inset-0 bg-stone-950 text-white z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          {/* Animated SVG Phone */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <div className="w-16 h-28 border-4 border-yellow-300 rounded-2xl p-1.5 relative animate-phone-rotate bg-stone-900 shadow-2xl flex flex-col justify-between">
              {/* Speaker */}
              <div className="w-8 h-1 bg-yellow-300 rounded-full mx-auto" />
              {/* Screen */}
              <div className="flex-1 bg-amber-400/90 rounded-lg my-2 flex items-center justify-center overflow-hidden">
                <span className="text-2xl animate-bounce-subtle">♻️</span>
              </div>
              {/* Home button notch */}
              <div className="w-3 h-3 rounded-full border-2 border-yellow-300 mx-auto" />
            </div>
          </div>

          <div className="neo-box-lg bg-yellow-100 text-stone-900 p-6 max-w-sm shadow-[6px_6px_0px_#000]">
            <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-wide text-red-600">Putar HP Miring! 🔄</h2>
            <p className="text-sm font-bold text-stone-800 leading-relaxed">
              Hai Pahlawan! Agar petualangan di <strong className="text-emerald-700">Desa Sadasari</strong> terlihat indah dan seru, harap <strong>miringkan HP kamu (Landscape)</strong> ya!
            </p>
            <div className="mt-4 text-xs font-black text-stone-600 bg-white/70 border border-stone-300 py-1.5 px-3 rounded-full inline-block">
              💡 Pastikan fitur "Rotasi Otomatis" di HP aktif!
            </div>
          </div>
        </div>
      )}

      {/* Desktop First Container */}
      <div className="relative w-full h-full flex flex-col bg-amber-50 overflow-hidden">
        
        {/* Header HUD (Visible during gameplay scenes) */}
        {gameState.currentSceneId !== 'SC-001' && gameState.currentSceneId !== 'SC-002' && (
          <HeaderHUD
            indicators={gameState.indicators}
            act={currentScene.act}
            sceneTitle={currentScene.title}
            isAudioMuted={gameState.isAudioMuted}
            onToggleAudio={handleToggleAudio}
            onOpenFacilitatorMode={() => setGameState((prev) => ({ ...prev, isFacilitatorModeOpen: true }))}
            onResetGame={handleResetGame}
          />
        )}

        {/* Main View Area */}
        <main className="flex-1 relative overflow-auto flex flex-col">
          {/* SC-002 Main Menu */}
          {gameState.currentSceneId === 'SC-002' && (
            <MainMenu
              onStartGame={() => handleJumpToScene('SC-003')}
              onOpenFacilitatorMode={() => setGameState((prev) => ({ ...prev, isFacilitatorModeOpen: true }))}
              isAudioMuted={gameState.isAudioMuted}
              onToggleAudio={handleToggleAudio}
            />
          )}

          {/* SC-018 & SC-019 Ending & Refleksi View */}
          {isEndingScene && (
            <div className="flex-1 overflow-y-auto p-4">
              <EndingView
                indicators={gameState.indicators}
                choicesMade={gameState.choicesMade}
                onReplayGame={handleResetGame}
                onOpenFacilitatorMode={() => setGameState((prev) => ({ ...prev, isFacilitatorModeOpen: true }))}
              />
            </div>
          )}

          {/* Regular Story & Mini Game Scenes */}
          {gameState.currentSceneId !== 'SC-002' && !isEndingScene && (() => {
            const isRevisited = gameState.history.filter(id => id === gameState.currentSceneId).length > 1;
            const skipTypewriter = isRevisited || !!currentScene.skipTypewriter;
            return (
              <SceneRenderer
                scene={currentScene}
                onNextScene={handleNextScene}
                onSelectChoice={handleSelectChoice}
                skipTypewriter={skipTypewriter}
              />
            );
          })()}
        </main>

        {/* KKN Facilitator Drawer */}
        <FacilitatorDrawer
          isOpen={gameState.isFacilitatorModeOpen}
          onClose={() => setGameState((prev) => ({ ...prev, isFacilitatorModeOpen: false }))}
          guide={currentScene.facilitatorGuide}
          currentSceneId={gameState.currentSceneId}
          indicators={gameState.indicators}
          onJumpToScene={handleJumpToScene}
        />
      </div>
    </div>
  );
}

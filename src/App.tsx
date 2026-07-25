import React, { useState } from 'react';
import { GameState, Indicators, ChoiceOption } from './types';
import { STORY_SCENES, INITIAL_INDICATORS } from './data/storyData';
import { HeaderHUD } from './components/HeaderHUD';
import { MainMenu } from './components/MainMenu';
import { SceneRenderer } from './components/SceneRenderer';
import { FacilitatorDrawer } from './components/FacilitatorDrawer';
import { EndingView } from './components/EndingView';
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
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-stone-900 select-none">
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
          {gameState.currentSceneId !== 'SC-002' && !isEndingScene && (
            <SceneRenderer
              scene={currentScene}
              onNextScene={handleNextScene}
              onSelectChoice={handleSelectChoice}
            />
          )}
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

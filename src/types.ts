export type CharacterType = 'windah' | 'pak_jaya' | 'pak_tani' | 'bu_rina' | 'warga';

export type CharacterExpression = 'happy' | 'sad' | 'thinking' | 'surprised' | 'proud' | 'neutral';

export interface Indicators {
  ekonomi: number;      // 💰 0-100
  lingkungan: number;   // 🌿 0-100
  pangan: number;       // 🌾 0-100
  kemandirian: number;  // 🤝 0-100
}

export type SceneCategory = 'opening' | 'story' | 'minigame' | 'decision' | 'ending' | 'reflection';

export type MiniGameType = 'trash_cleanup' | 'waste_sorting' | 'planting' | 'harvest';

export interface ChoiceOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  nextSceneId: string;
  indicatorImpact: Partial<Indicators>;
  softBranchWarning?: string;
  isConsumptiveChoice?: boolean;
}

export interface DialogueLine {
  speaker: string;
  character: CharacterType;
  expression: CharacterExpression;
  text: string;
  audioEffect?: string;
}

export interface FacilitatorGuide {
  objective: string;
  discussionPrompts: string[];
  keyTakeaway: string;
}

export interface SceneData {
  id: string;
  title: string;
  category: SceneCategory;
  act: 1 | 2 | 3 | 4;
  background: 'village_dirty' | 'village_clean' | 'bank_sampah' | 'toko' | 'kebun' | 'sawah' | 'umkm' | 'balai_desa' | 'splash';
  dialogues: DialogueLine[];
  choices?: ChoiceOption[];
  miniGameType?: MiniGameType;
  facilitatorGuide: FacilitatorGuide;
  nextSceneId?: string;
  dialogPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface GameState {
  currentSceneId: string;
  indicators: Indicators;
  history: string[]; // List of scene IDs visited
  choicesMade: Record<string, string>; // choiceId -> selectedOptionId
  isAudioMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  isFacilitatorModeOpen: boolean;
  isVotingOpen: boolean;
  votingCounts: Record<string, number>;
  votingActiveChoiceId?: string;
}

export type EndingType = 'desa_belum_mandiri' | 'desa_bersih' | 'desa_sehat' | 'desa_mandiri';

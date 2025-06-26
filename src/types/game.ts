export interface GameState {
  potatoes: number;
  totalPotatoes: number;
  potatoesPerSecond: number;
  clickPower: number;
  goldenPotatoes: number;
  diamondPotatoes: number;
  rainbowPotatoes: number;
  prestige: number;
  prestigeBonus: number;
  achievements: string[];
  lastSave: number;
  totalClicks: number;
  playtime: number;
  level: number;
  experience: number;
  multiplier: number;
  criticalChance: number;
  criticalMultiplier: number;
  autoClickerLevel: number;
  farmSize: number;
  weatherBonus: number;
  seasonBonus: number;
  researchPoints: number;
  unlockedFeatures: string[];
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  costMultiplier: number;
  effect: number;
  type: 'click' | 'auto' | 'multiplier' | 'critical' | 'farm' | 'special';
  category: string;
  icon: string;
  owned: number;
  maxOwned?: number;
  unlockRequirement?: {
    type: 'level' | 'potatoes' | 'prestige' | 'achievement';
    value: number | string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  type: 'potatoes' | 'clicks' | 'upgrades' | 'golden' | 'level' | 'playtime' | 'prestige';
  icon: string;
  unlocked: boolean;
  reward?: {
    type: 'clickPower' | 'multiplier' | 'criticalChance' | 'researchPoints';
    value: number;
  };
}

export interface SaveData {
  gameState: GameState;
  upgrades: Upgrade[];
  timestamp: number;
  version: string;
}
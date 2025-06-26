import { GameState } from '../types/game';

const SAVE_KEY = 'potato_land_save';

export function saveGame(gameState: GameState): void {
  try {
    const saveData = {
      ...gameState,
      lastSave: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
}

export function loadGame(): GameState | null {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (!saveData) return null;
    
    const parsed = JSON.parse(saveData);
    
    // Handle offline progress (up to 24 hours)
    const now = Date.now();
    const timeDiff = now - parsed.lastSave;
    const offlineHours = Math.min(timeDiff / (1000 * 60 * 60), 24);
    const offlinePotatoes = parsed.potatoesPerSecond * offlineHours * 3600;
    
    return {
      ...parsed,
      potatoes: parsed.potatoes + offlinePotatoes,
      totalPotatoes: parsed.totalPotatoes + offlinePotatoes,
      lastSave: now
    };
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

export function deleteSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error('Failed to delete save:', error);
  }
}
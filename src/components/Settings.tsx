import React from 'react';
import { Volume2, VolumeX, Music, Music as MusicOff } from 'lucide-react';
import { SaveManager } from './SaveManager';
import { GameState } from '../types/game';

interface SettingsProps {
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    volume: number;
    notifications: boolean;
  };
  onSettingsChange: (settings: any) => void;
  gameState: GameState;
  onSaveGame: () => void;
  onLoadGame: (gameState: GameState) => void;
}

export function Settings({ settings, onSettingsChange, gameState, onSaveGame, onLoadGame }: SettingsProps) {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Audio Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span className="font-medium">Sound Effects</span>
            </div>
            <button
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.soundEnabled ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.musicEnabled ? <Music size={20} /> : <MusicOff size={20} />}
              <span className="font-medium">Background Music</span>
            </div>
            <button
              onClick={() => updateSetting('musicEnabled', !settings.musicEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.musicEnabled ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                settings.musicEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume: {Math.round(settings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Game Settings</h3>
        
        <div className="flex items-center justify-between">
          <span className="font-medium">Achievement Notifications</span>
          <button
            onClick={() => updateSetting('notifications', !settings.notifications)}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              settings.notifications ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              settings.notifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <SaveManager gameState={gameState} onLoadGame={onLoadGame} />
    </div>
  );
}
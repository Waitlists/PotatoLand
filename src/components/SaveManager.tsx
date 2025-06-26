import React, { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { GameState, SaveData } from '../types/game';

interface SaveManagerProps {
  gameState: GameState;
  onLoadGame: (gameState: GameState) => void;
}

export function SaveManager({ gameState, onLoadGame }: SaveManagerProps) {
  const [saveSlots, setSaveSlots] = useState<SaveData[]>([]);

  const exportSave = () => {
    const saveData: SaveData = {
      gameState,
      upgrades: [], // Would need to pass upgrades from parent
      timestamp: Date.now(),
      version: '1.0.0'
    };

    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `potato-land-save-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData: SaveData = JSON.parse(e.target?.result as string);
        onLoadGame(saveData.gameState);
        alert('Save file loaded successfully!');
      } catch (error) {
        alert('Invalid save file!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Save Management</h3>
      
      <div className="space-y-3">
        <button
          onClick={exportSave}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <Download size={16} />
          Export Save File
        </button>
        
        <label className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer">
          <Upload size={16} />
          Import Save File
          <input
            type="file"
            accept=".json"
            onChange={importSave}
            className="hidden"
          />
        </label>
        
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete your save? This cannot be undone!')) {
              localStorage.removeItem('potato_land_save');
              window.location.reload();
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <Trash2 size={16} />
          Delete Save
        </button>
      </div>
    </div>
  );
}
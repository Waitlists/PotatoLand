import React from 'react';
import { GameState } from '../types/game';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Q';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toLocaleString();
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const expToNext = gameState.level * 1000 - gameState.experience;
  const expProgress = (gameState.experience / (gameState.level * 1000)) * 100;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Potatoes</p>
            <p className="text-lg font-bold text-gray-900">
              {formatNumber(gameState.potatoes)}
            </p>
          </div>
          <div className="text-xl">🥔</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Per Second</p>
            <p className="text-lg font-bold text-gray-900">
              {formatNumber(gameState.potatoesPerSecond)}
            </p>
          </div>
          <div className="text-xl">⚡</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Click Power</p>
            <p className="text-lg font-bold text-gray-900">
              {formatNumber(gameState.clickPower * gameState.prestigeBonus * gameState.multiplier)}
            </p>
          </div>
          <div className="text-xl">💪</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Level</p>
            <p className="text-lg font-bold text-blue-600">
              {gameState.level}
            </p>
          </div>
          <div className="text-xl">🎯</div>
        </div>
        <div className="mt-1">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${expProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {formatNumber(expToNext)} to next
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Special</p>
            <div className="flex gap-1 text-sm font-bold">
              <span className="text-yellow-600">{gameState.goldenPotatoes}</span>
              <span className="text-blue-600">{gameState.diamondPotatoes}</span>
              <span className="text-purple-600">{gameState.rainbowPotatoes}</span>
            </div>
          </div>
          <div className="text-xl">✨</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Playtime</p>
            <p className="text-sm font-bold text-gray-900">
              {formatTime(gameState.playtime)}
            </p>
          </div>
          <div className="text-xl">⏰</div>
        </div>
      </div>

      {gameState.prestige > 0 && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-medium text-purple-100">Prestige</p>
              <p className="text-lg font-bold">
                {gameState.prestige} ({(gameState.prestigeBonus * 100 - 100).toFixed(0)}%)
              </p>
            </div>
            <div className="text-xl">👑</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Critical</p>
            <p className="text-sm font-bold text-red-600">
              {(gameState.criticalChance * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">
              {gameState.criticalMultiplier.toFixed(1)}x
            </p>
          </div>
          <div className="text-xl">💥</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Research</p>
            <p className="text-lg font-bold text-indigo-600">
              {gameState.researchPoints}
            </p>
          </div>
          <div className="text-xl">🔬</div>
        </div>
      </div>
    </div>
  );
}
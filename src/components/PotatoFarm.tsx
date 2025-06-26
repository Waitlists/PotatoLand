import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface PotatoFarmProps {
  gameState: GameState;
  onClickPotato: () => { totalGain: number; isCritical: boolean; specialType: string };
  onPrestige: () => void;
}

export function PotatoFarm({ gameState, onClickPotato, onPrestige }: PotatoFarmProps) {
  const [clickAnimation, setClickAnimation] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number; 
    x: number; 
    y: number; 
    value: number; 
    isCritical: boolean;
    specialType: string;
  }>>([]);

  const handlePotatoClick = (e: React.MouseEvent) => {
    const result = onClickPotato();
    setClickAnimation(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = { 
      id: Date.now(), 
      x, 
      y, 
      value: result.totalGain,
      isCritical: result.isCritical,
      specialType: result.specialType
    };
    setParticles(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);
    
    setTimeout(() => setClickAnimation(false), 150);
  };

  const canPrestige = gameState.totalPotatoes >= 1000000;
  const prestigeGain = Math.floor(gameState.totalPotatoes / 1000000);

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return Math.floor(num).toLocaleString();
  };

  return (
    <div className="text-center">
      <div className="relative inline-block mb-6">
        <button
          onClick={handlePotatoClick}
          className={`relative w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border-4 border-white ${
            clickAnimation ? 'scale-110' : ''
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl drop-shadow-lg">🥔</span>
          </div>
          
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`absolute pointer-events-none animate-bounce ${
                particle.specialType === 'rainbow' ? 'text-purple-600' :
                particle.specialType === 'diamond' ? 'text-blue-600' :
                particle.specialType === 'golden' ? 'text-yellow-600' :
                particle.isCritical ? 'text-red-600' : 'text-green-600'
              }`}
              style={{
                left: particle.x,
                top: particle.y,
                transform: 'translate(-50%, -50%)',
                fontSize: particle.isCritical || particle.specialType ? '18px' : '14px',
                fontWeight: 'bold'
              }}
            >
              +{formatNumber(particle.value)}
              {particle.specialType === 'rainbow' && '🌈'}
              {particle.specialType === 'diamond' && '💎'}
              {particle.specialType === 'golden' && '✨'}
              {particle.isCritical && !particle.specialType && '💥'}
            </div>
          ))}
        </button>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-200">
            <p className="text-xs font-semibold text-gray-700">
              +{formatNumber(gameState.clickPower * gameState.prestigeBonus * gameState.multiplier)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            📊 Farm Stats
          </h3>
          <div className="space-y-2 text-left text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Harvested:</span>
              <span className="font-semibold">{formatNumber(gameState.totalPotatoes)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Clicks:</span>
              <span className="font-semibold">{gameState.totalClicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Auto Production:</span>
              <span className="font-semibold">{formatNumber(gameState.potatoesPerSecond)}/sec</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            ✨ Special Potatoes
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-yellow-600 font-medium">🏆 Golden:</span>
              <span className="font-bold">{gameState.goldenPotatoes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">💎 Diamond:</span>
              <span className="font-bold">{gameState.diamondPotatoes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-600 font-medium">🌈 Rainbow:</span>
              <span className="font-bold">{gameState.rainbowPotatoes}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            🎯 Efficiency
          </h3>
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {((gameState.potatoesPerSecond / Math.max(gameState.clickPower, 1)) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Automation</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (gameState.potatoesPerSecond / 100) * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 text-center">
              Multiplier: {gameState.multiplier.toFixed(2)}x
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 shadow-sm text-white">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            👑 Prestige
          </h3>
          {canPrestige ? (
            <div className="space-y-2">
              <p className="text-xs text-purple-100">
                Reset for permanent bonuses!
              </p>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-300">
                  +{prestigeGain}
                </div>
                <div className="text-xs text-purple-200">
                  +{(prestigeGain * 10).toFixed(0)}% bonus
                </div>
              </div>
              <button
                onClick={onPrestige}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
              >
                Prestige!
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-purple-200 mb-2">
                Need 1M total potatoes
              </p>
              <div className="w-full bg-purple-400 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (gameState.totalPotatoes / 1000000) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-purple-300 mt-1">
                {(gameState.totalPotatoes / 1000000 * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {gameState.autoClickerLevel > 0 && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            🤖 Auto-Clicker Level {gameState.autoClickerLevel} is active!
          </p>
        </div>
      )}
    </div>
  );
}
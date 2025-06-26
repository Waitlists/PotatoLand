import React, { useState } from 'react';
import { Upgrade } from '../types/game';

interface UpgradeShopProps {
  upgrades: Upgrade[];
  potatoes: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export function UpgradeShop({ upgrades, potatoes, onBuyUpgrade }: UpgradeShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', 'click', 'auto', 'multiplier', 'critical', 'special'];
  const categoryNames = {
    all: 'All',
    click: 'Click',
    auto: 'Auto',
    multiplier: 'Multi',
    critical: 'Crit',
    special: 'Special'
  };

  const filteredUpgrades = selectedCategory === 'all' 
    ? upgrades 
    : upgrades.filter(u => u.type === selectedCategory);

  const formatNumber = (num: number): string => {
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Q';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toLocaleString();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {categoryNames[category as keyof typeof categoryNames]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredUpgrades.map(upgrade => {
          const canAfford = potatoes >= upgrade.cost;
          const isMaxed = upgrade.maxOwned && upgrade.owned >= upgrade.maxOwned;
          
          return (
            <div
              key={upgrade.id}
              className={`bg-white rounded-lg p-3 shadow-sm border transition-all duration-200 ${
                canAfford && !isMaxed
                  ? 'border-green-400 hover:border-green-500 hover:shadow-md hover:scale-102'
                  : isMaxed
                  ? 'border-yellow-400'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{upgrade.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{upgrade.name}</h3>
                    <p className="text-xs text-gray-500">{upgrade.category}</p>
                  </div>
                </div>
                {upgrade.owned > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {upgrade.owned}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-gray-700 mb-3 line-clamp-2">{upgrade.description}</p>
              
              <div className="space-y-1 mb-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Effect:</span>
                  <span className="font-semibold">
                    +{upgrade.type === 'critical' ? (upgrade.effect * 100).toFixed(1) + '%' : upgrade.effect}
                  </span>
                </div>
                {upgrade.owned > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold text-green-600">
                      +{upgrade.type === 'critical' ? (upgrade.effect * upgrade.owned * 100).toFixed(1) + '%' : upgrade.effect * upgrade.owned}
                    </span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => onBuyUpgrade(upgrade.id)}
                disabled={!canAfford || isMaxed}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isMaxed
                    ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
                    : canAfford
                    ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-md active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isMaxed 
                  ? 'MAXED' 
                  : `${formatNumber(upgrade.cost)} 🥔`
                }
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
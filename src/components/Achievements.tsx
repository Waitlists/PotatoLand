import React from 'react';
import { Achievement } from '../types/game';

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getRequirementText = (achievement: Achievement): string => {
    const req = formatNumber(achievement.requirement);
    switch (achievement.type) {
      case 'potatoes': return `${req} potatoes`;
      case 'clicks': return `${req} clicks`;
      case 'upgrades': return `${req} upgrades`;
      case 'golden': return `${req} golden potatoes`;
      case 'level': return `Level ${req}`;
      case 'playtime': return `${Math.floor(achievement.requirement / 3600)}h playtime`;
      case 'prestige': return `${req} prestige`;
      default: return `${req}`;
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Achievement Progress</h2>
          <span className="text-sm font-semibold text-green-600">
            {unlockedCount}/{achievements.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-600 text-center">
          {progressPercentage.toFixed(1)}% Complete
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`rounded-lg p-3 shadow-sm border transition-all duration-200 ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-300 text-white'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </span>
                <div>
                  <h3 className={`font-bold text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-800'}`}>
                    {achievement.name}
                  </h3>
                  {achievement.unlocked && (
                    <span className="text-yellow-100 text-xs font-medium">
                      UNLOCKED
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p className={`text-xs mb-2 ${achievement.unlocked ? 'text-yellow-100' : 'text-gray-700'}`}>
              {achievement.description}
            </p>
            
            <div className={`text-xs font-medium ${achievement.unlocked ? 'text-yellow-200' : 'text-gray-500'}`}>
              {getRequirementText(achievement)}
            </div>
            
            {achievement.reward && achievement.unlocked && (
              <div className="mt-2 pt-2 border-t border-yellow-300">
                <p className="text-xs text-yellow-100">
                  Reward: +{achievement.reward.value} {achievement.reward.type}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
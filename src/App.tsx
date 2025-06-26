import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameStats } from './components/GameStats';
import { PotatoFarm } from './components/PotatoFarm';
import { UpgradeShop } from './components/UpgradeShop';
import { Achievements } from './components/Achievements';
import { SaveManager } from './components/SaveManager';
import { Settings } from './components/Settings';
import { AchievementNotification } from './components/AchievementNotification';
import { GameState, Achievement, Upgrade } from './types/game';
import { INITIAL_UPGRADES, ACHIEVEMENTS } from './data/gameData';
import { saveGame, loadGame } from './utils/gameStorage';
import { SoundManager } from './utils/soundManager';
import { showAchievementToast } from './utils/notifications';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGame();
    return saved || {
      potatoes: 0,
      totalPotatoes: 0,
      potatoesPerSecond: 0,
      clickPower: 1,
      goldenPotatoes: 0,
      diamondPotatoes: 0,
      rainbowPotatoes: 0,
      prestige: 0,
      prestigeBonus: 1,
      achievements: [],
      lastSave: Date.now(),
      totalClicks: 0,
      playtime: 0,
      level: 1,
      experience: 0,
      multiplier: 1,
      criticalChance: 0.05,
      criticalMultiplier: 2,
      autoClickerLevel: 0,
      farmSize: 1,
      weatherBonus: 1,
      seasonBonus: 1,
      researchPoints: 0,
      unlockedFeatures: ['basic_clicking']
    };
  });

  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [activeTab, setActiveTab] = useState<'farm' | 'upgrades' | 'achievements' | 'research' | 'settings'>('farm');
  const [soundManager] = useState(() => new SoundManager());
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    volume: 0.7,
    notifications: true
  });

  // Initialize sound manager
  useEffect(() => {
    soundManager.setVolume(settings.volume);
    soundManager.setSoundEnabled(settings.soundEnabled);
    soundManager.setMusicEnabled(settings.musicEnabled);
    
    if (settings.musicEnabled) {
      soundManager.playBackgroundMusic();
    }
  }, [soundManager, settings]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame(gameState);
    }, 10000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Playtime tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        playtime: prev.playtime + 1
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Passive potato generation
  useEffect(() => {
    if (gameState.potatoesPerSecond <= 0) return;
    
    const interval = setInterval(() => {
      const baseProduction = gameState.potatoesPerSecond / 10;
      const bonusProduction = baseProduction * gameState.weatherBonus * gameState.seasonBonus * gameState.multiplier;
      
      setGameState(prev => ({
        ...prev,
        potatoes: prev.potatoes + bonusProduction,
        totalPotatoes: prev.totalPotatoes + bonusProduction,
        experience: prev.experience + bonusProduction * 0.1
      }));
    }, 100);
    
    return () => clearInterval(interval);
  }, [gameState.potatoesPerSecond, gameState.weatherBonus, gameState.seasonBonus, gameState.multiplier]);

  // Level up system
  useEffect(() => {
    const requiredExp = gameState.level * 1000;
    if (gameState.experience >= requiredExp) {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience - requiredExp,
        researchPoints: prev.researchPoints + prev.level,
        clickPower: prev.clickPower + Math.floor(prev.level / 5)
      }));
      soundManager.playLevelUp();
      showAchievementToast(`Level Up! You are now level ${gameState.level + 1}!`, '🎉');
    }
  }, [gameState.experience, gameState.level, soundManager]);

  // Auto-clicker
  useEffect(() => {
    if (gameState.autoClickerLevel <= 0) return;
    
    const interval = setInterval(() => {
      clickPotato(false);
    }, Math.max(100, 1000 - gameState.autoClickerLevel * 50));
    
    return () => clearInterval(interval);
  }, [gameState.autoClickerLevel]);

  // Check achievements
  useEffect(() => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;
      
      let isUnlocked = false;
      switch (achievement.type) {
        case 'potatoes':
          isUnlocked = gameState.totalPotatoes >= achievement.requirement;
          break;
        case 'clicks':
          isUnlocked = gameState.totalClicks >= achievement.requirement;
          break;
        case 'upgrades':
          isUnlocked = upgrades.filter(u => u.owned > 0).length >= achievement.requirement;
          break;
        case 'golden':
          isUnlocked = gameState.goldenPotatoes >= achievement.requirement;
          break;
        case 'level':
          isUnlocked = gameState.level >= achievement.requirement;
          break;
        case 'playtime':
          isUnlocked = gameState.playtime >= achievement.requirement;
          break;
      }
      
      if (isUnlocked && !gameState.achievements.includes(achievement.id)) {
        setGameState(prev => ({
          ...prev,
          achievements: [...prev.achievements, achievement.id]
        }));
        
        soundManager.playAchievement();
        showAchievementToast(achievement.name, achievement.icon);
        
        // Apply achievement rewards
        if (achievement.reward) {
          setGameState(prev => ({
            ...prev,
            clickPower: achievement.reward?.type === 'clickPower' ? prev.clickPower + achievement.reward.value : prev.clickPower,
            multiplier: achievement.reward?.type === 'multiplier' ? prev.multiplier + achievement.reward.value : prev.multiplier,
            criticalChance: achievement.reward?.type === 'criticalChance' ? prev.criticalChance + achievement.reward.value : prev.criticalChance
          }));
        }
      }
      
      return { ...achievement, unlocked: isUnlocked };
    }));
  }, [gameState.totalPotatoes, gameState.totalClicks, gameState.goldenPotatoes, gameState.level, gameState.playtime, upgrades, gameState.achievements, soundManager]);

  const clickPotato = useCallback((playSound = true) => {
    const isCritical = Math.random() < gameState.criticalChance;
    const baseGain = gameState.clickPower * gameState.prestigeBonus * gameState.multiplier;
    const criticalGain = isCritical ? baseGain * gameState.criticalMultiplier : baseGain;
    
    const isGolden = Math.random() < 0.001;
    const isDiamond = Math.random() < 0.0001;
    const isRainbow = Math.random() < 0.00001;
    
    let bonusGain = 0;
    let specialType = '';
    
    if (isRainbow) {
      bonusGain = criticalGain * 1000;
      specialType = 'rainbow';
    } else if (isDiamond) {
      bonusGain = criticalGain * 100;
      specialType = 'diamond';
    } else if (isGolden) {
      bonusGain = criticalGain * 10;
      specialType = 'golden';
    }
    
    const totalGain = criticalGain + bonusGain;
    
    setGameState(prev => ({
      ...prev,
      potatoes: prev.potatoes + totalGain,
      totalPotatoes: prev.totalPotatoes + totalGain,
      totalClicks: prev.totalClicks + 1,
      experience: prev.experience + totalGain * 0.1,
      goldenPotatoes: prev.goldenPotatoes + (isGolden ? 1 : 0),
      diamondPotatoes: prev.diamondPotatoes + (isDiamond ? 1 : 0),
      rainbowPotatoes: prev.rainbowPotatoes + (isRainbow ? 1 : 0)
    }));
    
    if (playSound) {
      if (isRainbow) soundManager.playRainbowPotato();
      else if (isDiamond) soundManager.playDiamondPotato();
      else if (isGolden) soundManager.playGoldenPotato();
      else if (isCritical) soundManager.playCriticalClick();
      else soundManager.playClick();
    }
    
    return { totalGain, isCritical, specialType };
  }, [gameState.clickPower, gameState.prestigeBonus, gameState.multiplier, gameState.criticalChance, gameState.criticalMultiplier, soundManager]);

  const buyUpgrade = useCallback((upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || gameState.potatoes < upgrade.cost) return;

    soundManager.playPurchase();

    setGameState(prev => ({
      ...prev,
      potatoes: prev.potatoes - upgrade.cost,
      clickPower: upgrade.type === 'click' ? prev.clickPower + upgrade.effect : prev.clickPower,
      potatoesPerSecond: upgrade.type === 'auto' ? prev.potatoesPerSecond + upgrade.effect : prev.potatoesPerSecond,
      criticalChance: upgrade.type === 'critical' ? prev.criticalChance + upgrade.effect : prev.criticalChance,
      multiplier: upgrade.type === 'multiplier' ? prev.multiplier + upgrade.effect : prev.multiplier,
      autoClickerLevel: upgrade.id === 'auto_clicker' ? prev.autoClickerLevel + 1 : prev.autoClickerLevel,
      farmSize: upgrade.type === 'farm' ? prev.farmSize + upgrade.effect : prev.farmSize
    }));

    setUpgrades(prev => prev.map(u => 
      u.id === upgradeId 
        ? { ...u, owned: u.owned + 1, cost: Math.floor(u.cost * u.costMultiplier) }
        : u
    ));
  }, [upgrades, gameState.potatoes, soundManager]);

  const prestigeReset = useCallback(() => {
    if (gameState.totalPotatoes < 1000000) return;
    
    const prestigeGain = Math.floor(gameState.totalPotatoes / 1000000);
    
    soundManager.playPrestige();
    
    setGameState({
      potatoes: 0,
      totalPotatoes: 0,
      potatoesPerSecond: 0,
      clickPower: 1,
      goldenPotatoes: 0,
      diamondPotatoes: 0,
      rainbowPotatoes: 0,
      prestige: gameState.prestige + prestigeGain,
      prestigeBonus: gameState.prestigeBonus + prestigeGain * 0.1,
      achievements: gameState.achievements,
      lastSave: Date.now(),
      totalClicks: gameState.totalClicks,
      playtime: gameState.playtime,
      level: Math.max(1, Math.floor(gameState.level / 2)),
      experience: 0,
      multiplier: 1 + prestigeGain * 0.05,
      criticalChance: 0.05 + prestigeGain * 0.01,
      criticalMultiplier: 2 + prestigeGain * 0.1,
      autoClickerLevel: 0,
      farmSize: 1,
      weatherBonus: 1,
      seasonBonus: 1,
      researchPoints: gameState.researchPoints + prestigeGain * 10,
      unlockedFeatures: gameState.unlockedFeatures
    });
    
    setUpgrades(INITIAL_UPGRADES);
  }, [gameState, soundManager]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" />
      <AchievementNotification />
      
      <div className="container mx-auto px-3 py-4 max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
            🥔 Potato Land
          </h1>
          <p className="text-sm text-gray-600">
            Advanced Potato Farming Simulator
          </p>
        </header>

        <GameStats gameState={gameState} />

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { id: 'farm', label: 'Farm', icon: '🚜' },
            { id: 'upgrades', label: 'Shop', icon: '🛒' },
            { id: 'achievements', label: 'Goals', icon: '🏆' },
            { id: 'research', label: 'Research', icon: '🔬' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'farm' && (
            <PotatoFarm 
              gameState={gameState} 
              onClickPotato={clickPotato}
              onPrestige={prestigeReset}
            />
          )}
          {activeTab === 'upgrades' && (
            <UpgradeShop 
              upgrades={upgrades}
              potatoes={gameState.potatoes}
              onBuyUpgrade={buyUpgrade}
            />
          )}
          {activeTab === 'achievements' && (
            <Achievements achievements={achievements} />
          )}
          {activeTab === 'research' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔬 Research Lab</h2>
              <p className="text-gray-600 mb-4">Research Points: {gameState.researchPoints}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Advanced Genetics</h3>
                  <p className="text-sm text-gray-600">Unlock new potato varieties</p>
                  <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Research (100 RP)
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800">Automation Tech</h3>
                  <p className="text-sm text-gray-600">Improve auto-farming efficiency</p>
                  <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Research (250 RP)
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <Settings 
              settings={settings}
              onSettingsChange={setSettings}
              gameState={gameState}
              onSaveGame={() => saveGame(gameState)}
              onLoadGame={(newState) => setGameState(newState)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
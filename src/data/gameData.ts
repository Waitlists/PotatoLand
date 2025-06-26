import { Upgrade, Achievement } from '../types/game';

export const INITIAL_UPGRADES: Upgrade[] = [
  // Click Power Upgrades
  {
    id: 'better_shovel',
    name: 'Better Shovel',
    description: 'A sharper shovel for more efficient digging',
    cost: 15,
    costMultiplier: 1.15,
    effect: 1,
    type: 'click',
    category: 'Tools',
    icon: '⛏️',
    owned: 0
  },
  {
    id: 'steel_shovel',
    name: 'Steel Shovel',
    description: 'Industrial grade digging power',
    cost: 100,
    costMultiplier: 1.15,
    effect: 5,
    type: 'click',
    category: 'Tools',
    icon: '🔨',
    owned: 0
  },
  {
    id: 'power_drill',
    name: 'Power Drill',
    description: 'Mechanized potato harvesting',
    cost: 1000,
    costMultiplier: 1.15,
    effect: 25,
    type: 'click',
    category: 'Tools',
    icon: '🔩',
    owned: 0
  },
  {
    id: 'laser_harvester',
    name: 'Laser Harvester',
    description: 'Space-age potato extraction technology',
    cost: 50000,
    costMultiplier: 1.15,
    effect: 200,
    type: 'click',
    category: 'Tools',
    icon: '⚡',
    owned: 0
  },
  {
    id: 'quantum_digger',
    name: 'Quantum Digger',
    description: 'Harvests potatoes from parallel dimensions',
    cost: 1000000,
    costMultiplier: 1.2,
    effect: 2000,
    type: 'click',
    category: 'Futuristic',
    icon: '🌌',
    owned: 0
  },
  
  // Auto Farmers
  {
    id: 'farm_hand',
    name: 'Farm Hand',
    description: 'A helpful worker to dig potatoes automatically',
    cost: 100,
    costMultiplier: 1.15,
    effect: 1,
    type: 'auto',
    category: 'Workers',
    icon: '👨‍🌾',
    owned: 0
  },
  {
    id: 'potato_dog',
    name: 'Potato Dog',
    description: 'Trained to sniff out the best potatoes',
    cost: 500,
    costMultiplier: 1.15,
    effect: 5,
    type: 'auto',
    category: 'Workers',
    icon: '🐕',
    owned: 0
  },
  {
    id: 'tractor',
    name: 'Tractor',
    description: 'Heavy machinery for serious potato farming',
    cost: 2000,
    costMultiplier: 1.15,
    effect: 20,
    type: 'auto',
    category: 'Machines',
    icon: '🚜',
    owned: 0
  },
  {
    id: 'potato_factory',
    name: 'Processing Plant',
    description: 'Industrial scale potato production',
    cost: 15000,
    costMultiplier: 1.15,
    effect: 100,
    type: 'auto',
    category: 'Machines',
    icon: '🏭',
    owned: 0
  },
  {
    id: 'robot_farmer',
    name: 'Robot Farmers',
    description: 'AI-powered 24/7 potato harvesting',
    cost: 100000,
    costMultiplier: 1.15,
    effect: 500,
    type: 'auto',
    category: 'Machines',
    icon: '🤖',
    owned: 0
  },
  {
    id: 'satellite_farm',
    name: 'Orbital Farm',
    description: 'Zero-gravity potato cultivation in space',
    cost: 1000000,
    costMultiplier: 1.15,
    effect: 2500,
    type: 'auto',
    category: 'Futuristic',
    icon: '🛰️',
    owned: 0
  },
  {
    id: 'time_farm',
    name: 'Time Farm',
    description: 'Harvests potatoes from the past and future',
    cost: 50000000,
    costMultiplier: 1.2,
    effect: 15000,
    type: 'auto',
    category: 'Futuristic',
    icon: '⏰',
    owned: 0
  },
  
  // Critical Hit Upgrades
  {
    id: 'lucky_charm',
    name: 'Lucky Charm',
    description: 'Increases critical hit chance',
    cost: 5000,
    costMultiplier: 2.0,
    effect: 0.02,
    type: 'critical',
    category: 'Luck',
    icon: '🍀',
    owned: 0,
    maxOwned: 10
  },
  {
    id: 'precision_tools',
    name: 'Precision Tools',
    description: 'Better tools for more critical hits',
    cost: 25000,
    costMultiplier: 2.5,
    effect: 0.05,
    type: 'critical',
    category: 'Tools',
    icon: '🎯',
    owned: 0,
    maxOwned: 5
  },
  
  // Multiplier Upgrades
  {
    id: 'golden_seeds',
    name: 'Golden Seeds',
    description: 'Rare seeds that boost all production',
    cost: 10000,
    costMultiplier: 2.0,
    effect: 0.1,
    type: 'multiplier',
    category: 'Special',
    icon: '✨',
    owned: 0,
    maxOwned: 10
  },
  {
    id: 'fertilizer',
    name: 'Super Fertilizer',
    description: 'Boosts all potato production significantly',
    cost: 50000,
    costMultiplier: 2.5,
    effect: 0.25,
    type: 'multiplier',
    category: 'Special',
    icon: '🌱',
    owned: 0,
    maxOwned: 5
  },
  {
    id: 'weather_control',
    name: 'Weather Control',
    description: 'Perfect growing conditions all year',
    cost: 500000,
    costMultiplier: 3.0,
    effect: 0.5,
    type: 'multiplier',
    category: 'Special',
    icon: '🌤️',
    owned: 0,
    maxOwned: 1
  },
  
  // Special Upgrades
  {
    id: 'auto_clicker',
    name: 'Auto Clicker',
    description: 'Automatically clicks the potato for you',
    cost: 100000,
    costMultiplier: 3.0,
    effect: 1,
    type: 'special',
    category: 'Automation',
    icon: '🖱️',
    owned: 0,
    maxOwned: 10
  },
  {
    id: 'farm_expansion',
    name: 'Farm Expansion',
    description: 'Increases farm size and capacity',
    cost: 250000,
    costMultiplier: 2.0,
    effect: 1,
    type: 'farm',
    category: 'Infrastructure',
    icon: '🏞️',
    owned: 0,
    maxOwned: 20
  },
  {
    id: 'potato_university',
    name: 'Potato University',
    description: 'Research facility for advanced potato science',
    cost: 1000000,
    costMultiplier: 5.0,
    effect: 100,
    type: 'special',
    category: 'Research',
    icon: '🎓',
    owned: 0,
    maxOwned: 1
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  // Potato Milestones
  {
    id: 'first_potato',
    name: 'First Harvest',
    description: 'Dig your very first potato',
    requirement: 1,
    type: 'potatoes',
    icon: '🌱',
    unlocked: false,
    reward: { type: 'clickPower', value: 1 }
  },
  {
    id: 'hundred_potatoes',
    name: 'Small Farm',
    description: 'Harvest 100 potatoes',
    requirement: 100,
    type: 'potatoes',
    icon: '🏡',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.1 }
  },
  {
    id: 'thousand_potatoes',
    name: 'Growing Business',
    description: 'Harvest 1,000 potatoes',
    requirement: 1000,
    type: 'potatoes',
    icon: '📈',
    unlocked: false,
    reward: { type: 'clickPower', value: 5 }
  },
  {
    id: 'ten_thousand_potatoes',
    name: 'Potato Magnate',
    description: 'Harvest 10,000 potatoes',
    requirement: 10000,
    type: 'potatoes',
    icon: '💰',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.2 }
  },
  {
    id: 'hundred_thousand_potatoes',
    name: 'Potato Empire',
    description: 'Harvest 100,000 potatoes',
    requirement: 100000,
    type: 'potatoes',
    icon: '🏰',
    unlocked: false,
    reward: { type: 'criticalChance', value: 0.05 }
  },
  {
    id: 'million_potatoes',
    name: 'Potato Millionaire',
    description: 'Harvest 1,000,000 potatoes',
    requirement: 1000000,
    type: 'potatoes',
    icon: '👑',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.5 }
  },
  {
    id: 'billion_potatoes',
    name: 'Potato Billionaire',
    description: 'Harvest 1,000,000,000 potatoes',
    requirement: 1000000000,
    type: 'potatoes',
    icon: '💎',
    unlocked: false,
    reward: { type: 'multiplier', value: 1.0 }
  },
  
  // Click Achievements
  {
    id: 'hundred_clicks',
    name: 'Clicking Novice',
    description: 'Click the potato 100 times',
    requirement: 100,
    type: 'clicks',
    icon: '👆',
    unlocked: false,
    reward: { type: 'clickPower', value: 2 }
  },
  {
    id: 'thousand_clicks',
    name: 'Click Master',
    description: 'Click the potato 1,000 times',
    requirement: 1000,
    type: 'clicks',
    icon: '⚡',
    unlocked: false,
    reward: { type: 'criticalChance', value: 0.02 }
  },
  {
    id: 'ten_thousand_clicks',
    name: 'Click Legend',
    description: 'Click the potato 10,000 times',
    requirement: 10000,
    type: 'clicks',
    icon: '🔥',
    unlocked: false,
    reward: { type: 'clickPower', value: 25 }
  },
  
  // Upgrade Achievements
  {
    id: 'first_upgrade',
    name: 'Getting Better',
    description: 'Purchase your first upgrade',
    requirement: 1,
    type: 'upgrades',
    icon: '⬆️',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.05 }
  },
  {
    id: 'five_upgrades',
    name: 'Tool Collector',
    description: 'Own 5 different upgrades',
    requirement: 5,
    type: 'upgrades',
    icon: '🛠️',
    unlocked: false,
    reward: { type: 'clickPower', value: 10 }
  },
  {
    id: 'ten_upgrades',
    name: 'Master Farmer',
    description: 'Own 10 different upgrades',
    requirement: 10,
    type: 'upgrades',
    icon: '🎖️',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.3 }
  },
  {
    id: 'twenty_upgrades',
    name: 'Upgrade Addict',
    description: 'Own 20 different upgrades',
    requirement: 20,
    type: 'upgrades',
    icon: '🏆',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.5 }
  },
  
  // Golden Potato Achievements
  {
    id: 'first_golden',
    name: 'Golden Discovery',
    description: 'Find your first golden potato',
    requirement: 1,
    type: 'golden',
    icon: '🏆',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.1 }
  },
  {
    id: 'ten_golden',
    name: 'Golden Collector',
    description: 'Find 10 golden potatoes',
    requirement: 10,
    type: 'golden',
    icon: '✨',
    unlocked: false,
    reward: { type: 'criticalChance', value: 0.03 }
  },
  {
    id: 'hundred_golden',
    name: 'Golden Master',
    description: 'Find 100 golden potatoes',
    requirement: 100,
    type: 'golden',
    icon: '👑',
    unlocked: false,
    reward: { type: 'multiplier', value: 1.0 }
  },
  
  // Level Achievements
  {
    id: 'level_10',
    name: 'Experienced Farmer',
    description: 'Reach level 10',
    requirement: 10,
    type: 'level',
    icon: '🎯',
    unlocked: false,
    reward: { type: 'researchPoints', value: 50 }
  },
  {
    id: 'level_25',
    name: 'Veteran Farmer',
    description: 'Reach level 25',
    requirement: 25,
    type: 'level',
    icon: '🏅',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.5 }
  },
  {
    id: 'level_50',
    name: 'Legendary Farmer',
    description: 'Reach level 50',
    requirement: 50,
    type: 'level',
    icon: '⭐',
    unlocked: false,
    reward: { type: 'multiplier', value: 1.0 }
  },
  
  // Playtime Achievements
  {
    id: 'one_hour',
    name: 'Dedicated Farmer',
    description: 'Play for 1 hour',
    requirement: 3600,
    type: 'playtime',
    icon: '⏰',
    unlocked: false,
    reward: { type: 'clickPower', value: 10 }
  },
  {
    id: 'ten_hours',
    name: 'Potato Enthusiast',
    description: 'Play for 10 hours',
    requirement: 36000,
    type: 'playtime',
    icon: '🕐',
    unlocked: false,
    reward: { type: 'multiplier', value: 0.5 }
  },
  {
    id: 'hundred_hours',
    name: 'Potato Addict',
    description: 'Play for 100 hours',
    requirement: 360000,
    type: 'playtime',
    icon: '🏆',
    unlocked: false,
    reward: { type: 'multiplier', value: 2.0 }
  }
];
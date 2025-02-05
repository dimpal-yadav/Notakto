import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameStats, DifficultyLevel } from './types';

const STATS_KEY = '@NotaktoStats';

export const loadStats = async (): Promise<GameStats> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STATS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : {
      totalGames: 0,
      totalWins: 0,
      totalLosses: 0,
      difficultyStats: {}
    };
  } catch (e) {
    console.error('Failed to load stats', e);
    return getDefaultStats();
  }
};

export const saveStats = async (stats: GameStats) => {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

export const updateStats = async (
  isWin: boolean, 
  difficulty?: DifficultyLevel
) => {
  const stats = await loadStats();
  
  stats.totalGames++;
  if (isWin) {
    stats.totalWins++;
  } else {
    stats.totalLosses++;
  }

  if (difficulty) {
    if (!stats.difficultyStats[difficulty]) {
      stats.difficultyStats[difficulty] = { wins: 0, losses: 0 };
    }
    if (isWin) {
      stats.difficultyStats[difficulty].wins++;
    } else {
      stats.difficultyStats[difficulty].losses++;
    }
  }

  await saveStats(stats);
  return stats;
};

export const resetStats = async () => {
  const defaultStats = getDefaultStats();
  await saveStats(defaultStats);
  return defaultStats;
};

export const getDefaultStats = (): GameStats => ({
  totalGames: 0,
  totalWins: 0,
  totalLosses: 0,
  difficultyStats: {}
});
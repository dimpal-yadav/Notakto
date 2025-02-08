import AsyncStorage from '@react-native-async-storage/async-storage';
import { BoardSize, DifficultyLevel } from './types';

const COINS_KEY = '@GameCoins';
const XP_KEY = '@GameExperience';

export const loadEconomy = async () => {
  try {
    const coins = await AsyncStorage.getItem(COINS_KEY) || '1000';
    const xp = await AsyncStorage.getItem(XP_KEY) || '0';
    return {
      coins: parseInt(coins),
      experience: parseInt(xp)
    };
  } catch (e) {
    return { coins: 1000, experience: 0 };
  }
};

export const saveEconomy = async (coins: number, experience: number) => {
  try {
    await AsyncStorage.multiSet([
      [COINS_KEY, coins.toString()],
      [XP_KEY, experience.toString()]
    ]);
  } catch (e) {
    console.error('Failed to save economy data', e);
  }
};

export const calculateRewards = (
  isWin: boolean,
  difficulty: DifficultyLevel,
  numberOfBoards: number,
  boardSize: BoardSize
) => {
  const baseMultiplier = difficulty * numberOfBoards * boardSize;
  
  return {
    coins: isWin ? baseMultiplier * 10 : 0,
    xp: isWin ? baseMultiplier * 100 : baseMultiplier * 30
  };
};
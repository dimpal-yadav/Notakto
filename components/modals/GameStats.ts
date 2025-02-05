//redundnt file since difficulty importing type.ts in gamestats.tsx

export type GameStats = {
    totalGames: number;
    totalWins: number;
    totalLosses: number;
    difficultyStats: {
      [key: number]: {
        wins: number;
        losses: number;
      };
    };
  };
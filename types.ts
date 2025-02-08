// types.ts
export type BoardState = Array<string>; // Represents a single 3x3 board
export type GameMode = 'vsComputer' | 'vsPlayer' | null;

// Extended type definitions for full type safety
export type Player = {
  name: string;
  isComputer?: boolean;
};

export type GameHistory = Array<BoardState[]>; // For undo/redo functionality

export type Move = {
  boardIndex: number;
  cellIndex: number;
};

// Type guard for computer moves
export function isComputerMove(move: any): move is Move {
  return (
    typeof move === 'object' &&
    'boardIndex' in move &&
    'cellIndex' in move
  );
}

// Modal types
export type ModalConfig = {
  visible: boolean;
  title?: string;
  message?: string;
};

// Game status types
export type GameStatus = 
  | 'in_progress'
  | 'player1_wins'
  | 'player2_wins'
  | 'draw';

// Redux-like action types (if needed)
export type GameAction =
  | { type: 'MAKE_MOVE'; payload: Move }
  | { type: 'UNDO_MOVE' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_PLAYERS'; payload: Player[] };

// Optional configuration types
export type GameConfig = {
  numberOfBoards: number;
  allowDiagonalWins: boolean;
  computerMoveDelay: number;
};

export type BoardConfigModalProps = {
  visible: boolean;
  currentBoards: number;
  onConfirm: (num: number) => void;
  onCancel: () => void;
};

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type BoardSize = 2 | 3 | 4 | 5;

export type GameStats = {
  coins: number;
  experience: number;
};
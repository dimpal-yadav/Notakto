import type { BoardState, DifficultyLevel, BoardSize } from './types';

const MAX_DEPTH = 4;

const getWinPatterns = (size: number) => {
  const patterns = [];
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({ length: size }, (_, j) => i * size + j));
  }
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({ length: size }, (_, j) => i + j * size));
  }
  patterns.push(Array.from({ length: size }, (_, i) => i * (size + 1)));
  patterns.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1)));
  return patterns;
};

const isBoardDead = (board: BoardState, boardSize: number) => {
  return getWinPatterns(boardSize).some(pattern => pattern.every(i => board[i] === 'X'));
};

const heuristic = (boards: BoardState[], boardSize: number) => {
  let score = 0;
  const patterns = getWinPatterns(boardSize);
  boards.forEach(board => {
    if (!isBoardDead(board, boardSize)) {
      patterns.forEach(pattern => {
        const count = pattern.reduce((s, i) => s + (board[i] === 'X' ? 1 : 0), 0);
        if (count === boardSize - 1) score -= 10;
        else if (count === boardSize - 2) score -= 1;
      });
    }
  });
  return score;
};

const getValidMoves = (boards: BoardState[], boardSize: number) => {
  const moves: { boardIndex: number; cellIndex: number }[] = [];
  boards.forEach((board, boardIndex) => {
    if (!isBoardDead(board, boardSize)) {
      board.forEach((cell, cellIndex) => {
        if (cell === '') moves.push({ boardIndex, cellIndex });
      });
    }
  });
  return moves;
};

const updateBoards = (boards: BoardState[], move: { boardIndex: number; cellIndex: number }) => {
  return boards.map((b, i) =>
    i === move.boardIndex
      ? [...b.slice(0, move.cellIndex), 'X', ...b.slice(move.cellIndex + 1)]
      : [...b]
  );
};

const minimax = (
  boards: BoardState[],
  depth: number,
  isMaximizing: boolean,
  boardSize: BoardSize,
  alpha: number,
  beta: number
): number => {
  if (boards.every(b => isBoardDead(b, boardSize))) {
    return isMaximizing ? 1000 : -1000;
  }
  if (depth === 0) {
    return heuristic(boards, boardSize);
  }
  const moves = getValidMoves(boards, boardSize);
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      const newBoards = updateBoards(boards, move);
      const evalScore = minimax(newBoards, depth - 1, false, boardSize, alpha, beta);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      const newBoards = updateBoards(boards, move);
      const evalScore = minimax(newBoards, depth - 1, true, boardSize, alpha, beta);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const findBestMove = (
  boards: BoardState[],
  difficulty: DifficultyLevel,
  boardSize: BoardSize
) => {
  const moves = getValidMoves(boards, boardSize);
  if (moves.length === 0) return null;
  const depth = Math.min(difficulty + 1, MAX_DEPTH);
  let bestScore = -Infinity;
  let bestMoves: { boardIndex: number; cellIndex: number }[] = [];
  for (const move of moves) {
    const newBoards = updateBoards(boards, move);
    const moveScore = minimax(newBoards, depth, false, boardSize, -Infinity, Infinity);
    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMoves = [move];
    } else if (moveScore === bestScore) {
      bestMoves.push(move);
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
};

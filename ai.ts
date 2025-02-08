import type { BoardState, DifficultyLevel, BoardSize } from './types';

const getWinPatterns = (size: number) => {
  const patterns = [];
  // Rows
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({length: size}, (_, j) => i * size + j));
  }
  // Columns
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({length: size}, (_, j) => i + j * size));
  }
  // Diagonals
  patterns.push(Array.from({length: size}, (_, i) => i * (size + 1)));
  patterns.push(Array.from({length: size}, (_, i) => (i + 1) * (size - 1)));
  return patterns;
};

export const findBestMove = (
  boards: BoardState[],
  difficulty: DifficultyLevel,
  boardSize: number
) => {
  const validMoves = getValidMoves(boards, boardSize);
  if (validMoves.length === 0) return null;

  // For difficulty levels 1-3 use random with increasing smartness
  if (difficulty <= 3) {
    const safeMoves = validMoves.filter(move => 
      !wouldCreateWin(boards[move.boardIndex], move.cellIndex, boardSize)
    );
    const movesToConsider = safeMoves.length > 0 ? safeMoves : validMoves;
    return movesToConsider[Math.floor(Math.random() * movesToConsider.length)];
  }

  // For higher difficulties use minimax with depth based on difficulty
  const depth = difficulty - 2;
  let bestScore = -Infinity;
  let bestMoves = [validMoves[0]];

  validMoves.forEach(move => {
    const newBoards = boards.map((b, i) => 
      i === move.boardIndex ? [
        ...b.slice(0, move.cellIndex),
        'X',
        ...b.slice(move.cellIndex + 1)
      ] : [...b]
    );
    const score = minimax(newBoards, depth, false, boardSize);
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  });

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
};

const minimax = (
  boards: BoardState[],
  depth: number,
  isMaximizing: boolean,
  boardSize: number
): number => {
  if (depth === 0 || boards.every(b => isBoardDead(b, boardSize))) {
    return evaluateBoards(boards, boardSize);
  }

  const validMoves = getValidMoves(boards, boardSize);
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of validMoves) {
      const newBoards = boards.map((b, i) => 
        i === move.boardIndex ? [
          ...b.slice(0, move.cellIndex),
          'X',
          ...b.slice(move.cellIndex + 1)
        ] : [...b]
      );
      const evaluation = minimax(newBoards, depth - 1, false, boardSize);
      maxEval = Math.max(maxEval, evaluation);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of validMoves) {
      const newBoards = boards.map((b, i) => 
        i === move.boardIndex ? [
          ...b.slice(0, move.cellIndex),
          'X',
          ...b.slice(move.cellIndex + 1)
        ] : [...b]
      );
      const evaluation = minimax(newBoards, depth - 1, true, boardSize);
      minEval = Math.min(minEval, evaluation);
    }
    return minEval;
  }
};

const evaluateBoards = (boards: BoardState[], boardSize: number) => {
  return boards.filter(b => !isBoardDead(b, boardSize)).length * 100;
};

const getValidMoves = (boards: BoardState[], boardSize: number) => {
  const validMoves: { boardIndex: number; cellIndex: number }[] = getValidMoves(boards, boardSize);
  boards.forEach((board, boardIndex) => {
    if (!isBoardDead(board, boardSize)) {
      board.forEach((cell, cellIndex) => {
        if (cell === '') {
          validMoves.push({ boardIndex, cellIndex });
        }
      });
    }
  });
  return validMoves;
};

const isBoardDead = (board: BoardState, boardSize: number) => {
  const winPatterns = getWinPatterns(boardSize);
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === 'X')
  );
};

const wouldCreateWin = (board: BoardState, cellIndex: number, boardSize: number) => {
  const tempBoard = [...board];
  tempBoard[cellIndex] = 'X';
  return isBoardDead(tempBoard, boardSize);
};
import type { BoardState, DifficultyLevel } from './types';

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

export const findBestMove = (
    boards: BoardState[],
    difficulty: DifficultyLevel
): { boardIndex: number; cellIndex: number } | null => {
    switch (difficulty) {
        case 1: return level1Random(boards);
        case 2: return level2AvoidLoss(boards);
        case 3: return level3MaxBoardsAlive(boards);
        default: return level4Minimax(boards, difficulty - 3);
    }
};

// Level 1: Random moves
const level1Random = (boards: BoardState[]) => {
    const validMoves = getValidMoves(boards);
    return validMoves[Math.floor(Math.random() * validMoves.length)];
};

// Level 2: Avoid immediate loss
const level2AvoidLoss = (boards: BoardState[]) => {
    const validMoves = getValidMoves(boards).filter(move => {
        const newBoard = [...boards[move.boardIndex]];
        newBoard[move.cellIndex] = 'X';
        return !isBoardDead(newBoard);
    });
    return validMoves[Math.floor(Math.random() * validMoves.length)] || level1Random(boards);
};

// Level 3: Maximize alive boards
const level3MaxBoardsAlive = (boards: BoardState[]) => {
    const movesWithScore = getValidMoves(boards).map(move => {
        const newBoards = boards.map((b, i) =>
            i === move.boardIndex ? [...b.slice(0, move.cellIndex), 'X', ...b.slice(move.cellIndex + 1)] : b
        );
        return {
            move,
            score: newBoards.filter(b => !isBoardDead(b)).length
        };
    });

    const maxScore = Math.max(...movesWithScore.map(m => m.score));
    const bestMoves = movesWithScore.filter(m => m.score === maxScore);
    return bestMoves[Math.floor(Math.random() * bestMoves.length)].move;
};

// Level 4+: Minimax with depth scaling
const level4Minimax = (boards: BoardState[], depth: number) => {
    let bestScore = -Infinity;
    let bestMoves: { boardIndex: number; cellIndex: number }[] = [];

    getValidMoves(boards).forEach(move => {
        const newBoards = boards.map((b, i) =>
            i === move.boardIndex ? [...b.slice(0, move.cellIndex), 'X', ...b.slice(move.cellIndex + 1)] : b
        );

        const score = minimax(newBoards, depth - 1, false, -Infinity, Infinity);

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
    alpha: number,
    beta: number
): number => {
    if (depth === 0 || boards.every(b => isBoardDead(b))) {
        return evaluateBoard(boards);
    }

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of getValidMoves(boards)) {
            const newBoards = boards.map((b, i) =>
                i === move.boardIndex ? [...b.slice(0, move.cellIndex), 'X', ...b.slice(move.cellIndex + 1)] : b
            );
            const evaluation = minimax(newBoards, depth - 1, false, alpha, beta);
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of getValidMoves(boards)) {
            const newBoards = boards.map((b, i) =>
                i === move.boardIndex ? [...b.slice(0, move.cellIndex), 'X', ...b.slice(move.cellIndex + 1)] : b
            );
            const evaluation = minimax(newBoards, depth - 1, true, alpha, beta);
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
};

const evaluateBoard = (boards: BoardState[]): number => {
    // Higher score for more alive boards and potential winning positions
    return boards.filter(b => !isBoardDead(b)).length * 100 +
        boards.reduce((acc, board) =>
            acc + WIN_PATTERNS.filter(pattern =>
                pattern.filter(i => board[i] === 'X').length === 2 &&
                pattern.some(i => board[i] === '')
            ).length, 0
        );
};

// Helper functions
const getValidMoves = (boards: BoardState[]) => {
    const validMoves: { boardIndex: number; cellIndex: number }[] = [];
    boards.forEach((board, boardIndex) => {
        if (!isBoardDead(board)) {
            board.forEach((cell, cellIndex) => {
                if (cell === '') {
                    validMoves.push({ boardIndex, cellIndex });
                }
            });
        }
    });
    return validMoves;
};

const isBoardDead = (board: BoardState) => {
    return WIN_PATTERNS.some(pattern =>
        pattern.every(i => board[i] === 'X')
    );
};
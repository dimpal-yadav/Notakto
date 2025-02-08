import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Menu from './components/Menu';
import Game from './components/Game';
import TutorialModal from './components/modals/TutorialModal';
import PlayerNamesModal from './components/modals/PlayerNamesModal';
import WinnerModal from './components/modals/WinnerModal';
import BoardConfigModal from './components/modals/BoardConfigModal';
import { DifficultyModal } from './components/modals/DifficultyModal';
import { findBestMove } from './ai';
import type { BoardState, GameMode, DifficultyLevel, BoardSize } from './types';
import { loadEconomy, saveEconomy, calculateRewards } from './economyUtils';

const App = () => {
  // Game State
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameHistory, setGameHistory] = useState<BoardState[][]>([]);
  const [numberOfBoards, setNumberOfBoards] = useState(3);
  const [boardSize, setBoardSize] = useState<BoardSize>(3);
  const [showBoardConfig, setShowBoardConfig] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

  // Player State
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  // Modal States
  const [showNameModal, setShowNameModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState('');
  const [coins, setCoins] = useState(1000);
  const [experience, setExperience] = useState(0);

  // Load economy data on mount
  useEffect(() => {
    const loadInitialEconomy = async () => {
      const { coins: savedCoins, experience: savedXP } = await loadEconomy();
      setCoins(savedCoins);
      setExperience(savedXP);
    };
    loadInitialEconomy();
  }, []);

  // Save economy data when changed
  useEffect(() => {
    saveEconomy(coins, experience);
  }, [coins, experience]);

  // Update the winner effect
  useEffect(() => {
    if (showWinnerModal) {
      const isWin = winner === (gameMode === 'vsComputer' ? player1Name : player2Name);
      const rewards = calculateRewards(isWin, difficulty, numberOfBoards, boardSize);

      if (isWin) {
        setCoins(prev => prev + rewards.coins);
      }
      setExperience(prev => prev + rewards.xp);
    }
  }, [showWinnerModal]);

  useEffect(() => {
    resetGame(numberOfBoards, boardSize);
  }, [numberOfBoards, boardSize]);
  const handleUndo = () => {
    if (coins >= 100) {
      setCoins(prev => prev - 100);
      if (gameHistory.length > 2) {
        setBoards(gameHistory[gameHistory.length - 3]);
        setGameHistory(gameHistory.slice(0, -2));
        setCurrentPlayer(1);
      }
    } else {
      Alert.alert('Not enough coins', 'You need at least 100 coins to undo!');
    }
  };

  const checkWin = (board: BoardState) => {
    const size = boardSize;
    // Check rows and columns
    for (let i = 0; i < size; i++) {
      const row = board.slice(i * size, (i + 1) * size);
      const col = Array.from({ length: size }, (_, j) => board[i + j * size]);
      if (row.every(c => c === 'X') || col.every(c => c === 'X')) return true;
    }
    // Check diagonals
    const diag1 = Array.from({ length: size }, (_, i) => board[i * (size + 1)]);
    const diag2 = Array.from({ length: size }, (_, i) => board[(i + 1) * (size - 1)]);
    return diag1.every(c => c === 'X') || diag2.every(c => c === 'X');
  };

  const isBoardDead = (board: BoardState) => checkWin(board);

  const handleMove = (boardIndex: number, cellIndex: number) => {
    if (boards[boardIndex][cellIndex] !== '' || isBoardDead(boards[boardIndex])) return;

    const newBoards = boards.map((board, idx) =>
      idx === boardIndex ? [
        ...board.slice(0, cellIndex),
        'X',
        ...board.slice(cellIndex + 1)
      ] : [...board]
    );

    setBoards(newBoards);
    setGameHistory([...gameHistory, newBoards]);

    if (newBoards.every(board => isBoardDead(board))) {
      setWinner(currentPlayer === 1 ? player2Name : player1Name);
      setShowWinnerModal(true);
      return;
    }

    setCurrentPlayer(prev => prev === 1 ? 2 : 1);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (gameMode === 'vsComputer' && currentPlayer === 2) {
      const move = findBestMove(boards, difficulty, boardSize);
      if (move) {
        timeoutId = setTimeout(() => handleMove(move.boardIndex, move.cellIndex), 500);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [currentPlayer, gameMode, boards, difficulty, boardSize]);

  const resetGame = (num: number, size: BoardSize) => {
    const initialBoards = Array(num).fill(null).map(() => Array(size * size).fill(''));
    setBoards(initialBoards);
    setCurrentPlayer(1);
    setGameHistory([initialBoards]);
    setShowWinnerModal(false);
  };

  const handleBoardConfigChange = (num: number, size: BoardSize) => {
    setNumberOfBoards(Math.min(5, Math.max(1, num)));
    setBoardSize(size);
    setShowBoardConfig(false);
  };
  const handleResetNames = () => {
    setShowNameModal(true);
  };
  return (
    <View style={styles.container}>
      {gameMode ? (
        <Game
          currentPlayer={currentPlayer === 1 ? player1Name : player2Name}
          boards={boards}
          makeMove={handleMove}
          isBoardDead={isBoardDead}
          undoMove={() => {
            if (gameHistory.length > 2) {
              setBoards(gameHistory[gameHistory.length - 3]);
              setGameHistory(gameHistory.slice(0, -2));
              setCurrentPlayer(1);
            }
          }}
          resetGame={() => resetGame(numberOfBoards, boardSize)}
          exitToMenu={() => setGameMode(null)}
          gameMode={gameMode}
          numberOfBoards={numberOfBoards}
          boardSize={boardSize}
          onBoardConfigPress={() => setShowBoardConfig(true)}
          difficulty={difficulty}
          onDifficultyPress={() => setShowDifficultyModal(true)}
          onResetNames={handleResetNames}
          onUndo={handleUndo}
          coins={coins}
          experience={experience}
          canUndo={coins >= 100}
        />
      ) : (
        <Menu
          startGame={(mode) => {
            if (mode === 'vsPlayer') setShowNameModal(true);
            else {
              setPlayer1Name('You');
              setPlayer2Name('Computer');
            }
            setGameMode(mode);
            resetGame(numberOfBoards, boardSize);
          }}
          showTutorial={() => setShowTutorial(true)}
        />
      )}

      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
      <PlayerNamesModal
        visible={showNameModal}
        onSubmit={(p1, p2) => {
          setPlayer1Name(p1 || 'Player 1');
          setPlayer2Name(p2 || 'Player 2');
          setShowNameModal(false);
        }}
        initialNames={[player1Name, player2Name]}
      />
      <WinnerModal
        visible={showWinnerModal}
        winner={winner}
        onPlayAgain={() => {
          setShowWinnerModal(false);
          resetGame(numberOfBoards, boardSize);
        }}
        onMenu={() => {
          setShowWinnerModal(false);
          setGameMode(null);
        }}
      />
      <BoardConfigModal
        visible={showBoardConfig}
        currentBoards={numberOfBoards}
        currentSize={boardSize}
        onConfirm={handleBoardConfigChange}
        onCancel={() => setShowBoardConfig(false)}
      />
      <DifficultyModal
        visible={showDifficultyModal}
        onSelect={(level) => {
          setDifficulty(level as DifficultyLevel);
          setShowDifficultyModal(false);
        }}
        onClose={() => setShowDifficultyModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
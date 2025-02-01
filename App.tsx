import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from './components/Menu';
import Game  from './components/Game';
import TutorialModal  from './components/modals/TutorialModal';
import PlayerNamesModal from './components/modals/PlayerNamesModal';
import WinnerModal  from './components/modals/WinnerModal';
import { BoardConfigModal } from './components/modals/BoardConfigModal';
//import { useSound } from './hooks/useSound';
import type { BoardState, GameMode } from './types';

const App = () => {
  // Game State
  const [boards, setBoards] = useState<BoardState[]>(
    Array(3).fill(null).map(() => Array(9).fill(''))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameHistory, setGameHistory] = useState<BoardState[][]>([boards]);
  const [numberOfBoards, setNumberOfBoards] = useState(3);
  const [showBoardConfig, setShowBoardConfig] = useState(false);
  
  // Player State
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  
  // Modal States
  const [showNameModal, setShowNameModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState('');
  
  // Sound Hook
  //const { playSound, moveSound, gameEndSound } = useSound();

  // Game Logic
  const checkWin = (board: BoardState) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
      pattern.every(index => board[index] === 'X')
    );
  };

  const isBoardDead = (board: BoardState) => checkWin(board);

  const handleMove = (boardIndex: number, cellIndex: number) => {
    if (boards[boardIndex][cellIndex] !== '' || isBoardDead(boards[boardIndex])) return;

    const newBoards = boards.map((board, idx) =>
      idx === boardIndex ? 
        [...board.slice(0, cellIndex), 'X', ...board.slice(cellIndex + 1)] 
        : [...board]
    );

    setBoards(newBoards);
    setGameHistory([...gameHistory, newBoards]);
    //playSound(moveSound!);

    if (newBoards.every(board => isBoardDead(board))) {
      //playSound(gameEndSound!);
      const winner = currentPlayer === 1 ? player2Name : player1Name;
      setWinner(winner);
      setShowWinnerModal(true);
      return;
    }

    setCurrentPlayer(prev => prev === 1 ? 2 : 1);
  };
  // Computer Move Handler
  useEffect(() => {
    if (gameMode === 'vsComputer' && currentPlayer === 2) {
      const availableMoves = boards
        .flatMap((board, bIdx) => 
          board.map((cell, cIdx) => 
            cell === '' && !isBoardDead(boards[bIdx]) ? { bIdx, cIdx } : null
          )
        )
        .filter(Boolean);

      if (availableMoves.length > 0) {
        const randomMove = availableMoves[
          Math.floor(Math.random() * availableMoves.length)
        ] as { bIdx: number; cIdx: number };
        
        setTimeout(() => handleMove(randomMove.bIdx, randomMove.cIdx), 200);
      }
    }
  }, [currentPlayer, gameMode]);

  const resetGame = () => {
    const initialBoards = Array(numberOfBoards).fill(null).map(() => Array(9).fill(''));
    setBoards(initialBoards);
    setCurrentPlayer(1);
    setGameHistory([initialBoards]);
    setShowWinnerModal(false);
  };
  
  const handleBoardNumberChange = (num: number) => {
    if (num > 0 && num <= 5) { // Limit to 5 boards max
      setNumberOfBoards(num);
      resetGame();
      setShowBoardConfig(false);
    }
  };
  return (
    <View style={styles.container}>
      {gameMode ? ( //display the game
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
          resetGame={resetGame}
          exitToMenu={() => setGameMode(null)}
          gameMode={gameMode}
          numberOfBoards={numberOfBoards}
          onBoardConfigPress={() => setShowBoardConfig(true)}
        />
      ) : ( //no game mode selected yet
        <Menu
          startGame={(mode) => {
            if (mode === 'vsPlayer') setShowNameModal(true);
            if(mode==='vsComputer'){
              setPlayer1Name('You');
              setPlayer2Name('Computer');
            }
            setGameMode(mode);
            resetGame();
          }}
          showTutorial={() => setShowTutorial(true)}
        />
      )}

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      <PlayerNamesModal
        visible={showNameModal}
        onSubmit={(p1, p2) => {
          setPlayer1Name(p1 || 'Player 1');
          setPlayer2Name(p2 || 'Player 2');
          setShowNameModal(false);
        }}
      />

      <WinnerModal
        visible={showWinnerModal}
        winner={winner}
        onPlayAgain={() => {
          setShowWinnerModal(false);
          resetGame();
        }}
        onMenu={() => {
          setShowWinnerModal(false);
          setGameMode(null);
        }}
      />

  <BoardConfigModal
    visible={showBoardConfig}
    currentBoards={numberOfBoards}
    onConfirm={handleBoardNumberChange}
    onCancel={() => setShowBoardConfig(false)}
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    //padding: 20,
  },
});



export default App;
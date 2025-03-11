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
import { loadEconomy, saveEconomy, calculateRewards } from './economyUtils';
import type { BoardState, GameMode, DifficultyLevel, BoardSize } from './types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Sound from 'react-native-sound';

Sound.setCategory("Playback");

GoogleSignin.configure({
  webClientId: '200189691429-6if4geqfh2dvnuqp5bev5oa7mnjove4q.apps.googleusercontent.com'
});

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
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(false);
  const [mute,setMute]=useState<boolean>(false);

  // Economy State
  const [coins, setCoins] = useState(1000);
  const [experience, setExperience] = useState(0);

  // Player State
  const [player1Name, setPlayer1Name] = useState<string>('Player 1');
  const [player2Name, setPlayer2Name] = useState<string>('Player 2');

  // Modal States
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');

  //auth user 
  const [user, setUser] = useState<any>(null);

  // Load economy data and initialize game
  useEffect(() => {
    const loadData = async () => {
      try {
        const economyData = await loadEconomy();
        setCoins(economyData.coins);
        setExperience(economyData.experience);
        resetGame(numberOfBoards, boardSize);
      } catch (error) {
        console.error('Failed to load data:', error);
        // Initialize with default values if load fails
        setCoins(1000);
        setExperience(0);
        resetGame(numberOfBoards, boardSize);
      }
    };
    loadData();
  }, []);

  // Reset game when board configuration changes
  useEffect(() => {
    resetGame(numberOfBoards, boardSize);
  }, [numberOfBoards, boardSize]);

  // Subscribe to Firebase Auth state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((usr) => {
      setUser(usr);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    saveEconomy(coins, experience);
    // If user is signed in, update their Firebase document
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({ coins, experience }, { merge: true });
    }
  }, [coins, experience, user]);

  
  // AI Move Handler
  useEffect(() => {
    if (gameMode === 'vsComputer' && currentPlayer === 2) {
      const move = findBestMove(boards, difficulty, boardSize)
      if (move) { handleMove(move.boardIndex, move.cellIndex); }
    }
  }, [currentPlayer, gameMode, boards, difficulty, boardSize]);

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
    playMoveSound();
    setBoards(newBoards);
    setGameHistory([...gameHistory, newBoards]);

    if (newBoards.every(board => isBoardDead(board))) {
      const loser = currentPlayer;
      const winner = loser === 1 ? 2 : 1;
      const isHumanWinner = gameMode === 'vsComputer' && winner === 1;
      const isComputerWinner = gameMode === 'vsComputer' && winner === 2;
      const rewards = calculateRewards(isHumanWinner, difficulty, numberOfBoards, boardSize);

      if (isHumanWinner) {
        setCoins(c => c + rewards.coins);
        setExperience(e => e + rewards.xp);
      }
      if (isComputerWinner) {
        setExperience(e => Math.round(e + rewards.xp * 0.25));
      }
      const winnerName = winner === 1 ? player1Name : player2Name;
      setWinner(winnerName);
      setShowWinnerModal(true);
      playWinSound();
      return;
    }

    setCurrentPlayer(prev => prev === 1 ? 2 : 1);
  };

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
    resetGame(num, size);
  };
  const handleUndo = () => {
    if (gameHistory.length >= 3) {
      if (coins >= 100) {
        setCoins(c => c - 100);
        setBoards(gameHistory[gameHistory.length - 3]);
        setGameHistory(h => h.slice(0, -2));
      } else {
        Alert.alert('Insufficient Coins', 'You need at least 100 coins to undo!');
      }
    } else {
      Alert.alert('No Moves', 'There are no moves to undo!');
    }
  };

  const handleSkip = () => {
    if (coins >= 200) {
      setCoins(c => c - 200);
      setCurrentPlayer(prev => prev === 1 ? 2 : 1);
    } else {
      Alert.alert('Insufficient Coins', 'You need at least 200 coins to skip a move!');
    }
  };

  const handleResetNames = () => {
    setShowNameModal(true);
  };
  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
      setCoins(1000);
      setExperience(0);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens(); // Get idToken separately
      if (!idToken) {
        throw new Error("Google Sign-In failed: No ID Token received.");
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const currentUser = userCredential.user;
      setUser(currentUser);

      // Check if economy data exists in Firebase for this user
      const userRef = firestore().collection('users').doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        // Cloud data exists → Overwrite local data
        const cloudData = doc.data();
        if (cloudData) {
          setCoins(cloudData.coins);
          setExperience(cloudData.experience);
        }
      } else {
        // No cloud data → Upload local data to Firebase
        await userRef.set({ coins, experience });
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };
  const playMoveSound =() => {
    if(mute)return;
    const sound= new Sound (require("./android/app/src/main/res/raw/click.mp3"),(error)=>{
      if(error){
        console.log("Failed to load sound",error);  
        return;
      }
      sound.play(()=>sound.release());
    })
  }
  const playWinSound =() => {
    if(mute)return;
    const sound= new Sound (require("./android/app/src/main/res/raw/wins.mp3"),(error)=>{
      if(error){
        console.log("Failed to load sound",error);  
        return;
      }
      sound.play(()=>sound.release());
    })
  }
  return (
    <View style={styles.container}>
      {gameMode ? (
        <Game
          currentPlayer={currentPlayer === 1 ? player1Name : player2Name}
          boards={boards}
          makeMove={handleMove}
          isBoardDead={isBoardDead}
          onUndo={handleUndo}
          undoMove={handleUndo}
          resetGame={() => resetGame(numberOfBoards, boardSize)}
          exitToMenu={() => setGameMode(null)}
          gameMode={gameMode}
          numberOfBoards={numberOfBoards}
          boardSize={boardSize}
          onBoardConfigPress={() => setShowBoardConfig(true)}
          difficulty={difficulty}
          onDifficultyPress={() => setShowDifficultyModal(true)}
          coins={coins}
          experience={experience}
          canUndo={coins >= 100}
          onResetNames={handleResetNames}
          gameHistoryLength={gameHistory.length}
          onSkip={handleSkip}
          canSkip={coins >= 200}
          toggleMute={()=>setMute(!mute)}
          isMuted={mute}
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
          signIn={handleSignIn}
          signOut={handleSignOut}
          signed={!!user}
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
          resetGame(numberOfBoards, boardSize);
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
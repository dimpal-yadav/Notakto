import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Board from './Board';

type GameProps = {
  currentPlayer: string;
  boards: string[][];
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isBoardDead: (board: string[]) => boolean;
  undoMove: () => void;
  resetGame: () => void;
  exitToMenu: () => void;
  gameMode: 'vsComputer' | 'vsPlayer' | null;
};

const Game = ({
  currentPlayer,
  boards,
  makeMove,
  isBoardDead,
  undoMove,
  resetGame,
  exitToMenu,
  gameMode,
}: GameProps) => (
  <LinearGradient colors={['#8636C8', '#4A00E0']} style={styles.gradientContainer}>
    <View style={styles.container}>
      <Text style={styles.header}>Current Player: {currentPlayer}</Text>
      
      <ScrollView contentContainerStyle={styles.boardsContainer}>
        {boards.map((board, index) => (
          <Board
            key={index}
            boardIndex={index}
            boardState={board}
            makeMove={makeMove}
            isDead={isBoardDead(board)}
          />
        ))}
      </ScrollView>

      <View style={styles.controls}>
        {gameMode === 'vsComputer' && (
          <TouchableOpacity onPress={undoMove}>
            <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.button}>
              <Text style={styles.buttonText}>Undo</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetGame}>
          <LinearGradient colors={['#FF66B2', '#FF1493']} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={exitToMenu}>
          <LinearGradient colors={['#00E1FF', '#0078FF']} style={styles.button}>
            <Text style={styles.buttonText}>Menu</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Game;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
        <TouchableOpacity style={styles.button} onPress={undoMove}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={exitToMenu}>
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'black'
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
    backgroundColor: '#8636C8',
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
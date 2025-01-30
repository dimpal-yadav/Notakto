import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

type BoardProps = {
  boardIndex: number;
  boardState: string[];
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isDead: boolean;
};

const Board = ({
  boardIndex,
  boardState,
  makeMove,
  isDead,
}: BoardProps) => (
  <View style={[styles.board, isDead && styles.deadBoard]}>
    <View style={styles.row}>
      {[0, 1, 2].map((cellIndex) => (
        <Cell
          key={cellIndex}
          boardIndex={boardIndex}
          cellIndex={cellIndex}
          value={boardState[cellIndex]}
          onPress={makeMove}
          disabled={isDead}
        />
      ))}
    </View>
    <View style={styles.row}>
      {[3, 4, 5].map((cellIndex) => (
        <Cell
          key={cellIndex}
          boardIndex={boardIndex}
          cellIndex={cellIndex}
          value={boardState[cellIndex]}
          onPress={makeMove}
          disabled={isDead}
        />
      ))}
    </View>
    <View style={styles.row}>
      {[6, 7, 8].map((cellIndex) => (
        <Cell
          key={cellIndex}
          boardIndex={boardIndex}
          cellIndex={cellIndex}
          value={boardState[cellIndex]}
          onPress={makeMove}
          disabled={isDead}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deadBoard: {
    opacity: 0.6,
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;
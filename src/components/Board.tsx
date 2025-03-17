import React from 'react';
import { View } from 'react-native';
import Cell from './Cell';
import type { BoardState } from '../services/types';
import {styles} from '../styles/board'

type BoardProps = {
  boardIndex: number;
  boardState: BoardState;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isDead: boolean;
  boardSize: number;
};

const Board = ({ boardIndex, boardState, makeMove, isDead, boardSize }: BoardProps) => {
  return (
    <View style={[styles.board, isDead && styles.deadBoard]}>
      {Array.from({ length: boardSize }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: boardSize }).map((_, col) => {
            const cellIndex = row * boardSize + col;
            return (
              <Cell
                key={cellIndex}
                boardIndex={boardIndex}
                cellIndex={cellIndex}
                value={boardState[cellIndex]}
                onPress={makeMove}
                disabled={isDead}
                boardSize={boardSize}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};



export default Board;
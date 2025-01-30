import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board  from './Board';

type GameBoardProps = {
  boards: Array<Array<string>>;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isBoardDead: (board: Array<string>) => boolean;
};

export const GameBoard = ({ boards, makeMove, isBoardDead }: GameBoardProps) => (
  <View style={styles.boardsContainer}>
    {boards.map((_, index) => (
      <Board
        key={index}
        boardIndex={index}
        boardState={boards[index]}
        makeMove={makeMove}
        isDead={isBoardDead(boards[index])}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
});
import React from 'react';
import { View} from 'react-native';
import Board  from './Board';
import {styles} from '../styles/gameboard'

type GameBoardProps = {
  boards: Array<Array<string>>;
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isBoardDead: (board: Array<string>) => boolean;
  boardSize: number;
};

export const GameBoard = ({ boards, makeMove, isBoardDead, boardSize }: GameBoardProps) => (
  <View style={styles.boardsContainer}>
    {boards.map((_, index) => (
      <Board
        key={index}
        boardIndex={index}
        boardState={boards[index]}
        makeMove={makeMove}
        isDead={isBoardDead(boards[index])}
        boardSize={boardSize}
      />
    ))}
  </View>
);


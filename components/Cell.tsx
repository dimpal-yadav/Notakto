import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

type CellProps = {
  boardIndex: number;
  cellIndex: number;
  value: string;
  onPress: (boardIndex: number, cellIndex: number) => void;
  disabled: boolean;
  boardSize: number;
};

const Cell = ({ boardIndex, cellIndex, value, onPress, disabled, boardSize }: CellProps) => {
  const screenWidth = Dimensions.get('window').width;
  const cellSize = (screenWidth * 0.9) / boardSize - 10;

  return (
    <TouchableOpacity
      style={[styles.cell, { width: cellSize, height: cellSize }]}
      onPress={() => onPress(boardIndex, cellIndex)}
      disabled={disabled || !!value}
      activeOpacity={0.7}
    >
      <Text style={[styles.cellText, { fontSize: cellSize * 0.4 }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 2,
  },
  cellText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Cell;
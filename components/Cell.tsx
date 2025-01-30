import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CellProps = {
  boardIndex: number;
  cellIndex: number;
  value: string;
  onPress: (boardIndex: number, cellIndex: number) => void;
  disabled: boolean;
};

const Cell = ({
  boardIndex,
  cellIndex,
  value,
  onPress,
  disabled,
}: CellProps) => (
  <TouchableOpacity
    style={styles.cell}
    onPress={() => onPress(boardIndex, cellIndex)}
    disabled={disabled || !!value}
    activeOpacity={0.7}
  >
    <Text style={styles.cellText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Cell;
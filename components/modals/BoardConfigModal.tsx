import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { BoardSize } from '../../types';

type BoardConfigModalProps = {
  visible: boolean;
  currentBoards: number;
  currentSize: BoardSize;
  onConfirm: (num: number, size: BoardSize) => void;
  onCancel: () => void;
};

const BoardConfigModal = ({ 
  visible, 
  currentBoards,
  currentSize,
  onConfirm,
  onCancel 
}: BoardConfigModalProps) => {
  const [selectedBoards, setSelectedBoards] = useState(currentBoards);
  const [selectedSize, setSelectedSize] = useState<BoardSize>(currentSize);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Game Configuration</Text>
          
          <Text style={styles.sectionTitle}>Number of Boards (1-5)</Text>
          <View style={styles.buttonGroup}>
            {[1, 2, 3, 4, 5].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.sizeButton, selectedBoards === num && styles.selected]}
                onPress={() => setSelectedBoards(num)}
              >
                <Text style={styles.buttonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Board Size</Text>
          <View style={styles.buttonGroup}>
            {([2, 3, 4, 5] as BoardSize[]).map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, selectedSize === size && styles.selected]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.buttonText}>{size}x{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => onConfirm(selectedBoards, selectedSize)}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  sizeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    minWidth: 60,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
});

export default BoardConfigModal;
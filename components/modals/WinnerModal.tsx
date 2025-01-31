import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type WinnerModalProps = {
  visible: boolean;
  winner: string;
  onPlayAgain: () => void;
  onMenu: () => void;
};

const WinnerModal = ({ visible, winner, onPlayAgain, onMenu }: WinnerModalProps) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.modalContent}>
          <Text style={styles.modalTitle}>Game Over!</Text>
          <Text style={styles.winnerText}>{(winner=='You')?(`You won!`):(`${winner} wins`)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPlayAgain}>
              <LinearGradient colors={['#FF66B2', '#FF1493']} style={styles.button}>
                <Text style={styles.buttonText}>Play Again</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  onPress={onMenu}>
              <LinearGradient colors={['#00E1FF', '#0078FF']} style={[styles.button, styles.menuButton]}>
                <Text style={styles.buttonText}>Main Menu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  winnerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WinnerModal;
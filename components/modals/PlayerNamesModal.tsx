import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type PlayerNamesModalProps = {
  visible: boolean;
  onSubmit: (p1: string, p2: string) => void;
};

const PlayerNamesModal = ({ visible, onSubmit }: PlayerNamesModalProps) => {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#8636C8', '#4A00E0']} style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Player Names</Text>

          <TextInput
            style={styles.input}
            placeholder="Player 1 Name"
            value={player1}
            onChangeText={setPlayer1}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Player 2 Name"
            value={player2}
            onChangeText={setPlayer2}
            autoCapitalize="words"
          />

          <TouchableOpacity 
            onPress={() => onSubmit(player1 || 'Player 1', player2 || 'Player 2')}
          >
            <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Start Game</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  modalButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlayerNamesModal;

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type PlayerNamesModalProps = {
  visible: boolean;
  onSubmit: (p1: string, p2: string) => void;
  initialNames?: [string, string];
};

const PlayerNamesModal = ({ visible, onSubmit, initialNames }: PlayerNamesModalProps) => {
  const [player1, setPlayer1] = useState(initialNames?.[0] || 'Player 1');
  const [player2, setPlayer2] = useState(initialNames?.[1] || 'Player 2');
  const handleSubmit = () => {
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      Alert.alert("Duplicate Names", "Player 1 and Player 2 cannot have the same name.");
      return;
    }
    onSubmit(player1 || 'Player 1', player2 || 'Player 2');
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#DA70D6', '#7B68EE']} style={styles.modalContent}>
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
            onPress={handleSubmit}
          >
            <View style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Start Game</Text>
            </View>
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
    backgroundColor: '#c4a2d4'
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlayerNamesModal;

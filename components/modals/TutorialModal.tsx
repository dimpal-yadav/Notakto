import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TutorialModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TutorialModal = ({ visible, onClose }: TutorialModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>How to Play Notakto</Text>
        
        <Text style={styles.modalText}>
          • Both players use X marks{"\n"}
          • Game is played on three 3x3 boards{"\n"}
          • Players alternate placing Xs{"\n"}
          • Any board with 3 Xs in a row becomes dead{"\n"}
          • Last player to make a valid move loses{"\n"}
          • Strategy: Force opponent to make final move!
        </Text>

        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Got It!</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#8636C8',
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

export default TutorialModal;
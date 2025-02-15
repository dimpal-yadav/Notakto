import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type DifficultyModalProps = {
  visible: boolean;
  onSelect: (level: number) => void;
  onClose: () => void;
};

export const DifficultyModal = ({ visible, onSelect, onClose }: DifficultyModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <LinearGradient colors={['#DA70D6', '#7B68EE']} style={styles.modalContent}>
        <Text style={styles.title}>Select Difficulty</Text>
        
        {[1, 2, 3, 4, 5].map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.button]}
            onPress={() => onSelect(level)}
          >
            <Text style={styles.buttonText}>
              Level {level}: {getLevelDescription(level)}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </Modal>
);

const getLevelDescription = (level: number) => {
  switch(level) {
    case 1: return 'Easy';
    case 2: return 'Medium';
    case 3: return 'Hard';
    case 4: return `Expert`;
    case 5: return 'Master';
  }
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      padding: 20,
      borderRadius: 10,
      width: '90%',
      maxWidth: 400,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      padding: 15,
      borderRadius: 8,
      marginVertical: 5,
      backgroundColor: '#c4a2d4',
    },
    difficultyButton: {
      backgroundColor: '#e1e1e1', // Base color will be overridden
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    cancelText:{
      color: '#c4a2d4',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    cancelButton: {
      marginTop: 15,
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 8,
      color: 'black'
    },
    difficultyText: {
      color: '#333',
      fontSize: 14,
    },
  });
  
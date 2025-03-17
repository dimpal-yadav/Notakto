import React from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../styles/difficultymodal';
import { DifficultyModalProps } from '../../services/types';


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

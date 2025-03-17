import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../styles/tutorialModal';

type TutorialModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TutorialModal = ({ visible, onClose }: TutorialModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.modalContent}>
        <Text style={styles.modalTitle}>How to Play Notakto</Text>
        
        <Text style={styles.modalText}>
          • Both players use X marks{"\n"}
          • Game is played on three 3x3 boards{"\n"}
          • Players alternate placing Xs{"\n"}
          • Any board with 3 Xs in a row becomes dead{"\n"}
          • Last player to make a valid move loses{"\n"}
          • Strategy: Force opponent to make final move!
        </Text>

        <TouchableOpacity onPress={onClose}>
          <LinearGradient colors={['#00E1FF', '#0078FF']} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Got It!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </Modal>
);


export default TutorialModal;

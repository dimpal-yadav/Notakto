import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../styles/winnerModal';
import type { WinnerModalProps } from '../../services/types';


const WinnerModal = ({ visible, winner, onPlayAgain, onMenu }: WinnerModalProps) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#DA70D6', '#7B68EE']} style={styles.modalContent}>
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

export default WinnerModal;
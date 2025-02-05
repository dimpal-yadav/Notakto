import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import type { GameStats } from './GameStats';

type StatsModalProps = {
  visible: boolean;
  stats: GameStats;
  onClose: () => void;
  onReset: () => void;
};

export const StatsModal = ({ visible, stats, onClose, onReset }: StatsModalProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Game Statistics</Text>
        
        <ScrollView style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Games:</Text>
            <Text style={styles.statValue}>{stats.totalGames}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Wins:</Text>
            <Text style={[styles.statValue, styles.winText]}>{stats.totalWins}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Losses:</Text>
            <Text style={[styles.statValue, styles.lossText]}>{stats.totalLosses}</Text>
          </View>

          {Object.entries(stats.difficultyStats).map(([difficulty, { wins, losses }]) => (
            <View key={difficulty} style={styles.difficultySection}>
              <Text style={styles.difficultyTitle}>Level {difficulty}</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Wins:</Text>
                <Text style={styles.statValue}>{wins}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Losses:</Text>
                <Text style={styles.statValue}>{losses}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]}
            onPress={onReset}
          >
            <Text style={styles.buttonText}>Reset Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  statsContainer: {
    maxHeight: '70%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  winText: {
    color: '#2ecc71',
  },
  lossText: {
    color: '#e74c3c',
  },
  difficultySection: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  difficultyTitle: {
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
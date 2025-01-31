import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type MenuProps = {
  startGame: (mode: 'vsPlayer' | 'vsComputer') => void;
  showTutorial: () => void;
};

const Menu = ({ startGame, showTutorial }: MenuProps) => (
  <LinearGradient colors={['#8636C8', '#4A00E0']} style={styles.gradientContainer}>
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Notakto</Text>

      <TouchableOpacity onPress={() => startGame('vsPlayer')}>
        <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Play vs Player</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => startGame('vsComputer')}>
        <LinearGradient colors={['#FF66B2', '#FF1493']} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Play vs Computer</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={showTutorial}>
        <LinearGradient colors={['#00E1FF', '#0078FF']} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Tutorial</Text>
        </LinearGradient>
      </TouchableOpacity>
      
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1, // Ensures full screen coverage
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  menuButton: {
    padding: 15,
    borderRadius: 10,
    width: 200,
    marginVertical: 10,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Menu;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type MenuProps = {
  startGame: (mode: 'vsPlayer' | 'vsComputer') => void;
  showTutorial: () => void;
};

const Menu = ({ startGame, showTutorial }: MenuProps) => (
  <View style={styles.menuContainer}>
    <Text style={styles.title}>Notaktotic</Text>
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => startGame('vsPlayer')}
    >
      <Text style={styles.menuButtonText}>Play vs Player</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => startGame('vsComputer')}
    >
      <Text style={styles.menuButtonText}>Play vs Computer</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.menuButton}
      onPress={showTutorial}
    >
      <Text style={styles.menuButtonText}>Tutorial</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#8636C8'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color:'white'
  },
  menuButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: 200,
    marginVertical: 10,
  },
  menuButtonText: {
    color: '#8636C8',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Menu;
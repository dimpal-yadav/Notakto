import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type MenuProps = {
  startGame: (mode: 'vsPlayer' | 'vsComputer'| 'liveMatch') => void;
  showTutorial: () => void;
  signed: boolean;
  signIn: () => void;
  signOut: () => void;
};

const Menu = ({ startGame, showTutorial, signed, signIn, signOut }: MenuProps) => (
  <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradientContainer}>
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Notaktotic</Text>
      <LinearGradient colors={['#FFB347', '#FFCC33']} style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('vsPlayer')}>
          <Text style={styles.menuButtonText}>Play vs Player</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#B19CD9', '#9B59B6']} style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('vsComputer')}>
          <Text style={styles.menuButtonText}>Play vs Computer</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#FFB347', '#FFCC33']} style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('liveMatch')}>
          <Text style={styles.menuButtonText}>Live Match</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#7ED321', '#417505']} style={styles.menuButton}>
        <TouchableOpacity onPress={showTutorial}>
          <Text style={styles.menuButtonText}>Tutorial</Text>
        </TouchableOpacity>
      </LinearGradient>
      {(signed) ?
        (<LinearGradient colors={['#FF6347', '#8B0000']} style={styles.menuButton}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.menuButtonText}>signOut</Text>
          </TouchableOpacity>
        </LinearGradient>) :
        (<LinearGradient colors={['#FF6347', '#8B0000']} style={styles.menuButton}>
          <TouchableOpacity onPress={signIn}>
            <Text style={styles.menuButtonText}>signIn</Text>
          </TouchableOpacity>
        </LinearGradient>)}
    </View>
  </LinearGradient>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textShadowColor: '#FFCC00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 50,
  },
  menuButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: width * 0.7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Menu;

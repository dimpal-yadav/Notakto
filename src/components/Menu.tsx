import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/menu';
import { MenuProps } from '../services/types';


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

export default Menu;

import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/menu';
import { MenuProps } from '../services/types';


const Menu = ({ startGame, showTutorial, signed, signIn, signOut }: MenuProps) => (
  <View style={styles.gradientContainer}>
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Notakto</Text>
      <View style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('vsPlayer')}>
          <Text style={styles.menuButtonText}>Play vs Player</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('vsComputer')}>
          <Text style={styles.menuButtonText}>Play vs Computer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuButton}>
        <TouchableOpacity onPress={() => startGame('liveMatch')}>
          <Text style={styles.menuButtonText}>Live Match</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuButton}>
        <TouchableOpacity onPress={showTutorial}>
          <Text style={styles.menuButtonText}>Tutorial</Text>
        </TouchableOpacity>
      </View>
      {(signed) ?
        (<View style={styles.menuButton}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.menuButtonText}>signOut</Text>
          </TouchableOpacity>
        </View>) :
        (<View style={styles.menuButton}>
          <TouchableOpacity onPress={signIn}>
            <Text style={styles.menuButtonText}>signIn</Text>
          </TouchableOpacity>
        </View>)}
    </View>
  </View>
);

export default Menu;

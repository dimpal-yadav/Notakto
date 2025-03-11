import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Board from './Board';

type GameProps = {
  currentPlayer: string;
  boards: string[][];
  makeMove: (boardIndex: number, cellIndex: number) => void;
  isBoardDead: (board: string[]) => boolean;
  undoMove: () => void;
  resetGame: () => void;
  exitToMenu: () => void;
  gameMode: 'vsComputer' | 'vsPlayer' | null;
  numberOfBoards: number;
  onBoardConfigPress: () => void;
  difficulty?: number;
  onDifficultyPress?: () => void;
  boardSize: number;
  onResetNames: () => void;
  onUndo: () => void;
  onSkip: () => void;
  coins: number;
  experience: number;
  canUndo: boolean;
  canSkip: boolean;
  gameHistoryLength: number;
  toggleMute: ()=> void;
  isMuted: boolean;
};

const Game = (props: GameProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{props.currentPlayer}</Text>
          {props.gameMode === 'vsComputer' && (
            <View style={styles.economyInfo}>
              <Text style={styles.economyText}>Coins: {props.coins}</Text>
              <Text style={styles.economyText}>XP: {props.experience}</Text>
            </View>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.boardsContainer}>
          {props.boards.map((board: string[], index: number) => (
            <Board
              key={index}
              boardIndex={index}
              boardState={board}
              makeMove={props.makeMove}
              isDead={props.isBoardDead(board)}
              boardSize={props.boardSize}
            />
          ))}
        </ScrollView>

        {/* Footer Settings Button */}
        <LinearGradient colors={['#8E44AD', '#9B59B6']} style={styles.footer}>  
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.footerText}>Game Settings ⚙️</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Menu */}
        {isMenuOpen && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={toggleMenu}>
              <View style={styles.overlayBackground} />
            </TouchableWithoutFeedback>
            <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.menuPanel}>
              <View style={styles.menuContent}>
                <TouchableOpacity onPress={props.onBoardConfigPress} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Game Configuration</Text>
                </TouchableOpacity>
                {props.gameMode === 'vsPlayer' && (
                  <TouchableOpacity onPress={props.onResetNames} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Reset Names</Text>
                  </TouchableOpacity>
                )}
                {props.gameMode === 'vsComputer' && (
                  <TouchableOpacity onPress={props.onUndo} style={[styles.menuButton, !props.canUndo && styles.disabledButton]} disabled={!props.canUndo}>
                    <Text style={styles.menuButtonText}>Undo (100 coins)</Text>
                  </TouchableOpacity>
                )}
                {props.gameMode === 'vsComputer' && (
                  <TouchableOpacity onPress={props.onSkip} style={[styles.menuButton, !props.canSkip && styles.disabledButton]} disabled={!props.canSkip}>
                    <Text style={styles.menuButtonText}>Skip a Move (200 coins)</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={props.resetGame} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Reset</Text>
                </TouchableOpacity>
                {props.gameMode === 'vsComputer' && (
                  <TouchableOpacity onPress={props.onDifficultyPress!} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>AI Level: {props.difficulty}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={props.toggleMute} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Sound: {props.isMuted ? 'Off' : 'On'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.exitToMenu} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Main Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Return to Game</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  economyInfo: {
    alignItems: 'flex-end',
  },
  economyText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  footerText:{
    fontSize: 18,
    color: 'white'
  },
  menuButton: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#8E44AD',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  overlayBackground: {
    flex: 1,
  },
  menuPanel: {
    margin: 20,
    borderRadius: 20,
    padding: 16,
  },
  menuContent: {
    paddingHorizontal: 8,
    gap: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Game;

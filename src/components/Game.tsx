import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Board from './Board';
import LiveMode from './LiveMode';
import { styles } from '../styles/game';
import { GameProps } from '../services/types';


const Game = (props: GameProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (props.gameMode === 'liveMatch') {
    return <LiveMode onClose={props.exitToMenu} />;
  }
  return (
    <View style={styles.gradientContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        {props.gameMode === 'vsComputer' && (
            <View style={styles.economyRow}>
              <Text style={styles.economyText}>Coins: {props.coins}</Text>
              <Text style={styles.economyText}> | XP: {props.experience}</Text>
            </View>
          )}
          <Text style={styles.header}>{props.currentPlayer}</Text>
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
        <View style={styles.footer}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
        {/* Menu */}
        {isMenuOpen && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={toggleMenu}>
              <View style={styles.overlayBackground} />
            </TouchableWithoutFeedback>
            <View style={styles.menuPanel}>
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
            </View>
          </View>
        )}
      </View>
    </View>
  );
};


export default Game;

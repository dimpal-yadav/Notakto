import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
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
  gameHistoryLength: number;
};

type AnimatedButtonProps = {
  colors: string[];
  onPress: () => void;
  label: string;
  disabled?: boolean;
  width?: number;
};

const AnimatedButton = ({
  colors,
  onPress,
  label,
  disabled = false,
  width
}: AnimatedButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
    if (!disabled) onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width }}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <LinearGradient
          colors={colors}
          style={[styles.menuButton, disabled && styles.disabledButton]}
        >
          <Text style={styles.menuButtonText}>{label}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const Game = (props: GameProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');

  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!isMenuOpen) setIsMenuOpen(true);
    });
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsMenuOpen(false));
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

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
        <View style={styles.footer}>
          <AnimatedButton
            colors={['#8E44AD', '#9B59B6']}
            onPress={toggleMenu}
            label="Game Settings ⚙️"
            width={screenWidth * 0.9}
          />
        </View>

        {/* Overlay and Menu */}
        {isMenuOpen && (
          <>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
              <TouchableWithoutFeedback onPress={closeMenu}>
                <View style={styles.overlayBackground} />
              </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View style={[styles.menuContainer, {
              transform: [{ translateY: menuTranslateY }],
              opacity: menuAnimation,
            }]}>
              <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.menuPanel}>
                <View style={styles.menuContent}>

                  <AnimatedButton
                    colors={['#34495E', '#2C3E50']}
                    onPress={props.onBoardConfigPress}
                    label={`Game Configuration`}
                    width={screenWidth * 0.8}
                  />
                  {props.gameMode === 'vsPlayer' && (
                    <AnimatedButton
                      colors={['#FF6B6B', '#FF5252']}
                      onPress={props.onResetNames}
                      label="Reset Names"
                      width={screenWidth * 0.8}
                    />
                  )}
                  {props.gameMode === 'vsComputer' && (
                    <AnimatedButton
                      colors={['#8B4513', '#A0522D']} //['#FFD700', '#FFA500'] for yellow
                      onPress={props.onUndo}
                      label="Undo (100 coins)"
                      disabled={!props.canUndo}
                      width={screenWidth * 0.8}
                    />
                  )}
                  {props.gameMode === 'vsComputer' && (
                    <AnimatedButton
                      colors={['#FFD700', '#FFA500']} // for yellow
                      onPress={props.onSkip}
                      label="Skip a Move (200 coins)"
                      disabled={!props.canUndo}
                      width={screenWidth * 0.8}
                    />
                  )}
                  <AnimatedButton
                    colors={['#FF66B2', '#FF1493']}
                    onPress={props.resetGame}
                    label="Reset"
                    width={screenWidth * 0.8}
                  />
                  {props.gameMode === 'vsComputer' && (
                    <AnimatedButton
                      colors={['#8E44AD', '#9B59B6']}
                      onPress={props.onDifficultyPress!}
                      label={`AI Level: ${props.difficulty}`}
                      width={screenWidth * 0.8}
                    />
                  )}

                  <AnimatedButton
                    colors={['#00E1FF', '#0078FF']}
                    onPress={props.exitToMenu}
                    label="Main Menu"
                    width={screenWidth * 0.8}
                  />
                  <AnimatedButton
                    colors={['#7ED321', '#417505']}
                    onPress={closeMenu}
                    label={`Return to Game`}
                    width={screenWidth * 0.8}
                  />
                </View>
              </LinearGradient>
            </Animated.View>
          </>
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
    textShadowColor: '#FFCC00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  boardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20
  },
  footer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1,
    marginTop: 0
  },
  menuButton: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 2,
  },
  overlayBackground: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  menuPanel: {
    margin: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  menuContent: {
    paddingHorizontal: 8,
    gap: 12,
  },
});

export default Game;
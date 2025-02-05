import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type MenuProps = {
  startGame: (mode: 'vsPlayer' | 'vsComputer') => void;
  showTutorial: () => void;
};

const BUTTONS = [
  { label: 'Play vs Player', action: 'vsPlayer' as const },
  { label: 'Play vs Computer', action: 'vsComputer' as const },
  { label: 'Tutorial', action: 'tutorial' as const },
];

const Menu: React.FC<MenuProps> = ({ startGame, showTutorial }) => {
  // Create animated values for each button
  const buttonScales = useRef(BUTTONS.map(() => new Animated.Value(0))).current;
  // Animate the title separately
  const titleTranslateY = useRef(new Animated.Value(-50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the title (slide in and fade in)
    Animated.parallel([
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate buttons with staggered bounce
    Animated.stagger(150,
      buttonScales.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [buttonScales, titleOpacity, titleTranslateY]);

  // Handle button press animation (scale down momentarily)
  const handlePressIn = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = (anim: Animated.Value, action: any) => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start(() => {
      // Call the corresponding action after the animation
      if (action === 'tutorial') {
        showTutorial();
      } else {
        startGame(action);
      }
    });
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradientContainer}>
      <View style={styles.menuContainer}>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              transform: [{ translateY: titleTranslateY }],
              opacity: titleOpacity,
            },
          ]}
        >
          <Text style={styles.title}>Notakto</Text>
        </Animated.View>

        {BUTTONS.map((button, index) => (
          <Animated.View
            key={button.label}
            style={[
              styles.buttonWrapper,
              { transform: [{ scale: buttonScales[index] }] },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(buttonScales[index])}
              onPressOut={() => handlePressOut(buttonScales[index], button.action)}
            >
              <LinearGradient
                colors={
                  button.action === 'vsPlayer'
                    ? ['#FFB347', '#FFCC33']
                    : button.action === 'vsComputer'
                    ? ['#B19CD9', '#9B59B6']
                    : ['#7ED321', '#417505']
                }
                style={styles.menuButton}
              >
                <Text style={styles.menuButtonText}>{button.label}</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </Animated.View>
        ))}
      </View>
    </LinearGradient>
  );
};

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
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textShadowColor: '#FFCC00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonWrapper: {
    marginVertical: 10,
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
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Menu;

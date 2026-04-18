import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeIn
} from 'react-native-reanimated';
import { ShoppingBasket } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      <Animated.View entering={FadeIn.delay(500)} style={styles.content}>
        <View style={styles.iconBox}>
          <ShoppingBasket size={60} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Smart Grocery</Text>
        <Text style={styles.subtitle}>Shop Smarter, Live Better</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: '#F1F8E9',
    top: -width,
    left: -width / 2,
  },
  content: {
    alignItems: 'center',
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 30
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: -1
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    fontWeight: '500'
  }
});

export default SplashScreen;

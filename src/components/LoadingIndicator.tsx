import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const LoadingIndicator = ({
  message = 'Loading...',
  size = 'large',
}: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottie/loading-animation.json')}
        autoPlay
        loop
        style={styles[size]}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    fontFamily: 'DM Sans',
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  large: {
    height: 100,
    width: 100,
  },
  small: {
    height: 50,
    width: 50,
  },
});

export default LoadingIndicator;

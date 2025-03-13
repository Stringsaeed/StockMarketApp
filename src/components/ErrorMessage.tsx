import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({onRetry}: ErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottie/error-animation.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
  message: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
  },
  retryText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
  },
  animation: {
    height: 300,
    width: 300,
  },
});

export default ErrorMessage;

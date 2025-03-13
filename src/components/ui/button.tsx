import {ComponentProps} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface ButtonProps extends ComponentProps<typeof Animated.View> {
  children: React.ReactNode;
}

export const Button = ({style: userStyle, children, ...props}: ButtonProps) => {
  const pressProgress = useSharedValue(0);

  const tap = Gesture.Tap()
    .onEnd(() => {
      pressProgress.value = withSpring(1);
    })
    .onFinalize(() => {
      pressProgress.value = withSpring(0);
    })
    .onStart(() => {
      pressProgress.value = withSpring(0);
    })
    .onBegin(() => {
      pressProgress.value = withSpring(0.5);
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: interpolate(pressProgress.value, [0, 1], [1, -0.95])},
      ],
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View {...props} style={[userStyle, style]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

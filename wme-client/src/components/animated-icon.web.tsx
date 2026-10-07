import { View } from 'react-native';
import { Easing, Keyframe } from 'react-native-reanimated';

import { StyledAnimatedView, StyledImage } from './styled';

const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View className="relative size-32 items-center justify-center">
      <StyledAnimatedView
        entering={glowKeyframe.duration(60 * 1000 * 4)}
        className="pointer-events-none absolute size-[201px]">
        <StyledImage className="size-[201px]" source={require('@/assets/images/logo-glow.png')} />
      </StyledAnimatedView>

      <StyledAnimatedView
        entering={keyframe.duration(DURATION)}
        className="absolute z-10 size-32 overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#3C9FFE,#0274DF)]"
      />

      <StyledAnimatedView
        className="z-20 items-center justify-center"
        entering={logoKeyframe.duration(DURATION)}>
        <StyledImage className="h-[71px] w-[76px]" source={require('@/assets/images/expo-logo.png')} />
      </StyledAnimatedView>
    </View>
  );
}

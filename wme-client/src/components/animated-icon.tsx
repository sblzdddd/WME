import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { StyledAnimatedView, StyledImage } from './styled';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = (
    <StyledImage className="h-[71px] w-[76px]" source={require('@/assets/images/expo-logo.png')} />
  );

  return animate ? (
    <StyledAnimatedView
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      className="absolute inset-0 z-[1000] items-center justify-center bg-[#208AEF]">
      {image}
    </StyledAnimatedView>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      className="absolute inset-0 z-[1000] items-center justify-center bg-[#208AEF]">
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View className="relative z-[100] size-32 items-center justify-center">
      <StyledAnimatedView entering={glowKeyframe.duration(60 * 1000 * 4)} className="absolute size-[201px]">
        <StyledImage className="absolute size-[201px]" source={require('@/assets/images/logo-glow.png')} />
      </StyledAnimatedView>

      <StyledAnimatedView
        entering={keyframe.duration(DURATION)}
        className="absolute size-32 rounded-[40px] bg-linear-to-b from-[#3C9FFE] to-[#0274DF]"
      />
      <StyledAnimatedView className="items-center justify-center" entering={logoKeyframe.duration(DURATION)}>
        <StyledImage className="h-[71px] w-[76px]" source={require('@/assets/images/expo-logo.png')} />
      </StyledAnimatedView>
    </View>
  );
}

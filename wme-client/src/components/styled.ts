import { Image } from 'expo-image';
import { styled } from 'nativewind';
import type { ComponentProps, ComponentType } from 'react';
import type { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export const StyledImage = styled(Image, { className: 'style' });

type AnimatedViewProps = ViewProps & Pick<ComponentProps<typeof Animated.View>, 'entering'>;

export const StyledAnimatedView = styled(Animated.View as ComponentType<AnimatedViewProps>, {
  className: 'style',
});

export const StyledSafeAreaView = styled(SafeAreaView, { className: 'style' });

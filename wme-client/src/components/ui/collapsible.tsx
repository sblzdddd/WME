import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable } from 'react-native';
import { FadeIn } from 'react-native-reanimated';

import { StyledAnimatedView } from '@/components/styled';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        className="flex-row items-center gap-2 active:opacity-70"
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" className="size-6 items-center justify-center rounded-xl">
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <StyledAnimatedView entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" className="mt-4 ml-6 rounded-2xl p-6">
            {children}
          </ThemedView>
        </StyledAnimatedView>
      )}
    </ThemedView>
  );
}

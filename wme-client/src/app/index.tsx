import * as Device from 'expo-device';
import { Platform, View } from 'react-native';

import { AnimatedIcon } from '@/components/animated-icon';
import { GetStartedButton } from '@/components/get-started-button';
import { HelloFromApi } from '@/components/hello-from-api';
import { HintRow } from '@/components/hint-row';
import { StyledSafeAreaView } from '@/components/styled';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 flex-row justify-center">
      <StyledSafeAreaView className="max-w-[800px] flex-1 items-center gap-4 px-6 pb-4 ios:pb-[66px] android:pb-[96px]">
        <ThemedView className="flex-1 items-center justify-center gap-6 px-6">
          <AnimatedIcon />
          <ThemedText type="title" className="text-center">
            Welcome to&nbsp;Expo
          </ThemedText>
          <View className="w-full flex-row justify-center">
            <GetStartedButton />
          </View>
        </ThemedView>

        <ThemedText type="code" className="uppercase">
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" className="gap-4 self-stretch rounded-3xl px-4 py-6">
          <HintRow title="Backend" hint={<HelloFromApi />} />
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </StyledSafeAreaView>
    </ThemedView>
  );
}

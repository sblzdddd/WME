import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

const background: Record<ThemeColor, string> = {
  background: 'bg-white dark:bg-black',
  backgroundElement: 'bg-[#F0F0F3] dark:bg-[#212225]',
  backgroundSelected: 'bg-[#E0E1E6] dark:bg-[#2E3135]',
  text: 'bg-black dark:bg-white',
  textSecondary: 'bg-[#60646C] dark:bg-[#B0B4BA]',
};

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor;
};

export function ThemedView({ className, type, ...otherProps }: ThemedViewProps) {
  return (
    <View
      className={[background[type ?? 'background'], className].filter(Boolean).join(' ')}
      {...otherProps}
    />
  );
}

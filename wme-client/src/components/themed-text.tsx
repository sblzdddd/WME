import { Text, type TextProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

const textColor: Record<ThemeColor, string> = {
  text: 'text-black dark:text-white',
  background: 'text-white dark:text-black',
  backgroundElement: 'text-[#F0F0F3] dark:text-[#212225]',
  backgroundSelected: 'text-[#E0E1E6] dark:text-[#2E3135]',
  textSecondary: 'text-[#60646C] dark:text-[#B0B4BA]',
};

const typeClass = {
  default: 'text-base leading-6 font-medium',
  title: 'text-5xl leading-[52px] font-semibold',
  small: 'text-sm leading-5 font-medium',
  smallBold: 'text-sm leading-5 font-bold',
  subtitle: 'text-[32px] leading-[44px] font-semibold',
  link: 'text-sm leading-[30px]',
  linkPrimary: 'text-sm leading-[30px] text-[#3c87f7]',
  code: 'font-mono text-xs font-medium android:font-bold',
} as const;

export type ThemedTextProps = TextProps & {
  type?: keyof typeof typeClass;
  themeColor?: ThemeColor;
};

export function ThemedText({ className, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const color = type === 'linkPrimary' ? undefined : textColor[themeColor ?? 'text'];

  return (
    <Text className={[color, typeClass[type], className].filter(Boolean).join(' ')} {...rest} />
  );
}

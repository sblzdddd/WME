import { Button, Host, Text } from '@expo/ui';
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  padding,
  tint,
} from '@expo/ui/swift-ui/modifiers';

export function GetStartedButton() {
  return (
    <Host matchContents seedColor="#658EFF">
      <Button
        modifiers={[
          buttonStyle('glass'),
          buttonBorderShape('capsule'),
          controlSize('large'),
          tint('#208AEF'),
          padding({ all: 16 }),
        ]}>
        <Text>Get started</Text>
      </Button>
    </Host>
  );
}

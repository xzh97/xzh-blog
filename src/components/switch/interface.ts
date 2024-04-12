import { CSSProperties } from 'react';

export interface SwitchProps {
  value: boolean;
  customClassNames?: string;
  customStyle?: CSSProperties;
  activeBg?: string;
  inactiveBg?: string;
  onChange: (val: boolean) => void;
}

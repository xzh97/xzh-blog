import { ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  title?: ReactNode;
  placement?: Placement;
  zIndex?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // todo 触发方式后面改
  trigger?: Trigger;
}

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type Trigger = 'hover' | 'focus' | 'click';
export type Strategy = 'absolute' | 'fixed';

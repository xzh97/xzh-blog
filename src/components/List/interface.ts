import { ReactNode } from 'react';

export interface ListProps<T> {
  className?: string;
  list: T[];
  renderItem: (item: T) => ReactNode;
}

import { AxiosResponse } from 'axios';

export interface SearchProps<T, P> {
  params: Partial<T>;
  getMethod: (params: Partial<T>) => Promise<AxiosResponse<P>>;
}

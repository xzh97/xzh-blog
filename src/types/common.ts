export interface PageQuery {
  page: number;
  size: number;
}

export interface ListCommon<T> {
  count: number;
  list: T[];
}

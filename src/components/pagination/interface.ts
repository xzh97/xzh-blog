export interface PaginationData {
  current: number;
  defaultCurrent: number;
  pageSize: number;
  pageSizeOptions: number;
  defaultPageSize: number;
  total: number;
  disabled: boolean;
  showTotal: boolean;
  onChange: (page: number, pageSize: number) => void;
  onPageSizeChange: (current: number, size: number) => void;
}
interface PaginationState {
  total: number;
}
export interface PaginationProps extends Partial<Omit<PaginationData, 'total'>>, PaginationState {}

export type PageItemType = 'page' | 'next' | 'prev' | 'more';

export interface PageItem {
  type: PageItemType;
  page: number;
}

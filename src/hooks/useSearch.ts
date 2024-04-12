import { PageQuery } from '@/types/common';
import { SearchProps } from '@/types/hooks';
import { useState } from 'react';

function useSearch<T, P>(props: SearchProps<T, P>) {
  const { params, getMethod } = props;
  const [pagination, setPagination] = useState<PageQuery>({
    page: 1,
    size: 10,
  });

  const getList = () => {
    return getMethod({ ...params, ...pagination });
  };

  return {
    getList,
    pagination,
    setPagination,
  };
}

export default useSearch;

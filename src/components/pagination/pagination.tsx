import { useEffect, useState } from 'react';
import cs from 'classnames';
import { PageItem, PaginationProps } from './interface';
import { PageItemTypeEnum } from './const';
import './pagination.scss';

function Pagination(props: PaginationProps) {
  const {
    current: currentProp,
    defaultCurrent,
    defaultPageSize,
    showTotal,
    pageSize,
    // pageSizeOptions = [10, 20, 30, 50],
    total,
    // disabled,
    onChange,
    // onPageSizeChange,
  } = props;
  const _defaultCurrent = 1;
  const _defaultPageSize = 10;
  const [current, setCurrent] = useState(currentProp || defaultCurrent || _defaultCurrent);
  const [size] = useState(pageSize || defaultPageSize || _defaultPageSize);
  const [pages, setPages] = useState<PageItem[]>([]);

  const getAllPages = () => {
    const pageCount = Math.ceil(total / size);
    const res = Array.from({ length: pageCount }, (_, index) => {
      return { type: PageItemTypeEnum.PAGE, page: index + 1 };
    });
    setPages(res);
  };

  useEffect(() => {
    getAllPages();
  }, [total, size]);

  const handleChange = (pageItem: PageItem) => {
    const { page, type } = pageItem;
    if (page === current) return;
    switch (type) {
      default:
        setCurrent(page);
        onChange?.(page, size);
        break;
    }
  };
  return (
    <div className="pagination-wrapper">
      {showTotal ? `共${total}条` : null}
      <ul className="page-list">
        {pages.map(item => {
          return (
            <li
              key={`page${item.page}`}
              className={cs('page-list-item', {
                active: item.page === current,
              })}
              onClick={() => handleChange(item)}
            >
              {item.page}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;

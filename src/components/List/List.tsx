import { ListProps } from './interface';

function List<T>(props: ListProps<T>) {
  const { list, renderItem, className } = props;
  return <div className={className}>{list.map(item => renderItem(item))}</div>;
}

export default List;

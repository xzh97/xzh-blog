import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './blog.scss';
import { BlogEntity } from '@/types/blog';
import { getBlogList } from '@/api/blog';
import { ListCommon } from '@/types/common';
import { BlogListQuery } from '@/types/blog';
import useSearch from '@/hooks/useSearch';
import Pagination from '@/components/pagination';
import List from '@/components/list';

const Blog = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<BlogEntity[]>([]);
  const [total, setTotal] = useState(0);
  const { getList } = useSearch<BlogListQuery, ListCommon<BlogEntity>>({
    params: {},
    getMethod: getBlogList,
  });

  useEffect(() => {
    getList().then(res => {
      console.log(res.data);
      const { list, count } = res.data;
      setBlogList(list);
      setTotal(count);
    });
  }, []);

  const goDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const renderBlog = (item: BlogEntity) => {
    return (
      <article key={item.id} className="blog-list-item">
        <div className="blog-title" onClick={() => goDetail(item.id)}>
          {item.title}
        </div>
        <div className="blog-date">{dayjs(item.createTime).format('MMMM DD, YYYY')}</div>
      </article>
    );
  };

  return (
    <div className="container">
      <List<BlogEntity> className="blog-list" list={blogList} renderItem={renderBlog} />
      <Pagination showTotal total={total} />
    </div>
  );
};
export default Blog;

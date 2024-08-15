import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './blog.scss';
import { getBlogList } from '@/api/blog';
import useSearch from '@/hooks/useSearch';
import Pagination from '@/components/pagination';
import List from '@/components/list';

const Blog = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<Blog.Entity[]>([]);
  const [total, setTotal] = useState(0);
  const { getList } = useSearch<Blog.ListQuery, Common.ListApi<Blog.Entity>>({
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

  const renderBlog = (item: Blog.Entity) => {
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
      <List<Blog.Entity> className="blog-list" list={blogList} renderItem={renderBlog} />
      <Pagination showTotal total={total} />
    </div>
  );
};
export default Blog;

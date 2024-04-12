import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { BlogItem } from './interface';
import { getBlogList } from '@/api/blog';
import { ListCommon } from '@/types/common';
import { BlogListQuery } from '@/types/blog';
import useSearch from '@/hooks/useSearch';
import List from '@/components/List';
import './blog.scss';

const Blog = () => {
  const [blogList, setBlogList] = useState<BlogItem[]>([]);
  const { getList } = useSearch<BlogListQuery, ListCommon<BlogItem>>({
    params: {},
    getMethod: getBlogList,
  });

  useEffect(() => {
    getList().then(res => {
      const { list } = res.data;
      console.log(list);

      setBlogList(list);
    });
  }, []);

  const renderBlog = (item: BlogItem) => {
    return (
      <article key={item.id} className="blog-list-item">
        <div className="blog-title">{item.title}</div>
        <div className="blog-date">{dayjs(item.createTime).format('MMMM DD, YYYY')}</div>
      </article>
    );
  };

  return (
    <div className="container">
      <List<BlogItem> className="blog-list" list={blogList} renderItem={renderBlog} />
    </div>
  );
};
export default Blog;

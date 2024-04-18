import request from '@/utils/axios';
import { BlogListQuery } from '@/types/blog';

export const getBlogList = (params: Partial<BlogListQuery>) => {
  return request.get('/api/blog', {
    params,
  });
};

export const getBlogDetail = (id: string) => {
  return request.get(`/api/blog/${id}`);
};

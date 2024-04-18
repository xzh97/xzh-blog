import { PageQuery } from './common';
export interface BlogListQuery extends PageQuery {}

/**
 * @desc 博客
 */
export interface BlogEntity {
  /** 博客id */
  id: number;

  /** 博客类型 1原创, 2转载, 3翻译 */
  type: number;

  /** 博客标题 */
  title: string;

  /** 博客封面 */
  poster?: string;

  /** 博客内容描述 */
  description?: string;

  /** 博客内容 */
  content: string;

  /** 创建时间 */
  createTime: number;

  /** 更新时间 */
  updateTime?: number;

  /** 作者 */
  author?: string;

  /** 博客分类 */
  category?: number;

  /** 博客标签 */
  tag?: number;

  /** 博客状态 */
  status: number;
}

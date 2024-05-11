import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import markdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import tocDoneRight from 'markdown-it-toc-done-right';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.min.css';

import { BlogEntity } from '@/types/blog';
import { getBlogDetail } from '@/api/blog';
import './detail.scss';
import testmd from './test.md';
import Comment from '@/components/comment/comment';

const BlogDetail = () => {
  const [blog, setBlog] = useState<BlogEntity>();
  const { id } = useParams();

  const getDetail = () => {
    if (!id) return;
    getBlogDetail(id).then(res => {
      console.log(res.data);
      setBlog(res.data);
    });
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  const renderHeader = () => {
    return (
      <header className="detail-header">
        <h1 className="title">{blog?.title}</h1>
        <div className="meta">
          Author：<div className="author">{blog?.author}</div>&nbsp; Date：
          <div className="create-time">
            {dayjs(blog?.createTime).format('MMMM DD,YYYY HH:mm:ss')}
          </div>
          &nbsp; Categories：<div className="categories">{blog?.category.name}</div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    const md: MarkdownIt = markdownIt({
      html: false,
      xhtmlOut: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre><code class="hljs code">' +
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
              '</code></pre>'
            );
          } catch (err) {
            console.error(err);
          }
        }

        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
      },
    })
      .use(anchor, {
        permalink: anchor.permalink.headerLink(),
        permalinkBefore: true,
        permalinkSymbol: '§',
      })
      .use(tocDoneRight);
    return (
      <div className="detail-content" dangerouslySetInnerHTML={{ __html: md.render(testmd) }} />
    );
  };

  const renderFooter = () => {
    const link = window.location.origin + window.location.pathname;
    return (
      <footer className="detail-copyright">
        <div className="copyright-item">Author: {blog?.author}</div>
        <div className="copyright-item">
          Permalink: <a href={link}>{link}</a>
          {}
        </div>
        <div className="copyright-item">
          License: Copyright (c) 2019{' '}
          <a href="http://creativecommons.org/licenses/by-nc/4.0/">CC-BY-NC-4.0</a> LICENSE
        </div>
        <div className="copyright-item">Slogan: 杂思沉潜下，时时可得！</div>
      </footer>
    );
  };

  const renderComment = () => {
    if (blog) {
      return <Comment list={blog.comments} />;
    }
    return null;
  };

  return (
    <div className="container">
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      {renderComment()}
    </div>
  );
};
export default BlogDetail;

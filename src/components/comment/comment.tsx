import dayjs from 'dayjs';
import './comment.scss';
import defaultAvatar from '@/assets/images/avatar.jpg';

const Comment = (props: Comment.Props) => {
  const { list } = props;
  const renderList = (data: Comment.Entity[]) => {
    return (
      <ul className="comment-list">
        {data.map(item => {
          return (
            <li key={`comment-${item.id}`} className="comment-item">
              <div className="comment-avatar">
                <img src={defaultAvatar} alt="" className="avatar-img" />
              </div>
              <div className="comment-wrapper">
                <div className="comment-header">
                  <div className="author-name">{item.name}</div>
                </div>
                <div className="comment-content">{item.content}</div>
                <div className="comment-action">
                  <div className="action-date">{dayjs(item.createTime).fromNow()}</div>
                  <div className="action-reply">回复</div>
                </div>
                {item?.children?.length ? renderList(item.children) : null}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  return <div className="comment-list-wrapper">{renderList(list)}</div>;
};

export default Comment;

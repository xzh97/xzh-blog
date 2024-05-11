import './commentInput.scss';
import defaultAvatar from '@/assets/images/avatar.jpg';

const CommentEditor = (props: Comment.Props) => {
  const { list } = props;
  console.log(list);

  return (
    <div className="comment-editor-wrapper">
      <div className="comment-avatar">
        <img src={defaultAvatar} alt="" className="avatar-img" />
      </div>
      <div className="comment-content">
        <div className="comment-input"></div>
        <div className="comment-action"></div>
      </div>
    </div>
  );
};

export default CommentEditor;

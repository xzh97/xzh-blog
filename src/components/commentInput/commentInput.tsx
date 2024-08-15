import { useRef, useState } from 'react';
import cl from 'classnames';
import defaultAvatar from '@/assets/images/avatar.jpg';
import './commentInput.scss';
import emojiImg from '@/assets/images/emoji.svg';
import imageImg from '@/assets/images/image.svg';
import Tooltip from '../tooltip';
import EmojiPicker, { Emoji } from '../emojiPicker';

const CommentInput = (props: CommentInput.Props) => {
  const { isPlain, maxLength = 50 } = props;
  // const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');
  // const [showValue, setShowValue] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    console.log(e);
    setValue(e?.currentTarget.innerHTML);
  };

  // const transformValue = (text: string) => {
  //   setValue();
  // };

  const handleUpload = () => {};
  const handleSubmit = () => {};
  const handleSelectEmoji = (emoji: Emoji) => {
    console.log('🚀 ~ handleSelectEmoji ~ emoji:', emoji);
    // setValue(emoji.value);
    if (inputRef.current) {
      inputRef.current.innerHTML += emoji.value;
    }
  };

  return (
    <div className="comment-input">
      <div className="avatar">
        <img src={defaultAvatar} alt="头像" className="avatar-img" />
      </div>
      <div className="content">
        <div
          ref={inputRef}
          className={cl({
            'rich-input': !isPlain,
            'plain-input': isPlain,
          })}
          contentEditable={true}
          onInput={handleInput}
        />
        <div className="action-box">
          <EmojiPicker onConfirm={handleSelectEmoji}>
            <div className="emoji-box">
              <img className="icon" src={emojiImg} />
            </div>
          </EmojiPicker>
          <div className="image-box" onClick={handleUpload}>
            <img className="icon" src={imageImg} />
          </div>

          <div className="flex-placeholder" />
          <div className="text-count">
            {value.length} / {maxLength}
          </div>
          <Tooltip placement="top" title="command + enter">
            <button className="submit-box" onClick={handleSubmit} disabled={!value}>
              发送
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;

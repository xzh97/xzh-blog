import { ReactNode, useEffect, useRef, useState } from 'react';
import Popover from '../popover';
import groupList from 'unicode-emoji-json/data-by-group.json';
import './emojiPicker.scss';

interface EmojiPickerProps {
  children: ReactNode;
  onConfirm?: (emoji: Emoji) => void;
}

export interface Emoji {
  key: string;
  value: string;
}

const EmojiPicker = (props: EmojiPickerProps) => {
  const { children, onConfirm } = props;
  const [list, setList] = useState<Emoji[]>([]);
  const popoverRef = useRef<{ close: () => void }>(null);

  const transformEmoji = () => {
    const smileEmojis = groupList[0].emojis;
    const res: Emoji[] = [];
    smileEmojis.forEach(item => {
      res.push({
        key: item.name,
        value: item.emoji,
      });
    });

    setList(res);
  };

  useEffect(() => {
    transformEmoji();
  }, []);

  const handleSelect = (emoji: Emoji) => {
    popoverRef.current?.close();
    onConfirm?.(emoji);
  };

  const renderEmojiList = () => {
    return (
      <div className="emoji-list-wrapper">
        {list.map(emoji => (
          <div key={emoji.key} className="emoji-item" onClick={() => handleSelect(emoji)}>
            {emoji.value}
          </div>
        ))}
      </div>
    );
  };
  return (
    <Popover ref={popoverRef} placement="bottom" trigger="click" content={renderEmojiList()}>
      {children}
    </Popover>
  );
};

export default EmojiPicker;

import { func } from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import PlusIcon from './PlusIcon';
import SendIcon from './SendIcon';
import '@/styles/components/component.css';

SendMessageBar.propTypes = {
  onSend: func.isRequired,
};

export default function SendMessageBar({ onSend }) {
  const [message, setMessage] = useState('');
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const maxLength = 200;
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setMessage(newValue);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      setIsTextareaExpanded(textareaRef.current.scrollHeight > 38);
    }
  }, [message]);

  return (
    <div
      className={`w-full flex space-x-1.5 py-3 items-${isTextareaExpanded ? 'end' : 'center'} justify-center`}
    >
      <PlusIcon />
      <div className="w-[244px] bg-gray-100 px-3 py-2 rounded-2xl flex items-center">
        <textarea
          ref={textareaRef}
          className="w-full max-h-[72px] bg-transparent focus:outline-none text-base text-gray-700 resize-none overflow-y-auto no-scrollbar"
          placeholder="댓글을 입력해주세요."
          value={message}
          onChange={handleChange}
          rows={1}
        />
      </div>
      <SendIcon onClick={handleSend} />
    </div>
  );
}

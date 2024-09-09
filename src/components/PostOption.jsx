import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import IconTextBig from './IconTextBig';
import Counter from './Counter';

function PostOption({ icon, text, value, optionType }) {
  const [inputValue, setInputValue] = useState(value || '');

  return (
    <div className="flex items-center justify-between px-3 py-4 text-base">
      <IconTextBig icon={icon} text={text} />

      {optionType === 'date' && (
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      {optionType === 'time' && (
        <input
          type="time"
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      {optionType === 'select' && (
        <select
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option value="누구나">누구나</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      )}

      {optionType === 'counter' && <Counter min={2} max={8} />}
    </div>
  );
}

PostOption.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  optionType: PropTypes.oneOf(['date', 'time', 'select', 'counter']).isRequired,
};

export default memo(PostOption);

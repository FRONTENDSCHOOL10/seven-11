import PropTypes from 'prop-types';
import { memo } from 'react';
import IconTextBig from './IconTextBig';

function PostOption({ value }) {
  return (
    <div>
      <div className="flex items-center justify-between px-3 py-4">
        <IconTextBig icon="people" text="인원" />
        <span className="text-base font-medium">{value}</span>
      </div>
      <div className="flex items-center justify-between px-3 py-4">
        <IconTextBig icon="date" text="날짜" />
        <span className="text-base font-medium">{value}</span>
      </div>
      <div className="flex items-center justify-between px-3 py-4">
        <IconTextBig icon="time" text="시간" />
        <span className="text-base font-medium">{value}</span>
      </div>
      <div className="flex items-center justify-between px-3 py-4">
        <IconTextBig icon="gender" text="성별" />
        <span className="text-base font-medium">{value}</span>
      </div>
    </div>
  );
}

PostOption.propTypes = {
  value: PropTypes.string.isRequired, // 값 (예: '오늘', '오후 8:00')
};

export default memo(PostOption);

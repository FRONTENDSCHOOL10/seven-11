import { oneOf } from 'prop-types';
import { memo } from 'react';

function StatusBadge({ status }) {
  return <span className=" text-primary text-lg font-semibold">{status}</span>;
}

StatusBadge.propTypes = {
  status: oneOf(['모집중', '모집완료', 'Q&A']).isRequired,
};

export default memo(StatusBadge);

import { string } from 'prop-types';
import { memo } from 'react';

function Badge({ label }) {
  return (
    <div className="inline-flex items-center bg-primary text-white px-1 rounded">
      <span className="text-sm font-semibold leading-relaxed">{label}</span>
    </div>
  );
}

Badge.propTypes = {
  label: string.isRequired,
};

export default memo(Badge);

import clsx from 'clsx';
import { bool, string } from 'prop-types';
import { memo } from 'react';

function Badge({ label, isPrimary }) {
  const colorClass = clsx(isPrimary ? 'bg-primary' : 'bg-gray-300');
  return (
    <div
      className={`inline-flex items-center text-white px-1 rounded ${colorClass}`}
    >
      <span className="text-sm font-semibold leading-relaxed">{label}</span>
    </div>
  );
}

Badge.propTypes = {
  label: string.isRequired,
  isPrimary: bool,
};

export default memo(Badge);

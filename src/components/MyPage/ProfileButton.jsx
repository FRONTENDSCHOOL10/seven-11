import clsx from 'clsx';
import { bool, func, node } from 'prop-types';

ProfileButton.propTypes = {
  children: node.isRequired,
  onClick: func,
  disabled: bool,
};

export default function ProfileButton({ children, onClick, disabled = false }) {
  const bgClass = clsx(
    disabled
      ? 'bg-gray-200'
      : children === '취소'
        ? 'bg-gray-100'
        : 'bg-primary'
  );
  const borderClass = clsx(
    disabled
      ? 'border-gray-300'
      : children === '취소'
        ? 'border border-gray-200'
        : ''
  );


  return (
    <button
      type="button"
      className={`${bgClass} ${borderClass} px-[40px] py-2 rounded-[8px] text-base font-semibold min-w-[145px] w-full h-[37px]`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

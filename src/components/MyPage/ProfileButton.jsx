import clsx from 'clsx';
import { func, node } from 'prop-types';

ProfileButton.propTypes = {
  children: node.isRequired,
  onClick: func,
};

export default function ProfileButton({ children, onClick }) {
  const bgClass = clsx(children === '취소' ? 'bg-gray-100' : 'bg-primary');
  const borderClass = clsx(children === '취소' ? 'border border-gray-200' : '');

  return (
    <button
      type="button"
      className={`${bgClass} ${borderClass}  px-[40px] py-2 rounded-[8px] text-base font-semibold w-[145px] h-[37px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

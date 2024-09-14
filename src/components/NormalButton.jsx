import clsx from 'clsx';
import { bool, func, string } from 'prop-types';

NormalButton.propTypes = {
  label: string.isRequired,
  onClick: func,
  btnType: string,
  isDisabled: bool,
};

export default function NormalButton({ btnType, label, onClick, isDisabled }) {
  let type = 'button';
  if (btnType === 'submit') type = 'submit';

  const disabledClass = clsx(isDisabled ? 'bg-gray-300' : 'bg-primary');

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[296px] h-[45px] p-3 text-white rounded-button text-base font-semibold ${disabledClass}`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

import clsx from 'clsx';
import { bool, func, string } from 'prop-types';

NormalButton.propTypes = {
  label: string.isRequired,
  onClick: func,
  btnType: string,
  isDisabled: bool,
};

export default function NormalButton({ btnType, label, onClick, isDisabled }) {
  const type = btnType === 'submit' ? 'submit' : 'button';

  const buttonClass = clsx(
    'w-[296px] h-[45px] p-3 text-white rounded-button text-base font-semibold',
    {
      'bg-gray-300': isDisabled,
      'bg-primary ': !isDisabled,
    }
  );

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      className={buttonClass}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

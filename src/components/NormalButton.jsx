import { func, string } from 'prop-types';

NormalButton.propTypes = {
  label: string.isRequired,
  onClick: func,
  btnType: string,
};

export default function NormalButton({ btnType, label, onClick }) {
  let type = 'button';
  if (btnType === 'submit') type = 'submit';

  return (
    <button
      type={type}
      onClick={onClick}
      className="w-[296px] h-[45px] p-3 bg-primary text-white rounded-button text-base font-semibold  "
    >
      {label}
    </button>
  );
}

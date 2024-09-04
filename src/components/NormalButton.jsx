import { func, string } from 'prop-types';

NormalButton.propTypes = {
  label: string.isRequired,
  onClick: func,
};

export default function NormalButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[296px] h-[45px] p-3 bg-primary text-white rounded-button text-base font-semibold  "
    >
      {label}
    </button>
  );
}

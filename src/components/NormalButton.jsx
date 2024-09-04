import { func, string } from 'prop-types';

NormalButton.propTypes = {
  text: string.isRequired,
  onClick: func,
};

export default function NormalButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[296px] h-[45px] p-3 bg-primary text-white rounded-button text-base font-semibold  "
    >
      {text}
    </button>
  );
}

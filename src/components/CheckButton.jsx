import { string, func } from 'prop-types';

CheckButton.propTypes = {
  label: string,
  onClick: func,
};

function CheckButton({ label, onClick }) {
  return (
    <button
      className="border rounded border-gray-300 text-base font-bold w-[295px] h-[38px]  "
      type="button"
      id="CheckButton"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CheckButton;

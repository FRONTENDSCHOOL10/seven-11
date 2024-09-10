import { string, func, node } from 'prop-types';

CheckButton.propTypes = {
  label: node,
  onClick: func,
  textColor: string,
  bgColor: string,
  border: string,
  font: string,
  rounded: string,
};

function CheckButton({
  label,
  onClick,
  textColor = 'text-black',
  bgColor = 'bg-white',
  border = 'border-gray-300',
  font = 'text-base',
  rounded = 'rounded',
}) {
  return (
    <button
      className={`border rounded border-gray-300 text-base font-bold w-[295px] h-[38px] ${textColor} ${bgColor} ${border} ${font} ${rounded}`}
      type="button"
      id="CheckButton"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CheckButton;

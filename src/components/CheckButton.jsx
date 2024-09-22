import { string, func, node } from 'prop-types';

CheckButton.propTypes = {
  label: node,
  onClick: func,
  textColor: string,
  bgColor: string,
  border: string,
  font: string,
  rounded: string,
  height: string,
  id: string,
};

function CheckButton({
  label,
  onClick,
  textColor = 'text-black',
  bgColor = 'bg-white',
  border = 'border-gray-300',
  font = 'text-base',
  rounded = 'rounded',
  height = 'h-[38px]',
  id = 'CheckButton',
}) {
  return (
    <button
      className={`border rounded border-gray-300 text-base font-bold min-w-[295px] w-full h-[38px] ${textColor} ${bgColor} ${border} ${font} ${rounded} ${height}`}
      type="button"
      id={id}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CheckButton;

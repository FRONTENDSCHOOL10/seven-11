import { string } from 'prop-types';

DateButton.propTypes = {
  label: string,
};

function DateButton({ label }) {
  return (
    <button className="my-2 mx-1 text-gray-300 border rounded border-gray-300 text-base font-semibold w-[92px] h-[37px] flex items-center justify-center">
      {label}
    </button>
  );
}

export default DateButton;

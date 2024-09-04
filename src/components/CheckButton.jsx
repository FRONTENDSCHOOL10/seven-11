import { string, func } from 'prop-types';

CheckButton.propTypes = {
  label: string,
  onClick: func,
};

function CheckButton({ label, onClick }) {
  return (
    <section className="flex flex-col items-center justify-center">
      <button
        className=" my-2 border rounded border-gray-300 text-base font-bold w-[295px] h-[38px]  "
        type="button"
        id="CheckButton"
        onClick={onClick}
      >
        {label}
      </button>
    </section>
  );
}

export default CheckButton;

import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

ButtonComponent.propTypes = {
  label: string,
  onClick: func,
};

function ButtonComponent({ label, onClick }) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className=" m-2 border rounded border-gray-300 ">
        <button
          className="w-[295px] h-[38px] text-base font-bold"
          type="button"
          id="ButtonComponent"
          onClick={onClick}
        >
          {label}
        </button>
      </div>
    </section>
  );
}

export default ButtonComponent;

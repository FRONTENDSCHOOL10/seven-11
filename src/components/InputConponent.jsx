import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

InputComponent.propTypes = {
  placeholder: string,
  onchange: func,
};

function InputComponent({ placeholder, onchange }) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className=" m-2 border rounded border-black">
        <input
          className="w-[295px] h-[38px] text-base "
          type="text"
          id="InputComponent"
          placeholder={placeholder}
          onChange={onchange}
        />
      </div>
    </section>
  );
}

export default InputComponent;

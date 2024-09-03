import React from 'react';
import PropTypes from 'prop-types';

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

function InputComponent({ placeholder, onChange }) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="m-3 px-3 py-2 border rounded border-black w-fit">
        <input
          className="w-64 h-6 text-sm"
          type="text"
          id="InputComponent"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </section>
  );
}

export default InputComponent;

import { string, func, oneOf } from 'prop-types';
import { useState } from 'react';

InputText.propTypes = {
  placeholder: string,
  onChange: func,
  inputType: oneOf(['email', 'text', 'password']),
  name: string,
};

function InputText({ inputType, placeholder, onChange, name }) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    const userInputValue = e.target.value;
    setInputValue(userInputValue);
    onChange?.(userInputValue);
  };
  return (
    <div className="border rounded border-black w-[295px] h-[38px] ">
      <input
        className="pl-3 text-base w-full h-full rounded"
        type={inputType}
        id="InputText"
        name={name}
        placeholder={placeholder}
        onInput={handleInput}
        defaultValue={inputValue}
      />
    </div>
  );
}

export default InputText;

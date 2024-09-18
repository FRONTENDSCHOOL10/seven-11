import { string, func, oneOf } from 'prop-types';
import { memo } from 'react';

InputText.propTypes = {
  placeholder: string,
  value: string, // 부모 컴포넌트에서 전달된 값을 사용
  onChange: func, // onChange 콜백 함수 필요
  inputType: oneOf(['email', 'text', 'password']),
  name: string,
};

function InputText({ inputType, placeholder, onChange, value, name }) {
  const handleInput = (e) => {
    const userInputValue = e.target.value;
    onChange(userInputValue); // 부모 컴포넌트로 입력값 전달
  };

  const isAutoComplete = name === 'password' ? 'off' : '';

  return (
    <div className="border rounded border-black w-[295px] h-[38px]">
      <input
        className="pl-3 text-base w-full h-full rounded"
        autoComplete={isAutoComplete}
        type={inputType}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value} // 부모 컴포넌트에서 제어하는 value
        onChange={handleInput} // onChange 이벤트로 바로 전달
      />
    </div>
  );
}

export default memo(InputText);

import React from 'react';

function InputComponent() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className=" m-3 px-3 py-2 border rounded border-black w-fit">
        <input
          className="w-64 h-6 text-sm "
          type="text"
          id="InputComponent"
          placeholder="텍스트를 입력하세요"
        />
      </div>
    </section>
  );
}

export default InputComponent;

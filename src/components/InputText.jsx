import { string, func } from 'prop-types';

InputText.propTypes = {
  placeholder: string,
  onChange: func,
};

function InputText({ placeholder, onChange }) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className=" border rounded border-black w-[295px] h-[38px] ">
        <input
          className="pl-3 text-base w-full h-full rounded
           placeholder-gray-400"
          type="text"
          id="InputText"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </section>
  );
}

export default InputText;

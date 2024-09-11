import { string } from 'prop-types';

EditInput.propTypes = {
  placeholder: string,
};

export default function EditInput({ placeholder }) {
  return (
    <input
      type="text"
      className="flex border border-gray-300 rounded-[8px] text-base flex-grow w-[145px] h-[37px] py-1 px-[34px] text-center placeholder-black"
      placeholder={placeholder}
    />
  );
}

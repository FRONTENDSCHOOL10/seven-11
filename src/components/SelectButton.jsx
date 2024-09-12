import { useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';

SelectButton.propTypes = {
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default function SelectButton({ options }) {
  const [selected, setSelected] = useState(options[0].value);

  return (
    <div className="flex space-x-2 overflow-x-auto no-scrollbar">
      {options.map(({ value, label }) => (
        <button
          key={value}
          className={`px-3 py-2 rounded-full text-sm border box-border whitespace-nowrap ${
            selected === value
              ? 'bg-primary border-primary text-white'
              : 'bg-transparent border-gray-400 text-black'
          }`}
          onClick={() => setSelected(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

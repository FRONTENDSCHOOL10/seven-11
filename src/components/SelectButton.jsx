import { useState } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';

SelectButton.propTypes = {
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  onSelect: func.isRequired,
};

export default function SelectButton({ options, onSelect }) {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
  };

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
          onClick={() => handleSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

CategoryButton.propTypes = {
  smallText: PropTypes.string,
  largeText: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function CategoryButton({ smallText, largeText, isSelected, onClick }) {
  return (
    <button
      className={`flex items-center justify-between w-full h-[60px] rounded-lg p-2 flex-wrap 
        ${isSelected ? 'bg-primary' : 'bg-gray-300'}`}
      type="button"
      onClick={onClick}
    >
      <div className="flex flex-col text-left">
        <p className="text-white text-xs">{smallText}</p>
        <p
          className={`text-[17px] font-bold ${isSelected ? 'text-white' : 'text-black'}`}
        >
          {largeText}
        </p>
      </div>
      <div className="rounded-full flex items-center justify-center">
        <svg className="w-6 h-6">
          <use
            href={isSelected ? '/stack.svg#check' : '/stack.svg#plusCircle'}
          />
        </svg>
      </div>
    </button>
  );
}

export default CategoryButton;

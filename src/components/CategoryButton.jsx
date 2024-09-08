import React, { useState } from 'react';
import { string } from 'prop-types';
import plusIcon from '../../public/plus.svg';
import checkIcon from '../../public/check.svg';

CategoryButton.propTypes = {
  smallText: string,
  largeText: string,
};

function CategoryButton({ smallText, largeText }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleIconClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      className={`flex items-center justify-between w-[143px] h-[61px] rounded-lg p-2 flex-wrap my-1.5 
        ${isSelected ? 'bg-primary' : 'bg-gray-300'}`}
      type="button"
      onClick={handleIconClick}
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
        <img
          src={isSelected ? checkIcon : plusIcon}
          alt="icon"
          className="w-6 h-6"
        />
      </div>
    </button>
  );
}

export default CategoryButton;

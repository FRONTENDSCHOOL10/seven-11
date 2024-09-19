import React from 'react';
import PropTypes from 'prop-types';

CategoryButton.propTypes = {
  smallText: PropTypes.string,
  largeText: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired, // onClick 함수 prop 추가
};

function CategoryButton({ smallText, largeText, isSelected, onClick }) {
  return (
    <button
      className={`flex items-center justify-between w-[135px] h-[61px] rounded-lg p-2 flex-wrap my-1 
        ${isSelected ? 'bg-primary' : 'bg-gray-300'}`}
      type="button"
      onClick={onClick} // 클릭 시 onClick 함수 호출
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

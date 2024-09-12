import React, { useState } from 'react';

function GenderRadio() {
  const [selectedGender, setSelectedGender] = useState(null);

  const genders = [
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
  ];

  return (
    <div className="flex w-[295px]">
      {genders.map((gender) => (
        <div key={gender.value} className="flex items-center pr-3">
          <label htmlFor={gender.value} className="mr-3 text-base">
            {gender.label}
          </label>
          <input
            id={gender.value}
            type="radio"
            name="gender"
            value={gender.value}
            checked={selectedGender === gender.value}
            onChange={() => setSelectedGender(gender.value)}
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  );
}

export default GenderRadio;

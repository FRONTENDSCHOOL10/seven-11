import { func } from 'prop-types';
import React, { useState } from 'react';

PostImgButton.propTypes = {
  onClick: func,
};

const PostImgButton = ({ onClick }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + selectedImages.length > 10) {
      alert('이미지는 최대 10개만 등록 가능해요!');
      return;
    }

    const newSelectedImages = [...selectedImages, ...files];
    setSelectedImages(newSelectedImages);

    onClick?.(newSelectedImages);
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col justify-center items-center w-12 h-12 border border-gray-200 rounded-lg cursor-pointer"
        onClick={handleClick}
      >
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleImageUpload}
        />
        <div className="flex flex-col justify-center items-center">
          <svg className="w-[18px] h-[18px]">
            <use href="/stack.svg#camera" />
          </svg>
          <p className="text-sm text-gray-300">{selectedImages.length}/10</p>
        </div>
      </div>

      <div className="mt-4">
        {selectedImages.length > 0 && (
          <div>
            {selectedImages.map((image, index) => (
              <p key={index}>{image.name}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImgButton;

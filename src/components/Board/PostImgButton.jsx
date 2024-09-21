import { func, array } from 'prop-types';
import React, { useState, useEffect } from 'react';

PostImgButton.propTypes = {
  onClick: func,
  defaultThumbnail: array,
};

function PostImgButton({ onClick, defaultThumbnail = [] }) {
  const [selectedImages, setSelectedImages] = useState(defaultThumbnail);

  useEffect(() => {
    if (defaultThumbnail.length > 0) {
      setSelectedImages(defaultThumbnail);
    }
  }, [defaultThumbnail]);

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

  const handleDelete = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    onClick?.(updatedImages);
  };

  return (
    <div className="flex flex-col pb-3">
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

      <div className="mt-2">
        {selectedImages.length > 0 && (
          <div>
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-[240px] flex flex-row items-center gap-1"
              >
                <span className="text-sm truncate">
                  {typeof image === 'string' ? image : image.name}
                </span>
                <button type="button" onClick={() => handleDelete(index)}>
                  <svg className="w-[10px] h-[10px]">
                    <use href="/stack.svg#close" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostImgButton;

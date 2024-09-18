import { useState } from 'react';
import { func } from 'prop-types';

AddressSearch.propTypes = {
  onAddressSelect: func,
};

export default function AddressSearch({ onAddressSelect }) {
  const [address, setAddress] = useState(''); // 선택된 주소를 저장할 상태

  // 주소 찾기 버튼 클릭 시 호출될 함수
  const handleFindAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = data.address;
        setAddress(fullAddress); // 선택한 주소를 상태에 저장
        if (onAddressSelect) {
          onAddressSelect(fullAddress); // 상위 컴포넌트로 선택된 주소 전달
        }
      },
    }).open();
  };

  return (
    <div>
      <div className="my-3">
        <button
          type="button"
          onClick={handleFindAddress}
          className="border rounded border-gray-300 text-base font-bold w-[295px] h-[38px]"
        >
          {address ? address : '주소 찾기'}
        </button>
      </div>
    </div>
  );
}

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
        let fullAddress = '';

        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택한 경우
          fullAddress = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택한 경우
          fullAddress = data.jibunAddress;
        }

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

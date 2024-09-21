import { oneOf, string } from 'prop-types';
import { memo, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Counter from './Counter';
import IconTextBig from './IconTextBig';

PostOption.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  value: string,
  optionType: oneOf(['date', 'time', 'select', 'counter', 'location'])
    .isRequired,
  onChange: string.isRequired, // setOption 전달됨
};

function PostOption({ icon, text, value, optionType, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 주소 선택 완료시 호출되는 함수 (지번 주소만 설정)
  const onCompletePost = (data) => {
    setIsModalOpen(false); // 모달 닫기

    // 지번 주소만 사용
    const fullAddress = data.jibunAddress || '';

    // 법정동까지만 남기기: 예를 들어 "서울특별시 종로구 종로1가 24-5"라면 "종로1가"까지 추출
    const addr = fullAddress.split(' ').slice(0, 3).join(' '); // 도시, 구, 동까지만 추출
    onChange('location', addr); // 전역 상태에 저장
  };

  // 주소 찾기 버튼 클릭시 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center justify-between px-3 py-4 text-base">
      <IconTextBig icon={icon} text={text} />

      {/* 날짜 옵션 */}
      {optionType === 'date' && (
        <input
          type="date"
          className="w-[125px] border px-2 py-1 rounded"
          value={value}
          onChange={(e) => onChange('date', e.target.value)} // 상태 업데이트
        />
      )}

      {/* 시간 옵션 */}
      {optionType === 'time' && (
        <input
          type="time"
          className=" w-[125px] border px-2 py-1 rounded"
          value={value}
          onChange={(e) => onChange('time', e.target.value)} // 상태 업데이트
        />
      )}

      {/* 성별 선택 옵션 */}
      {optionType === 'select' && (
        <select
          className="w-[85px] border px-2 py-1 rounded"
          value={value}
          onChange={(e) => onChange('gender', e.target.value)} // 성별 상태 업데이트
        >
          <option value="누구나">누구나</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      )}

      {/* 인원수 옵션 */}
      {optionType === 'counter' && <Counter min={2} max={8} />}

      {/* 위치 선택 옵션 */}
      {optionType === 'location' && (
        <>
          <button
            onClick={handleOpenModal}
            className="w-[125px] border px-2 py-1 rounded"
          >
            {value ? value : '주소를 선택하세요'}
          </button>

          {/* 주소 찾기 모달 */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-right mb-2"
                >
                  닫기
                </button>
                <DaumPostcode onComplete={onCompletePost} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default memo(PostOption);

import { oneOf, string } from 'prop-types';
import { memo, useState } from 'react';
import IconTextBig from './IconTextBig';
import Counter from './Counter';
import DaumPostcode from 'react-daum-postcode';
import usePostOptionStore from '@/stores/usePostOptionsStore'; // Zustand store

PostOption.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  optionType: oneOf(['date', 'time', 'select', 'counter', 'location'])
    .isRequired,
};

function PostOption({ icon, text, optionType }) {
  const { options, setOption } = usePostOptionStore(); // Zustand store에서 옵션 가져오기
  const inputValue = options[optionType] || ''; // 해당 옵션 타입에 대한 현재 값
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 주소 선택 완료시 호출되는 함수 (지번 주소만 설정)
  const onCompletePost = (data) => {
    setIsModalOpen(false); // 모달 닫기

    // 지번 주소만 사용
    const fullAddress = data.jibunAddress || '';

    // 법정동까지만 남기기
    const addr = fullAddress.split(' ').slice(0, 3).join(' '); // 도시, 구, 동까지만 추출
    setOption('location', addr); // 전역 상태에 저장
  };

  // 주소 찾기 버튼 클릭시 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-3 py-4 text-base">
      <IconTextBig icon={icon} text={text} />

      {/* 날짜 옵션 */}
      {optionType === 'date' && (
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setOption('date', e.target.value)}
        />
      )}

      {/* 시간 옵션 */}
      {optionType === 'time' && (
        <input
          type="time"
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setOption('time', e.target.value)}
        />
      )}

      {/* 성별 선택 옵션 */}
      {optionType === 'select' && (
        <select
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setOption('gender', e.target.value)}
        >
          <option value="누구나">누구나</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      )}

      {/* 인원수 옵션 */}
      {optionType === 'counter' && (
        <Counter
          min={2}
          max={8}
          onChange={(value) => setOption('people', value)}
        />
      )}

      {/* 위치 선택 옵션 */}
      {optionType === 'location' && (
        <>
          <button
            onClick={handleOpenModal}
            className="border px-2 py-1 rounded"
          >
            {options.location ? options.location : '주소를 선택하세요'}
          </button>

          {/* 주소 찾기 모달 */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <button onClick={handleCloseModal} className="text-right mb-2">
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

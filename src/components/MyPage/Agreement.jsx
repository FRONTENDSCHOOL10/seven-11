import { useCallback } from 'react';
import SelectAgreement from './SelectAgreement';
import useAgreementStore from '@/stores/useAgreementStore';

export default function Agreement() {
  const { checkedItems, allChecked, setAllChecked, setItemChecked } =
    useAgreementStore((s) => ({
      checkedItems: s.checkedItems,
      allChecked: s.allChecked,
      setAllChecked: s.setAllChecked,
      setItemChecked: s.setItemChecked,
    }));

  const handleAllCheck = useCallback(
    (e) => {
      setAllChecked(e.target.checked);
    },
    [setAllChecked]
  );

  const handleItemCheck = useCallback(
    (item) => (e) => {
      setItemChecked(item, e.target.checked);
    },
    [setItemChecked]
  );

  return (
    <div className="pt-[13px]">
      <div className="flex flex-row items-center px-3 py-[14px] justify-between border-b border-gray-300 ">
        <div className="flex gap-[13px] items-center">
          <label htmlFor="allCheck" className="flex items-center gap-3">
            <input
              type="checkbox"
              name="모두 동의 체크박스"
              id="allCheck"
              className="w-4 h-4"
              checked={allChecked}
              onChange={handleAllCheck}
            />
            <span className="text-base font-semibold">
              아래 내용에 전체 동의합니다.
            </span>
          </label>
        </div>
        <span className="text-negative text-sm">필수동의</span>
      </div>
      <div className="px-3">
        <SelectAgreement
          isShowDisc={true}
          isShowDetail={false}
          checked={checkedItems.item1}
          onChange={handleItemCheck('item1')}
        >
          개인 정보 수집 및 이용 동의
        </SelectAgreement>
        <SelectAgreement
          isShowDisc={false}
          isShowDetail={true}
          checked={checkedItems.item2}
          onChange={handleItemCheck('item2')}
        >
          프로필 정보 노출 영역 확인
        </SelectAgreement>
        <SelectAgreement
          isShowDisc={false}
          isShowDetail={false}
          checked={checkedItems.item3}
          onChange={handleItemCheck('item3')}
        >
          사실과 다른 정보를 기재하여 발생한 문제에 대해서는 본인이 일체의
          책임을 부담하겠습니다.
        </SelectAgreement>
      </div>
    </div>
  );
}

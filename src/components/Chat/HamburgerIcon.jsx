import useChatListStore from '@/stores/useChatListStore';
import { memo } from 'react';

function HamburgerIcon() {
  const setModal = useChatListStore((s) => s.setToggleModal);
  return (
    <button type="button" onClick={setModal} aria-label="참여중인 이웃 보기">
      <svg className="w-5 h-5">
        <use href="/stack.svg#hamburger" />
      </svg>
    </button>
  );
}

export default memo(HamburgerIcon);

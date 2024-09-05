import useChatStore from '@/stores/useChatStore';
import { memo } from 'react';

function HamburgerIcon({}) {
  const setModal = useChatStore((s) => s.setModalOpen);
  return (
    <button type="button" onClick={setModal} aria-label="참여중인 이웃 보기">
      <svg className="w-5 h-5">
        <use href="/stack.svg#hamburger" />
      </svg>
    </button>
  );
}

export default memo(HamburgerIcon);

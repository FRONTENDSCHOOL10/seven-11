import useChatStore from '@/stores/useChatStore';
import { memo } from 'react';

function CancelIcon() {
  const setModal = useChatStore((s) => s.setModalClose);
  return (
    <button type="button" onClick={setModal}>
      <svg className="w-4 h-4">
        <use href="/stack.svg#close" />
      </svg>
    </button>
  );
}

export default memo(CancelIcon);

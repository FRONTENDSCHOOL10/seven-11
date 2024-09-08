import { bool, func } from 'prop-types';
import useUserStore from '../stores/useUserStore';

function MoreModal({ isVisible }) {
  const isAuthor = useUserStore((state) => state.isAuthor());

  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 flex items-end justify-end">
      <div className=" w-[113px] flex flex-col  bg-white rounded-es border-l border-b border-gray-100 shadow-md ">
        {isAuthor ? (
          <>
            <button
              className="flex items-center justify-center  w-full h-[56px] text-base border-b border-gray-100 "
              onClick={() => alert('수정')}
            >
              수정
            </button>
            <button
              className="flex items-center justify-center  w-full h-[56px] text-base  "
              onClick={() => alert('삭제')}
            >
              삭제
            </button>
          </>
        ) : (
          <button
            className="flex items-center justify-center  w-full h-[56px] text-base"
            onClick={() => alert('신고')}
          >
            신고
          </button>
        )}
      </div>
    </div>
  );
}

MoreModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
};

export default MoreModal;

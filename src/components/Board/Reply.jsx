import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { string, func, object } from 'prop-types';
import { memo, useState } from 'react';

Reply.propTypes = {
  content: string,
  replyId: string,
  onDelete: func,
  onUpdate: func,
  replyUser: object,
};

function Reply({ content, replyId, onDelete, onUpdate, replyUser }) {
  const authUser = getStorageData('authInfo').user;
  const authUserId = authUser.id; // 현재 로그인된 사용자 ID

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleDeleteClick = () => {
    onDelete(replyId);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    pb.collection('Question_Replies')
      .update(replyId, { reply: editedContent })
      .then(() => {
        setIsEditing(false);
        onUpdate(replyId, editedContent);
      });
  };

  return (
    <div className="w-full flex border-b px-[10px] mt-2">
      <div className="flex flex-col items-center justify-center mr-3">
        <img
          src={pb.files.getUrl(replyUser, replyUser.avatar)}
          className="w-[30px] h-[30px] rounded-full"
        />
        <span className="text-sm text-center mt-1">{replyUser.nickname}</span>
      </div>
      <div className="flex flex-grow justify-between items-center">
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              className="min-w-[190px] w-[200px] p-2 border rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="min-w-[190px] w-auto p-2">{content}</p>
          )}
        </div>
        <div className="flex gap-1 text-sm text-white">
          {authUserId === replyUser.id && (
            <>
              {isEditing ? (
                <button
                  className="border bg-primary rounded-md px-1 py-[2px] whitespace-nowrap"
                  onClick={handleSaveClick}
                >
                  완료
                </button>
              ) : (
                <button
                  className="border bg-gray-300 rounded-md px-1 whitespace-nowrap"
                  onClick={handleEditClick}
                >
                  수정
                </button>
              )}
              <button
                className="border bg-primary rounded-md px-1 py-[2px] whitespace-nowrap"
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Reply);

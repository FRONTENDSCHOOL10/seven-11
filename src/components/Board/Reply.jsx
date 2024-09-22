import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { string, func } from 'prop-types';
import { memo, useState } from 'react';

Reply.propTypes = {
  content: string,
  replyId: string,
  onDelete: func,
  onUpdate: func,
};

function Reply({ content, replyId, onDelete, onUpdate }) {
  const user = getStorageData('authInfo').user;

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
    <div className="w-full flex border-b pl-[10px] mt-2">
      <div className="flex flex-col items-center justify-center">
        <img
          src={pb.files.getUrl(user, user.avatar)}
          className="w-[30px] h-[30px] rounded-full"
        />
        <span className="text-sm">{user.nickname}</span>
      </div>
      <div className="flex justify-between items-center ml-3">
        {isEditing ? (
          <input
            type="text"
            className="w-[190px] p-2 mr-2 border rounded"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="w-[190px] p-2 mr-2">{content}</p>
        )}
        <div className="flex gap-1 text-sm text-white">
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
        </div>
      </div>
    </div>
  );
}

export default memo(Reply);
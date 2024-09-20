import { Badge, SendMessageBar, TopNav } from '@/components';
import PostUser from '@/components/Board/PostUser';
import Reply from '@/components/Board/Reply';
import useAuthorStore from '@/stores/useAuthorStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import usePostStore from '@/stores/usePostStore'; // Zustand store 가져오기
import pb from '@/api/pb';

export default function QuestionDetailPage() {
  const param = useParams();
  const {
    post,
    replies,
    setPost,
    setReplies,
    addReply,
    deleteReply,
    updateReply,
  } = usePostStore();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [category, setCategory] = useState(null);

  const { setPostAuthorId, isAuthor } = useAuthorStore();

  const id = param.postId;

  // 질문 게시글과 댓글 불러오기
  useEffect(() => {
    setLoading(true);
    setPost(id).then(() => setLoading(false));
    setReplies(id);
  }, [id, setPost, setReplies]);

  const userID = post.userID;

  // 사용자 정보 불러오기
  useEffect(() => {
    if (userID) {
      setUserLoading(true);
      pb.collection('users')
        .getOne(userID)
        .then((r) => {
          setUser(r);
          setUserLoading(false);
        });
    }
  }, [userID]);

  useEffect(() => {
    setPostAuthorId(userID);
    isAuthor(user.id);
  }, [id, isAuthor, setPostAuthorId, user.id, userID]);

  const selectedCategoryId = post.category;

  // 카테고리 불러오기
  useEffect(() => {
    if (selectedCategoryId) {
      pb.collection('Categories')
        .getOne(selectedCategoryId)
        .then((r) => setCategory(r.category_name))
        .catch((err) => console.error(err));
    }
  }, [selectedCategoryId]);

  const { title, content, thumbnail } = post;

  // 로딩 스피너
  if (loading || userLoading) {
    return (
      <>
        <h1 className="sr-only">질문 게시글</h1>
        <TopNav to={'/home/board'} />
        <div className="h-[80vh] flex justify-center items-center">
          <FadeLoader color="#79b2d1" />
        </div>
      </>
    );
  }

  const handleReply = (value) => {
    const newData = {
      reply: value,
      user: user.id,
      post: post.id,
    };

    pb.collection('Question_Replies')
      .create(newData)
      .then((createdReply) => {
        addReply(createdReply); // 댓글 추가
      });
  };

  const handleDeleteReply = (replyId) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      pb.collection('Question_Replies')
        .delete(replyId)
        .then(() => {
          deleteReply(replyId); // 댓글 삭제
        });
    }
  };

  const handleUpdateReply = (replyId, newContent) => {
    updateReply(replyId, newContent);
  };

  return (
    <>
      <h1 className="sr-only">질문 게시글</h1>
      <TopNav to={'/home/board'} />
      <div className="px-3">
        <div className="my-3">
          {category && <Badge label={category} isPrimary={true} />}
        </div>
        <div className="flex flex-col gap-3">
          <PostUser user={user} />
          <button className="flex items-center gap-1 text-sm">
            <svg className="w-3 h-3">
              <use href="/stack.svg#plus" />
            </svg>
            <span>관심</span>
          </button>
          <h2 className="font-semibold text-lg mb-1">
            <span className="text-primary">Q. </span>
            {title}
          </h2>
        </div>
        <p className="text-base mb-[21px]">{content}</p>
        <div className="flex flex-col gap-2">
          {thumbnail &&
            thumbnail.map((img, index) => {
              return (
                <img
                  src={`${pb.files.getUrl(post, img)}`}
                  key={index}
                  className="rounded-[4px]"
                />
              );
            })}
        </div>
      </div>

      <div className='fixed bottom-0 pl-2'>
        <SendMessageBar onSend={handleReply} />
      </div>

      {replies.map((replyData, index) => (
        <Reply
          key={index}
          content={replyData.reply}
          replyId={replyData.id}
          onDelete={handleDeleteReply}
          onUpdate={handleUpdateReply}
        />
      ))}
    </>
  );
}

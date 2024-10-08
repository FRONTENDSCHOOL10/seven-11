import pb from '@/api/pb';
import { AuthorProfile, Badge, IconTextSmall, StatusBadge } from '@/components'; // StatusBadge 추가
import TopNav from '@/components/TopNav';
import NormalButton from '@/components/NormalButton'; // 버튼 추가
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../stores/useAuthorStore';
import { formatTime } from '@/utils/formatTime';
import { FadeLoader } from 'react-spinners';

function StudyDetailPage() {
  const { studyPostId } = useParams();
  const navigate = useNavigate();

  const [studyPostData, setStudyPostData] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setCurrentUserId = useUserStore((state) => state.setCurrentUserId);
  const setPostAuthorId = useUserStore((state) => state.setPostAuthorId);
  const postAuthorId = useUserStore((state) => state.postAuthorId);
  const currentUserId = useUserStore((state) => state.currentUserId);

  const [joinedPeople, setJoinedPeople] = useState(0);
  const [peopleLimit, setPeopleLimit] = useState(0);
  const [status, setStatus] = useState('모집중');

  useEffect(() => {
    async function fetchStudyPostData() {
      try {
        const user = pb.authStore.model;
        if (!user) {
          console.error('사용자가 로그인되지 않았습니다.');
          alert('로그인이 필요합니다.');
          navigate('/login');
          return;
        }

        const userId = user.id;
        setCurrentUserId(userId);

        const studyPost = await pb
          .collection('Study_Posts')
          .getFirstListItem(`id="${studyPostId}"`, {
            expand: 'user,category,chatroom',
          });

        setStudyPostData(studyPost);

        const postAuthorId = studyPost.expand?.user?.id || '작성자 없음';
        setPostAuthorId(postAuthorId);

        setCategory(
          studyPost.expand?.category || { category_name: '카테고리 없음' }
        );

        const chatroom = studyPost.expand?.chatroom;
        if (chatroom && chatroom.user) {
          setJoinedPeople(chatroom.user.length);
        }

        const limit = studyPost.people || 0;
        setPeopleLimit(limit);

        if (chatroom?.user.length >= limit) {
          setStatus('모집완료');
        } else {
          setStatus('모집중');
        }

        setLoading(false);
      } catch (error) {
        console.error('스터디 모집글 정보를 가져오는데 실패했습니다:', error);
        setError('스터디 정보를 가져오는데 문제가 발생했습니다.');
        setLoading(false);
      }
    }

    fetchStudyPostData();
  }, [studyPostId, setCurrentUserId, setPostAuthorId, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const goToChatRoom = () => {
    const chatRoomId = studyPostData.expand?.chatroom?.id;

    if (chatRoomId) {
      navigate(`/home/chat/${chatRoomId}`);
    } else {
      console.log('채팅방을 찾을 수 없습니다.');
      alert(
        '채팅방을 찾을 수 없습니다. 채팅방이 아직 생성되지 않았을 수 있습니다.'
      );
    }
  };

  const joinChatRoom = async () => {
    try {
      const chatRoomId = studyPostData.expand?.chatroom?.id;
      if (chatRoomId) {
        const currentUser = pb.authStore.model;

        if (!currentUser) {
          alert('로그인이 필요합니다.');
          navigate('/login');
          return;
        }

        const chatRoomData = await pb
          .collection('ChatRooms')
          .getOne(chatRoomId);
        const updatedUsers = chatRoomData.user || [];

        if (!updatedUsers.includes(currentUser.id)) {
          updatedUsers.push(currentUser.id);

          await pb.collection('ChatRooms').update(chatRoomId, {
            user: updatedUsers,
          });
        }

        goToChatRoom();
      } else {
        console.log('채팅방을 찾을 수 없습니다.');
        alert(
          '채팅방을 찾을 수 없습니다. 채팅방이 아직 생성되지 않았을 수 있습니다.'
        );
      }
    } catch (error) {
      console.error('채팅방 참가 중 오류 발생:', error);
      alert('채팅방에 참가하는 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <TopNav to="/home" />
      <div className="px-3">
        <Badge
          label={category ? category.category_name : '카테고리 없음'}
          isPrimary={true}
        />

        <div className="font-bold text-lg mt-2">
          <StatusBadge status={status} />{' '}
          {studyPostData.title || '스터디 제목 없음'}
        </div>

        <div className="mt-3">
          <IconTextSmall
            icon="people"
            text={`${studyPostData.gender || 'N/A'} 참여 가능`}
          />
          <IconTextSmall
            icon="date"
            text={`${formatDate(studyPostData.date)} ${formatTime(studyPostData.time) || 'N/A'}`}
          />
          <IconTextSmall
            icon="fullMap"
            text={` ${studyPostData.location || 'N/A'}`}
          />
        </div>

        <div className="mt-5 min-h-60 text-gray-800">
          {studyPostData.content || '내용이 없습니다.'}
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-semibold">
            참여중인 이웃 {joinedPeople}/{peopleLimit}
          </p>
          <AuthorProfile />
        </div>

        <div className="mt-10 flex justify-center">
          {currentUserId === postAuthorId ? (
            <NormalButton
              label="채팅방으로 이동"
              onClick={goToChatRoom}
              className="bg-primary text-white py-3 px-10 rounded-lg"
            />
          ) : (
            <NormalButton
              label="참여하기"
              onClick={joinChatRoom}
              className={`${
                status === '모집완료' ? 'bg-gray-300' : 'bg-primary'
              } text-white py-3 px-10 rounded-lg`}
              isDisabled={status === '모집완료'}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default StudyDetailPage;

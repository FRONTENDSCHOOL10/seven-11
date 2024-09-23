import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pb from '@/api/pb';
import { FadeLoader } from 'react-spinners';

export default function PostDetail() {
  const { postId } = useParams(); // URL에서 postId 파라미터 가져오기
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('Question_Posts').getOne(postId);
        setPost(record);
      } catch (error) {
        console.error('글 데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.content}</p>
    </div>
  );
}

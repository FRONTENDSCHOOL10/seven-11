import RootLayout from '@/layouts/RootLayout';
import { configRoutes, getNavigationItems } from './utils/index';
import { createBrowserRouter } from 'react-router-dom';

import {
  QuestionPost,
  LandingPage,
  SelectCategory,
  SignUp,
  CheckEmail,
  Login,
  Search,
  StudyPost,
  Chatroom,
  UserProfile,
  StudyDetailPage,
  QuestionDetailPage, // 이미 임포트되어 있음
  QuestionEdit,
  StudyEdit,
} from './pages/index';
import navigation from './navigation';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/categories',
    element: <SelectCategory />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/check-email',
    element: <CheckEmail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/home/qna-post',
    element: <QuestionPost />,
  },
  {
    path: '/home/qna-edit/:postId',
    element: <QuestionEdit />,
  },
  {
    path: '/home/study-post',
    element: <StudyPost />,
  },
  {
    path: '/home/study-edit/:postId',
    element: <StudyEdit />,
  },

  {
    path: '/home/chat/:roomId',
    element: <Chatroom />,
  },
  {
    path: 'profile',
    element: <UserProfile />,
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
  {
    path: '/home/study-detail/:studyPostId',
    element: <StudyDetailPage />, // 스터디 상세 페이지 라우트
  },
  {
    path: '/home/board/qna-detail/:postId',
    element: <QuestionDetailPage />, // 질문 상세 페이지 라우트
  },
  {
    path: '/profile/:id',
    element: <UserProfile />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);

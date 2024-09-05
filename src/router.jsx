import RootLayout from '@/layouts/RootLayout';
import { configRoutes, getNavigationItems } from './utils/index';
import { createBrowserRouter } from 'react-router-dom';

import {
  QuestionPost,
  HomePage,
  UserProfile,
  EditProfile,
  ProfileDetail,
  LandingPage,
  SelectCategory,
  SignUp,
  CheckEmail,
  Login,
  Search,
  StudyPost,
  Chatroom,
} from './pages/index';

const navigation = [
  {
    text: '홈',
    path: '/home',
    icon: '#home',
    activeIcon: '#fullHome',
    element: <HomePage />,
  },
  {
    text: '게시판',
    path: 'board',
    icon: '#file',
    activeIcon: '#fullFile',
    lazy: () => import('@/pages/QuestionPage/QuestionPage'),
  },
  {
    text: '내 근처',
    path: 'map',
    icon: '#map',
    activeIcon: '#fullMap',
    lazy: () => import('@/pages/Map'),
  },
  {
    text: '채팅',
    path: 'chat',
    icon: '#chat',
    activeIcon: '#fullChat',
    lazy: () => import('@/pages/Chat/Chatrooms'),
  },
  {
    text: '마이 페이지',
    path: 'user-info',
    icon: '#my',
    activeIcon: '#fullMy',
    lazy: () => import('@/pages/Profile/MyPage'),
  },
  {
    text: '프로필 페이지',
    path: 'profile',
    element: <UserProfile />,
    display: 'none',
  },
  {
    text: '프로필 편집',
    path: 'profile-edit',
    element: <EditProfile />,
    display: 'none',
  },
  {
    text: '프로필 상세',
    path: 'profile-detail',
    element: <ProfileDetail />,
    display: 'none',
  },
];

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
    path: '/home/study-post',
    element: <StudyPost />,
  },

  {
    path: '/home/chat/:roomId',
    element: <Chatroom />,
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);

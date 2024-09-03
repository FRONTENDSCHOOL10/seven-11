import RootLayout from '@/layouts/RootLayout';
import { QuestionPost } from '@/pages/QuestionPage/QuestionPost';
import { createBrowserRouter } from 'react-router-dom';
import CheckEmail from './pages/CheckEmail';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Search from './pages/Search';
import SelectCategory from './pages/SelectCategory';
import SignUp from './pages/SignUp';
import StudyPost from './pages/StudyPost';
import { configRoutes, getNavigationItems } from './utils/index';
import LandingPage from './pages/LandingPage';

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
    path: 'mypage',
    icon: '#my',
    activeIcon: '#fullMy',
    lazy: () => import('@/pages/MyPage'),
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
    path: '/home/board/post',
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
import { Chatroom } from './pages/Chat/Chatroom';

export default router;

export const navigationItems = getNavigationItems(navigation);

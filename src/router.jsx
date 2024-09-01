import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import HomePage from './pages/HomePage';
import { configRoutes, getNavigationItems } from './utils/index';
import LandingPage from './pages/LandingPage';
import SelectCategory from './pages/SelectCategory';
import SignUp from './pages/SignUp';
import CheckEmail from './pages/CheckEmail';
import Login from './pages/Login';
import Search from './pages/Search';
import { QuestionPost } from '@/pages/QuestionPage/QuestionPost';
import StudyPost from './pages/StudyPost';

const navigation = [
  {
    text: '홈',
    path: '/home',
    element: <HomePage />,
  },
  {
    text: '게시판',
    path: 'board',
    lazy: () => import('@/pages/QuestionPage/QuestionPage'),
  },
  {
    text: '내주변',
    path: 'map',
    lazy: () => import('@/pages/Map'),
  },
  {
    text: '채팅',
    path: 'chat',
    lazy: () => import('@/pages/Chat/Chatrooms'),
    children: [
      {
        path: ':roomId',
        lazy: () => import('@/pages/Chat/Chatroom'),
      },
    ],
  },
  {
    text: '마이 페이지',
    path: 'mypage',
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

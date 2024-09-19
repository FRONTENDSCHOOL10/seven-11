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
    path: '/home/study-post',
    element: <StudyPost />,
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
    path: '/home/study-detail/:postId',
    element: <StudyDetailPage />,
  },
  // {
  //   path: '/home/board/qna-detail/:postId',
  //   element: <QuestionDetailPage />,
  // },

  {
    path: '/profile/:id',
    element: <UserProfile />,
  },

  // Q&A 디테일: home/board/qna-detail/:postId
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);

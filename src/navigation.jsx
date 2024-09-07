import {
  EditProfile,
  HomePage,
  MyPage,
  ProfileDetail,
  UserProfile,
} from '@/pages';
import ProfileRootLayout from './layouts/ProfileRootLayout';

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
    lazy: () => import('./pages/QuestionPage/QuestionPage'),
  },
  {
    text: '내 근처',
    path: 'map',
    icon: '#map',
    activeIcon: '#fullMap',
    lazy: () => import('./pages/Map'),
  },
  {
    text: '채팅',
    path: 'chat',
    icon: '#chat',
    activeIcon: '#fullChat',
    lazy: () => import('./pages/Chat/Chatrooms'),
  },
  {
    text: '마이 페이지',
    path: 'user-info',
    icon: '#my',
    activeIcon: '#fullMy',
    element: <ProfileRootLayout />,
    children: [
      {
        text: '마이 페이지',
        index: true,
        element: <MyPage />,
        display: 'none',
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
    ],
  },
];

export default navigation;

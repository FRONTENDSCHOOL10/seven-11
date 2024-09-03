import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function FooterNav() {
  const [items] = useState([
    { path: '/home', text: '홈', icon: '#home', activeIcon: '#fullHome' },
    { path: '/board', text: '게시판', icon: '#file', activeIcon: '#fullFile' },
    { path: '/nearby', text: '내 근처', icon: '#map', activeIcon: '#fullMap' },
    { path: '/chat', text: '채팅', icon: '#chat', activeIcon: '#fullChat' },
    { path: '/profile', text: '나의 이름', icon: '#my', activeIcon: '#fullMy' },
  ]);

  return (
    <nav className="bg-white border-t border-gray-100 absolute bottom-0 w-full">
      <ul className="flex justify-around p-2">
        {items.map((item, index) => (
          <li key={index} className="flex-1 text-center">
            <NavLink
              to={item.path}
              end={item.path?.endsWith('/') ?? false}
              className="flex flex-col items-center text-sm"
            >
              {({ isActive }) => (
                <>
                  <svg className="w-6 h-6 mb-1">
                    <use
                      href={`/stack.svg${isActive ? item.activeIcon : item.icon}`}
                    />
                  </svg>
                  <span>{item.text}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

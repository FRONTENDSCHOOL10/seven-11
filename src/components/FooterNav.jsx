import { memo } from 'react';
import { navigationItems } from '@/router';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PostButton from './PostButton';

function FooterNav() {
  const [items] = useState(navigationItems);
  const location = useLocation();

  const showPostButton =
    location.pathname === '/home' || location.pathname === '/home/board';

  return (
    <div className="relative">
      <nav className="fixed bottom-0 min-w-[319px] w-full max-w-[428px] bg-white border-t box-border border-gray-100 z-40">
        <ul className="flex justify-around p-2">
          {items.map((item, index) => (
            <li key={index} className="flex-1 text-center">
              <NavLink
                to={item.path}
                end={item.path === '/home'}
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
        {showPostButton && <PostButton />}
      </nav>
    </div>
  );
}

export default memo(FooterNav);

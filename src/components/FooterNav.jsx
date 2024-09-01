import { navigationItems } from '@/router';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function FooterNav() {
  const [items] = useState(navigationItems);
  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} end={item.path?.endsWith('/') ?? false}>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

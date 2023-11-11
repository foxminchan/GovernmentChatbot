import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navSupport = [
  {
    id: 1,
    name: 'Điều khoản sử dụng',
    link: '/dieu-khoan-su-dung',
    currrent: false,
  },
  {
    id: 2,
    name: 'Hướng dẫn sử dụng',
    link: '/huong-dan-su-dung',
    currrent: false,
  },
  { id: 3, name: 'Thông báo', link: '/thong-bao', currrent: false },
];

export default function SubNavbar() {
  return (
    <div className="hidden bg-japonica-500 h-11 left-44 md:flex-row">
      {navSupport.map((subItem) => (
        <NavLink
          key={subItem.id}
          to={subItem.link}
          className={clsx(
            'w-auto h-11 flex items-center px-3 text-white',
            'hover:bg-japonica-400 hover:text-white',
            window.location.pathname === subItem.link
              ? 'bg-japonica-400'
              : 'bg-japonica-500'
          )}
        >
          <span className="text-xl font-medium">{subItem.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

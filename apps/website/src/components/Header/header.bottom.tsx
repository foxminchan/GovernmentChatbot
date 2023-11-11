import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navSupport = [
  { name: 'Điều khoản sử dụng', link: '/dieu-khoan-su-dung', currrent: false },
  { name: 'Hướng dẫn sử dụng', link: '/huong-dan-su-dung', currrent: false },
  { name: 'Thông báo', link: '/thong-bao', currrent: false },
];

export default function HeaderBottom() {
  return (
    <div className="lg:flex bg-japonica-500 h-11 left-44 flex space-x-4">
      {navSupport.map((subItem) => (
        <NavLink
          key={subItem.name}
          to={subItem.link}
          className={clsx(
            'w-56 h-11 flex items-center px-3 text-white',
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

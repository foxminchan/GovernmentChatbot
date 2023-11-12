import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navSupport = [
  {
    id: 1,
    name: 'Điều khoản sử dụng',
    link: '/dieu-khoan-su-dung',
    current: false,
  },
  {
    id: 2,
    name: 'Hướng dẫn sử dụng',
    link: '/huong-dan-su-dung',
    current: false,
  },
  { id: 3, name: 'Thông báo', link: '/thong-bao', current: false },
];

export default function SubNavbar() {
  return (
    <div className="hidden bg-japonica-500 h-11 sm:flex pl-44">
      {navSupport.map((subItem) => (
        <NavLink
          key={subItem.id}
          to={subItem.link}
          className={clsx(
            'w-auto h-11 flex items-center px-3 text-white',
            'hover:bg-japonica-600 hover:text-white',
            window.location.pathname === subItem.link
              ? 'bg-japonica-600'
              : 'bg-japonica-400'
          )}
        >
          <span className="text-xl font-medium">{subItem.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

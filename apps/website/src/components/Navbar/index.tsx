import clsx from 'clsx';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Giới thiệu', link: '/', currrent: false, width: 'w-28' },
  { name: 'Thanh toán trực tuyến', link: '/', currrent: false, width: 'w-60' },
  { name: 'Chatbot', link: '/', currrent: false, width: 'w-28' },
  { name: 'Hỗ trợ', link: '/', currrent: false, subMenu: true, width: 'w-24' },
];
const navSupport = [
  { name: 'Điều khoản sử dụng', link: '/', currrent: false },
  { name: 'Hướng dẫn sử dụng', link: '/', currrent: false },
  { name: 'Thông báo', link: '/', currrent: false },
];

export default function Navbar() {
  const [subMenuVisibility, setSubMenuVisibility] = useState<
    Record<string, boolean>
  >({});

  const showSubMenu = (itemName: string) => {
    setSubMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [itemName]: true,
    }));
  };

  const hideSubMenu = (itemName: string) => {
    setSubMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [itemName]: false,
    }));
  };

  return (
    <nav className="w-full h-11 bg-white-smoke-100 left-44">
      <ul className="relative flex w-auto h-full left-44">
        <li className="w-12 h-full bg-japonica-500 ">
          <Link
            to="/"
            className="flex items-center justify-center w-full h-full"
          >
            <FaHome className="w-5 h-5 text-white" />
          </Link>
        </li>
        {navItems.map((item) => (
          <li
            key={item.name}
            onMouseEnter={() => showSubMenu(item.name)}
            onMouseLeave={() => hideSubMenu(item.name)}
            className={clsx(
              'h-full',
              'hover:bg-japonica-500',
              'hover:text-white',
              'text-dark-moderate-blue-800',
              item.width
            )}
          >
            <Link
              to={item.link}
              className="flex items-center justify-center w-full h-full"
            >
              <span className="text-xl font-medium">{item.name}</span>
            </Link>
            {item.subMenu && subMenuVisibility[item.name] && (
              <ul>
                {navSupport.map((item) => (
                  <li
                    key={item.name}
                    className="w-56 h-12 text-white bg-japonica-400 hover:bg-japonica-500 hover:text-white"
                  >
                    <Link
                      to="/"
                      className="flex items-center w-full h-full px-3 text-left"
                    >
                      <span className="text-xl font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

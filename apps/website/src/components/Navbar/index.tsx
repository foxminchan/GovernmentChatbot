import clsx from 'clsx';
import { useState } from 'react';
import { FaBars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Giới thiệu', link: '/introduction', currrent: false, width: 'w-28' },
  {
    name: 'Thanh toán trực tuyến',
    link: '/online-payment',
    currrent: false,
    width: 'w-60',
  },
  { name: 'Chatbot', link: '/chat', currrent: false, width: 'w-28' },
  {
    name: 'Hỗ trợ',
    link: '/policy',
    currrent: false,
    subMenu: true,
    width: 'w-24',
  },
];

const navSupport = [
  { name: 'Điều khoản sử dụng', link: '/policy', currrent: false },
  { name: 'Hướng dẫn sử dụng', link: '/guide', currrent: false },
  { name: 'Thông báo', link: '/notification', currrent: false },
];

const navToggleMenu = [
  { name: 'Đăng nhập', link: '/sign-in', currrent: false },
  { name: 'Đăng ký', link: '/sign-up', currrent: false },
];

export default function Navbar() {
  const [subMenuVisibility, setSubMenuVisibility] = useState<
    Record<string, boolean>
  >({});
  const [menuVisible, setMenuVisible] = useState(false);

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="w-full h-11 bg-white-smoke-100 left-44">
      {menuVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] md:hidden"></div>
      )}
      <div className="relative flex w-auto h-full left-44">
        <div className="w-12 h-full bg-japonica-500">
          <Link
            to="/"
            className="flex items-center justify-center w-full h-full"
          >
            <FaHome className="w-5 h-5 text-white" />
          </Link>
        </div>
        <div className="hidden md:flex">
          <ul className="flex h-full">
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
                    {navSupport.map((subItem) => (
                      <li
                        key={subItem.name}
                        className="w-56 h-12 text-white bg-japonica-400 hover:bg-japonica-500 hover:text-white"
                      >
                        <Link
                          to={subItem.link}
                          className="flex items-center w-full h-full px-3 text-left"
                        >
                          <span className="text-xl font-medium">
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden bg-japonica-500">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2">
            <FaBars className="w-6 h-6" color="white" />
          </button>
        </div>
      </div>
      {menuVisible && (
        <div
          className={clsx(
            'md:hidden bg-white-smoke-100 top-0 left-0 px-[15px] pt-2 absolute z-10',
            menuVisible
              ? 'h-full w-[260px] transition-all duration-[0.3s]'
              : 'w-0 transition-all duration-[0.3s]'
          )}
        >
          <ul className="flex flex-col items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="w-full h-12 text-center hover:bg-japonica-500 hover:text-white"
              >
                <Link
                  to={item.link}
                  onClick={toggleMenu}
                  className="flex items-center w-full h-full px-3"
                >
                  <span className="text-xl font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {navToggleMenu.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="flex items-center justify-center w-full h-12 my-2 border rounded border-japonica-500 hover:bg-japonica-500 hover:text-white"
            >
              <span className="text-xl font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

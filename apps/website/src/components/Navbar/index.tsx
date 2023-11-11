import clsx from 'clsx';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';
import { FaBars, FaHome } from 'react-icons/fa';

const navItems = [
  { name: 'Giới thiệu', link: '/gioi-thieu', currrent: false, width: 'w-28' },
  {
    name: 'Thanh toán trực tuyến',
    link: '/thanh-toan-truc-tuyen',
    currrent: false,
    width: 'w-60',
  },
  { name: 'Chatbot', link: '/chat-bot', currrent: false, width: 'w-28' },
  {
    name: 'Hỗ trợ',
    link: '/dieu-khoan-su-dung',
    currrent: false,
    subMenu: true,
    width: 'w-24',
  },
];

const navSupport = [
  { name: 'Điều khoản sử dụng', link: '/dieu-khoan-su-dung', currrent: false },
  { name: 'Hướng dẫn sử dụng', link: '/huong-dan-su-dung', currrent: false },
  { name: 'Thông báo', link: '/thong-bao', currrent: false },
];

const navToggleMenu = [
  { name: 'Đăng nhập', link: '/dang-nhap', currrent: false },
  { name: 'Đăng ký', link: '/dang-ky', currrent: false },
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
        <Container
          className="absolute top-0 left-0 w-full h-full bg-[#00000033] lg:hidden"
          onClick={toggleMenu}
        ></Container>
      )}
      <div className="relative left-0 flex justify-center w-auto h-full lg:left-44 lg:justify-start">
        <div
          className={clsx(
            'w-12 h-full',
            window.location.pathname === '/'
              ? 'bg-japonica-500'
              : 'bg-white-smoke-100'
          )}
        >
          <NavLink
            to="/"
            className="flex items-center justify-center w-full h-full"
          >
            <FaHome
              className={clsx(
                'w-5 h-5',
                window.location.pathname === '/'
                  ? 'text-white'
                  : 'text-dark-moderate-blue-800'
              )}
            />
          </NavLink>
        </div>
        <div className="hidden lg:flex">
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
                  item.width,
                  window.location.pathname === item.link ||
                    (item.subMenu &&
                      navSupport.some((subItem) =>
                        window.location.pathname.includes(subItem.link)
                      ))
                    ? 'bg-japonica-500 text-white'
                    : 'bg-white-smoke-100'
                )}
              >
                <NavLink
                  to={item.link}
                  className="flex items-center justify-center w-full h-full"
                >
                  <span className="text-xl font-medium">{item.name}</span>
                </NavLink>
                {item.subMenu && subMenuVisibility[item.name] && (
                  <ul>
                    {navSupport.map((subItem) => (
                      <li
                        key={subItem.name}
                        className={clsx(
                          'w-56 h-12 text-white hover:bg-japonica-500 hover:text-white',
                          window.location.pathname === subItem.link
                            ? 'bg-japonica-500 text-white'
                            : 'bg-japonica-400'
                        )}
                      >
                        <NavLink
                          to={subItem.link}
                          className="flex items-center w-full h-full px-3 text-left"
                        >
                          <span className="text-xl font-medium">
                            {subItem.name}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden bg-japonica-500">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2">
            <FaBars className="w-6 h-6" color="white" />
          </button>
        </div>
      </div>
      {menuVisible && (
        <div
          className={clsx(
            'lg:hidden bg-white-smoke-100 top-0 left-0 px-[15px] pt-2 absolute z-10',
            menuVisible
              ? 'h-full w-[260px] transition-all duration-[0.3s]'
              : 'w-0 transition-all duration-[0.3s]'
          )}
        >
          <ul className="flex flex-col items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={clsx(
                  'w-full h-12 text-center hover:bg-japonica-500 hover:text-white',
                  window.location.pathname === item.link ||
                    (item.subMenu &&
                      navSupport.some((subItem) =>
                        window.location.pathname.includes(subItem.link)
                      ))
                    ? 'bg-japonica-500 text-white'
                    : 'bg-white-smoke-100'
                )}
              >
                {' '}
                {!item.subMenu && (
                  <NavLink
                    to={item.link}
                    onClick={toggleMenu}
                    className="flex items-center w-full h-full px-3"
                  >
                    {' '}
                    <span className="text-xl font-medium">{item.name}</span>
                  </NavLink>
                )}
                {item.subMenu && (
                  <Accordion className="flex flex-col w-full">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="w-full"
                    >
                      <span className="text-xl font-medium">{item.name}</span>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col">
                      {navSupport.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.link}
                          onClick={toggleMenu}
                          className={clsx(
                            'w-full h-12 text-center hover:bg-japonica-500 hover:text-white',
                            window.location.pathname === subItem.link
                              ? 'bg-japonica-500 text-white'
                              : 'bg-white-smoke-100'
                          )}
                        >
                          <span className="text-xl font-medium">
                            {subItem.name}
                          </span>
                        </NavLink>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}
              </li>
            ))}
          </ul>
          {navToggleMenu.map((item) => (
            <NavLink
              to={item.link}
              key={item.name}
              className={clsx(
                'flex items-center justify-center w-full h-12 my-2 border rounded border-japonica-500 hover:bg-japonica-500 hover:text-white',
                window.location.pathname === item.link
                  ? 'bg-japonica-500 text-white'
                  : 'bg-white-smoke-100'
              )}
            >
              <span className="text-xl font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

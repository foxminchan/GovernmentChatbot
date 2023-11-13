import clsx from 'clsx';
import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import StartScreen from './components/StartScreen';
import ChatSidebar from './components/ChatSidebar';
import logo from '../../assets/images/caption.svg';
import TopicButton from './components/TopicButton';
import { useEffect, useRef, useState } from 'react';
import ScienceIcon from '@mui/icons-material/Science';
import useMetadata from '../../common/hooks/useMetadata';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

type Props = {
  title: string;
};

export default function Chat(props: Readonly<Props>) {
  useMetadata(props.title);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('.toggle-menu-button')
      ) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {menuVisible && (
          <Container
            className="absolute top-0 left-0 w-full h-full bg-[#00000033] lg:hidden"
            onClick={() => {
              toggleMenu();
            }}
          ></Container>
        )}
        <ChatSidebar />
        <div className="flex flex-col items-center w-full bg-white">
          <div className="absolute top-0 left-0 flex justify-center w-10 h-10 lg:hidden ">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 toggle-menu-button hover:text-japonica-400"
            >
              <DensityMediumIcon className="w-6 h-6" />
            </button>
          </div>
          <StartScreen />
          <div className=" flex flex-col items-center justify-center w-[95%]  mt-auto mb-5 border border-gray-300 rounded-lg">
            <div className="flex justify-center w-full ml-1 lg:ml-5 ">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                className="w-[95%] h-[50px] border-transparent pl-2 outline-none"
              />
              <Button className="bg-transparent !text-gray-300 hover:!text-japonica-400 hover:bg-transparent ml-5">
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {menuVisible && (
        <div
          ref={menuRef}
          className={clsx(
            'lg:hidden bg-white-smoke-100 border rounded-tr-lg rounded-br-lg border-japonica-400 top-0 left-0 px-[15px] pt-2 absolute z-10 bg-blend-overlay',
            menuVisible
              ? 'h-full w-[260px] transition-all duration-[0.3s]'
              : 'w-0 transition-all duration-[0.3s]'
          )}
        >
          <div className="lg:h-[85%] md:h[80%] h-[75%]  justify-center align-middle border-japonica-400 border-solid border-b-[1px] mt-10 mb-5">
            {/* logo */}
            <div className="flex justify-center w-full h-10 mb-10">
              <img src={logo} alt="logo" className="w-[90%] h-full" />
            </div>
            <TopicButton />
          </div>

          <div className="mt-5 ">
            <div className="block px-5 py-0 text-dark-moderate-blue-700">
              <div className="flex mb-5 bg-transparent hover:text-japonica-400">
                <HomeIcon className="mr-5" />
                <span className="text-lg font-medium ">Trang chủ</span>
              </div>
              <div className="flex mb-5 bg-transparent hover:text-japonica-400">
                <ScienceIcon className="mr-5" />
                <span className="text-lg font-medium ">Thử nghiệm</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

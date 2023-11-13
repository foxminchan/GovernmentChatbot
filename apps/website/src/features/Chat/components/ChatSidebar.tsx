import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import logo from '../../../assets/images/caption.svg';
import TopicButton from './TopicButton';

export default function ChatSidebar() {
  return (
    <div className="hidden lg:flex flex-col md:w-[352px]  bg-white border border-japonica-400 rounded-tr-xl rounded-br-xl">
      <div className=" lg:h-[85%] md:h-[85%] h-[88%]  justify-center align-middle border-japonica-400 border-solid border-b-[1px] mt-5 ">
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
  );
}

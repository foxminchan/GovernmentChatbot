import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import logo from '../../../assets/images/logo-rbg.png';
import TopicButton from './TopicButton';

export default function ChatSidebar() {
  return (
    // sidebar
    <div className=" w-[352px] flex-auto bg-white border border-japonica-400 rounded-tr-xl rounded-br-xl">
      {/* upper sidebar */}
      <div className="p-10 lg:h-[85%] md:h-[85%] sm: h-[88%]  justify-center align-middle border-japonica-400 border-solid border-b-[1px]">
        {/* logo */}
        <div className="flex justify-center w-full h-10 mb-10">
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>
        {/* button */}
        <TopicButton />
        <TopicButton />
      </div>
      {/* lower sidebar */}
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

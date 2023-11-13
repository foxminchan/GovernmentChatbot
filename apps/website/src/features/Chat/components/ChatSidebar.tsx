import TopicButton from './TopicButton';

import logo from '../../../assets/images/caption.svg';
import FooterSidebar from './FooterSidebar';

export default function ChatSidebar() {
  return (
    <>
      <div className=" lg:h-[85%] md:h-[85%] h-[85%]  justify-center align-middle border-japonica-400 border-solid border-b-[1px] mt-5 ">
        <div className="flex justify-center w-full h-10 mb-10">
          <img src={logo} alt="logo" className="w-[90%] h-full" />
        </div>
        <TopicButton />
      </div>
      <FooterSidebar />
    </>
  );
}

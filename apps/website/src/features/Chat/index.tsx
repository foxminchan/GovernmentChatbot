import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useMetadata from '../../common/hooks/useMetadata';
import BotChat from './components/BotChat';
import ChatSidebar from './components/ChatSidebar';
import GuessChat from './components/GuessChat';
import StartScreen from './components/StartScreen';

type Props = {
  title: string;
};

export default function Chat(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex flex-col items-center bg-white">
        <StartScreen />
        <div className="bottom-0 flex flex-col items-center justify-center w-[95%]  mt-auto mb-5  border border-gray-300 rounded-lg">
          <div className="flex justify-center w-full ml-5 ">
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="w-[95%] h-[50px] border-transparent pl-2 outline-none"
            />
            <Button className="bg-transparent !text-gray-300 hover:!text-blue-400 hover:bg-transparent ml-5">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

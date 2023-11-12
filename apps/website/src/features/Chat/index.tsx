import useMetadata from '../../common/hooks/useMetadata';
import ChatSidebar from './components/ChatSidebar';

type Props = {
  title: string;
};

export default function ChatBot(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <>
      <ChatSidebar />
      <div className="bg-white"></div>
    </>
  );
}

import useMetadata from '../../hooks/useMetadata';

type Props = {
  title: string;
};

export default function ChatBot(props: Readonly<Props>) {
  useMetadata(props.title);
  return <div>index</div>;
}

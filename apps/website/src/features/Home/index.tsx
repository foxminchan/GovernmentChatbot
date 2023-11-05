import useMetadata from '../../hooks/useMetadata';

type Props = {
  title: string;
};

export default function Home(props: Readonly<Props>) {
  useMetadata(props.title);
  return <div>Home</div>;
}

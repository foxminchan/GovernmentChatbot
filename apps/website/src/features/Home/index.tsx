import useMetadata from '../../hooks/use-metadata';

type Props = {
  title: string;
};

export default function Home(props: Readonly<Props>) {
  useMetadata(props.title);
  return <div>Home</div>;
}

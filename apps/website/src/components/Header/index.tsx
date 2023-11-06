import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const textButton = [
  { name: 'Đăng ký', link: '/dang-ky' },
  { name: 'Đăng nhập', link: '/dang-nhap' },
];

export default function Header() {
  return (
    <header className="flex items-center justify-center w-full h-28 py-[15px]">
      <div className="!relative lg:h-full w-[78%]">
        <Link to="/" className="inline-block">
          <img
            src={Logo}
            alt="logo"
            className="lg:max-w-[536px] ml-1 lg:h-auto"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-0 right-0 flex items-center justify-center h-full">
          {textButton.map((item) => (
            <Link to={item.link} key={item.name}>
              <button className="hidden h-10 w-auto mx-[3px] text-lg font-medium leading-6 text-center bg-transparent border rounded hover:bg-japonica-400 text-dark-moderate-blue-800 hover:text-white border-japonica-400 hover:border-transparent font-nunito sm:w-[130px] sm:inline">
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

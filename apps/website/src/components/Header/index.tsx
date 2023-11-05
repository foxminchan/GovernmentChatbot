import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const textButton = [
  { name: 'Đăng ký', link: '/dang-ky' },
  { name: 'Đăng nhập', link: '/dang-nhap' },
];

export default function Header() {
  return (
    <header>
      <div className="flex items-center h-32">
        <div className="flex items-center justify-center w-full h-28">
          <div className="!relative lg:h-full w-4/5 ">
            <div>
              <img
                src={logo}
                alt="logo"
                className="relative w-auto ml-1 lg:h-24"
                loading="lazy"
              />
            </div>
            <div className="absolute top-0 flex items-center justify-center w-auto h-full right-4">
              {textButton.map((item) => (
                <Link to={item.link} key={item.name}>
                  <button className="hidden w-32 h-10 ml-3 mr-2 text-lg font-medium leading-6 text-center bg-transparent border rounded hover:bg-japonica-400 text-dark-moderate-blue-800 hover:text-white border-japonica-400 hover:border-transparent font-nunito sm:w-40 sm:inline">
                    {item.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

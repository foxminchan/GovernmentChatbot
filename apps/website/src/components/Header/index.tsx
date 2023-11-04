import logo from '../../assets/images/logo.png';

const textButton = [
  { name: 'Đăng kí', link: '/' },
  { name: 'Đăng nhập', link: '/' },
];

export default function Header() {
  return (
    <header>
      <div className="flex items-center h-32">
        <div className="flex items-center justify-center w-full h-28">
          <div className="!relative h-full w-4/5 ">
            <div>
              <img
                src={logo}
                alt="logo"
                className="relative w-auto h-24 ml-1"
                loading="lazy"
              />
            </div>
            <div className="absolute top-0 flex items-center justify-center w-auto h-full right-4">
              {textButton.map((item) => (
                <button
                  key={item.name}
                  className="w-32 h-10 ml-3 mr-2 text-lg font-medium leading-6 text-center bg-transparent border rounded hover:bg-japonica-400 text-dark-moderate-blue-800 hover:text-white border-japonica-400 hover:border-transparent font-nunito"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import logo from '../../assets/images/logo.png';
import Navbar from './navbar';

const textButton = [
  {name: 'Đăng kí', link: '/'},
  {name: 'Đăng nhập', link: '/'}
]
export default function Header() {
  return (
  <header>
    <div className=" h-32 flex items-center">
      <div className=" h-28 w-full flex items-center justify-center ">
        <div className="!relative h-full w-4/5 ">
          <div>
            <img src={logo} alt="logo" className=" relative w-auto h-24 ml-1" loading='lazy'/>
          </div>
          <div className=" absolute h-full w-auto top-0 right-4 justify-center items-center flex  ">
            {textButton.map((item) => (
              <button key={item.name} className="bg-transparent hover:bg-japonica-400 text-dark-moderate-blue-800 font-medium hover:text-white border border-japonica-400 hover:border-transparent rounded 
              text-lg  mr-2 ml-3 w-32 h-10 text-center leading-6 font-nunito">
                  {item.name}
              </button>
            ))}
          </div>
        </div>   
      </div>
    </div>
    <Navbar/>
  </header> 
  );
}

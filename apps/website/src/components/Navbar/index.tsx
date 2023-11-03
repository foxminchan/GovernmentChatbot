import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const navInfoAndService = [
    {name: 'Công dân', link: '/', currrent: false},
    {name: 'Doanh nghiệp', link: '/', currrent: false},
    {name: 'Dịch vụ công trực tuyến', link: '/', currrent: false},
    {name: 'Dịch vụ công nổi bật', link: '/', currrent: false},
    {name: 'Tra cứu hồ sơ', link: '/', currrent: false},
    {name: 'Toà án nhân dân', link: '/', currrent: false},
    {name: 'Câu hỏi thường gặp', link: '/', currrent: false},
  ];
  const navReport=[
    {name: 'Gửi PAKN', link: '/', currrent: false},
    {name: 'Tra cứu câu trả lời', link: '/', currrent: false},
  ]
  const navProcedure=[
    {name: 'Tra cứu TTHC', link: '/', currrent: false},
    {name: 'Thủ tục hành chính', link: '/', currrent: false},
    {name: 'Thủ tục hành chính liên thông', link: '/', currrent: false},
    {name: 'Quyết định công bố', link: '/', currrent: false},
    {name: 'Cơ quan', link: '/', currrent: false},
  ]
  const navSupport=[
    {name: 'Điều khoản sử dụng', link: '/', currrent: false},
    {name: 'Hướng dẫn sử dụng', link: '/', currrent: false},
    {name: 'Thông báo', link: '/', currrent: false},
  ]
  const showSubMenu = (id:string) => {
    const childUl = document.getElementById('subMenu-'+id);
    if (childUl) {
      childUl.classList.toggle('hidden');
    }
  }
  const hideSubMenu = (id:string) => {
    const childUl = document.getElementById('subMenu-'+id);
    if (childUl) {
      childUl.classList.add('hidden');
    }
  }
export default function Navbar(){
  return (
    <nav className="  w-full h-11 bg-white-smoke-400 left-44 ">
      <ul className=" relative h-full w-auto flex left-44 ">
      <li className="w-12 h-full bg-japonica-500 ">
        <Link to="/" className="flex items-center justify-center h-full w-full">
          <FaHome className="  w-5 h-5 text-white" />
        </Link>
      </li>
      <li className="w-28 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800">
        <Link to="/" className="flex items-center justify-center h-full w-full ">
          <span className="text-xl font-medium  leading-6">Giới thiệu</span>
        </Link>
      </li>
      <li onMouseEnter={() => showSubMenu('infoAndService')} onMouseLeave={() => hideSubMenu('infoAndService')} className="w-60 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800 ">
        <Link to="/" className="flex items-center justify-center h-full w-full" >
          <span className=" text-xl font-medium ">Thông tin và dịch vụ</span>
        </Link>
        <ul id="subMenu-infoAndService" className="hidden">
          {navInfoAndService.map((item) => (
            <li key={item.name} 
            className="w-full h-12 bg-japonica-400 hover:bg-japonica-500 hover:text-white text-white ">
            <Link to="/" className="flex text-left items-center px-3 h-full w-full" >
              <span className=" text-xl font-medium ">{item.name}</span>
            </Link>
          </li>
          ))}
        </ul>
      </li>
      <li className="w-60 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800 ">
        <Link to="/" className="flex items-center justify-center h-full w-full">
          <span className=" text-xl font-medium ">Thanh toán trực tuyến</span>
        </Link>
      </li>
      <li onMouseEnter={() => showSubMenu('report')} onMouseLeave={() => hideSubMenu('report')} className="w-52 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800 ">
        <Link to="/" className="flex items-center justify-center h-full w-full ">
          <span className=" text-xl font-medium">Phản ánh kiến nghị</span>
        </Link>
        <ul id="subMenu-report" className="hidden">
          {navReport.map((item) => (
            <li key={item.name} className="w-full h-12 bg-japonica-400 hover:bg-japonica-500 hover:text-white text-white ">
            <Link to="/" className="flex text-left items-center px-3 h-full w-full" >
              <span className=" text-xl font-medium ">{item.name}</span>
            </Link>
          </li>
          ))}
        </ul>
      </li>
      <li onMouseEnter={() => showSubMenu('procedure')} onMouseLeave={() => hideSubMenu('procedure')} className="w-56 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800 ">
        <Link to="/" className="flex items-center justify-center h-full w-full ">
          <span className=" text-xl font-medium">Thủ tục hành chính</span>
        </Link>
        <ul id="subMenu-procedure" className="hidden">
          {navProcedure.map((item) => (
            <li key={item.name} className="w-72 h-12 bg-japonica-400 hover:bg-japonica-500 hover:text-white text-white ">
            <Link to="/" className="flex text-left items-center px-3 h-full w-full" >
              <span className=" text-xl font-medium ">{item.name}</span>
            </Link>
          </li>
          ))}
        </ul>
      </li>
      <li onMouseEnter={() => showSubMenu('support')} onMouseLeave={() => hideSubMenu('support')} className="w-24 h-full hover:bg-japonica-500 hover:text-white text-dark-moderate-blue-800 ">
        <Link to="/" className="flex items-center justify-center h-full w-full">
          <span className=" text-xl font-medium ">Hỗ trợ</span>
        </Link>
        <ul id="subMenu-support" className="hidden">
          {navSupport.map((item) => (
            <li key={item.name} className="w-56 h-12 bg-japonica-400 hover:bg-japonica-500 hover:text-white text-white ">
            <Link to="/" className="flex text-left items-center px-3 h-full w-full" >
              <span className=" text-xl font-medium ">{item.name}</span>
            </Link>
          </li>
          ))}
        </ul>
      </li>
    </ul>
  </nav>
  )
}
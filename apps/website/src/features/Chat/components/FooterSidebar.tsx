import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';

export default function FooterSidebar() {
  return (
    <div className="mt-5 ">
      <div className="block px-5 py-0 text-dark-moderate-blue-700">
        <div className="flex mb-5 bg-transparent hover:text-japonica-400">
          <HomeIcon className="mr-5" />
          <span className="text-lg font-medium ">Trang chủ</span>
        </div>
        <div className="flex mb-5 bg-transparent hover:text-japonica-400">
          <ScienceIcon className="mr-5" />
          <span className="text-lg font-medium ">Thử nghiệm</span>
        </div>
      </div>
    </div>
  );
}

import { Button } from '@mui/material';
import logo from '../../../assets/images/logo-rbg.png';
export default function ChatSidebar() {
  return (
    // sidebar
    <div className="flex-auto w-[30%] rounded bg-neutral-100">
      {/* upper sidebar */}
      <div>
        {/* logo */}
        <div className="flex justify-center mb-5">
          <img src={logo} alt="logo" className=" w-[70%] h-[70%] " />
        </div>
        {/* button */}
        <Button
          variant="outlined"
          className="w-full h-full py-2 !text-dark-moderate-blue-800 text-lg !font-medium border !border-transparent rounded !bg-light-orange-300 hover:!bg-light-orange-400"
        ></Button>
      </div>
      {/* lower sidebar */}
      <div>
        <span></span>
      </div>
    </div>
  );
}

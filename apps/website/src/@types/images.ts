import share from '../assets/images/icons/intro/chiase.svg';
import evaluate from '../assets/images/icons/intro/danhgia.svg';
import suggest from '../assets/images/icons/intro/denghi.svg';
import login from '../assets/images/icons/intro/login.svg';
import payment from '../assets/images/icons/intro/payment.svg';
import perform from '../assets/images/icons/intro/thuchien.svg';
import search from '../assets/images/icons/intro/timkiem.svg';
import query from '../assets/images/icons/intro/truyvan.svg';
import dvc_banner from '../assets/images/notification/dvc_banner.jpg';
import dvc from '../assets/images/notification/dvc.png';
import unemployment from '../assets/images/notification/GQ-Huong-tro cap-that nghiep.png';
import errorSignUp from '../assets/images/notification/Loi-dang-ky-tk.png';
import lptb from '../assets/images/notification/lptb.png';

type bannerNotificationType = {
  DVCBanner: string;
  DVC: string;
  UnEmployment: string;
  ErrorSignUp: string;
  LPTB: string;
};

type IconIntroType = {
  Share_Icon: string;
  Evaluate_Icon: string;
  Suggest_Icon: string;
  Login_Icon: string;
  Payment_Icon: string;
  Perform_Icon: string;
  Search_Icon: string;
  Query_Icon: string;
};

export const IconIntro: IconIntroType = {
  Share_Icon: share,
  Evaluate_Icon: evaluate,
  Suggest_Icon: suggest,
  Login_Icon: login,
  Payment_Icon: payment,
  Perform_Icon: perform,
  Search_Icon: search,
  Query_Icon: query,
};

export const bannerNotification: bannerNotificationType = {
  DVCBanner: dvc_banner,
  DVC: dvc,
  UnEmployment: unemployment,
  ErrorSignUp: errorSignUp,
  LPTB: lptb,
};

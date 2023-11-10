import dvc_banner from '../assets/images/notification/dvc_banner.jpg';
import dvc from '../assets/images/notification/dvc.png';
import thatnghiep from '../assets/images/notification/GQ-Huong-tro cap-that nghiep.png';
import loidangky from '../assets/images/notification/Loi dang ky tk.png';
import lptb from '../assets/images/notification/lptb.png';

type bannerNotificationType = {
    DVCBanner: string,
    DVC: string,
    Thatnghiep: string,
    Loidangky: string,
    LPTB: string,
}

export const bannerNotification: bannerNotificationType = {
    DVCBanner: dvc_banner,
    DVC: dvc,
    Thatnghiep: thatnghiep,
    Loidangky: loidangky,
    LPTB: lptb,
}
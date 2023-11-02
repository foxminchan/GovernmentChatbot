import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';

export default function Header() {
  return (
    // <div className="header">
    //   <div className="container">
    //     <div className="relative content">
    //       <div className="logo-text">
    //         <a href="dvc-trang-chu.html" className="logo">
    //           <img src="theme/img/header/logo.png" alt="" />
    //         </a>
    //       </div>
    //       <div className="nav-toggle">
    //         <span className="-ap icon icon-menu"></span>
    //       </div>
    //       <div className="header-account">
    //         <div className="buttons">
    //           <a
    //             href="https://dangky.dichvucong.gov.vn/register"
    //             className="btn btn-login"
    //           >
    //             Đăng ký
    //           </a>
    //           <a
    //             href="https://xacthuc.dichvucong.gov.vn/oauth2/authorize?response_type=code&amp;client_id=Np0ahpF4exnI6DS_4KuMK_TLHLEa&amp;scope=openid&amp;redirect_uri=https://dichvucong.gov.vn/p/home/dvc-trang-chu.html"
    //             className="btn btn-register"
    //           >
    //             Đăng nhập
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

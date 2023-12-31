import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import SubNavbar from '../../components/SubNavbar';
import useMetadata from '../../common/hooks/useMetadata';
import { Breadcrumbs, Grid, Typography } from '@mui/material';
import ItemsNotification from './components/ItemsNotification';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import drums from '../../assets/images/notification/trongdong.png';

type Props = {
  title: string;
};

export default function Notification(props: Readonly<Props>) {
  useMetadata(props.title);

  const breadcrumbs = [
    <Link key="1" color="inherit" to="/">
      Trang chủ
    </Link>,
    <Typography variant="subtitle1" key="2" color="text.primary">
      Giới thiệu
    </Typography>,
  ];

  return (
    <>
      <SubNavbar />
      <div className="pb-8 bg-right-top bg-no-repeat bg-tien-ich-bg min-h-[calc(100vh_-_400px)]">
        <Container>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className="py-5"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Typography
            marginBottom={'20px'}
            className="!font-medium !text-[28px] !text-dark-moderate-blue-800"
          >
            Thông báo
          </Typography>
          <ItemsNotification />
        </Container>
      </div>
      <div className="h-40 px-0 py-10 mt-16 bg-white-smoke-100">
        <Container>
          <Grid
            container
            spacing={{ xs: 4, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="justify-center"
          >
            <Grid item xs={5} sm={5} md={5}>
              <div className="!float-left">
                <span className="table w-full cursor-pointer ">
                  <div className="table-cell w-24 align-middle">
                    <img src={drums} alt="icon" loading="lazy" />
                  </div>
                  <span className="table-cell pl-5 text-lg align-middle text-dark-moderate-blue-800">
                    Câu hỏi thường gặp
                  </span>
                </span>
              </div>
            </Grid>
            <Grid item xs={5} sm={5} md={5}>
              <div className="lg:!float-right md:!float-left">
                <span className="table w-full cursor-pointer ">
                  <div className="table-cell w-24 align-middle">
                    <img src={drums} alt="icon" loading="lazy" />
                  </div>
                  <span className="table-cell pl-5 text-lg align-middle text-dark-moderate-blue-800">
                    Hướng dẫn sử dụng
                  </span>
                </span>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

import { Container, Grid, } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMetadata from '../../hooks/useMetadata';

type Props = {
  title: string;
};

export default function GenneralGuide(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <Container>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"  sx={{ padding: '20px 0px', margin: '0px 0px 20px'}}>
            <Typography variant="subtitle1" component="a" href="/"> Trang chủ</Typography>
            <Typography variant="subtitle1" component="a" href="/huong-dan-su-dung">Hướng dẫn sử dụng</Typography>
        </Breadcrumbs>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <div className="main-title center" style={{ textAlign: 'center' }}>
            HƯỚNG DẪN SỬ DỤNG
          </div>
          
        </Grid>
      </Grid>
    </Container>
  );
}
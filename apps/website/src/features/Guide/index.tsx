import {
  Container,
  Grid,
  Breadcrumbs,
  Typography,
  Divider,
} from '@mui/material';
import { itemBreadcrumbs } from '../../mocks/guide.data';
import useMetadata from '../../common/hooks/useMetadata';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SubNavbar from '../../components/SubNavbar';

type Props = {
  title: string;
};

export default function GenneralGuide(props: Readonly<Props>) {
  useMetadata(props.title);

  return (
    <div>
      <SubNavbar />
      <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className="pt-3 mb-5 pb-7"
        >
          {itemBreadcrumbs.map((item) => (
            <Typography
              key={item.id}
              variant="subtitle1"
              component="a"
              href={item.link}
            >
              {item.name}
            </Typography>
          ))}
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div className="text-xl font-bold text-center main-title">
              HƯỚNG DẪN SỬ DỤNG
            </div>
          </Grid>
        </Grid>
        <Divider
          className="h-px bg-gray-300 "
          style={{ marginTop: '10px', marginBottom: '10px' }}
        />
      </Container>
    </div>
  );
}

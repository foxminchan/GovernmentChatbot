import {
  Grid,
  Divider,
  Container,
  Typography,
  Breadcrumbs,
} from '@mui/material';
import clsx from 'clsx';
import SubNavbar from '../../components/SubNavbar';
import { itemBreadcrumbs } from '../../mocks/guide.data';
import useMetadata from '../../common/hooks/useMetadata';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
          className="py-5"
        >
          {itemBreadcrumbs.map((item) => (
            <Typography
              key={item.id}
              variant="subtitle1"
              component="a"
              href={item.isActive ? undefined : item.link}
              className={clsx(
                item.isActive
                  ? 'text-dark-moderate-blue-800 font-bold'
                  : 'font-normal'
              )}
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
        <Divider className="h-px bg-gray-300 !my-[10px]" />
      </Container>
    </div>
  );
}

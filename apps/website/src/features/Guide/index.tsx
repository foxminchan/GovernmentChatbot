import React from 'react';
import { Container, Grid, Breadcrumbs, Typography,Divider } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMetadata from '../../hooks/useMetadata';
import HeaderBottom from '../../components/Header/header.bottom';
import { BreadcrumbsText } from './guide.data';

type Props = {
  title: string;
};

export default function GenneralGuide(props: Readonly<Props>) {
  useMetadata(props.title);

  return (
    <div>
      <HeaderBottom />
      <Container>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className="pt-3 pb-7 mb-5">
          {BreadcrumbsText.map((item) => (
            <Typography key={item.name} variant="subtitle1" component="a" href={item.link}>{item.name}</Typography>
          ))}
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <div className="main-title font-bold text-center text-xl">
              HƯỚNG DẪN SỬ DỤNG
            </div>
          </Grid>
        </Grid>
        <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      </Container>
    </div>
  );
}

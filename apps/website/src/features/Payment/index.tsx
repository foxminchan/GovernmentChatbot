import { IconPayment } from "../../@types/image"
import useMetadata from '../../hooks/useMetadata';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Container, Grid, Breadcrumbs, Typography } from '@mui/material';
import { CustomTextCitizen, CustomTextEnterprise, BreadcrumbsText } from './payment.data';
import PaymentSection from './payment.section';

type Props = {
  title: string;
};

export default function PaymentOnline(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <Container style={{backgroundImage: `url(${IconPayment.Bg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right top'}}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb" className="py-7 mb-5">
        {BreadcrumbsText.map((item) => (
          <Typography key={item.name} variant="subtitle1" component="a" href={item.link}>{item.name}</Typography>
        ))}
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid container className="box-extend-new mt-16 mb-5">
          <Grid item xs={12} sm={6}>
            <PaymentSection title="CÔNG DÂN" color="text-gray-500" border="border-gray-500" data={CustomTextCitizen} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaymentSection title="DOANH NGHIỆP" color="text-orange-500" border="border-orange-500" data={CustomTextEnterprise} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

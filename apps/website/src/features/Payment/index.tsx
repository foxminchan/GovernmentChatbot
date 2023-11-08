import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMetadata from '../../hooks/useMetadata';
import bg from '../../assets/images/banners/bg.svg';
import stampCitizen from '../../assets/images/icons/citizen/payment/stamp.svg';
import balanceCitizen from '../../assets/images/icons/citizen/payment/balance.svg';
import failureCitizen from '../../assets/images/icons/citizen/payment/failure.svg';
import familyInsuranceCitizen from '../../assets/images/icons/citizen/payment/family-insurance.svg';
import mortgageCitizen from '../../assets/images/icons/citizen/payment/mortgage.svg';
import taxCitizen from '../../assets/images/icons/citizen/payment/tax.svg';
import towerCitizen from '../../assets/images/icons/citizen/payment/tower.svg';
import stampEnterprise from '../../assets/images/icons/enterprise/payment/stamp.svg';
import balanceEnterprise from '../../assets/images/icons/enterprise/payment/balance.svg';
import failureEnterprise from '../../assets/images/icons/enterprise/payment/failure.svg';
import lifeInsuranceEnterprise from '../../assets/images/icons/enterprise/payment/life-insurance.svg';
import taxEnterprise from '../../assets/images/icons/enterprise/payment/tax-3.svg';
import towerEnterprise from '../../assets/images/icons/enterprise/payment/tower.svg';

type Props = {
  title: string;
};

interface CustomLinkProps {
  to: string;
  text: string;
  imgSrc: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, text, imgSrc }) => {
  return (
    <Link href={to} sx={{ display: 'table', width: '100%', marginBottom: '20px', textDecoration: 'none' }}>
      <Box sx={{ display: 'table-cell', width: '36px', verticalAlign: 'middle' }}>
        <img src={imgSrc} alt="icon" style={{ color: '#67A99F' }} />
      </Box>
      <Typography variant="body1" sx={{
        display: 'table-cell',
        verticalAlign: 'middle',
        fontSize: '18px',
        gridArea: 'auto',
        lineHeight: '23.9994px',
        padding: '0px 0px 0px 20px',
        color: '#000',
        '&:hover': {
          color: '#CE7A58',
        },
      }}>
        {text}
      </Typography>
    </Link>
  );
};

const CitizenPayment: React.FC = () => {
  return (
    <Box className="box-ex" sx={{ padding: '0px 10px' }}>
      <Typography variant="h3" sx={{ 
            fontSize: '23px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '7px 20px',
            textTransform: 'uppercase',
            color: '#67A99F',
            borderTop: '4px solid #67A99F',
            background: 'rgba(103, 169, 159, 0.1)',
            marginBottom: '10px', 
          }}>
        CÔNG DÂN
      </Typography>
      <Box className="body" sx={{ 
         background: '#F5F5F5',
         borderRadius: '8px',
         padding: '20px 40px',
         minHeight: '490px',
       }}>
        <CustomLink to="/thanh-toan-phi-le-phi-ho-so" text="Thanh toán phí, lệ phí thủ tục hành chính" imgSrc={stampCitizen} />
        <CustomLink to="/khai-va-nop-thue-doanh-nghiep" text="Khai và nộp thuế doanh nghiệp" imgSrc={taxCitizen} />
        <CustomLink to="/dong-BHXH-bat-buoc-BHYT-BHTNLD-BNN" text="Đóng BHXH bắt buộc, BHYT, BHTNLĐ-BNN" imgSrc={familyInsuranceCitizen} />
        <CustomLink to="/nop-thue-le-phi-truoc-ba-ve-dat-dai-tai-san" text="Nộp thuế, lệ phí trước bạ về đất đai, tài sản" imgSrc={mortgageCitizen} />
        <CustomLink to="/nop-phat-xu-ly-vi-pham-hanh-chinh" text="Nộp phạt xử lý vi phạm hành chính" imgSrc={failureCitizen} />
        <CustomLink to="/thanh-toan-tien-dien" text="Thanh toán tiền điện" imgSrc={towerCitizen} />
        <CustomLink to="/nop-tam-ung-an-phi" text="Nộp tạm ứng án phí" imgSrc={balanceCitizen} />
      </Box>
    </Box>
  );
};

const BusinessPayment: React.FC = () => {
  return (
    <Box className="box-ex no2" sx={{ padding: '0px 10px' }}>
      <Typography variant="h3" sx={{ 
        fontSize: '23px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '7px 20px',
        textTransform: 'uppercase',
        color: '#CE7A58',
        borderTop: '4px solid #CE7A58',
        background: '#F4F0EB',
        marginBottom: '10px',
       }}>
        DOANH NGHIỆP
      </Typography>
      <Box className="body" sx={{ 
        background: '#F5F5F5',
        borderRadius: '8px',
        padding: '20px 40px',
        minHeight: '490px',
       }}>
        <CustomLink to="/thanh-toan-phi-le-phi-ho-so" text="Thanh toán phí, lệ phí thủ tục hành chính" imgSrc={stampEnterprise} />
        <CustomLink to="/khai-va-nop-thue-doanh-nghiep" text="Khai và nộp thuế doanh nghiệp" imgSrc={taxEnterprise} />
        <CustomLink to="/dong-BHXH-bat-buoc-BHYT-BHTNLD-BNN" text="Đóng BHXH bắt buộc, BHYT, BHTNLĐ-BNN" imgSrc={lifeInsuranceEnterprise} />
        <CustomLink to="/nop-phat-xu-ly-vi-pham-hanh-chinh" text="Nộp phạt xử lý vi phạm hành chính" imgSrc={failureEnterprise} />
        <CustomLink to="/thanh-toan-tien-dien" text="Thanh toán tiền điện" imgSrc={towerEnterprise} />
        <CustomLink to="/nop-tam-ung-an-phi" text="Nộp tạm ứng án phí" imgSrc={balanceEnterprise} />
      </Box>
    </Box>
  );
};

export default function PaymentOnline(props: Readonly<Props>) {
  useMetadata(props.title);
  return (
    <Container>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"  sx={{ padding: '20px 0px', margin: '0px 0px 20px'}}>
        <Typography variant="subtitle1" component="a" href="/">Cổng Dịch vụ công quốc gia</Typography>
        <Typography variant="subtitle1" component="a" href="/thanh-toan-truc-tuyen">Thanh toán trực tuyến</Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid container className="box-extend-new" sx={{ marginTop: '60px', marginBottom: '20px' }}>
          <Grid item xs={12} sm={6}>
            <CitizenPayment />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BusinessPayment/>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

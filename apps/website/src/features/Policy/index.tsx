import { Container, Divider, Breadcrumbs, Typography,} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMetadata from '../../hooks/useMetadata';
import CustomListItem from './policy.customlistitem';
import { Section_1, Section_2, Section_4, BreadcrumbsText } from './policy.data';
import HeaderBottom from '../../components/Header/header.bottom';


type Props = {
  title: string;
};

export default function SupportPolicy(props: Readonly<Props>) {
  useMetadata(props.title);
  return(
    <><HeaderBottom />
    <Container>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className="pt-3 pb-7 mb-5">
        {BreadcrumbsText.map((item) => (
          <Typography key={item.name} variant="subtitle1" component="a" href={item.link}>{item.name}</Typography>
        ))}
      </Breadcrumbs>
      <Typography variant="h4" className="main-title text-center text-2xl text-black mb-5 font-semibold">
        Điều khoản và điều kiện sử dụng Cổng Dịch vụ công Quốc gia
      </Typography>
      <Typography className="text-lg mb-5 text-black"> Bằng việc sử dụng các Dịch vụ trên Cổng Dịch vụ công Quốc gia, tổ chức, cá nhân sử dụng mặc nhiên chấp thuận và cam kết thực hiện các điều khoản và điều kiện sử dụng sau đây: </Typography>
      <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      {/* Section 1 */}
      <Typography variant="h6" className="mb-5 flex items-start text-2xl text-black text-justify font-semibold ">
        1. Tổ chức, cá nhân sử dụng Dịch vụ trên cổng Dịch vụ công quốc gia có trách nhiệm:
      </Typography>
      <CustomListItem data={Section_1} />
      <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      {/* Section 2 */}
      <Typography variant="h6" className="mb-5 flex items-start text-2xl text-black text-justify font-semibold">
        2. Tổ chức, cá nhân sử dụng Dịch vụ trên cổng Dịch vụ công quốc gia không được thực hiện một trong các hành vi sau:
      </Typography>
      <CustomListItem data={Section_2} />
      <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      {/* Section 3 */}
      <Typography variant="h6" className="mb-5 flex items-start text-2xl text-black text-justify font-semibold">
        3. Cổng Dịch vụ công quốc gia có quyền Tạm dừng, Khoá, Huỷ các tài khoản trên cổng có các hành vi vi phạm pháp luật, gian lận hoặc không tuân thủ các điều khoản sử dụng đã nêu ở trên mà không cần thông báo cũng như bồi thường
      </Typography>
      <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      {/* Section 4 */}
      <Typography variant="h6" className="mb-5 flex items-start text-2xl text-black text-justify font-semibold">
        4. Cổng Dịch vụ công Quốc gia không chia sẻ thông tin về người sử dụng với các cơ quan khác mà không có sự cho phép của người sử dụng, trừ các trường hợp:
      </Typography>
      <CustomListItem data={Section_4} />
      <Divider className="bg-gray-300 h-px " style={{ marginTop: '10px', marginBottom: '10px' }} />
      {/* Section 5 */}
      <Typography variant="h6" className="mb-5 flex items-start text-2xl text-black text-justify font-semibold">
        5. Trong trường hợp sửa đổi nội dung các điều khoản và điều kiện sử dụng Cổng Dịch vụ công Quốc gia, các nội dung sửa đổi sẽ được thông báo trên Cổng. Người sử dụng tiếp tục sử dụng và tiếp tục thực hiện các yêu cầu dịch vụ trên Cổng có nghĩa là đã chấp nhận các sửa đổi đó.
      </Typography>
    </Container></>
  );
}

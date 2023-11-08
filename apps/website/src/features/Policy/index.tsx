import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Divider } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMetadata from '../../hooks/useMetadata';

type Props = {
  title: string;
};

interface CustomListItemProps {
  text: string; 
}

const GrayDivider = () => {
  return <Divider sx={{ backgroundColor: '#ccc', height: '1px', margin: '10px 0px' }} />;
}; 

const CustomListItem: React.FC<CustomListItemProps> = ({ text }) => {
  return (
    <ListItem disableGutters sx={{ padding: '0px 0px 0px 30px', margin: '0px 0px 10px', display: 'flex', alignItems: 'flex-start' }}>
      <ListItemIcon>
        <FiberManualRecordIcon sx={{ fontSize: '10px', color: '#CE7E58', margin: '7px 7px'}} />
      </ListItemIcon>
      <Typography variant="body1" sx={{ fontSize: '18px', color: '#333333'}}>{text}</Typography>
    </ListItem>
  );
};

export default function SupportPolicy(props: Readonly<Props>) {
  useMetadata(props.title);
  return(
    <Container>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"  sx={{ padding: '20px 0px', margin: '0px 0px 20px'}}>
        <Typography variant="subtitle1" component="a" href="/"> Trang chủ</Typography>
        <Typography variant="subtitle1" component="a" href="/dieu-khoan-su-dung">Điều khoản sử dụng</Typography>
      </Breadcrumbs>

      <Typography variant="h1" className="main-title -none center" sx={{ margin: '0px 0px 20px', fontSize: '28px', color: '#333333'}} style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Điều khoản và điều kiện sử dụng Cổng Dịch vụ công Quốc gia
      </Typography>
      <Typography sx={{ fontSize: '18px', margin: '0px 0px 20px', color: '#333333'}}> Bằng việc sử dụng các Dịch vụ trên Cổng Dịch vụ công Quốc gia, tổ chức, cá nhân sử dụng mặc nhiên chấp thuận và cam kết thực hiện các điều khoản và điều kiện sử dụng sau đây: </Typography>
      <div className="article">
        <GrayDivider />
        {/* Section 1 */}
        <Typography className="main-title-sub" sx={{ margin: '0px 0px 20px', display: 'flex', alignItems: 'flex-start', fontSize: '22px', color: '#333333'}} style={{ textAlign: 'justify', fontWeight: 'bold' }}>
          1. Tổ chức, cá nhân sử dụng Dịch vụ trên cổng Dịch vụ công quốc gia có trách nhiệm:
        </Typography>
        <List className="list-dot">
          <CustomListItem text="Chịu trách nhiệm trước pháp luật về những thông tin kê khai, đăng ký tài khoản trên Cổng Dịch vụ công Quốc gia, chỉ sử dụng Cổng Dịch vụ công Quốc gia cho các mục đích hợp pháp và phải chịu trách nhiệm về mọi hoạt động được thực hiện bằng tài khoản của mình." />        
          <CustomListItem text="Chịu trách nhiệm giữ bí mật thông tin tài khoản, mật khẩu của mình, trường hợp mật khẩu bị mất hoặc bị đánh cắp hoặc phát hiện có người sử dụng trái phép tài khoản của mình, phải thông báo kịp thời cho Cơ quan quản lý và vận hành hệ thống." />        
          <CustomListItem text="Chịu trách nhiệm đối với tất cả các nội dung do mình gửi, đăng ký, cung cấp khi sử dụng dịch vụ công và các tiện ích khác trên Cổng Dịch vụ công Quốc gia và phải có trách nhiệm đối với các bên có liên quan khác." />        
          <CustomListItem text="Mọi trường hợp sử dụng lại các thông tin, nội dung trên Cổng Dịch vụ công Quốc gia để đăng tải trên các phương tiện truyền thông phải thực hiện theo quy định của pháp luật." />        
          <CustomListItem text="Đồng ý chia sẻ thông tin đăng ký trên Cổng Dịch vụ công Quốc gia theo quy định của Cổng Dịch vụ công Quốc gia." />        
        </List>
        <GrayDivider />
        {/* Section 2 */}
        <Typography className="main-title-sub" sx={{ margin: '0px 0px 20px', display: 'flex', alignItems: 'flex-start', fontSize: '22px', color: '#333333'}} style={{ textAlign: 'justify', fontWeight: 'bold' }}>
          2. Tổ chức, cá nhân sử dụng Dịch vụ trên cổng Dịch vụ công quốc gia không được thực hiện một trong các hành vi sau:
        </Typography>
        <List className="list-dot">
          <CustomListItem text="Quấy rối, gây phiền toái, gây bất tiện, hạn chế, ngăn chặn hoặc các hành vi vi phạm pháp luật khác vi phạm các quyền, lợi ích hợp pháp của tổ chức, cá nhân khác trong việc sử dụng Cổng Dịch vụ công Quốc gia." />
          <CustomListItem text="Đăng hoặc truyền qua Cổng Dịch vụ công Quốc gia bất kỳ tài liệu có nội dung xuyên tạc, phỉ báng, khiêu dâm, xúc phạm hoặc gây dư luận xấu, làm giảm uy tín của tổ chức cá nhân khác hoặc tài liệu, thông tin khác trái với các quy định của pháp luật." />
          <CustomListItem text="Cản trở hoặc ngăn chặn trái phép quá trình truyền, gửi, nhận thông điệp dữ liệu." />
          <CustomListItem text="Thay đổi, xóa, hủy, giả mạo, sao chép, tiết lộ, hiển thị, di chuyển trái phép một phần hoặc toàn bộ thông điệp dữ liệu." />        
          <CustomListItem text="Tạo ra thông điệp dữ liệu nhằm thực hiện hành vi trái pháp luật." />        
          <CustomListItem text="Tạo ra hoặc phát tán chương trình tin học gây hại, tự ý xóa, làm tổn hại hoặc thay đổi phần mềm, dữ liệu điện tử, xâm nhập trái phép, can thiệp vào chức năng hoạt động của Cổng hoặc có hành vi khác nhằm phá hoại hạ tầng công nghệ phục vụ cung cấp dịch vụ công trực tuyến." />        
          <CustomListItem text="Gian lận, chiếm đoạt hoặc sử dụng trái phép chữ ký điện tử của người khác; sửa chữa, thay đổi hoặc công khai hóa thông tin riêng hợp pháp của cơ quan, tổ chức, cá nhân trên Cổng mà không được phép của chủ sở hữu thông tin đó." />        
          <CustomListItem text="Các hành vi khác theo quy định của pháp luật." />        
        </List>
        <GrayDivider />
        {/* Section 3 */}
        <Typography className="main-title-sub" sx={{ margin: '0px 0px 20px', display: 'flex', alignItems: 'flex-start', fontSize: '22px', color: '#333333'}} style={{ textAlign: 'justify', fontWeight: 'bold' }}>
          3. Cổng Dịch vụ công quốc gia có quyền Tạm dừng, Khoá, Huỷ các tài khoản trên cổng có các hành vi vi phạm pháp luật, gian lận hoặc không tuân thủ các điều khoản sử dụng đã nêu ở trên mà không cần thông báo cũng như bồi thường
        </Typography>
        <GrayDivider />
        {/* Section 4 */}
        <Typography className="main-title-sub" sx={{ margin: '0px 0px 20px', display: 'flex', alignItems: 'flex-start', fontSize: '22px', color: '#333333'}} style={{ textAlign: 'justify', fontWeight: 'bold' }}>
          4. Cổng Dịch vụ công Quốc gia không chia sẻ thông tin về người sử dụng với các cơ quan khác mà không có sự cho phép của người sử dụng, trừ các trường hợp:
        </Typography>
        <List className="list-dot">
          <CustomListItem text="Việc cung cấp là cần thiết để giải quyết một thủ tục hành chính, dịch vụ công theo yêu cầu của người sử dụng." />        
          <CustomListItem text="Việc cung cấp thông tin trong trường hợp cần thiết vì lợi ích công cộng, sức khỏe của cộng đồng theo quy định của luật có liên quan." />        
        </List>
        <GrayDivider />
        {/* Section 5 */}
        <Typography className="main-title-sub" sx={{ margin: '0px 0px 20px', display: 'flex', alignItems: 'flex-start', fontSize: '22px', color: '#333333'}} style={{ textAlign: 'justify', fontWeight: 'bold' }}>
          5. Trong trường hợp sửa đổi nội dung các điều khoản và điều kiện sử dụng Cổng Dịch vụ công Quốc gia, các nội dung sửa đổi sẽ được thông báo trên Cổng. Người sử dụng tiếp tục sử dụng và tiếp tục thực hiện các yêu cầu dịch vụ trên Cổng có nghĩa là đã chấp nhận các sửa đổi đó.
        </Typography>
      </div>
    </Container>
  );
}

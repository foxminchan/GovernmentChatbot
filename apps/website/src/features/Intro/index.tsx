import useMetadata from '../../hooks/useMetadata';
import intro from '../../assets/images/banners/gioi-thieu-slider.png';
import { Link } from 'react-router-dom';
import share from '../../assets/images/icons/intro/chiase.svg';
import clsx from 'clsx';

type Props = {
  title: string;
};
const itemIntroInfo = [
  {
    name: 'Đăng ký và được cấp ngay một tài khoản của Cổng dịch vụ công Quốc gia để đăng nhập;',
  },
  {
    name: 'Tra cứu thông tin, dịch vụ công các ngành, lĩnh vực, các địa phương tại Cơ sở dữ liệu quốc gia về thủ tục hành chính; Gửi phản ánh kiến nghị liên quan đến việc giải quyết thủ tục hành chính, dịch vụ công;',
  },
  {
    name: 'Đề nghị hỗ trợ thực hiện thủ tục hành chính, dịch vụ công qua Tổng đài điện thoại 18001096 hoặc trực tuyến tại mục Hỗ trợ;',
  },
  {
    name: 'Theo dõi toàn bộ quá trình giải quyết thủ tục hành chính và xử lý phản ánh kiến nghị của mình bằng cách cung cấp mã hồ sơ, kể cả mã hồ sơ thủ tục hành chính không thực hiện qua Cổng Dịch vụ công Quốc gia, Cổng Dịch vụ công của Bộ, ngành, địa phương;',
  },
  {
    name: 'Đăng nhập bằng tài khoản Cổng dịch vụ công Quốc gia để đăng nhập các Cổng Dịch vụ công của Bộ, ngành, địa phương; không phải cập nhật các trường thông tin, tài liệu đã được lưu trữ trong tài khoản Cổng Dịch vụ công Quốc gia;',
  },
  {
    name: 'Được hỗ trợ truy vấn thông tin của cá nhân, tổ chức lưu trữ tại các Cơ sở dữ liệu, Hệ thống thông tin đã tích hợp với Cổng Dịch vụ công Quốc gia như đăng ký kinh doanh, thuế, bảo hiểm,…;',
  },
  {
    name: 'Thực hiện thủ tục hành chính tại nhiều tỉnh, thành phố chỉ cần khai báo 1 lần trên Cổng Dịch vụ công Quốc gia;',
  },
  {
    name: 'Sử dụng tài khoản của các ngân hàng, trung gian thanh toán để thanh toán trực tuyến phí, lệ phí thực hiện thủ tục hành chính; dịch vụ công;',
  },
  { name: 'Đánh giá sự hài lòng trong giải quyết thủ tục hành chính;' },
];

const timeLine = [
  {
    year: '2019',
    content:
      'Kết nối, tích hợp cổng DVCQG với cổng DVC và hệ thống một cửa điện tử các Bộ, ngành, địa phương để thí điểm cung cấp một số dịch vụ công trực tuyến như: Cấp đổi giấy phép lái xe, cấp giấy phép lái xe quốc tế, thông báo thực hiện khuyến mại, đăng ký hoạt động khuyến mại, cấp điện mới từ lưới điện trung áp, cấp điện mới từ lưới điện hạ áp...',
    width: 'w-1/2',
  },
  {
    year: '2020',
    content: 'Tích hợp tối thiểu 30% các dịch vụ công trực tuyến thiết yếu.',
    width: 'w-1/4',
  },
  {
    year: 'Sau 2020',
    content:
      'Tăng dần mỗi năm tích hợp 20% dịch vụ công trực tuyến mức độ 3, 4 của các Bộ, ngành, địa phương.',
    width: 'w-1/4',
  },
];

export default function Payment(props: Readonly<Props>) {
  useMetadata(props.title);
  const listItemIntro = itemIntroInfo.map((item) => (
    <div className="p-4 mb-0">
      <div className="mb-5">
        <img
          src={share}
          alt="icon"
          className="h-auto max-w-full align-middle border-0"
        />
      </div>
      <span className="mb-5">{item.name}</span>
    </div>
  ));

  return (
    <div className="pb-8 bg-right-top bg-no-repeat bg-tien-ich-bg min-h-[calc(100vh_-_400px)]">
      <div className="w-full max-w-6xl px-4 ml-auto mr-auto">
        <ul className="px-0 py-5 mt-0 mb-5 rounded">
          <li className="inline-block text-left">
            <span className="text-base text-left bg-transparent">
              Trang chủ
            </span>
            <span className="text-base text-left bg-transparent before:content-['>'] before:px-2 before:text-white-smoke-600 before:text-lg">
              Giới thiệu
            </span>
          </li>
        </ul>
        <span className="relative block h-auto pl-0 m-0 mb-5 text-3xl font-medium text-justify text-dark-moderate-blue-900">
          Giới thiệu về Cổng Dịch vụ công Quốc gia
        </span>
        <div className="leading-6 text-justify">
          <span className="mb-5">
            <img src={intro} alt="banner" className="border-0" loading="lazy" />
          </span>
          <div className="mb-5 text-lg leading-6 ">
            Với quan điểm công khai, minh bạch, lấy người dân, doanh nghiệp làm
            trung tâm phục vụ, Cổng Dịch vụ công Quốc gia kết nối, cung cấp
            thông tin về thủ tục hành chính và dịch vụ công trực tuyến; hỗ trợ
            thực hiện, giám sát, đánh giá việc giải quyết thủ tục hành chính,
            dịch vụ công trực tuyến và tiếp nhận, xử lý phản ánh, kiến nghị của
            cá nhân, tổ chức trên toàn quốc.
          </div>
          <div className="mb-5 text-lg leading-6">
            Cá nhân, tổ chức dễ dàng truy cập Cổng Dịch vụ công Quốc gia tại địa
            chỉ duy nhất
            <Link
              to="https://www.dichvucong.gov.vn"
              className="text-lg hover:text-saffron-mango-600"
            >
              www.dichvucong.gov.vn
            </Link>
            theo nhu cầu người dùng từ máy tính, máy tính bảng hoặc điện thoại
            di động được kết nối internet để hưởng nhiều lợi ích từ Cổng Dịch vụ
            công Quốc gia, như:
          </div>
          <div className="grid grid-cols-3 gap-6 -ml-4 -mr-4">
            {listItemIntro}
          </div>
        </div>
        <div className="px-5 py-10 text-xl text-center bg-right-bottom bg-no-repeat bg-[length:250px_auto] rounded bg-japonica-100 mb-7 bg-slogan-bg">
          <div className="max-w-3xl m-auto">
            <div className="mb-5 text-xl leading-7 text-dark-moderate-blue-900">
              Các Bộ, ngành, địa phương nỗ lực cùng với sự tham gia tích cực của
              người dân và doanh nghiệp trong vận hành Cổng Dịch vụ công Quốc
              gia là góp phần xây dựng Chính phủ liêm chính, hành động, phát
              triển, phục vụ Nhân Dân
            </div>
            <div className="mb-5 leading-7 text-saffron-mango-500">
              Hãy truy cập
              <Link to="https://www.dichvucong.gov.vn" className="inline-block">
                www.dichvucong.gov.vn !
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="relative block h-auto pl-0 m-0 mb-5 text-3xl font-medium text-justify">
            Lộ trình thực hiện
          </div>
          {timeLine.map((item) => (
            <div className="pr-5 -ml-4 -mr-4">
              <div className={clsx('float-left px-4', item.width)}>
                <div className="mb-5 text-2xl font-medium text-japonica-400">
                  {item.year}
                </div>
                <div
                  className={clsx(
                    'ml-0 h-1 bg-white-smoke-200 relative mb-5 -mr-4',
                    'before:content-none before:left-4 before:w-4 before:h-4 before:absolute before:top-0 before:bottom-0 before:m-auto before:rounded-full before:bg-japonica-400'
                  )}
                ></div>
                <div className="mb-5 text-lg leading-6 text-dark-moderate-blue-900">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

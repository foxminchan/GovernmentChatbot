import { hostNewsData } from '../../../mocks/home.data';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface SampleArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SampleNextArrow: React.FC<SampleArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-0 bottom-0 right-0 m-auto text-center border-0 w-7 h-7"
    >
      <ChevronRightIcon className="w-5 h-5 text-dark-moderate-blue-500" />
    </button>
  );
};

const SamplePrevArrow: React.FC<SampleArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-0 bottom-0 left-0 m-auto text-center border-0 w-7 h-7"
    >
      <ChevronLeftIcon className="w-5 h-5 text-dark-moderate-blue-500" />
    </button>
  );
};

export const Carousels = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="box-border relative block h-full py-5 px-7">
      {/* <button
        onClick={() => slider?.current?.slickPrev()}
        className="absolute top-0 bottom-0 left-0 m-auto text-center border-0 w-7 h-7"
      >
        <ChevronLeftIcon className="w-5 h-5 text-dark-moderate-blue-500" />
      </button> */}
      <div className="relative block p-0 m-0 overflow-hidden">
        <Slider {...settings}>
          {hostNewsData.map((card) => (
            <div className="border-transparent border-l-white-smoke-300 ">
              <span className="text-[14px] font-semibold text-dark-moderate-blue-800 line-clamp-2">
                {card.content}
              </span>
              <p className="text-[14px] font-normal text-white-smoke-900">
                {card.date}
              </p>
            </div>
          ))}
        </Slider>
      </div>
      {/* <button
        onClick={() => slider?.current?.slickNext()}
        className="absolute top-0 bottom-0 right-0 m-auto text-center border-0 w-7 h-7"
      >
        <ChevronRightIcon className="w-5 h-5 text-dark-moderate-blue-500" />
      </button> */}
    </div>
  );
};

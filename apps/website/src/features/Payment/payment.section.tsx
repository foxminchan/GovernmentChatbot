import { Box, Typography } from '@mui/material';
import CustomText from './payment.customtext';

type PaymentSectionProps = {
  title: string;
  color: string;
  border: string;
  data: { name: string; img: string }[];
}

export default function PaymentSection({ title, color, border, data }: PaymentSectionProps) {
  return (
    <Box className={"box-ex px-2.5"}>
      <Typography variant="h5" className={`text-2xl font-black text-center py-2 px-5 uppercase ${color} border-t-4 ${border} bg-gray-100 mb-2.5`}>
        {title}
      </Typography>
      <Box className="body bg-gray-100 rounded-xl py-2.5 px-10 min-h-[490px] mt-2.5">
        {data.map((item) => (
          <CustomText key={item.name} text={item.name} imgSrc={item.img} />
        ))}
      </Box>
    </Box>
  );
}
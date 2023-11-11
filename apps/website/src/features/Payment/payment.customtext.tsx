import { Box, Typography } from '@mui/material';

type CustomTextProps = {
  text: string;
  imgSrc: string;
}
  
export default function CustomText({ text, imgSrc }: CustomTextProps) {
  return (
    <Box className="flex items-center mt-5">
      <Box className="mr-2.5">
        <img src={imgSrc} alt="icon" loading="lazy" className="w-9 h-9 text-green-500"/>      
      </Box>
      <Typography variant="body1" className="text-lg text-black hover:text-orange-500">
        {text}
      </Typography>
    </Box>
  )
}
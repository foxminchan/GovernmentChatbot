import { Button } from '@mui/material';

export default function TopicButton() {
  return (
    <div className="flex justify-center mb-5 ml-5 mr-5">
      <Button
        variant="outlined"
        className="!border-japonica-400 hover:!bg-japonica-400 !text-dark-moderate-blue-800 hover:!text-white w-[95%] h-[50px] !text-base !font-medium"
      >
        Chủ để
      </Button>
    </div>
  );
}

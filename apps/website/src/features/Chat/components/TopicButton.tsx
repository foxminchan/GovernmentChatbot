import { Button } from '@mui/material';
import { itemTopic } from '../../../mocks/topic.data';

export default function TopicButton() {
  return (
    <>
      {itemTopic.map((item) => (
        <div key={item.id} className="flex justify-center mb-5 ml-5 mr-5">
          <Button
            variant="outlined"
            className="!border-japonica-400 hover:!bg-japonica-400 !text-dark-moderate-blue-800 hover:!text-white w-[95%] h-[50px] !text-base !font-medium"
          >
            {item.name}
          </Button>
        </div>
      ))}
    </>
  );
}

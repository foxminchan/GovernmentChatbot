import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type CustomListItemProps = {
  data: { name: string }[];
};

export default function CustomListItem({ data }: CustomListItemProps) {
  return (
    <List className="list-dot">
      {data.map((item, index) => (
        <ListItem disableGutters className="pl-8 mb-1 flex items-start" key={index}>
          <ListItemIcon>
            <FiberManualRecordIcon className="text-red-600 mx-2 my-2" fontSize="inherit"/>
          </ListItemIcon>
          <Typography variant="body1" className="text-xl text-black">
            {item.name}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
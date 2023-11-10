import { Grid, Typography } from '@mui/material';
import { notificationData } from '../notification.data';

export default function ItemsNotification() {
  return (
    <Grid
      container
      spacing={{ xs: 4, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {notificationData.map((item) => (
        <Grid item xs={4} sm={4} md={4}>
          <div>
            <div className="mb-5">
              <img
                src={item.banner}
                alt="icon"
                className="h-auto max-w-full align-middle border-0"
              />
            </div>
            <Typography
              variant="h6"
              className="!mb-5 !font-semibold !text-dark-moderate-blue-800 !line-clamp-2"
            >
              {item.title}
            </Typography>
            <span className="mb-5">{item.description}</span>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

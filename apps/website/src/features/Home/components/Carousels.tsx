import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { hostNewsData } from '../home.data';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Carousel } from '@material-tailwind/react';

export const Carousels = () => {
  return (
    <div className="box-border relative block h-full py-5 px-7">
      <button className="absolute top-0 bottom-0 left-0 m-auto text-center border-0 w-7 h-7">
        <FaChevronLeft className="w-5 h-5 text-dark-moderate-blue-500" />
      </button>
      <Carousel className="relative block p-0 m-0 overflow-hidden">
        <div className="relative top-0 left-0 block">
          <Grid container xs={6}>
            {hostNewsData.map((item) => (
              <Grid item xs={6} rowSpacing={4}>
                <Card className=" w-72">
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      sds
                    </Typography>
                    <Typography variant="body2">sds</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Carousel>
      <button className="absolute top-0 bottom-0 right-0 m-auto text-center border-0 w-7 h-7">
        <FaChevronRight className="w-5 h-5 text-dark-moderate-blue-500" />
      </button>
    </div>
  );
};

import React from 'react';
import { Box, Grid } from '@mui/material';
import { itemGuide } from '../../../mocks/guide.data';
export default function GuideVideo() {
  return (
    <>
      {itemGuide.map((item) =>
        item.isStep ? (
          <Grid container spacing={2} className="mb-10" key={item.id}>
            <Grid container item xs={12} sm={6}>
              <Box justifyContent="space-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 pt-5 mx-3 mb-3 text-xl text-center text-white rounded-full bg-japonica-600">
                    {item.number}
                  </div>
                  <div className="text-xl font-bold">{item.name}</div>
                </div>
                {item.content.split('\n').map((line) => (
                  <React.Fragment key={item.id}>
                    <div className="text-xl">
                      {line}
                      <br />
                    </div>
                  </React.Fragment>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <video
                controls
                loop
                muted
                width="100%"
                height="auto"
                poster={item.img}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} className="mb-10" key={item.id}>
            <Grid item xs={12} sm={6}>
              <video
                controls
                loop
                muted
                width="100%"
                height="auto"
                poster={item.img}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            </Grid>
            <Grid container item xs={12} sm={6}>
              <Box justifyContent="space-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 pt-5 mx-3 mb-3 text-xl text-center text-white rounded-full bg-japonica-600">
                    {item.number}
                  </div>
                  <div className="text-xl font-bold">{item.name}</div>
                </div>
                {item.content.split('\n').map((line) => (
                  <React.Fragment key={item.id}>
                    <div className="text-xl">
                      {line}
                      <br />
                    </div>
                  </React.Fragment>
                ))}
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
}

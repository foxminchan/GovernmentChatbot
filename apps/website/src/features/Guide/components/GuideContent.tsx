import React from 'react';
import { Box, Grid } from '@mui/material';

type Props = {
  id: number;
  number: string;
  name: string;
  content: string;
};

export default function GuideContent(props: Readonly<Props>) {
  return (
    <Grid container item xs={12} sm={6}>
      <Box justifyContent="space-between">
        <div className="flex items-center">
          <div className="w-16 h-16 pt-5 mx-3 mb-3 text-xl text-center text-white rounded-full bg-japonica-600">
            {props.number}
          </div>
          <div className="text-xl font-bold">{props.name}</div>
        </div>
        {props.content.split('\n').map((line) => (
          <React.Fragment key={props.id}>
            <div className="text-xl">
              {line}
              <br />
            </div>
          </React.Fragment>
        ))}
      </Box>
    </Grid>
  );
}

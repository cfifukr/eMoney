import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#A79B94' : '#308fe8',
  },
}));



export default function ProgressBar({goal}) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      
      <BorderLinearProgress variant="determinate" value={Math.round(goal.moneyHave/goal.moneyNeed * 100)}/>
    </Stack>
  );
}

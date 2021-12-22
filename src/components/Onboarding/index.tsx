import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

import styles from './Onboarding.module.scss';

const Onboarding: React.FC<OnboardingProps> = ({ callback }) => {
  return (
    <Grid item xs={12} md={8} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Typography variant="h4">Hi there!</Typography>

        <Typography variant="body1" className={styles.subtitle}>
          Let&apos;s setup your <b>home location</b>
        </Typography>

        <div className={styles.row}>
          <Button
            variant="contained"
            type="submit"
            className={styles.save}
            onClick={callback}
          >
            Open settings
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

type OnboardingProps = {
  callback: () => void;
};

export default Onboarding;

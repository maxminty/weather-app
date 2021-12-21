import React from 'react';
import { Typography } from '@mui/material';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Typography variant="h4" className={styles.userBlockTitle}>
        Welcome to weather app
      </Typography>
    </header>
  );
};

export default Header;

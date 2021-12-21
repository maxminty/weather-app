import React from 'react';
import { SnackbarProvider as Provider } from 'notistack';

import { ReactComponent as CheckFilledIcon } from './icon-check-filled.svg';
import { ReactComponent as InfoFilledIcon } from './icon-info-filled.svg';
import { ReactComponent as WarnFilledIcon } from './icon-warning-filled.svg';
import { ReactComponent as CloseFilledIcon } from './icon-close-filled.svg';

import styles from './Snackbar.module.scss';

export const SnackbarProvider: React.FC = ({ children }) => {
  return (
    <Provider
      className={styles.root}
      classes={{
        variantSuccess: styles.successRoot,
        variantInfo: styles.infoRoot,
        variantWarning: styles.warnRoot,
        variantError: styles.errorRoot,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      iconVariant={{
        success: <CheckFilledIcon className={styles.icon} />,
        info: <InfoFilledIcon className={styles.icon} />,
        warning: <WarnFilledIcon className={styles.icon} />,
        error: <CloseFilledIcon className={styles.icon} />,
      }}
    >
      {children}
    </Provider>
  );
};

export * from 'notistack';

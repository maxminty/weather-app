import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'store';

import Routes from 'screens/routes';
import { SnackbarProvider } from 'components/Snackbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <Routes />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

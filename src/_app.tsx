import React from 'react';
// import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import App from './pages/home/App';
import { AppProps } from 'next/app';
import { store } from './redux/store';
// import './index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;

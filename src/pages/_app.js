import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.css';
import 'dotenv/config';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
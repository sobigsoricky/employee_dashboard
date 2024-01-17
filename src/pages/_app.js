import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle');
  }, []);

  return (
    <Provider store={store}>
      <main>
        <ToastContainer />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

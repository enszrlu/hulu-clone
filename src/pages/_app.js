import '@/styles/globals.css';

import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

import { Provider } from 'react-redux';
import store from '../../store/store';

const progress = new ProgressBar({
    size: 4,
    color: '#1AE783',
    className: 'z-50',
    delay: 0
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

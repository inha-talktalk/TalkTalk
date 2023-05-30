import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalThemeProvider from '@/styles/GlobalThemeContext';
import { RecoilRoot } from 'recoil';
import GNB from '@/components/GNB';
import { css } from '@emotion/react';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EventListener from '@/components/EventListener';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalThemeProvider>
      <RecoilRoot>
        <EventListener>
          <div
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              z-index: 100;
            `}
          >
            <GNB />
          </div>
          <div
            css={css`
              padding-top: 75px;
              height: 100%;
              box-sizing: border-box;
            `}
          >
            <ToastContainer
              limit={5}
              closeOnClick
              autoClose={2000}
              position="top-right"
              pauseOnFocusLoss={false}
              pauseOnHover
              draggable
            />
            <Component {...pageProps} />
          </div>
        </EventListener>
      </RecoilRoot>
    </GlobalThemeProvider>
  );
}

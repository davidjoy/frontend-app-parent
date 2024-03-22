import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import React from 'react';

import * as FrontendPlatform from '@edx/frontend-platform';
import * as FrontendPlatformConfig from '@edx/frontend-platform/config';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';

import messages from './i18n';

import './index.scss';
import ExamplePage from './example/ExamplePage';

global.React = React;
global.ReactDOM = ReactDOM;
global.FrontendPlatform = FrontendPlatform;
global.FrontendPlatformConfig = FrontendPlatformConfig;

const {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} = FrontendPlatform;

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <Header />
      <ExamplePage />
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  requireAuthenticatedUser: false,
  messages,
  handlers: {
    auth: () => {}, // Turn off auth
  },
});

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { Switch, Route } from 'react-router-dom';
import AppRouter from './Router/index';
import { GlobalStyle } from 'styles/global-styles';

// import { HomePage } from './pages/HomePage/Loadable';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import '../styles/tailwind.css';

export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="Dating App"
        defaultTitle="Dating App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="My dating app" />
      </Helmet>
      {/* <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch> */}
      <AppRouter />
      <GlobalStyle />
    </>
  );
}

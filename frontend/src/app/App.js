/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import { createGenerateClassName } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

const generateClassName = createGenerateClassName({
  productionPrefix: 'makeStyles',
});

export default function App({ store, persistor, basename }) {

  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={"/vdc/management"}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider generateClassName={generateClassName}>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                <SnackbarProvider 
                  maxSnack={3} 
                  autoHideDuration={6000}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {/* Render routes with provided `Layout`. */}
                  <Routes />
                </SnackbarProvider>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}

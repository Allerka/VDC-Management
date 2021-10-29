/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import {Layout} from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorPage1 from "./modules/ErrorsExamples/ErrorPage1";
import { getStorage } from "../_metronic/_helpers/LocalStorageHelpers"

export function Routes() {
    const {isAuthenticated} = useSelector(
        ({auth}) => ({
            isAuthenticated: getStorage("AuthToken") != null,
        }),
        shallowEqual
    );
    return (
        <Switch>
            {!isAuthenticated ? (
                /*Render auth page when user at `/auth` and not authorized.*/
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                /*Otherwise redirect to root page (`/`)*/
                <Redirect from="/login" to="/"/>
            )}

            <Route path="/error" component={ErrorPage1}/>
            <Route path="/logout" component={Logout}/>


            {!isAuthenticated ? (
                /*Redirect to `/login` when user is not authorized*/
                <Redirect to="/login"/>
            ) : (
                <Layout>
                    <BasePage/>
                </Layout>
            )}
        </Switch>
    );
}

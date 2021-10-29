import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import Dashboard from "./pages/Dashboard";
import VehicleRegistration from "./pages/VehicleRegistration";
import TestRegistration from "./pages/TestRegistration";
import VehicleDetails from "./pages/VehicleDetails";
import FileUpload from "./pages/ExcelUpload";
import VehicleAdmin from "./pages/AdminPage";
import SubmissionList from "./pages/SubmissionList"
import Changelog from "./pages/Changelog";
import DataAdmin from "./pages/DataAdmin";

export default function BasePage() {

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={Dashboard}/>
                <ContentRoute path="/registration" component={VehicleRegistration}/>
				<ContentRoute path="/test_registration" component={TestRegistration}/>
                <ContentRoute path="/details" component={VehicleDetails} />
                <ContentRoute path="/upload" component={FileUpload} />
                <ContentRoute path="/admin" component={VehicleAdmin} />
                <ContentRoute path="/submissions" component={SubmissionList} />
                <ContentRoute path="/changelog" component={Changelog} />
                <ContentRoute path="/data_admin" component={DataAdmin} />
                <Redirect to="/error"/>
            </Switch>
        </Suspense>
    );
}

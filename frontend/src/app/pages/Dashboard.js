import React, { useMemo } from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_metronic/layout";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { Paper, Grid } from '@material-ui/core';
import VehicleList from "../../_metronic/_partials/vdc/VehicleList";
import { setStorage } from "../../_metronic/_helpers/LocalStorageHelpers";

export default function Dashboard() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    });
    setStorage("pageTitle", 'Dashboard');
    const classes = UseStyles();
    return (
      <>
        <Paper className={classes.listPaper}>
          <Grid>
            <div className="row">
              <div className="col">
                <VehicleList />
              </div>
            </div>
          </Grid>
        </Paper>
      </>
    );
};
import React, { Component, useState } from "react";
import {NavLink}  from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Paper } from "@material-ui/core";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { getStorage, setStorage } from "../../_metronic/_helpers/LocalStorageHelpers"
import { APICall } from "../../app/modules/Auth/_redux/authCrud"
import store from "../../redux/store"
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { ReadOnly } from '../../_metronic/_partials/vdc/FormFields'
import { withSnackbar } from 'notistack';

class VehicleDetails extends Component{
    constructor(props){
        super(props);
        this.state ={id: '', data: [], choices: []};
        try {
            this.props.id = props.location.state.id;
            this.props.call = 'getVehicleDetails';
            APICall(this.props).then((response) => {
                this.setState({id: props.location.state.id, data: JSON.parse(response[0]), choices: JSON.parse(response[1])});
            });
        } catch(err) {
            console.log(err);
            this.props.enqueueSnackbar(err, {variant: 'error'});
        }
    }
    
    render() {
        if (this.state.data.length <= 0) {
            try {
                this.setState({id: JSON.parse(getStorage("viewRecords")).id, data: JSON.parse(getStorage("viewRecords")), choices: JSON.parse(getStorage("fieldChoices"))});
            } catch {
                this.state = {id: this.props.location.state.id, data: []};
            }
        }
        console.log(this.state);
        setStorage("pageTitle", ("Vehicle Details | " + this.state.data.test_name));
        if (!this.state.data || this.state.data.length <= 0) {
            return (
                <Table className='table_root' size="small">
                <tbody>
                    <Row>
                        <Col colSpan="8" align="center">
                            <b>Loading data...</b><br></br>
                            (If the data hasn't loaded after a few moments, try refreshing the page)
                        </Col>
                    </Row>
                </tbody>
            </Table>
        )} else {
        return(
            <DetailsList props={this.state}/>
            )  
        }
    }
};
    
    
function DetailsList(props) {
    const classes = UseStyles();
    const dispatch = useDispatch();
    const values = props.props.data;
    const choices = props.props.choices;
    const map = Object.entries(choices).map((field) => {
        Object.entries(field[1]).map(([key, label]) => {
            if (key === values[field[0]]) {
                values[field[0]] = label;
            } 
            if (key === values['front_hooks']) {
                values['front_hooks'] = label;
            } 
            if (key === values['rear_hooks']) {
                values['rear_hooks'] = label;
            } 
            if (key === values['dyno_mode']) {
                values['dyno_mode'] = label;
            } 
            if (key === values['coastdown']) {
                values['coastdown'] = label;
            } 
        })
    });
    store.dispatch({
        type: '',
      });
    
    // Set imperial/metric measurement displays based on country selection
    if (values.country === 'US') {
        var distance = 'in.'
        var weight = 'lbs.'
        var force1 = 'lbf'
        var force2 = 'lbf/mph'
        var force3 = 'lbf/mph²'
    } else {
        var distance = 'mm'
        var weight = 'kg'
        var force1 = 'N'
        var force2 = 'N/(km/h)'
        var force3 = 'N/(km/h)²'
    }

    return (
        <>
    {!values || values.length <= 0 ? (
        <Table className={classes.table_root} size="sm">
            <tbody>
                <Row>
                    <Col colSpan="8" align="center">
                        <b>Loading data...</b><br></br>
                    </Col>
                </Row>
            </tbody>
        </Table>
    ) : (
        <Paper className={classes.listPaper}>
            <div className={classes.root}>
                <Form className={classes.table_root}>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Requester Information</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Requester Name:"
                                value={values.r_name}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Requester Email:"
                                value={values.r_email}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Requester Phone:"
                                value={values.r_phone}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Requester Mobile:"
                                value={values.r_mobile}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Tester Name:"
                                value={values.t_name}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                        <ReadOnly
                                label="Tester Email:"
                                value={values.t_email}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Tester Phone:"
                                value={values.t_phone}
                            />
                        </Col>
                    </Row>

                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Soak Tag Information</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Model Year:"
                                value={values.year}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Make:"
                                value={values.make}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Model:"
                                value={values.model}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Special Identifier:"
                                value={values.identifier}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Exterior Color:"
                                value={values.color}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Test Vehicle Naming:"
                                    value={values.test_name}
                                />
                            </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Customer:"
                                value={values.customer}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="VIN:"
                                value={values.vin}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Vehicle Type:"
                                value={values.veh_type}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Tire Pressure (Front):"
                                value={values.f_pressure}
                                append="psi"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Tire Pressure (Rear):"
                                value={values.r_pressure}
                                append="psi"
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="VDC Fuel Type:"
                                value={values.fuel_type}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                        {(values.fuel_type_other) && (
                            <ReadOnly
                                label="Fuel Type (Other):"
                                value={values.fuel_type_other}
                            />
                        )}
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Fuel Tank Capacity:"
                                value={values.fuel_cap}
                                append="gal"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Fuel Tank 40% Fill (Rounded):"
                                value={Math.round(values.fuel_cap * 0.4)}
                                append="gal"
                            />
                        </Col>
                    </Row>

                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Emissions Information</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Regulation:"
                                value={values.regulation}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Certification Level:"
                                value={values.cert_level}
                            />
                        </Col>
                    </Row>
                    {(values.regulation === 'CFR 86' || values.regulation === 'CFR 1066') && (
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Engine Family/Group (EPA):"
                                value={values.eng_family}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Evap/Emission Family (EPA):"
                                value={values.emi_family}
                            />
                        </Col>
                    </Row>
                    )}
                    {(values.veh_type === 'BEV') && (
                    <>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Engine Out/Feedgas/Precat:"
                                value={values.eng_out === true ? 'Yes' : 'No'}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Catalyst Midbed Probe:"
                                value={values.cat_mid === true ? 'Yes' : 'No'}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Tailpipe/Postcat Probe:"
                                value={values.tail_post === true ? 'Yes' : 'No'}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Marmon Flange Size:"
                                value={values.marmon}
                                append="in."
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Marmon Flange Distance (Dual):"
                                value={values.marmon_distance}
                                append="in."
                            />
                        </Col>
                    </Row>
                    </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                        {(values.veh_type !== 'ICE') && (
                            <ReadOnly
                                label="Nominal Battery Voltage (BEV/(P)HEV):"
                                value={values.nom_bat}
                                append="V"
                            />
                        )}
                        </Col>
                        <Col className={classes.table_cell_body}>
                        {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                            <ReadOnly
                                label="Usable Battery Energy (BEV/PHEV):"
                                value={values.usable_bat}
                                append="kWh"
                            />
                        )}
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                        {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                            <ReadOnly
                                label="All-Electric Range (BEV/PHEV):"
                                value={values.all_range}
                                append="mi"
                            />
                        )}
                        </Col>
                        <Col className={classes.table_cell_body}>
                        {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                            <ReadOnly
                                label="CSCm:"
                                value={values.cscm}
                                append="mi"
                            />
                        )}
                        </Col>
                    </Row>

                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Road Load Derivation</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Country:"
                                value={values.country}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Dyno Roll Configuration:"
                                value={values.dyno_roll}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Wheelbase:"
                                value={values.wheelbase}
                                append={distance}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.country === 'US' || values.country === 'US Metric') && (
                            <>
                                <Col className={classes.table_cell_body}>
                                    <ReadOnly
                                        label="Mass:"
                                        value={values.mass_usa}
                                        append={weight}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                        <ReadOnly
                                            label="Inertia Class Lookup?:"
                                            value={values.inertia === true ? 'Yes' : 'No'}
                                        />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                        <ReadOnly
                                            label="Test Mass (EPA ETW):"
                                            value={values.test_mass_usa}
                                            append={weight}
                                        />
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.country === 'US' || values.country === 'US Metric' || values.country === 'EU') && (
                            <>
                                <Col className={classes.table_cell_body}>
                                    <ReadOnly
                                        label="MassRO (COC #13):"
                                        value={values.mass_ro}
                                        append={weight}
                                    />
                                    <b></b> 
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <ReadOnly
                                        label="Mass (COC #13 - 75kg):"
                                        value={values.mass_coc}
                                        append={weight}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <ReadOnly
                                        label="Test Mass (COC #47.1.1):"
                                        value={values.test_mass_eu}
                                        append={weight}
                                    />
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.regulation !== 'CFR 86' && values.regulation !== 'CFR 1066') && (
                            <>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff A(COC #47.1.3.0):"
                                    value={values.coeff1}
                                    append={force1}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff B(COC #47.1.3.1):"
                                    value={values.coeff2}
                                    append={force2}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff C(COC #47.1.3.2):"
                                    value={values.coeff3}
                                    append={force3}
                                />
                            </Col>
                            </>
                        )}
                    </Row>
                    {(values.country === 'US' || values.country === 'US Metric') && (
                        <>
                        <Row className={classes.table_row_root}>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff A(EPA):"
                                    value={values.coeff1}
                                    append={force1}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff B(EPA):"
                                    value={values.coeff2}
                                    append={force2}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Target Coeff C(EPA):"
                                    value={values.coeff3}
                                    append={force3}
                                />
                            </Col>
                        </Row>
                        <Row className={classes.table_row_root}>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Cold Target Coeff A(EPA):"
                                    value={values.cold_co1}
                                    append={force1}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Cold Target Coeff C(EPA):"
                                    value={values.cold_co2}
                                    append={force2}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Cold Target Coeff C(EPA):"
                                    value={values.cold_co3}
                                    append={force3}
                                />
                            </Col>
                        </Row>
                        </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Dyno Mode:"
                                value={String(values.dyno_mode)}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Neutral Coastdown Mode:"
                                value={String(values.coastdown)}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="D-rings (4 locations):"
                                value={values.d_rings === true ? 'Yes' : 'No, see below'}
                            />
                        </Col>
                    </Row>
                    {(values.d_rings === false || values.d_rings === 'false') && (
                        <>
                        <Row className={classes.table_row_root}>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Tow Hook(s) - Front:"
                                    value={String(values.front_hooks)}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                {values.front_alt && (
                                    <ReadOnly
                                        label="Alternate Front Tie Down:"
                                        value={values.front_alt}
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row className={classes.table_row_root}>
                            <Col className={classes.table_cell_body}>
                                <ReadOnly
                                    label="Tow Hook(s) - Rear:"
                                    value={String(values.rear_hooks)}
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                {values.rear_alt && (
                                    <ReadOnly
                                        label="Alternate Rear Tie Down:"
                                        value={values.rear_alt}
                                    />
                                )}
                            </Col>
                        </Row>
                        </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Additional Notes:"
                                value={values.desc}
                            />
                        </Col>
                    </Row>

                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Vehicle Information</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Complete Project/Charge Number:"
                                value={values.charge_num}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Plate#:"
                                value={values.license}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Engine Displacement:"
                                value={values.displacement}
                                append="L"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Number of Cylinders:"
                                value={values.cylinders}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Transmission Type:"
                                value={values.transmission}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Number of Gears:"
                                value={values.gears}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <NavLink className="menu-link" to="/dashboard">
                                <Button 
                                    type='submit'
                                    variant='primary'
                                >
                                    Return to Dashboard
                                </Button>
                            </NavLink>
                        </Col>
                        <Col className={classes.table_cell_body}>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Paper>
        )}
    </>
    );
};

export default withSnackbar(VehicleDetails);
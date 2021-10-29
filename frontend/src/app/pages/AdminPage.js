import React, { Component, useState } from "react";
import {NavLink}  from "react-router-dom";
import { Formik } from "formik";
import { useDispatch } from 'react-redux';
import { Paper } from "@material-ui/core";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { getStorage, setStorage, removeStorage } from "../../_metronic/_helpers/LocalStorageHelpers"
import { APICall } from "../modules/Auth/_redux/authCrud"
import store from "../../redux/store"
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { ReadOnly, AdminText, AdminSelect, AdminCheckbox, TestMass } from '../../_metronic/_partials/vdc/FormFields';
import { certUSA, certEU } from '../../_metronic/_partials/vdc/FormData';
import { withSnackbar } from 'notistack';

class VehicleAdmin extends Component{
    constructor(props){
        super(props);
        this.state ={id: '', data: [], choices: []};
        try {
            this.props.id = props.location.state.id;
            this.props.call = 'getVehicleDetails';
            removeStorage("viewRecords");
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
        setStorage("pageTitle", ("Vehicle Admin | " + this.state.data.test_name));
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
                <AdminList props={this.props} data={this.state}/>
            )
        }
    }
};
    
    
function AdminList(props) {
    const classes = UseStyles();
    const dispatch = useDispatch();
    const initialValues = props.data.data;
    const [ data, setData ] = useState(initialValues);
    const choices = props.data.choices;
    console.log(props);

    store.dispatch({
        type: '',
      });
    
    return (
        <>
        <Paper className={classes.listPaper}>
            <div className={classes.root}>
            <Formik
                initialValues={JSON.parse(getStorage("viewRecords"))}
                onSubmit={(values, actions) => {
                    if (values.submitAction === 'edit') {
                        props.props.enqueueSnackbar("Submitting edits...", {variant: 'info'});
                        props.props.call = 'editRecord';
                    } else if (values.submitAction === 'delete') {
                        if (window.confirm("Are you sure you wish to delete this record?")) {
                            props.props.enqueueSnackbar("Deleting record...", {variant: 'warning'});
                            props.props.call = 'deleteRecord';
                        } else {
                            return
                        }
                    }
                    props.props.data = values;
                    APICall(props.props)
                    .then(function(response){
                        removeStorage("viewRecords");
                        if (response.status === 204){
                            document.location = '/vdc/management/dashboard';
                        }
                    })
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                <Form className={classes.table_root} onSubmit={handleSubmit}>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Requester Information</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Requester Name:"
                                name="r_name"
                                value={values.r_name}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Requester Email:"
                                name="r_email"
                                value={values.r_email}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Requester Phone:"
                                name="r_phone"
                                value={values.r_phone}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Requester Mobile:"
                                name="r_mobile"
                                value={values.r_mobile}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Tester Name:"
                                name="t_name"
                                value={values.t_name}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Tester Email:"
                                name="t_email"
                                value={values.t_email}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Tester Phone:"
                                name="t_phone"
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
                            <AdminText
                                label="Model Year:"
                                name="year"
                                value={values.year}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Make:"
                                name="make"
                                value={values.make}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Model:"
                                name="model"
                                value={values.model}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Special Identifier:"
                                name="identifier"
                                value={values.identifier}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Exterior Color:"
                                name="color"
                                value={values.color}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Test Vehicle Naming:"
                                name="test_name"
                                value={values.test_name}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Customer:"
                                name="customer"
                                value={values.customer}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="VIN:"
                                name="vin"
                                value={values.vin}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Vehicle Type:"
                                name="veh_type"
                                value={values.veh_type}
                                data={choices.veh_type}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Tire Pressure (Front):"
                                name="f_pressure"
                                value={values.f_pressure}
                                append="psi"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Tire Pressure (Rear):"
                                name="r_pressure"
                                value={values.r_pressure}
                                append="psi"
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="VDC Fuel Type:"
                                name="fuel_type"
                                value={values.fuel_type}
                                data={choices.fuel_type}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            {(values.fuel_type_other) && (
                                <AdminText
                                    label="Fuel Type (Other):"
                                    name="fuel_type_other"
                                    value={values.fuel_type_other}
                                />
                            )}
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Fuel Tank Capacity:"
                                name="fuel_cap"
                                value={values.fuel_cap}
                                append="gal"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <ReadOnly
                                label="Fuel Tank 40% Fill (Rounded):"
                                name="fuel_cap"
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
                            <AdminSelect
                                label="Regulation:"
                                name="regulation"
                                value={values.regulation}
                                data={choices.regulation}
                            />
                                {/* {certUSA}
                            </AdminSelect> */}
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Certification Level:"
                                name="cert_level"
                                value={values.cert_level}
                                data={(() => {
                                    switch(values.regulation) { 
                                        case '86': return certUSA;
                                        case '1066': return certUSA;
                                        case 'None': return null;
                                        default: return certEU;
                                    }
                                })()}
                            />
                        </Col>
                    </Row>
                    {(values.regulation === '86' || values.regulation === '1066') && (
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Engine Family/Group (EPA):"
                                name="eng_family"
                                value={values.eng_family}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Evap/Emission Family (EPA):"
                                name="emi_family"
                                value={values.emi_family}
                            />
                        </Col>
                    </Row>
                    )}
                    {(values.veh_type === 'BEV') && (
                    <>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Engine Out/Feedgas/Precat:"
                                name="eng_out"
                                value={values.eng_out}
                                data={{true: 'Yes', false: 'No'}}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Catalyst Midbed Probe:"
                                name="cat_mid"
                                value={values.cat_mid}
                                data={{true: 'Yes', false: 'No'}}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Tailpipe/Postcat Probe:"
                                name="tail_post"
                                value={values.tail_post}
                                data={{true: 'Yes', false: 'No'}}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Marmon Flange Size:"
                                name="marmon"
                                value={values.marmon}
                                data={choices.marmon}
                                append="in."
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Marmon Flange Distance (Dual):"
                                name="marmon_distance"
                                value={values.marmon_distance}
                                append={values.country === 'US' ? ("in") : ("mm")}
                            />
                        </Col>
                    </Row>
                    </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            {(values.veh_type !== 'ICE') && (
                                <AdminText
                                    label="Nominal Battery Voltage (BEV/(P)HEV):"
                                    name="nom_bat"
                                    value={values.nom_bat}
                                    append="V"
                                />
                            )}
                        </Col>
                        <Col className={classes.table_cell_body}>
                        {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                            <AdminText
                                label="Usable Battery Energy (BEV/PHEV):"
                                name="usable_bat"
                                value={values.usable_bat}
                                append="kWh"
                            />
                        )}
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                                <AdminText
                                    label="All-Electric Range (BEV/PHEV):"
                                    name="all_range"
                                    value={values.all_range}
                                    append="mi"
                                />
                            )}
                        </Col>
                        <Col className={classes.table_cell_body}>
                            {(values.veh_type === 'BEV' || values.veh_type === 'PHEV') && (
                                <AdminText
                                    label="CSCm:"
                                    name="cscm"
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
                            <AdminSelect
                                label="Country:"
                                name="country"
                                value={values.country}
                                data={choices.country}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Dyno Roll Configuration:"
                                name="dyno_roll"
                                value={values.dyno_roll}
                                data={choices.dyno_roll}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Wheelbase:"
                                name="wheelbase"
                                value={values.wheelbase}
                                append={values.country === 'US' ? ("in") : ("mm")}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.country === 'US' || values.country === 'USM') && (
                            <>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Mass:"
                                        name="mass_usa"
                                        value={values.mass_usa}
                                        append={values.country === 'US' ? ("lbs.") : ("kg")}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                        <AdminSelect
                                            label="Inertia Class Lookup?:"
                                            name="inertia"
                                            value={values.inertia}
                                            data={{true: 'Yes', false: 'No'}}
                                        />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <TestMass
                                        label="Test Mass (EPA ETW):"
                                        name="test_mass_usa"
                                        value={values.test_mass_usa}
                                        data={values}
                                        // value={(values.inertia) ? data.test_mass_usa : data.mass_usa}
                                        append={values.country === 'US' ? ("lbs.") : ("kg")}
                                    />
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.country !== 'US' && values.country !== 'USM') && (
                            <>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="MassRO (COC #13):"
                                        name="mass_ro"
                                        value={values.mass_ro}
                                        append="kg"
                                    />
                                    <b></b> 
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Mass (COC #13 - 75kg):"
                                        name="mass_coc"
                                        value={values.mass_coc}
                                        append="kg"
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Test Mass (COC #47.1.1):"
                                        name="test_mass_eu"
                                        value={values.test_mass_eu}
                                        append="kg"
                                    />
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row className={classes.table_row_root}>
                        {(values.country !== 'US' && values.country !== 'USM') && (
                            <>
                            <Col className={classes.table_cell_body}>
                                <AdminText
                                    label="Target Coeff A(COC #47.1.3.0):"
                                    name="coeff1"
                                    value={values.coeff1}
                                    append="N"
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <AdminText
                                    label="Target Coeff B(COC #47.1.3.1):"
                                    name="coeff2"
                                    value={values.coeff2}
                                    append="N/(km/h)"
                                />
                            </Col>
                            <Col className={classes.table_cell_body}>
                                <AdminText
                                    label="Target Coeff C(COC #47.1.3.2):"
                                    name="coeff3"
                                    value={values.coeff3}
                                    append="N/(km/h)²"
                                />
                            </Col>
                            </>
                        )}
                    </Row>
                    {(values.country === 'US' || values.country === 'USM') && (
                        <>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Target Coeff A(EPA):"
                                        name="coeff1"
                                        value={values.coeff1}
                                        append={values.country === 'US' ? ("lbf") : ("N")}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Target Coeff B(EPA):"
                                        name="coeff2"
                                        value={values.coeff2}
                                        append={values.country === 'US' ? ("lbf/mph") : ("N/(km/h)")}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Target Coeff C(EPA):"
                                        name="coeff3"
                                        value={values.coeff3}
                                        append={values.country === 'US' ? ("lbf/mph²") : ("N/(km/h)²")}
                                    />
                                </Col>
                            </Row>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Cold Target Coeff A(EPA):"
                                        name="cold_co1"
                                        value={values.cold_co1}
                                        append={values.country === 'US' ? ("lbf") : ("N")}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Cold Target Coeff C(EPA):"
                                        name="cold_co2"
                                        value={values.cold_co2}
                                        append={values.country === 'US' ? ("lbf/mph") : ("N/(km/h)")}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    <AdminText
                                        label="Cold Target Coeff C(EPA):"
                                        name="cold_co3"
                                        value={values.cold_co3}
                                        append={values.country === 'US' ? ("lbf/mph²") : ("N/(km/h)²")}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Dyno Mode:"
                                name="dyno_mode"
                                value={String(values.dyno_mode)}
                                data={choices.mode}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="Neutral Coastdown Mode:"
                                name="coastdown"
                                value={values.coastdown}
                                data={choices.mode}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminSelect
                                label="D-rings (4 locations):"
                                name="d_rings"
                                value={values.d_rings}
                                data={{true: 'Yes', false: 'No, see below'}}
                            />
                        </Col>
                    </Row>
                    {(values.d_rings === false || values.d_rings === 'false') && (
                        <>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <AdminSelect
                                        label="Tow Hook(s) - Front:"
                                        name="front_hooks"
                                        value={String(values.front_hooks)}
                                        data={choices.hooks}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    {(values.front_hooks === 'None') && (
                                        <AdminText
                                            label="Alternate Front Tie Down:"
                                            name="front_alt"
                                            value={values.front_alt}
                                        />
                                    )}
                                </Col>
                            </Row>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <AdminSelect
                                        label="Tow Hook(s) - Rear:"
                                        name="rear_hooks"
                                        value={String(values.rear_hooks)}
                                        data={choices.hooks}
                                    />
                                </Col>
                                <Col className={classes.table_cell_body}>
                                    {(values.rear_hooks === 'None') && (
                                        <AdminText
                                            label="Alternate Rear Tie Down:"
                                            name="rear_alt"
                                            value={values.rear_alt}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Additional Notes:"
                                name="desc"
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
                            <AdminText
                                label="Complete Project/Charge Number:"
                                name="charge_num"
                                value={values.charge_num}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Plate#:"
                                name="license"
                                value={values.license}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Engine Displacement:"
                                name="displacement"
                                value={values.displacement}
                                append="L"
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Number of Cylinders:"
                                name="cylinders"
                                value={values.cylinders}
                            />
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Transmission Type:"
                                name="transmission"
                                value={values.transmission}
                            />
                        </Col>
                        <Col className={classes.table_cell_body}>
                            <AdminText
                                label="Number of Gears:"
                                name="gears"
                                value={values.gears}
                            />
                        </Col>
                    </Row>

                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_list_header}>
                            <h3>Administrative</h3>
                        </Col>
                    </Row>
                    <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>     
                          <AdminSelect
                              label="Change status to:"
                              name="status"
                              data={choices.status}
                              value={values.status}
                          />  
                        </Col>
                        <Col className={classes.table_cell_body}>
                          <AdminSelect
                              label="Change permission level:"
                              name="permission"
                              data={{'ANYONE': 'General Access', 'STAFF': 'VDC Staff Only', 'ADMIN': 'Admins Only'}}
                              value={values.permission}
                          />
                        </Col>
                        <Col className={classes.table_cell_centered}>
                        </Col>
                      </Row>
                        <Row className={classes.table_row_root}>
                            <Col className={classes.table_cell_centered}>
                                <NavLink to="/dashboard">
                                    <Button 
                                        variant='primary'
                                    >
                                        Return to Dashboard
                                    </Button>
                                </NavLink>
                            </Col>
                            <Col className={classes.table_cell_centered}>
                                <Button 
                                    type='submit'
                                    variant='success'
                                    disabled={Formik.isSubmitting}
                                    onClick={() => {
                                    values.submitAction = 'edit'}}
                                    >
                                    Save Changes
                                </Button>
                            </Col>
                            <Col className={classes.table_cell_centered}>
                                <Button 
                                    type='submit'
                                    variant='danger'
                                    disabled={Formik.isSubmitting}
                                    onClick={() => {
                                    values.submitAction = 'delete'}}
                                >
                                    Delete Records
                                </Button>
                            </Col>
                        </Row>
                </Form>
                )}
            </Formik>
            </div>
        </Paper>
    </>
    )
};

export default withSnackbar(VehicleAdmin);
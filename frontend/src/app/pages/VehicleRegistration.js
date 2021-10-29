import React, { useState } from "react";
import { Prompt, matchPath, Redirect } from "react-router-dom";
import { withFormik } from "formik";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { Paper, Tooltip, Grid } from '@material-ui/core';
import { Validation } from "../../_metronic/_partials/vdc/FormValidation";
import formData from "../../_metronic/_partials/vdc/FormData";
import { setStorage, getStorage } from "../../_metronic/_helpers/LocalStorageHelpers";
import store from "../../redux/store";
import { APICall } from "../modules/Auth/_redux/authCrud"
import { Row, Col, Button, Form } from 'react-bootstrap';
import { TextInput, CheckboxField, SelectBox, CheckboxAppendField, TestMass, TextAreaInput, ReadOnly } from "../../_metronic/_partials/vdc/FormFields";
import { certUSA, certEU } from '../../_metronic/_partials/vdc/FormData';
import { withSnackbar } from 'notistack';

function VehicleRegistration(props) {
  const submitted = useState(false);
  const classes = UseStyles();
  const choices = JSON.parse(getStorage("fieldChoices"));
  props.values.test_name = (props.values.make + props.values.model + props.values.identifier + props.values.color + props.values.customer);
  if (props.isSubmitting && !props.isValid && !props.isValidating) {
    props.enqueueSnackbar("There are errors in the submitted data. please check your fields and try again.", {variant: 'error'});
  };
  const {
      values,
      touched,
      setTouched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = props;
  setStorage("pageTitle", 'Vehicle Registration | ' + props.values.test_name);
    
    store.dispatch({
      type: '',
    });

  return (
    <div className={classes.root}>
      <Prompt
        when={!submitted[0]}
        message={({ pathname }) => {
          return matchPath(pathname, { path: "/registration" })
          ? true
          : "Are you sure you wish to leave this page?";
        }}
      />
      <Grid container justify='space-evenly'>
        <Paper className={classes.paper}>
          <Form onSubmit={handleSubmit}>
            <Row className={classes.table_row_header}>
              <Col className={classes.table_list_header}>
                  <h3>Requester Information</h3>
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="form_r_name"
                  label="Requester Name: "
                  name="r_name"
                  type="text"
                  value={props.values.r_name}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Requester Email: "
                  name="r_email"
                  type="email"
                  value={props.values.r_email}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Requester Phone: "
                  name="r_phone"
                  type="text"
                  value={props.values.r_phone}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Requester Mobile: "
                  name="r_mobile"
                  type="text"
                  value={props.values.r_mobile}
                  placeholder="Optional"
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <CheckboxField
                  label="I am the tester"
                  name="t_is_r"
                  type="checkbox"
                  append=
                {<Tooltip title={<h5>Check this if the requester and tester are the same person.</h5>} placement="top" className={classes.miniField} arrow interactive>
                    <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                </Tooltip>}
              />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Tester Name: "
                  name="t_name"
                  type="text"
                  value={props.values.t_is_r ? props.values.r_name: props.values.t_name}
                  disabled={props.values.t_is_r}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Tester Email: "
                  name="t_email"
                  type="email"
                  value={props.values.t_is_r ? props.values.r_email: props.values.t_email}
                  disabled={props.values.t_is_r}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  id="outlined-start-adornment"
                  label="Tester Phone: "
                  name="t_phone"
                  type="text"
                  value={props.values.t_is_r ? props.values.r_phone: props.values.t_phone}
                  disabled={props.values.t_is_r}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
              </Col>
            </Row>


            <Row className={classes.table_row_header}>
              <Col className={classes.table_list_header}>
                  <h3>Soak Tag Information</h3>
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Model Year: "
                  name="year"
                  type="text"
                  value={props.values.year}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Make: "
                  name="make"
                  type="text"
                  value={props.values.make}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Model: "
                  name="model"
                  type="text"
                  value={props.values.model}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Additonal Naming: "
                  name="identifier"
                  type="text"
                  value={props.values.identifier}
                  placeholder="Optional"
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Exterior Color: "
                  name="color"
                  type="text"
                  value={props.values.color}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Customer: "
                  name="customer"
                  type="text"
                  value={props.values.customer}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <CheckboxAppendField
                  label="VIN: "
                  name="vin"
                  type="text"
                  value={props.values.no_vin ? '' : props.values.vin}
                  className={classes.textField}
                  disabled={props.values.no_vin}
                  appendName="no_vin"
                  appendLabel="N/A"
                  append={
                    <Tooltip title={<h5>Check this to indicate the vehicle has no VIN, ex. if it's a prototype vehicle</h5>} placement="top" className={classes.miniField} arrow interactive>
                      <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                    </Tooltip>
                  }
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Vehicle Type: "
                  name="veh_type"
                  type="text"
                  value={props.values.veh_type}
                  data={choices.veh_type}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Tire Pressure (Front): "
                  name="f_pressure"
                  type="text"
                  value={props.values.f_pressure}
                  append={["psi"]}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Tire Pressure (Rear): "
                  name="r_pressure"
                  type="text"
                  value={props.values.r_pressure}
                  append={["psi"]}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Fuel Type: "
                  name="fuel_type"
                  type="text"
                  value={props.values.fuel_type}
                  data={choices.fuel_type}
                  append={
                    <Tooltip title={<h5>Chose a fuel type from the list. If your fuel type is not listed, choose "Other", list the type in the Other field, and contact Alan Bedewi.</h5>} placement="top" className={classes.miniField} arrow interactive>
                      <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                    </Tooltip>
                  }
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Fuel Type (Other): "
                  name="fuel_type_other"
                  type="text"
                  value={props.values.fuel_type_other}
                  placeholder="Optional"
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Fuel Tank Capacity: "
                  name="fuel_cap"
                  type="text"
                  value={props.values.fuel_cap}
                  append={["gal"]}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
              </Col>
            </Row>


            <Row className={classes.table_row_header}>
              <Col className={classes.table_list_header}>
                  <h3>Emissions Information</h3>
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Regulation: "
                  name="regulation"
                  type="select"
                  value={props.values.regulation}
                  data={choices.regulation}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Certification Level: "
                  name="cert_level"
                  type="select"
                  value={props.values.cert_level}
                  data={(() => {
                    switch(props.values.regulation) { 
                      case '86': return certUSA;
                      case '1066': return certUSA;
                      case 'NONE': return null;
                      default: return certEU;
                    }
                  })()}
                />
              </Col>
            </Row>
            {(props.values.regulation === '86' || props.values.regulation === '1066') && (
              <Row className={classes.flexbox}>
                <Col className={classes.table_cell_body}>
                  <TextInput
                    label="Engine Family/Group (EPA): "
                    name="eng_family"
                    type="text"
                    value={props.values.eng_family}
                  />
                </Col>
                  <Col className={classes.table_cell_body}>
                  </Col>
                <Col className={classes.table_cell_body}>
                  <TextInput
                    label="Evap/Emission Family (EPA): "
                    name="emi_family"
                    type="text"
                    value={props.values.emi_family}
                  />
                </Col>
              </Row>
            )}
            {(props.values.veh_type !== 'BEV' && props.values.veh_type !== 'NONE') && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <CheckboxField
                      label="Engine Out/Feedgas/Precat"
                      name="eng_out"
                      type="checkbox"
                      append={
                        <Tooltip title={<h5>If the vehicle has an Engine Out/Feedgas/Precat Probe installed for modal measurements, check this box. Otherwise, leave blank.</h5>} placement="top" className={classes.miniField} arrow interactive>
                          <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <CheckboxField
                      label="Catalyst Midbed Probe"
                      name="cat_mid"
                      type="checkbox"
                      append={
                        <Tooltip title={<h5>If the vehicle has a Catalyst Midbed Probe installed for modal measurements, check this box. Otherwise, leave blank.</h5>} placement="top" className={classes.miniField} arrow interactive>
                          <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                        </Tooltip>
                      }
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <CheckboxField
                      label="Tailpipe/Postcat Probe"
                      name="tail_post"
                      type="checkbox"
                      append={
                        <Tooltip title={<h5>If the vehicle has a Tailpipe/Postcat Probe installed for modal measurements, check this box. Otherwise, leave blank.</h5>} placement="top" className={classes.miniField} arrow interactive>
                          <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                        </Tooltip>
                      }
                    />
                  </Col>
                </Row>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <SelectBox
                      label="Marmon Flange Size:"
                      name="marmon"
                      type="select"
                      value={props.values.marmon}
                      data={choices.marmon}
                      append={
                        <Tooltip title={<h5>Select the marmon flange size from the list. Make sure your exhaust tube has a 1/8 to 1/4 inch overhang past the marmon flange to allow for exhaust gaskets.</h5>} placement="top" className={classes.miniField} arrow interactive>
                          <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                        </Tooltip>
                      }
                    />
                  </Col>
                    <Col className={classes.table_cell_body}>
                    </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Marmon Flange Distance (Dual):"
                      name="marmon_distance"
                      type="text"
                      value={props.values.marmon_distance}
                      append={["in."]}
                    />
                  </Col>
                </Row>
              </>
            )}
            {(props.values.veh_type !== 'ICE' && props.values.veh_type !== 'NONE') && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Usable Battery Energy (BEV/(P)HEV): "
                      name="usable_bat"
                      type="text"
                      value={props.values.usable_bat}
                      className={classes.smallField}
                      append={["kWh"]}
                    />
                  </Col>
                  {(props.values.veh_type === 'BEV' || props.values.veh_type === 'PHEV') && (
                    <>
                      <Col className={classes.table_cell_body}>
                        <TextInput
                          label="Nominal Battery Voltage (BEV/PHEV): "
                          name="nom_bat"
                          type="text"
                          value={props.values.nom_bat}
                          className={classes.smallField}
                          append={["V"]}
                        />
                      </Col>
                      <Col className={classes.table_cell_body}>
                        <TextInput
                          label="All-Electric Range &emsp;&emsp;&emsp;(BEV/PHEV): "
                          name="all_range"
                          type="text"
                          value={props.values.all_range}
                          className={classes.smallField}
                          append={["mi."]}
                        />
                      </Col>
                      <Col className={classes.table_cell_body}>
                        <TextInput
                          label="CSCm Distance &emsp;&emsp;&emsp;&emsp;(BEV/PHEV): "
                          name="cscm"
                          type="text"
                          value={props.values.cscm}
                          className={classes.smallField}
                          append={["mi."]}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </>
            )}
          <Row className={classes.flexbox}>
            <Col className={classes.table_cell_body}>
            </Col>
          </Row>


            <Row className={classes.table_row_header}>
              <Col className={classes.table_list_header}>
                <h3>Road Load Derivation</h3>
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Country: "
                  name="country"
                  type="text"
                  value={props.values.country}
                  data={choices.country}
                  append={
                    <Tooltip title={<h5>Choose a country designation from the list to get the appropriate units.</h5>} placement="top" className={classes.miniField} arrow interactive>
                      <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                    </Tooltip>
                  }
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <SelectBox
                  label="Dyno Roll Configuration: "
                  name="dyno_roll"
                  type="text"
                  value={props.values.dyno_roll}
                  data={choices.dyno_roll}
                  append={
                    <Tooltip title={<h5>FWD = front wheels spinning only. RWD = rear wheels spinning only. 4WD = all four wheels spinning (this can be an AWD vehicle or a 2WD vehicle with no dyno mode).</h5>} placement="top" className={classes.miniField} arrow interactive>
                      <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                    </Tooltip>
                  }
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Wheelbase: "
                  name="wheelbase"
                  type="text"
                  value={props.values.wheelbase}
                  append={[props.values.country === 'US' ? ("in") : ("mm")]}
                >
                </TextInput>
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                {(props.values.country === 'US' || props.values.country === 'USM') && (
                  <>
                    <TextInput
                      label="Mass: "
                      name="mass_usa"
                      type="text"
                      value={props.values.mass_usa}
                      // className={classes.smallField}
                      append={[props.values.country === 'US' ? ("lbs") : ("kgs")]}
                    />
                  </>
                )}
              </Col>
            </Row>
            {(props.values.country === 'US' || props.values.country === 'USM') && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <CheckboxField
                      label="Inertia Class Table Lookup? "
                      name="inertia"
                      type="checkbox"
                    />
                  </Col>
                    <Col className={classes.table_cell_body}>

                    </Col>
                  <Col className={classes.table_cell_body}>
                  <br/>
                    <TestMass
                      label="Test Mass: "
                      name="test_mass_usa"
                      type="text"
                      value={props.values.test_mass_usa}
                      data={props.values}
                      append={[props.values.country === 'US' ? ("lbs") : ("kgs")]}
                    />
                  </Col>
                </Row>
              </>
            )}
            {(props.values.country && props.values.country !== 'US' && props.values.country !== 'USM') && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Test Mass (COC #47.1.1): "
                      name="test_mass_eu"
                      type="text"
                      value={props.values.test_mass_eu}
                      className={classes.textField}
                      append={["kg"]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="MassRO (COC #13): "
                      name="mass_ro"
                      type="text"
                      value={props.values.mass_ro}
                      className={classes.textField}
                      append={["kg"]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Mass (COC #13 - 75kg): "
                      name="mass_coc"
                      type="text"
                      value={props.values.mass_coc}
                      className={classes.textField}
                      placeholder="Optional"
                      append={["kg"]}
                    />
                  </Col>
                </Row>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff A(COC #47.1.3.0): "
                      name="coeff1"
                      type="text"
                      value={props.values.coeff1}
                      className={classes.textField}
                      append={["N"]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff B(COC #47.1.3.1): "
                      name="coeff2"
                      type="text"
                      value={props.values.coeff2}
                      className={classes.textField}
                      append={["N/(km/h)"]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff C(COC #47.1.3.2): "
                      name="coeff3"
                      type="text"
                      value={props.values.coeff3}
                      className={classes.textField}
                      append={["N/(km/h)²"]}
                    />
                  </Col>
                </Row>
              </>
            )}
            {(props.values.country === 'US' || props.values.country === 'USM') && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff A(EPA): "
                      name="coeff1"
                      type="text"
                      value={props.values.coeff1}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf") : ("N")]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff B(EPA): "
                      name="coeff2"
                      type="text"
                      value={props.values.coeff2}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf/mph") : ("N/(km/h)")]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Target Coeff C(EPA): "
                      name="coeff3"
                      type="text"
                      value={props.values.coeff3}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf/mph²") : ("N/(km/h)²")]}
                    />
                  </Col>
                </Row>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Cold Target Coeff A(EPA): "
                      name="cold_co1"
                      type="text"
                      value={props.values.cold_co1}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf") : ("N")]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Cold Target Coeff B(EPA): "
                      name="cold_co2"
                      type="text"
                      value={props.values.cold_co2}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf/mph") : ("N/(km/h)")]}
                    />
                  </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Cold Target Coeff C(EPA): "
                      name="cold_co3"
                      type="text"
                      value={props.values.cold_co3}
                      className={classes.textField}
                      append={[props.values.country === 'US' ? ("lbf/mph²") : ("N/(km/h)²")]}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row className={classes.flexbox}>
              <Row className={classes.halfFlex}>
                <Col className={classes.table_cell_body}>
                  <SelectBox
                    label="Dyno Mode: "
                    name="dyno_mode"
                    type="text"
                    value={props.values.dyno_mode}
                    data={choices.mode}
                    append={
                      <Tooltip title={<h5>If the vehicle has a dyno mode, please choose Yes and submit the procedure along with this form. Otherwise, choose No.</h5>} placement="top" className={classes.miniField} arrow interactive>
                        <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                      </Tooltip>
                    }
                  />
                </Col>
                <br/>
                <Col className={classes.table_cell_body}>
                  <SelectBox
                    label="Neutral Coastdown Mode: "
                    name="coastdown"
                    type="text"
                    value={props.values.coastdown}
                    data={choices.mode}
                    append={
                      <Tooltip title={<h5>If the vehicle has a neutral coastdown mode (for road load derivations), please choose Yes and submit the procedure along with this form. Otherwise, choose No.</h5>} placement="top" className={classes.miniField} arrow interactive>
                        <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                      </Tooltip>
                    }
                  />
                </Col>
              </Row>
                <Col className={classes.table_cell_body}>
                </Col>
                <Col className={classes.table_cell_body}>
                  <TextAreaInput
                    label="Additional Notes: "
                    name="desc"
                    type="text"
                    value={props.values.desc}
                  />
                </Col>
              </Row>
            {/* </Row> */}
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <CheckboxField
                  label="D-rings (4 locations)? "
                  name="d_rings"
                  type="checkbox"
                  append={
                    <Tooltip title={<h5>If the vehicle is equipped with four D-rings, select Yes. Otherwise, choose No and move on to the Tow Hook options.</h5>} placement="top" className={classes.miniField} arrow interactive>
                      <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                    </Tooltip>
                  }
                />
              </Col>
            </Row>
            {!props.values.d_rings && (
              <>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <SelectBox
                      label="Tow Hook(s) - Front: "
                      name="front_hooks"
                      type="text"
                      value={props.values.front_hooks}
                      data={choices.hooks}
                      append={
                      <Tooltip title={<h5>If the vehicle has a tow hook installed in the front, choose Yes. If not, choose No and specify the front tie down locatoin for dyno installation.</h5>} placement="top" className={classes.miniField} arrow interactive>
                        <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                      </Tooltip>
                    }
                    />
                  </Col>
                    <Col className={classes.table_cell_body}>
                    </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Alternate Front Tie Down: "
                      name="front_alt"
                      type="text"
                      value={props.values.front_alt}
                      placeholder="Optional"
                    />
                  </Col>
                </Row>
                <Row className={classes.flexbox}>
                  <Col className={classes.table_cell_body}>
                    <SelectBox
                      label="Tow Hook(s) - Rear: "
                      name="rear_hooks"
                      type="text"
                      value={props.values.rear_hooks}
                      data={choices.hooks}
                      append={
                      <Tooltip title={<h5>If the vehicle has a tow hook installed in the rear, choose Yes. If not, choose No and specify the front tie down location for dyno installation.</h5>} placement="top" className={classes.miniField} arrow interactive>
                        <span style={{ position: "relative", color: "blue" }}><u><b>?</b></u></span>
                      </Tooltip>
                    }
                    />
                  </Col>
                    <Col className={classes.table_cell_body}>
                    </Col>
                  <Col className={classes.table_cell_body}>
                    <TextInput
                      label="Alternate Rear Tie Down: "
                      name="rear_alt"
                      type="text"
                      value={props.values.rear_alt}
                      placeholder="Optional"
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
              </Col>
            </Row>

            
            <Row className={classes.table_row_header}>
              <Col className={classes.table_list_header}>
                <h3>Vehicle Info</h3>
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                    label="Complete Project/Charge Number: "
                    name="charge_num"
                    type="text"
                    value={props.values.charge_num}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                    label="Plate#: "
                    name="license"
                    type="text"
                    value={props.values.license}
                    // placeholder=""
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Engine Displacement: "
                  name="displacement"
                  type="text"
                  value={props.values.displacement}
                  append={["L"]}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Number of Cylinders: "
                  name="cylinders"
                  type="text"
                  value={props.values.cylinders}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Transmission Type: "
                  name="transmission"
                  type="text"
                  value={props.values.transmission}
                />
              </Col>
                <Col className={classes.table_cell_body}>
                </Col>
              <Col className={classes.table_cell_body}>
                <TextInput
                  label="Number of Gears: "
                  name="gears"
                  type="text"
                  value={props.values.gears}
                />
              </Col>
            </Row>
            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
              </Col>
            </Row>


            <Row className={classes.flexbox}>
              <Col className={classes.table_cell_body}>
                <Button 
                  type='submit'
                  variant='success'
                  onClick={() => {
                  values.submitAction = 'draft'}}
                  >
                  Save Draft
                </Button>
              </Col>
              <Col className={classes.table_cell_body}>

              </Col>
              <Col className={classes.table_cell_body}>
                <Button
                  type='submit'
                  variant='primary'
                  onClick={() => {
                  values.submitAction = 'save'}}
                >   
                    Submit
                </Button>
              </Col>
            </Row>
          </Form>
          {props.errors.name && props.touched.name && <div id="feedback">{props.errors.name}</div>}
        </Paper>
      </Grid>  
    </div>
  );
}
// }

export default withSnackbar(withFormik({
  mapPropsToValues: () => (formData),
  validationSchema: (props) => Validation,
  handleSubmit: (values, formik) => {
    formik.setSubmitting(true);
    console.log(formik);
    formik.props.data = values;
    if (values.submitAction === 'draft') {
      formik.props.enqueueSnackbar("Saving draft...", {variant: 'info'});
      formik.props.call = 'saveDraft';
      APICall(formik.props)
    } else if (values.submitAction === 'save') {
      formik.props.enqueueSnackbar("Submitting vehicle...", {variant: 'info'});
      formik.props.call = 'submitRegistration';
      APICall(formik.props)
      .then(function(response){
		if (response.status == 201) {
			document.location = "/vdc/management/dashboard";
		  }
      });
    }
    const state = (
      {
        submitted: true,
      });
  },
})(VehicleRegistration));

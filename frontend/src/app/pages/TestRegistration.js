import React, { useState } from "react";
import { Prompt, matchPath, Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { Paper, Grid } from '@material-ui/core';
import { TestValidation } from "../../_metronic/_partials/vdc/FormValidation";
import { testFormData } from "../../_metronic/_partials/vdc/FormData";
import { setStorage, getStorage } from "../../_metronic/_helpers/LocalStorageHelpers";
import store from "../../redux/store";
import { APICall } from "../modules/Auth/_redux/authCrud"
import { Table } from 'react-bootstrap';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { TextInput, CheckboxField, SelectBox } from "../../_metronic/_partials/vdc/FormFields";
import { withSnackbar } from 'notistack';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function TestRegistration(props) {
  const submitted = useState(false);
  const classes = UseStyles();
  const choices = JSON.parse(getStorage("fieldChoices"));
  props.values.flow_rates = [0, 0, 0]
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
  setStorage("pageTitle", 'Test Registration | ' + props.values.test_name);
  console.log(props);
  
  function procedureChange(props) {
	var api = {};
	api.call = 'flowRate';
	api.procedure = props.values.procedure;
	APICall(api).
	then(function(response){
		console.log(response);
	})
  };

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
		<Form onSubmit={handleSubmit}>
			
			<Tabs>
				<TabList>
					<Tab>Custom Fields</Tab>
					<Tab>Settings</Tab>
					<Tab>Flow Rates</Tab>
					<Tab>Replay Test</Tab>
					<Tab>Electrified Vehicles</Tab>
					<Tab>RDE</Tab>
				</TabList>

				{/* Custom Fields */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.left_paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="New Test Name: "
										name="test_name"
										type="text"
										value={props.values.test_name}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Fan Coefficient A: "
										name="fan_coeff_1"
										type="text"
										value={props.values.fan_coeff_1}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Fan Coefficient B: "
										name="fan_coeff_2"
										type="text"
										value={props.values.fan_coeff_2}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Fan Coefficient C: "
										name="fan_coeff_3"
										type="text"
										value={props.values.fan_coeff_3}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Dilution Air Heater: "
										name="dilution"
										type="text"
										value={props.values.dilution}
										data={{ true: 'On', false: 'Off' }}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Flow Stream: "
										name="flow_stream"
										type="text"
										value={props.values.flow_stream}
										data={choices.flow_stream}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Heat Exchanger: "
										name="heat_exchange"
										type="text"
										value={props.values.heat_exchange}
										data={{ true: 'On', false: 'Off' }}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Test Type: "
										name="test_type"
										type="text"
										value={props.values.test_type}
										data={choices.test_type}
									/>
								</Col>
							</Row>
						</Paper>
					</Grid>
				</TabPanel>

				{/* Settings */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.right_paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Test Procedure: "
										name="procedure"
										type="text"
										value={props.values.procedure}
										data={choices.procedure}
										// onChange={handleChange().then(procedureChange(props))}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Shift List: "
										name="shift_list"
										type="text"
										value={props.values.shift_list}
										data={choices.shift_list}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Configuration: "
										name="test_config"
										type="checkbox"
										value={props.values.test_config}
										data={choices.test_config}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Sample Line Configuartion: "
										name="sample_config"
										type="text"
										value={props.values.sample_config}
										data={choices.sample_config}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Regulation: "
										name="test_reg"
										type="text"
										value={props.values.test_reg}
										data={choices.test_reg}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Fuel: "
										name="test_fuel"
										type="text"
										value={props.values.test_fuel}
										data={choices.test_fuel}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Vehicle: "
										name="vehicle"
										type="text"
										value={props.values.vehicle}
										data={choices.vehicle}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Pollutant Limits: "
										name="pollutant"
										type="text"
										value={props.values.pollutant}
										data={choices.pollutant}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<SelectBox
										label="Channel Set: "
										name="channel"
										type="text"
										value={props.values.channel}
										data={choices.channel}
									/>
								</Col>
							</Row>
						</Paper>

						<Paper className={classes.right_paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="SAO Offset: "
										name="sao_offset"
										type="select"
										value={props.values.sao_offset}
										data={choices.sao_offset}
										disabled
										default="Standard"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run export after test"
										name="post_export"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run report after test"
										name="post_report"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run idle check"
										name="idle_check"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="Idle check type"
										name="check_type"
										type="text"
										value={props.values.check_type}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<TextInput
										label="Idle high minimum value (rpm)"
										name="idle_high"
										type="text"
										value={props.values.idle_high}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Skip first bag pair"
										name="skip_first"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Prompt to repeat test procedure"
										name="repeat"
										type="checkbox"
										disabled={props.values.skip_first}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<TextInput
										label="Maximum break time (min)"
										name="break_time"
										type="text"
										value={props.values.break_time}
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Auto select bag pairs"
										name="auto_select"
										type="checkbox"
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Wait for bag reads"
										name="bag_read"
										type="checkbox"
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<TextInput
										label="Bag pair dump duration (s)"
										name="dump_time"
										type="text"
										value={props.values.dump_time}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run vacuum side leak check"
										name="side_leak"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run CVS blower"
										name="blower"
										type="checkbox"
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Control chassis dynamometer"
										name="chassis"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run road load verification"
										name="road_verify"
										type="checkbox"
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Run road load adjustment"
										name="road_adjust"
										type="checkbox"
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="Coastdown configuration"
										name="coast_config"
										type="text"
										value={props.values.coast_config}
										data={choices.coast_config}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Control gradient demand"
										name="gradient"
										type="checkbox"
										disabled={!props.values.repeat}
									/>
								</Col>
							</Row>
						</Paper>
					</Grid>
				</TabPanel>

				{/* Flow Rates */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<Table className={classes.table_root} size='sm'>
										<thead>
											<tr className={classes.table_row_root}>
												<td className={classes.table_cell_head}>Device</td>
												<td className={classes.table_cell_head}>Per Sample</td>
												<td className={classes.table_cell_head}>All Samples</td>
												{props.values.flow_rates.map((rate, index) =>(
													<td className={classes.table_cell_head}>Sample {index}</td>
													))
												}
											</tr>
										</thead>
										<tbody>
											<tr className={classes.table_row_root}>
												<td className={classes.table_cell_vertical}>CVS (m³/min)</td>
												<td className={classes.table_cell_vertical}>
													{/* <CheckboxField
														name='per_sample'
														type="checkbox"
														className={classes.smallField}
													/> */}
													<Field type="checkbox" name='per_sample' />
												</td>
												<td className={classes.table_cell_body}>
													<SelectBox
														name='all_samples'
														type='text'
														className={classes.smallField}
														data={choices.flow_rates}
														disabled={props.values.per_sample}
													/>
												</td>
												{props.values.flow_rates.map((rate, index) =>(
													<td className={classes.table_cell_body}>
														<SelectBox
															name={'sample_' + index}
															type='text'
															className={classes.smallField}
															data={choices.flow_rates}
															disabled={!props.values.per_sample}
														/>
													</td>
													))
												}
											</tr>
										</tbody>
									</Table>
								</Col>
							</Row>
						</Paper>
					</Grid>
				</TabPanel>


				{/* Replay Test */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="Test Result"
										name="test_result"
										type="select"
										data={choices.test_result}
									/>
								</Col>	
							</Row>
						</Paper>
					</Grid>
				</TabPanel>

				{/* Electrified Vehicles */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.left_paper}>
						<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<CheckboxField
										label="Enter recharged electrical energy after test"
										name="recharge"
										type="checkbox"
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="Break-off/end-of-test criterion"
										name="break_off"
										type="text"
										value={props.values.break_off}
										data={choices.break_off}
									/>
								</Col>
							</Row>
						</Paper>
					</Grid>
				</TabPanel>

				{/* RDE+ */}
				<TabPanel>
					<Grid container justify='space-evenly'>
						<Paper className={classes.paper}>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_tight}>
									<SelectBox
										label="Dyno Mode"
										name="dyno_mode"
										type="text"
										value={props.values.dyno_mode}
										data={choices.dyno_mode}
										disabled
									/>
								</Col>
							</Row>

							<br></br>
							<Row className={classes.table_row_header}>
                                <Col className={classes.table_cell_head}>
                                    <h3>Pre-pull away</h3>
                                </Col>
                            </Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Speed (km/h): "
										name="pre_speed"
										type="text"
										value={props.values.pre_speed}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Time (s): "
										name="pre_time"
										type="text"
										value={props.values.pre_time}
										disabled
									/>
								</Col>
							</Row>

							<br></br>
							<Row className={classes.table_row_header}>
                                <Col className={classes.table_cell_head}>
                                    <h3>Look ahead</h3>
                                </Col>
                            </Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Speed (s): "
										name="ahead_speed"
										type="text"
										value={props.values.ahead_speed}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Throttle Position (s): "
										name="ahead_throttle"
										type="text"
										value={props.values.ahead_throttle}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Clutch (s): "
										name="ahead_clutch"
										type="text"
										value={props.values.ahead_clutch}
										disabled
									/>
								</Col>
							</Row>
							<Row className={classes.flexbox}>
								<Col className={classes.table_cell_body}>
									<TextInput
										label="Brake Position (s): "
										name="ahead_brake"
										type="text"
										value={props.values.ahead_brake}
										disabled
									/>
								</Col>
							</Row>
						</Paper>
					</Grid>
				</TabPanel>
			</Tabs>
			<br></br>
			<Grid container justify='space-evenly'>
				<Paper className={classes.right_paper}>
					<Row className={classes.flexbox}>
						<Col colSpan="8" align="center">
							<Button 
								type='submit'
								variant='success'
								onClick={() => {
								values.submitAction = 'draft'}}
							>
								Save Draft
							</Button>
						</Col>
						<Col colSpan="8" align="center">
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
					{(props.errors.name && props.touched.name) && <div id="feedback">{props.errors.name}</div>}
				</Paper>
			</Grid>
		</Form>
    </div>
  );
}

export default withSnackbar(withFormik({
  mapPropsToValues: () => (testFormData),
  validationSchema: (props) => TestValidation,
  handleSubmit: (values, formik) => {
    formik.setSubmitting(true);
    console.log(formik);
    formik.props.data = values;
    if (values.submitAction === 'draft') {
      formik.props.enqueueSnackbar("Draft functionality not yet available.", {variant: 'warning'});
      formik.props.call = 'saveTestDraft';
    //   APICall(formik.props)
    } else if (values.submitAction === 'save') {
      formik.props.enqueueSnackbar("Submitting test...", {variant: 'info'});
      formik.props.call = 'submitRegistration';
      APICall(formik.props)
      .then(function(response){
		  console.log(response);
		  if (response.status == 201) {
			  document.location = "/vdc/management/dashboard";
			}
      });
    }
    const state = (
      {
        submitted: true,
      });
  }
})(TestRegistration));

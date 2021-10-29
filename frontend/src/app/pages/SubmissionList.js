import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { APICall } from "../modules/Auth/_redux/authCrud"
import { Table, Row, Col, Button } from 'react-bootstrap';
import { Paper } from "@material-ui/core";
import { Formik } from "formik";
import { setStorage, getStorage, removeStorage } from "../../_metronic/_helpers/LocalStorageHelpers";
import store from "../../redux/store"
import { ReadOnly, AdminSelect, AdminText } from "../../_metronic/_partials/vdc/FormFields"
import { getStatus, statusChoices } from "../../_metronic/_partials/vdc/FormData"
import { withSnackbar } from 'notistack';


class SubmissionList extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], archive: [], choices: []};
    setStorage("pageTitle", "Vehicle Management");
  }
  
  componentDidMount() {
    const self = this;
    this.props.call = 'submissions';
    this.props.method = 'get';
    APICall(this.props)
    .then(response => {
      if (response.status == 403) {
        setStorage("Snackbar", response.headers.message);
        setStorage("Variant", 'error');
        document.location = '/vdc/management/dashboard';
      } else if (getStorage("Snackbar")) {
        console.log(getStorage("Snackbar"));
        this.props.enqueueSnackbar(String(getStorage("Snackbar")), {variant: 'success'});
        removeStorage("Snackbar");
      };
      this.setState((state, props) =>{ return { data: JSON.parse(response[0]), archive: JSON.parse(response[1]), choices: JSON.parse(response[2]) };
      });
    })
  };

  render() {
    console.log(this.state);
    return (
      <DisplayList props={this.props} data={this.state}/>
    );
  }
}
  

function DisplayList(props) {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const res = props.data.data;
  const archive = props.data.archive;
  const choices = props.data.choices;
  console.log(props);

  return (
    <>
      <div className={classes.root}>
        <h3>Non-Accepted Vehicles</h3>
          {!res || res.length <= 0 ? (
          <Table className={classes.table_root}>
                <Row>
                  <Col colSpan="8" align="center">
                    <b>No entries found.</b>
                  </Col>
                </Row>
          </Table>
          ) : (
            res.map(res => (
              <Paper className={classes.listPaper} style={{ marginBottom: 20 }}>
                <Table className={classes.table_root}>
                  <Row key={res.id} className={classes.table_row_header}>
                    <Col className={classes.table_cell_vertical}>
                      <h4>{res.test_name}</h4>
                    </Col>
                    <Col className={classes.table_cell_body} style={{ marginBottom: 0, marginTop: 0 }}>
                    </Col>
                    <Col className={classes.table_cell_centered} style={{ marginBottom: 0, marginTop: 0 }}>            
                      <Link className="table-link" to={{pathname: "/details", state: { id: res.id}}}>
                        <Button variant="primary" className={classes.button}>
                          View Full Records
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row className={classes.table_row_root}>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Requester Name:"
                          value={res.r_name}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Tester Name:"
                          value={res.t_name}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Current Status:"
                          value={getStatus(res.status)}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.table_row_root}>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="VIN:"
                          value={res.vin}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                        label="Charge Number:"
                        value={res.charge_num}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                        label="Plate#:"
                        value={res.license}
                      />
                    </Col>
                  </Row>
                  <Formik
                    initialValues={{
                      status: res.status,
                      comments: '',
                      id: res.id,
                    }}
                    onSubmit={(values, actions) => {
                      actions.setSubmitting(true);
                      props.props.enqueueSnackbar("Submitting change...", {variant: 'info'});
                      props.props.method = 'post';
                      props.props.data = values;
                      APICall(props.props)
                      .then(() => {
                        window.location.reload(false);
                      })
                    }}
                  >
                  {({values,
                    handleSubmit}) => (
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
                          <AdminText
                              label="Reason/Comments:"
                              name="comments"
                              value={values.comments}
                          />
                        </Col>
                        <Col className={classes.table_cell_centered}>
                          <Button 
                              type='submit'
                              variant='success'
                              disabled={Formik.isSubmitting}
                              onClick={handleSubmit}
                              >
                              Update Status
                          </Button>
                        </Col>
                      </Row>
                  )}
                  </Formik>
                </Table>
              </Paper>
            ))
          )}
      </div>
      {!archive || archive.length <= 0 ? (
         "" ) : (
      <div className={classes.root}>
        <h3>Archived Vehicles</h3>
            {archive.map(archive => (
              <Paper className={classes.listPaper} style={{ marginBottom: 20 }}>
                <Table className={classes.table_root}>
                  <Row key={archive.id} className={classes.table_row_header}>
                    <Col className={classes.table_cell_vertical}>
                      <h4>{archive.test_name}</h4>
                    </Col>
                    <Col className={classes.table_cell_body} style={{ marginBottom: 0, marginTop: 0 }}>
                    </Col>
                    <Col className={classes.table_cell_centered} style={{ marginBottom: 0, marginTop: 0 }}>            
                      <Link className="table-link" to={{pathname: "/details", state: { id: archive.id}}}>
                        <Button variant="primary" className={classes.button}>
                          View Full Records
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row className={classes.table_row_root}>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Requester Name:"
                          value={archive.r_name}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Tester Name:"
                          value={archive.t_name}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="Current Status:"
                          value={getStatus(archive.status)}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.table_row_root}>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                          label="VIN:"
                          value={archive.vin}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                        label="Charge Number:"
                        value={archive.charge_num}
                      />
                    </Col>
                    <Col className={classes.table_cell_body}>
                      <ReadOnly
                        label="Plate#:"
                        value={archive.license}
                      />
                    </Col>
                  </Row>
                  <Formik
                    initialValues={{
                      status: archive.status,
                      comments: '',
                      id: archive.id,
                    }}
                    onSubmit={(values, actions) => {
                      actions.setSubmitting(true);
                      props.props.enqueueSnackbar("Submitting change...", {variant: 'info'});
                      props.props.method = 'post';
                      props.props.data = values;
                      APICall(props.props)
                      .then(() => {
                        window.location.reload(false);
                      })
                    }}
                  >
                  {({values,
                    handleSubmit}) => (
                      <Row className={classes.table_row_root}>
                        <Col className={classes.table_cell_body}>     
                          <AdminSelect
                              label="Change status to:"
                              name="status"
                              data={statusChoices}
                              value={values.status}
                          />  
                        </Col>
                        <Col className={classes.table_cell_body}>
                          <AdminText
                              label="Reason/Comments:"
                              name="comments"
                              value={values.comments}
                          />
                        </Col>
                        <Col className={classes.table_cell_centered}>
                          <Button 
                              type='submit'
                              variant='success'
                              disabled={Formik.isSubmitting}
                              onClick={handleSubmit}
                              >
                              Update Status
                          </Button>
                        </Col>
                      </Row>
                  )}
                  </Formik>
                </Table>
              </Paper>
            ))
          }
        </div>
      )}
    </>
  )
}

export default withSnackbar(SubmissionList);
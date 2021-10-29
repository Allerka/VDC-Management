import React, { Component, useState } from "react";
import { Paper } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";
import { APICall } from "../modules/Auth/_redux/authCrud";
import { withRouter, Redirect } from "react-router-dom";
import { setStorage } from "../../_metronic/_helpers/LocalStorageHelpers";
import { withSnackbar } from 'notistack';

class FileUpload extends Component{
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
      setStorage("pageTitle", "Upload Excel File");
  }

  onChangeHandler = (event) => {
    var files = event.target.files
    if(this.checkMimeType(event) && this.checkFileSize(event)){ 
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
  }
      
  onClickHandler = (event) => {
    this.props.data = new FormData() 
    this.props.data.append('file', this.state.selectedFile)
    this.props.call = 'submitExcel';
    this.props.enqueueSnackbar("Submitting file...", {variant: 'info'});
    return (
      APICall(this.props)
      .then(function(props) {
        if (props.response.status == 200 || props.response.status == 201) {
          setStorage("Snackbar", "Form submitted!");
          document.location = '/vdc/management/dashboard';
        }}
      )
    )
  }
        
  checkMimeType = (event) => {
    let file = event.target.files[0] 
    let err = ''
    const types = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      if (types.every(type => file.type !== type)) {
        err += file.type + ' is not a supported format\n';
      };
    if (err !== '') { 
      event.target.value = null 
      console.log(err)
        return false; 
    }
    return true;
  }

  checkFileSize=(event)=>{
    let file = event.target.files[0]
    let size = 128000 
    let err = ''; 
    if (file.size > size) {
     err = file.name + 'is larger than expected. Please ensure you have not added any extraneous data.\n';
    };
    if (err !== '') { 
      event.target.value = null 
      console.log(err)
        return false; 
    }
    return true;
  }

  render() {
    return(
      <Paper>
        <Container>
          <div style={{ paddingTop: 25, paddingBottom: 25 }}>
            <Row>
              <Col>
                This is for submitting a pre-completed Excel spreadsheet provided by the VDC. Please ensure all relevant fields are completed correctly and no extraneous data is inserted into the file. <br/><br/>
              </Col>
              <Col>
                <input type="file" name="file" onChange={this.onChangeHandler} style={{ margin: 5, width: "100%" }} />
              </Col>
            </Row>
            <Row>
              <Col>
                If you are re-uploading a file for an existing record (i.e. after making adjustments/corrections), the existing record will be updated instead, based on the information in the Test Vehicle Naming field (MakeModelAdditionalNamingColorCustomer). Make sure this name is the same across any revisions being made.

                Please note, only admin-level users can edit an existing vehicle.
              </Col>
              <Col>
                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
              </Col>
            </Row>
          </div>
        </Container>
      </Paper>
    )  
  }
};

export default withSnackbar(withRouter(FileUpload));
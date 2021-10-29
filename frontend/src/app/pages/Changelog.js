import React, { Component, useState } from "react";
import { useDispatch } from 'react-redux';
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { Paper } from '@material-ui/core';
import { setStorage } from "../../_metronic/_helpers/LocalStorageHelpers";
import { Table, Row, Col } from 'react-bootstrap';
import { getChangelog, APICall } from '../modules/Auth/_redux/authCrud';
import { withSnackbar } from 'notistack';

class Changelog extends Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        setStorage("pageTitle", "Changelog");
        this.props.call = 'getChangelog';
        APICall(this.props).then((response) => {
            this.setState({data: JSON.parse(response)});
        })
    }
  
    render() {
      console.log(this.state);
      return (
        <ChangelogList props={this.state} />
      );
    }
  }
    
  
  function ChangelogList(props) {
    const classes = UseStyles();
    const dispatch = useDispatch();
    const res = props.props.data;

    return (
        <>
            {!res || res.length <= 0 ? (
                <Table className={classes.table_root}>
                <Row>
                    <Col colSpan="8" align="center">
                        <b>No changelog entries found.</b>
                    </Col>
                </Row>
            </Table>
            ) : (
                <Paper className={classes.listPaper}>
                    {res.map(res => (
                        <Table className={classes.table_root} style={{ marginBottom: 20 }}>
                            <Row className={classes.table_row_header}>
                                <Col className={classes.table_cell_head}>
                                    <h3>{res.title}</h3>
                                </Col>
                            </Row>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <i>{res.date}</i>
                                </Col>
                            </Row>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <h5>Bug Fixes</h5>
                                </Col>
                            </Row>
                            <dl>
                                {res.fixes.map(entry =>
                                    <Row className={classes.table_row_root}>
                                        {entry[0] === '-' ? (
                                            <Col className={classes.table_cell_body}>
                                                <dt>&emsp;{entry}</dt>
                                            </Col>
                                        ) : (
                                            <Col className={classes.table_cell_body}>
                                                <dd>&emsp;&emsp;{entry}</dd>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                            </dl>
                            <Row className={classes.table_row_root}>
                                <Col className={classes.table_cell_body}>
                                    <h5>Changes</h5>
                                </Col>
                            </Row>
                            <dl>
                                {res.changes.map(entry =>
                                    <Row className={classes.table_row_root}>
                                        {entry[0] === '-' ? (
                                            <Col className={classes.table_cell_body}>
                                                <dt>&emsp;{entry}</dt>
                                            </Col>
                                        ) : (
                                            <Col className={classes.table_cell_body}>
                                                <dd>&emsp;&emsp;{entry}</dd>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                            </dl>
                        </Table>
                    ))}
                </Paper>
            )}
        </>
    )
}

export default withSnackbar(Changelog);
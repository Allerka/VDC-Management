import React, { Component } from "react";
import { Prompt, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button } from "@material-ui/core";
import { Table } from 'react-bootstrap';
import UseStyles from "../../../_metronic/layout/_core/UseStyles"
import store from "../../../redux/store"
import { withSnackbar } from 'notistack';
import { APICall } from "../../../app/modules/Auth/_redux/authCrud";
import { getStorage, removeStorage } from "../../_helpers/LocalStorageHelpers";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class VehicleList extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], archive: [], admin: false};
  }
  
  componentDidMount() {
    const self = this;
    this.props.id = 0;
    this.props.call = 'getVehicleDetails';
    APICall(this.props)
    .then(response => { 
      if (getStorage("Snackbar")) {
        console.log(getStorage("Snackbar"));
        this.props.enqueueSnackbar(String(getStorage("Snackbar")), {variant: (String(getStorage("Variant")) || 'success')});
        removeStorage("Snackbar");
        removeStorage("Variant");
      } else {
        this.props.enqueueSnackbar('Vehicles loaded!', {variant: 'success'});
      }
      this.setState((state, props) =>{ return { data: JSON.parse(response[0]), archive: JSON.parse(response[1]), admin: response[2] };
    });
  })
  .catch(function (error) {
    console.log(error);
      this.props.enqueueSnackbar(error, {variant: 'error'});
    });
  };
  
  render() {
    console.log(this.state);
    return (
      <DisplayList props={this.state} />
    );
  }
}
  

function DisplayList(props) {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const res = props.props.data;
  const archive = props.props.archive;
  const admin = props.props.admin;
  const columns = prepTable(classes, admin);
  const { SearchBar, ClearSearchButton } = Search;
  
  return (
    <>
      <div className={classes.root}>
        {/* <h5>Active Vehicles</h5>
          <Table className={classes.table_root} size='sm'>
            <thead>
              <tr className={classes.table_row_root}>
                <td className={classes.table_cell_head}>Year</td>
                <td className={classes.table_cell_head}>Make</td>
                <td className={classes.table_cell_head}>Model</td>
                <td className={classes.table_cell_head}>Test Vehicle Name</td>
                <td className={classes.table_cell_head}>Requester</td>
                <td className={classes.table_cell_head}>Tester</td>
                <td className={classes.table_cell_head}>Test #</td>
                <td className={classes.table_cell_head}>Status</td>
                <td className={classes.table_cell_head}></td>
                {admin ? (
                <td className={classes.table_cell_head}></td>
                ) : "" }
              </tr>
            </thead>
            <tbody>
              {!res || res.length <= 0 ? (
                <tr>
                  <td colSpan="8" align="center">
                    <b>No entries found, or the data is still loading.</b>
                  </td>
                </tr>
              ) : (
                res.map(res => (
                  <tr key={res.id} className={classes.table_row_root}>
                    <td className={classes.table_cell_body}>{res.year}</td>
                    <td className={classes.table_cell_body}>{res.make}</td>
                    <td className={classes.table_cell_body}>{res.model}</td>
                    <td className={classes.table_cell_body}>{res.test_name}</td>
                    <td className={classes.table_cell_body}>{res.r_name}</td>
                    <td className={classes.table_cell_body}>{res.t_name}</td>
                    <td className={classes.table_cell_body}>{res.charge_num}</td>
                    <td className={classes.table_cell_body}>{res.status}</td>
                    <td className={classes.table_cell_body}>            
                    <Link className="table-link" to={{pathname: "/details", state: { id: res.id}}}>
                      <Button variant="contained" color="primary" className={classes.button}>
                      View Records
                      </Button>
                    </Link></td>
                    {admin ? (
                    <td className={classes.table_cell_body}>            
                    <Link className="table-link" to={{pathname: "/admin", state: { id: res.id}}}>
                      <Button variant="contained" color="secondary" className={classes.button}>
                      Edit Records
                      </Button>
                    </Link></td>
                    ) : "" }
                  </tr>
                ))
              )}
            </tbody>
          </Table>
      </div>
      <div className={classes.root}>
        <h5>Archived Vehicles</h5>
          <Table className={classes.table_root}>
            <thead>
              <tr className={classes.table_row_root}>
                <td className={classes.table_cell_head}>Year</td>
                <td className={classes.table_cell_head}>Make</td>
                <td className={classes.table_cell_head}>Model</td>
                <td className={classes.table_cell_head}>Test Vehicle Name</td>
                <td className={classes.table_cell_head}>Requester</td>
                <td className={classes.table_cell_head}>Tester</td>
                <td className={classes.table_cell_head}>Test #</td>
                <td className={classes.table_cell_head}></td>
              </tr>
            </thead>
            <tbody>
              {!archive || archive.length <= 0 ? (
                <tr>
                  <td colSpan="8" align="center">
                    <b>No entries found.</b>
                  </td>
                </tr>
              ) : (
                archive.map(archive => (
                  <tr key={res.id} className={classes.table_row_root}>
                    <td className={classes.table_cell_body}>{archive.year}</td>
                    <td className={classes.table_cell_body}>{archive.make}</td>
                    <td className={classes.table_cell_body}>{archive.model}</td>
                    <td className={classes.table_cell_body}>{archive.test_name}</td>
                    <td className={classes.table_cell_body}>{archive.r_name}</td>
                    <td className={classes.table_cell_body}>{archive.t_name}</td>
                    <td className={classes.table_cell_body}>{archive.charge_num}</td>
                    <td className={classes.table_cell_body}>            
                    <Link className="table-link" to={{pathname: "/details", state: { id: archive.id}}}>
                      <Button variant="contained" color="primary" className={classes.button}>
                      View Records
                      </Button>
                    </Link></td>
                  </tr>
                ))
              )}
            </tbody>
          </Table> */}
			<ToolkitProvider
				search
				keyField='id' 
				data={res} 
				columns={columns} 
			>
				{
				props => (
					<div>
					<table width="100%">
						<td>
							<h5>Active Vehicles</h5>
						</td>
						<td align="right">
							<SearchBar { ...props.searchProps } />
							<ClearSearchButton { ...props.searchProps } />
						</td>
					</table>
						<BootstrapTable 
							bootstrap4 
							striped
							condensed
							bordered={false}
							{ ...props.baseProps }	
						/>
					</div>
				)
			}
			</ToolkitProvider>
		</div>
		<hr></hr>
      	<div className={classes.root}>
			<ToolkitProvider
				search
				keyField='id' 
				data={archive} 
				columns={columns} 
				
			>
				{
				props => (
					<div>
						<table width="100%">
							<td>
								<h5>Archived Vehicles</h5>
							</td>
							<td align="right">
								<SearchBar { ...props.searchProps } />
								<ClearSearchButton { ...props.searchProps } />
							</td>
						</table>
							<BootstrapTable 
								bootstrap4 
								striped
								condensed
								noDataIndication="No entries found."
								bordered={false}
								{ ...props.baseProps }	
							/>
					</div>
				)
			}
			</ToolkitProvider>
      </div>
    </>
  )
}

function prepTable(classes, admin) {
	const columns = [
		{
			dataField: 'id',
			text: 'id',
			hidden: true
		},
		{
			dataField: 'year',
			text: 'Year',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'make',
			text: 'Make',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'model',
			text: 'Model',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'test_name',
			text: 'Test Vehicle Name',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'r_name',
			text: 'Requester',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 't_name',
			text: 'Tester',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'charge_num',
			text: 'Test #',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'status',
			text: 'Status',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'id',
			text: '',
			formatter: viewButton,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'id',
			text: '',
			formatter: editButton,
			hidden: admin ? false : true,
			headerClasses: classes.table_row_header
		}
	]
	return columns;
}

function viewButton(cell, row, classes){
	return (
		<div align="center">
			<Link className="table-link" to={{pathname: "/details", state: { id: row.id}}}>
				<Button variant="contained" color="primary" className={classes.button}>
					View Records
				</Button>
			</Link>
		</div>
	)
};

function editButton(cell, row, classes){
	return (
		<div align="center">
			<Link className="table-link" to={{pathname: "/admin", state: { id: row.id}}}>
				<Button variant="contained" color="secondary" className={classes.button}>
					Edit Records
				</Button>
			</Link>
		</div>
	)
};

export default withSnackbar(VehicleList);
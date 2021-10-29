import React, { Component, useState } from "react";
import {NavLink}  from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Paper } from "@material-ui/core";
import UseStyles from "../../_metronic/layout/_core/UseStyles"
import { getStorage, setStorage, removeStorage } from "../../_metronic/_helpers/LocalStorageHelpers"
import { APICall } from "../modules/Auth/_redux/authCrud"
import store from "../../redux/store"
import { Table, Row, Col, Button } from 'react-bootstrap';
import { withSnackbar } from 'notistack';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

class DataAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {choices: [], filter: []};
    }

	componentDidMount() {
		if (this.state.choices.length <= 0) {
			//     try {
			//         this.setState({choices: JSON.parse(getStorage("fieldChoices"))});
			//     } catch {
			//         this.state = {choices: []};
			//     }
				try {
					this.props.call = 'dataAdmin';
					this.props.method = 'get';
					APICall(this.props).then((response) => {
						this.setState((state, props) => { return {choices: response[0], filter: response[1]}});
					});
				} catch(err) {
					console.log(err);
					this.props.enqueueSnackbar(err, {variant: 'error'});
				}
			}
			console.log(this.state);
	}
	
    render() {
        setStorage("pageTitle", ("Database Administration"));
        if (!this.state.choices || this.state.choices.length <= 0) {
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
                <AdminChart props={this.props} data={this.state}/>
            )
        }
    }
};
    
    
function AdminChart(props) {
    const classes = UseStyles();
    const dispatch = useDispatch();
	let node;
    // const initialValues = props.data.data;
    // const choices = props.data.choices;
	const filters = props.data.filter;
    const [ choices, setChoices ] = useState(props.data.choices);
    const columns = prepTable(classes, choices, filters);
	var changes = [];
    // const { SearchBar, ClearSearchButton } = Search;
    console.log(choices);

	const selectRow = {
		mode: 'checkbox',
		// clickToSelect: true,
		clickToEdit: true,
		headerColumnStyle: {
			backgroundColor: '#ccccee',
		}
	  };

	function SubmitClickHandler(props, changes) {
		props.props.data = changes;
		props.props.call = 'dataAdmin';
		props.props.method = 'post';
		console.log(props.props);
		return (
		  	APICall(props.props)
			.then(function(response) {
				if (response.status == 201 || response.status == 204) {
					props.props.enqueueSnackbar("Changes saved!", {variant: 'success'});
					props.props.id = 0;
					props.props.call = 'getVehicleDetails';
					APICall(props.props);
				}}
			)
		)
	}

	function AddClickHandler() {
		let newRow = {};
		newRow.id = choices[choices.length - 1].id + 1;
		newRow.field_name = " ";
		try {
			newRow.display_field_name = node.filterContext.currFilters.display_field_name.filterVal;
		} catch {
			newRow.display_field_name = " ";
		}
		newRow.value = " ";
		newRow.label = " ";
		setChoices( [...choices, newRow ] );
	};

	function DeleteClickHandler() {
		if (window.confirm("Are you sure you wish to delete these record?")) {
			props.props.data = node.selectionContext.selected;
			props.props.enqueueSnackbar("Deleting records...", {variant: 'warning'});
			props.props.call = 'dataAdmin';
			props.props.method = 'delete';
			return (
			  APICall(props.props)
			  	.then(function(response) {
				  if (response.status == 201 || response.status == 204) {
					  props.props.enqueueSnackbar("Changes saved!", {variant: 'success'});
					  props.props.id = 0;
					  props.props.call = 'getVehicleDetails';
					  APICall(props.props)
					    .then(function() {
							setChoices( [...choices.filter(
								e => ! props.props.data.includes(e.id)
							) ] );
					  });
				  }}
			  )
		  )
		} else {
			return
		}
	};

    store.dispatch({
        type: '',
      });
    
    return (
        <>
        <Paper className={classes.listPaper}>
            <div className={classes.root}>
                {/* <ToolkitProvider
                    search
                    keyField='id' 
                    data={choices} 
                    columns={columns} 
                    filter={ filterFactory() }
                >
                    {
                    props => (
                        <div> */}
                        {/* <table width="100%">
                            <td align="right">
                                <SearchBar { ...props.searchProps } />
                                <ClearSearchButton { ...props.searchProps } />
                            </td>
                        </table> */}
				<div className={classes.root}>
					<h5>Click on a cell to edit its contents, and press Enter to make the change. Once you are finished with all alterations, press Submit Changes at the bottom to save to the database.</h5>
				</div>
				<BootstrapTable 
					ref={ n => node = n }
					bootstrap4 
					striped
					// condensed
					bordered={false}
					keyField='id' 
					data={choices} 
					columns={columns} 
					filter={ filterFactory() }
					selectRow={ selectRow }
					cellEdit={ cellEditFactory({ 
						mode: 'click', 
						beforeSaveCell: (oldValue, newValue, row, column) => { 
							var obj = changes.find((o, i) => {
								if (o.id === row.id) {
									changes[i][column.dataField] = newValue;
									return true;
								}
							})
							if (obj) {
							} else {
								changes.push({
									id: row.id,
									field_name: row.field_name, 
									display_field_name: row.display_field_name,
									label: row.label,
									value: row.value,
								});
								changes[changes.length -1][column.dataField] = newValue;
							}
							console.log(changes); }
						}) }
					// { ...props.baseProps }
				/>
			</div>
			<div className={classes.root}>
				<Table className='table_root' size="small">
					<tbody>
						<Row>
							<Col colSpan="8" align="center">
								<button type="button" class="btn btn-primary btn-block" onClick={() => AddClickHandler(props, changes)}>Add Row</button>
							</Col>
							<Col colSpan="8" align="center">
								<button type="button" class="btn btn-danger btn-block" onClick={() => DeleteClickHandler(props, changes)}>Delete Selected Rows</button>
							</Col>
							<Col colSpan="8" align="center">
								<button type="button" class="btn btn-success btn-block" onClick={() => SubmitClickHandler(props, changes)}>Submit Changes</button>
							</Col>
						</Row>
					</tbody>
				</Table>
			</div>
                    {/* ) */}
                {/* }
                </ToolkitProvider>
            </div> */}
        </Paper>
    </>
    )
};

function prepTable(classes, choices, filters) {
	const filtersEdit = Object.entries(filters).map(([key, value]) => {
		return {
			value: key,
			label: value
		}
	})
	const columns = [
		{
			dataField: 'id',
			text: 'id',
			hidden: true
		},
		{
			dataField: 'field_name',
			text: 'field name (internal value)',
			hidden: true
		},
        {
            dataField: 'display_field_name',
            text: 'Form Field',
            headerClasses: classes.table_row_header,
            formatter: cell => filters[cell],
            filter: selectFilter({
                options: filters
            }),
			validator: (newValue, row, column) => {
				if (!filters[newValue]) {
				  return {
					valid: false,
					message: 'Invalid field selection'
				  };
				}
				return true;
			  },
			editor: {
				type: Type.SELECT,
				options: filtersEdit
			}
        },
		{
			dataField: 'value',
			text: 'Internal Value',
			sort: true,
			headerClasses: classes.table_row_header
		},
		{
			dataField: 'label',
			text: 'Displayed Label',
			sort: true,
			headerClasses: classes.table_row_header
		},
	]
	return columns;
}


export default withSnackbar(DataAdmin);
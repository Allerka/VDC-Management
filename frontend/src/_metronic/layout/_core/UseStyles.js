// import React from "react";
import { makeStyles } from '@material-ui/core';

export const UseStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    // textAlign: 'left',
    color: theme.palette.text.primary,
    width: '80%',
  },
  left_paper: {
    padding: theme.spacing(5),
    // textAlign: 'left',
    color: theme.palette.text.primary,
    width: '55%',
  },
  right_paper: {
    padding: theme.spacing(5),
    // textAlign: 'left',
    color: theme.palette.text.primary,
    width: '35%',
  },
  button: {
    margin: theme.spacing(1),
  },

  input: {
    display: 'none',
  },
  listPaper: {
    padding: theme.spacing(4),
    // textAlign: 'left',
    color: theme.palette.text.primary,
    width: '100%',
  },
  flexbox: {
    display: 'flex',
    flexDirection: 'row',
    // width: '100%',
    marginTop: theme.spacing(3),
    justifyContent: 'space-between',
  },
  vinflex: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'no-wrap',
    width: '50%',
    justifyContent: 'space-evenly',
  },
  submission: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  halfFlex: {
    display: 'flex',
    flexDirection: 'column',
    // width: '50%',
    marginLeft: theme.spacing(.4),
    justifyContent: 'space-between',
    // alignItems: 'center',
    // flexGrow: 1,
  },
  halfFlexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  textField: {
    width: 300,
  },
  wideField: {
    width: 400,
  },
  smallField: {
    width: 150,
  },
  miniField: {
    width: 10,
  },
  flatField: {
    width: 0,
  },
  error: {
    color: 'red',
  },

  table_root: {
    width: '100%',
    // marginTop: theme.spacing(3),
    // overflowX: 'auto',
  },
  table_row_root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      },
    },
  table_row_header: {
      backgroundColor: '#ccccee',
    },
  table_cell_head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  table_cell_body: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  table_cell_tight: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2,
  },
  table_cell_centered: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  table_cell_vertical: {
      fontSize: 14,
      transform: 'translateY(30%)',
  },
  table_cell_vertical_half: {
	fontSize: 14,
	transform: 'translateY(50%)',
},
  table_header: {
    width: '100%',
    marginTop: 10,
    overflowX: 'auto',
  },
  table_list_header: {
    width: '100%',
    marginTop: 15,
    marginBottom: 5,
  },

  list_title: {
    color: theme.palette.common.white,
    fontSize: 22,
  },
}));

export default UseStyles;
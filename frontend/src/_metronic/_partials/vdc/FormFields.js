import React from 'react';
import { useField, useFormikContext } from 'formik';
// import styled from '@emotion/styled';
// import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import {TextField, InputLabel, TextareaAutosize, Select, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import UseStyles from "../../../_metronic/layout/_core/UseStyles"
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { massUS, massUSM, etwUS, etwUSM } from './FormData'


// export const TextInput = ({ label, formData, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and also replace ErrorMessage entirely.
//   const classes = UseStyles();
//   const [field, meta, helpers] = useField(props);
//   return (
//     <>
//       <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
//       <TextField 
//         className={props.className || classes.textField} 
//         {...field} 
//         {...props} 
//       />
//       {meta.touched && meta.error ? (
//         <div className={classes.error}>{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

export const TextInput = ({ label, formData, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const classes = UseStyles();
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
      <InputGroup className={props.className || classes.textField}>
        <FormControl plainText type="text"
          {...field} 
          {...props}
          />
        {props.append ? (
          <InputGroup.Append>
          {props.append.map(append => (
            <InputGroup.Text>{append}</InputGroup.Text>
          ))}
          </InputGroup.Append>
      ) : null}
      </InputGroup>
      {meta.touched && meta.error ? (
         <div className={classes.error}>{meta.error}</div>
       ) : null}
    </>
  );
};

// export const CheckboxField = ({ label, formData, ...props }) => {
//   // We need to tell useField what type of input this is
//   // since React treats radios and checkboxes differently
//   // than inputs/select/textarea.
//   const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
//   const classes = UseStyles();
//   return (
//     <>
//       <label className={classes.textField}><b>{label}</b></label>
//         <Checkbox {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className={classes.error}>{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

export const CheckboxField = ({ label, formData, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
  const classes = UseStyles();
  return (
    <>
      <InputLabel htmlFor={props.id || props.name}>&nbsp;</InputLabel>
      <InputGroup className={props.className || classes.textField}>
        <InputGroup.Prepend>
          <InputGroup.Checkbox {...field} {...props}/>
        </InputGroup.Prepend>
        <FormControl disabled defaultValue={label} />
        {props.append ? (
            <InputGroup.Append>
              <InputGroup.Text>{props.append}</InputGroup.Text>
            </InputGroup.Append>
          ) : null}
      </InputGroup>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const CheckboxAppendField = ({ label, formData, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
  const classes = UseStyles();
  return (
    <>
      <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
      <InputGroup className={props.className || classes.textField}>
        <FormControl plainText type="text" className={classes.flatField}
          {...field} 
          {...props}
          />
        <CheckboxField
          label={props.appendLabel}
          name={props.appendName}
          type="checkbox"
          append={props.append}
        />
      </InputGroup>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

// export const SelectBox = ({ label, formData, ...props }) => {
//   const { values, touched, setFieldValue } = useFormikContext();
//   const classes = UseStyles();
//   const [field, meta, helpers] = useField(props);
//   return (
//     <>
//       <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
//       <Select 
//         className={props.className || classes.textField} 
//         {...field} 
//         {...props} 
//       />
//       {meta.touched && meta.error ? (
//         <div className={classes.error}>{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

export const SelectBox = ({ label, formData, ...props }) => {
  const { values, touched, setFieldValue } = useFormikContext();
  const classes = UseStyles();
  const [field, meta, helpers] = useField(props);
  var options;
  try {
    options = 
      Object.entries(props.data).map(([key, value]) => {
        if (['tier2', 'tier3', 'euro3', 'euro4', 'euro5', 'euro6'].includes(key)) {
          return (
            <optgroup label={value}></optgroup>
          )} else {
            if (value === props.value || key === props.value) {
              return (
                <option selected value={key}>&emsp;{value}</option>
                )
            } else {
              return (
                <option value={key}>&emsp;{value}</option>
              )}
          }})
  } catch {
    options = () => {
      return (
        <option value="None">&emsp;None</option>
      )
    }
  }
  return (
    <>
      <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
      <InputGroup className={props.className || classes.textField}>
        <Form.Control as="select" type="text"
            {...field} 
            {...props}
            >
            {options}
          </Form.Control>
          {props.append ? (
            <InputGroup.Append>
              <InputGroup.Text>{props.append}</InputGroup.Text>
            </InputGroup.Append>
          ) : null}
      </InputGroup>
    </>
  );
};

// export const PhoneNumber = ({ field, form, ...props }) => {
//     return (
//       <PhoneInput
//         country="US"
//         placeholder="Enter phone number"
//         value=""
//         countrySelectComponent="disabled"
//         onChange={value => {
//           if (!form.touched[field.name]) form.setFieldTouched(field.name);
//           form.setFieldValue(field.name, value);
//         }}
//       />
//     );
//   };

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta, helpers] = useField(props);
    return (
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
    );
  };

export const TextAreaInput = ({ label, formData, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const classes = UseStyles();
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <InputLabel htmlFor={props.id || props.name}><b>{label}</b></InputLabel>
      <InputGroup className={props.className || classes.textField}>
        <FormControl plainText as="textarea" rows={5}
          {...field} 
          {...props}
          />
        {meta.touched && meta.error ? (
          <div className={classes.error}>{meta.error}</div>
        ) : null}
      </InputGroup>
    </>
  );
};

export const ReadOnly = ({ label, ...props }) => {
  const classes = UseStyles();
  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text htmlFor={props.id || props.name}>
                <b>{label}</b>
            </InputGroup.Text>
        </InputGroup.Prepend>
            <FormControl plainText readOnly defaultValue={props.value} 
              {...props}
            />
        {props.append ? (
          <InputGroup.Append>
            <InputGroup.Text>{props.append}</InputGroup.Text>
          </InputGroup.Append>
      ) : null}
      </InputGroup>
    </>
  );
};

export const AdminText = ({ label, formData, ...props }) => {
  const classes = UseStyles();
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text htmlFor={props.id || props.name}>
                <b>{label}</b>
            </InputGroup.Text>
        </InputGroup.Prepend>
            <FormControl plainText type="text"
            className={props.className || classes.textField}
            {...field} 
            {...props}
            />
        {props.append ? (
          <InputGroup.Append>
            <InputGroup.Text>{props.append}</InputGroup.Text>
          </InputGroup.Append>
      ) : null}
      </InputGroup>
    </>
  );
};

export const AdminSelect = ({ label, formData, ...props }) => {
  const classes = UseStyles();
  const { values, touched, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  const options = Object.entries(props.data).map(([key, value]) => {
    if (['tier2', 'tier3', 'euro3', 'euro4', 'euro5', 'euro6'].includes(key)) {
      return (
          <optgroup label={value}></optgroup>
        )} else {
        if (value === props.value || key === props.value) {
          // console.log("Value: " + value + " | Key: " + key + " | props.value: " + props.value);
          return (
            <option selected value={key}>&emsp;{value}</option>
          )
        } else {
        return (
            <option value={key}>&emsp;{value}</option>
        )}
      }});
  return (
    <>
    <InputGroup>
        <InputGroup.Prepend htmlFor={props.id || props.name}>
            <InputGroup.Text>
                <b>{label}</b>
            </InputGroup.Text>
        </InputGroup.Prepend>
            <Form.Control as="select" type="text"
              className={props.className || classes.textField}
              {...field} 
              {...props}
              >
              {options}
            </Form.Control>
            {props.append ? (
              <InputGroup.Append>
                <InputGroup.Text>{props.append}</InputGroup.Text>
              </InputGroup.Append>
            ) : null}
      </InputGroup>
    </>
  );
};

export const AdminCheckbox = ({ label, formData, ...props }) => {
  const { values, touched, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  const classes = UseStyles();
  return (
    <>
      <InputGroup>
        <InputGroup.Prepend htmlFor={props.id || props.name}>
            <InputGroup.Text>
                <b>{label}</b>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <InputGroup.Checkbox type="checkbox" checked={props.value} />
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};


async function checkMass(mass_usa, inertia, country) {
  var key = (country === 'US' ? (massUS.findIndex(massKey) - 1) : (massUSM.findIndex(massKey) - 1));
  var value = ((inertia === true || inertia === 'true') ? (country === 'US' ? etwUS[key] : etwUSM[key]) : mass_usa);
  return value;
  
  function massKey(key) {
    return key >= mass_usa;
  };
};



export const TestMass = ({ label, ...props }) => {
  const classes = UseStyles();
  const { values: {inertia, mass_usa, country}, setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  React.useEffect(() => {
    let isCurrent = true;
    checkMass(props.data.mass_usa, props.data.inertia, props.data.country).then((value) => {
    if (!!isCurrent){
      setFieldValue(props.name, value);
    }
    });
    return () => {
      isCurrent = false;
    };
  }, [inertia, mass_usa, country, setFieldValue, props.name]);
  
  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text htmlFor={props.id || props.name}>
                <b>{label}</b>
            </InputGroup.Text>
        </InputGroup.Prepend>
            <FormControl plainText readOnly defaultValue={props.value} 
              {...field} 
              {...props}
            />
        {props.append ? (
          <InputGroup.Append>
            <InputGroup.Text>{props.append}</InputGroup.Text>
          </InputGroup.Append>
      ) : null}
      </InputGroup>
    </>
  );
};
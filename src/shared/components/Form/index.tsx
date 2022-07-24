import React from 'react';
import {Formik, Form as FormikForm, Field as FormikField} from 'formik';
import {get, mapValues} from 'lodash';

import toast from '../../utils/toast';
import {is, generateErrors} from '../../utils/validation';

import Field from './Field';


const defaultProps = {
  validate: undefined,
  validations: undefined,
  validateOnBlur: false,
};

const Form = ({validate, validations, ...otherProps}: any) => (
  <Formik
    {...otherProps}
    validate={(values) => {
      if (validate) {
        return validate(values);
      }
      if (validations) {
        return generateErrors(values, validations);
      }
      return {};
    }}
  />
);

// eslint-disable-next-line react/display-name
Form.Element = (props: any) => <FormikForm noValidate {...props} />;

// eslint-disable-next-line react/display-name
Form.Field = mapValues(Field, (FieldComponent) => ({name, validate, ...props}: any) => (
  <FormikField name={name} validate={validate}>
    {({field, form: {touched, errors, setFieldValue}}: any) => (
      <FieldComponent
        {...field}
        {...props}
        name={name}
        error={get(touched, name) && get(errors, name)}
        onChange={(value: any) => setFieldValue(name, value)}
      />
    )}
  </FormikField>
));

Form.initialValues = (data: any, getFieldValues: any) =>
  getFieldValues((key: any, defaultValue = '') => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

Form.handleAPIError = (error: any, form: any) => {
  if (error) {
    form.setErrors(error);
  } else {
    toast.error(error);
  }
};

Form.is = is;

Form.defaultProps = defaultProps;

export default Form;

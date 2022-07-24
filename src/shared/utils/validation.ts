export const is = {
  match: (testFn: any, message = '') => (value: any, fieldValues: any) => !testFn(value, fieldValues) && message,

  required: () => (value: any) => isNilOrEmptyString(value) && 'This field is required',

  minLength: (min: any) => (value: any) => !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: (max: any) => (value: any) => !!value && value.length > max && `Must be at most ${max} characters`,

  notEmptyArray: () => (value: any) =>
    Array.isArray(value) && value.length === 0 && 'Please add at least one item',

  email: (value: any) => !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => (value: any) =>
    !!value &&
        // eslint-disable-next-line no-useless-escape
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) &&
        'Must be a valid URL',
};

const isNilOrEmptyString = (value: any) => value === undefined || value === null || value === '';

export const generateErrors = (fieldValues: any, fieldValidators: any) => {
  const errors: any = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    [validators].flat().forEach((validator: any) => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      if (errorMessage && !errors[fieldName]) {
        errors[fieldName] = errorMessage;
      }
    });
  });
  return errors;
};

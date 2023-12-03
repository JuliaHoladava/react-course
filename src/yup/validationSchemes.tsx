import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_SIZE = 1024 * 1024;

const RegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(
      /^[A-Z][a-z]*$/,
      'First letter must be uppercase and the rest lowercase'
    ),
  age: yup
    .number()
    .required('Age is a required field')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .required('Email is a required field')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'The field must contain an email address (test@test.com) and not contain any spaces.'
    ),
  password1: yup
    .string()
    .required('Password1 is a required field')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
  password2: yup
    .string()
    .required('Password2 is a required field')
    .oneOf([yup.ref('password1')], 'Passwords must match'),
  gender: yup.string().required('Gender is a required field'),
  termAndConditions: yup
    .boolean()
    .required('Term And Conditions is a required field'),
  imageUpload: yup
    .mixed()
    .required('Image is a required')
    .test(
      'fileSize',
      'File too large',
      (value) =>
        value && (value as File[])[0] && (value as File[])[0].size <= MAX_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) =>
        value &&
        (value as File[])[0] &&
        SUPPORTED_FORMATS.includes((value as File[])[0].type)
    ),
  country: yup.string().required('Country is a required field'),
});

export default RegistrationSchema;

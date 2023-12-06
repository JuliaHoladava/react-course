import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthInput from './AuthInput';
import {
  updateAge,
  updateCountry,
  updateEmail,
  updateGender,
  updateImageUpload,
  updateName,
  updatePassword1,
  updatePassword2,
  updateTermAndConditions,
} from '../redux/reducers/formReducer';
import RegistrationSchema from '../yup/validationSchemes';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  country: string;
  termAndConditions: boolean;
  imageUpload: string;
}

const RegistrationForm: React.FC = () => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('country', 'The Netherlands');
  }, [setValue]);

  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    dispatch(updateName(data.name));
    dispatch(updateAge(data.age));
    dispatch(updateEmail(data.email));
    dispatch(updatePassword1(data.password1));
    dispatch(updatePassword2(data.password2));
    dispatch(updateGender(data.gender));
    dispatch(updateTermAndConditions(data.termAndConditions));
    dispatch(updateImageUpload(data.imageUpload));
    dispatch(updateCountry(data.country));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        {...register('name')}
        type="text"
        label="Name"
        name="name"
        htmlFor="name"
        isPassword={false}
        errors={errors.name?.message}
        touched={!!errors.name}
      />

      <AuthInput
        {...register('age')}
        type="text"
        label="Age"
        name="age"
        htmlFor="age"
        isPassword={false}
        errors={errors.age?.message}
        touched={!!errors.age}
      />

      <AuthInput
        {...register('email')}
        type="email"
        label="E-mail"
        name="email"
        htmlFor="email"
        isPassword={false}
        errors={errors.email?.message}
        touched={!!errors.email}
      />

      <AuthInput
        {...register('password1')}
        type="text"
        label="Password1"
        name="password1"
        htmlFor="password1"
        isPassword={false}
        errors={errors.password1?.message}
        touched={!!errors.password1}
      />

      <AuthInput
        {...register('password2')}
        type="text"
        label="Password2"
        name="password2"
        htmlFor="password2"
        isPassword={false}
        errors={errors.password2?.message}
        touched={!!errors.password2}
      />

      <label htmlFor="gender">Gender</label>
      <select id="gender" {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>

      <label htmlFor="country">Country</label>
      <select id="country" {...register('country')}>
        <option value="Germany">Germany</option>
        <option value="Belarus">Belarus</option>
        <option value="Ireland">Ireland</option>
        <option value="Italy">Italy</option>
        <option value="The Netherlands">The Netherlands</option>
        <option value="The United Kingdom">The United Kingdom</option>
        <option value="Sweden">Sweden</option>
        <option value="Japan">Japan</option>
      </select>

      <AuthInput
        type="file"
        label="Upload Image"
        name="imageUpload"
        htmlFor="imageUpload"
        isPassword={false}
        accept=".jpg, .jpeg, .png"
      />

      <AuthInput
        {...register('termAndConditions')}
        type="checkbox"
        label="Accept Terms & Conditions"
        name="termsAndConditions"
        htmlFor="termAndConditions"
        isPassword={false}
        errors={errors.termAndConditions?.message}
        touched={!!errors.termAndConditions}
      />

      <input type="submit" />
    </form>
  );
};

export default RegistrationForm;

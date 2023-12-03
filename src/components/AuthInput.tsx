import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AuthInput.scss';
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
import { RootState } from '../redux/store';

interface IAuthInput {
  type: 'text' | 'password' | 'email' | 'checkbox' | 'file';
  label: string;
  name: string;
  htmlFor: string;
  isPassword: boolean;
  errors?: string | undefined;
  touched?: boolean;
  accept?: string;
}

const AuthInput: React.FC<IAuthInput> = React.forwardRef(
  ({
    type,
    label,
    name,
    htmlFor,
    isPassword,
    errors,
    touched,
    accept,
  }: IAuthInput) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const dispatch = useDispatch();
    const formState = useSelector((state: RootState) => state.form);
    const currentValue = formState[name];
    const isChecked = type === 'checkbox' ? formState[name] : undefined;

    const handlePasswordShow = (): void => {
      setIsPasswordShowed(!isPasswordShowed);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;

      switch (name) {
        case 'name':
          dispatch(updateName(inputValue));
          break;
        case 'age':
          dispatch(updateAge(Number(inputValue)));
          break;
        case 'email':
          dispatch(updateEmail(inputValue));
          break;
        case 'password1':
          dispatch(updatePassword1(inputValue));
          break;
        case 'password2':
          dispatch(updatePassword2(inputValue));
          break;
        case 'gender':
          dispatch(updateGender(inputValue));
          break;
        case 'termAndConditions':
          dispatch(updateTermAndConditions(event.target.checked));
          break;
        case 'imageUpload':
          if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                dispatch(updateImageUpload(reader.result));
              }
            };

            reader.readAsDataURL(file);
          }
          break;
        case 'country':
          dispatch(updateCountry(inputValue));
          break;
        default:
      }
    };

    return (
      <>
        <div>
          <div className="auth__input-container">
            <label className="auth_label" htmlFor={htmlFor}>
              {label}
            </label>
            {type === 'file' ? (
              <input
                className="auth__input"
                id={htmlFor}
                name={name}
                type={type}
                accept={accept}
                onChange={handleInputChange}
              />
            ) : (
              <input
                className="auth__input"
                id={htmlFor}
                name={name}
                type={isPasswordShowed ? 'text' : type}
                onFocus={(): void => setIsInputFocused(true)}
                onBlur={(): void => setIsInputFocused(false)}
                value={type === 'checkbox' ? undefined : currentValue}
                checked={type === 'checkbox' ? isChecked : undefined}
                onChange={handleInputChange}
                aria-invalid={errors && touched ? 'true' : 'false'}
                aria-describedby={`${htmlFor}-error`}
              />
            )}
          </div>
          {isPassword && (isInputFocused || currentValue) && (
            <button
              className={`auth__password-icon ${
                isPasswordShowed && currentValue && 'auth__password-icon_active'
              }`}
              type="button"
              aria-label="Show password"
              onClick={handlePasswordShow}
            />
          )}
        </div>
        <p id={`${htmlFor}-error`} className="auth__input-error">
          {errors && touched ? errors : ''}
        </p>
      </>
    );
  }
);

AuthInput.defaultProps = {
  errors: '',
  touched: false,
  accept: '',
};

export default AuthInput;

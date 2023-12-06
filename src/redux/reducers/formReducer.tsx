import { AnyAction } from 'redux';
import {
  UPDATE_AGE,
  UPDATE_COUNTRY,
  UPDATE_EMAIL,
  UPDATE_GENDER,
  UPDATE_IMAGEUPLOAD,
  UPDATE_NAME,
  UPDATE_PASSWORD1,
  UPDATE_PASSWORD2,
  UPDATE_TERMANDCONDITIONS,
} from './actionsTypes';
import { IFormState } from '../../types/types';

const initialState: IFormState = {
  name: '',
  age: Number(''),
  email: '',
  password1: '',
  password2: '',
  gender: 'female',
  termAndConditions: false,
  imageUpload: null,
  country: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const formReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_AGE:
      return {
        ...state,
        age: action.payload,
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UPDATE_PASSWORD1:
      return {
        ...state,
        password1: action.payload,
      };
    case UPDATE_PASSWORD2:
      return {
        ...state,
        password2: action.payload,
      };
    case UPDATE_GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    case UPDATE_TERMANDCONDITIONS:
      return {
        ...state,
        termAndConditions: action.payload,
      };
    case UPDATE_IMAGEUPLOAD:
      return {
        ...state,
        imageUpload: action.payload,
      };
    case UPDATE_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    default:
      return state;
  }
};

export const updateName = (name: string) => {
  console.log('Updating name:', name);
  return {
    type: UPDATE_NAME,
    payload: name,
  };
};

export const updateAge = (age: number) => ({
  type: UPDATE_AGE,
  payload: age,
});

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  payload: email,
});

export const updatePassword1 = (password1: string) => ({
  type: UPDATE_PASSWORD1,
  payload: password1,
});

export const updatePassword2 = (password2: string) => ({
  type: UPDATE_PASSWORD2,
  payload: password2,
});

export const updateGender = (gender: string) => ({
  type: UPDATE_GENDER,
  payload: gender,
});

export const updateTermAndConditions = (termAndConditions: boolean) => ({
  type: UPDATE_TERMANDCONDITIONS,
  payload: termAndConditions,
});

export const updateImageUpload = (imageUpload: string) => ({
  type: UPDATE_IMAGEUPLOAD,
  payload: imageUpload,
});

export const updateCountry = (country: string) => ({
  type: UPDATE_COUNTRY,
  payload: country,
});

import {
  SET_SEARCHNEWS,
  ADD_NEWS,
  SET_VET,
  EDIT_VET,
  DELETE_VET,
  ADD_VET,
} from "../constant/actions-types";

export const addNews = (payload) => {
  return { type: ADD_NEWS, payload };
};
export const setSearchNews = (payload) => {
  return { type: SET_SEARCHNEWS, payload };
};

export const setVet = (payload) => {
  return { type: SET_VET, payload };
};
export const deleteVet = (payload) => {
  return { type: DELETE_VET, payload };
};
export const editVet = (payload) => {
  return { type: EDIT_VET, payload };
};
export const addVet = (payload) => {
  return { type: ADD_VET, payload };
};

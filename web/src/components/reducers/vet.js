import {
  SET_VET,
  EDIT_VET,
  DELETE_VET,
  ADD_VET,
} from "../constant/actions-types";

const vet = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_VET:
      return [...state, payload];
    case ADD_VET:
      return payload;
    case DELETE_VET:
      return state.filter((vet) => vet._id !== payload._id);
    case EDIT_VET:
      return state.map((vet) => {
        if (payload._id === vet._id) {
          return payload;
        }
        return vet;
      });
    default:
      return state;
  }
};
export default vet;

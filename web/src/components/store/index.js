import { createStore, combineReducers } from "redux";

import vet from "../reducers/vet";
import user from "../reducers/user";

const reducers = combineReducers({ vet,user });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

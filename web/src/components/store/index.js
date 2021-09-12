import { createStore, combineReducers } from "redux";

import vet from "../reducers/vet";

const reducers = combineReducers({ vet });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

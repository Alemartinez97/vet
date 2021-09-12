import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Login from "./components/login";
import Signup from "./components/signup";
import store from "./components/store/index";
import Menu from "./components/menu";
import Politics from "./components/news/politics";
import Economy from "./components/news/economy";
import International from "./components/news/international";
import Health from "./components/news/Health";
import Society from "./components/news/society";
import National from "./components/news/national";
import Search from "./components/news/search";
import Local from "./components/news/local";
import Tecnology from "./components/news/tecnology";
import Table from "./components/table";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import instance from "./components/utils/http";
import { addVet } from "./components/actions/index";

import routes from "./components/routes";
import SearchAppBar from "./components/forms/SearchAppBar";

const App = connect(
  null,
  mapDispatchToProps
)((props) => {
  useEffect(() => {
    instance.get(`/api/vet`).then((result) => {
      props.addVet(result.data);
    });
  });
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Switch>
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.table} component={Table} />
        <Route exact path={routes.politics} component={Politics} />
        <Route exact path={routes.economy} component={Economy} />
        <Route exact path={routes.international} component={International} />
        <Route exact path={routes.health} component={Health} />
        <Route exact path={routes.society} component={Society} />
        <Route exact path={routes.search} component={Search} />
        <Route exact path={routes.national} component={National} />
        <Route exact path={routes.local} component={Local} />
        <Route exact path={routes.tecnology} component={Tecnology} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addVet: (vet) => dispatch(addVet(vet)),
  };
}
const ConnectedApp = (props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <SearchAppBar />
        <App />
      </SnackbarProvider>
    </Provider>
  );
};
export default ConnectedApp;

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


// core components
import Admin from "./layouts/Admin.jsx";
import Auth from "./layouts/Auth.jsx";
import RTL from "./layouts/RTL.jsx";
import { store, persistor } from "./store";

import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={hist}>
                    <Switch>
                        <Route path="/admin" component={Admin} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/rtl" component={RTL} />
                        <Redirect from="/" to="/admin/dashboard" />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>,

    document.getElementById("root")
);

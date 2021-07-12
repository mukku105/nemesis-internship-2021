import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alerts from "./layout/Alerts.jsx";
import Users from './users/Users.jsx'
import { Provider } from "react-redux";
import store from "../store";
import { Container } from "@material-ui/core";

//Alert Options
const alertOptions = {
    timeout: 6000,
    position: "bottom center",
}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Alerts />
                        <Container>
                            <Users />
                        </Container>
                    </Fragment>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
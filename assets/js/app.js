// Les imports importants

import React, { useState } from "react";
import ReactDOM from "react-dom";


// any CSS you import will output into a single css file (app.scss in this case)
import '../css/app.scss';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
        );

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <HashRouter>
            <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

            <main className="container pt5">
                <Switch>
                    <Route path="/login" render={props => (<LoginPage onLogin={setIsAuthenticated} {...props}/>)} />
                    <Route path="/invoices" component={InvoicesPage} />
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

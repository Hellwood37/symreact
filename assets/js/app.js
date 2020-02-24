// Les imports importants

import React from "react";
import ReactDOM from "react-dom";


// any CSS you import will output into a single css file (app.scss in this case)
import '../css/app.scss';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";



// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello world!');

const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <main className="container pt5">
                <Switch>
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

// Les imports importants

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// any CSS you import will output into a single css file (app.scss in this case)
import "../css/app.scss";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import CustomersPage from "./pages/CustomersPage";
import HomePage from "./pages/HomePage";
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
    <AuthContext.Provider value={{
      isAuthenticated, // <=>isAuthenticated: isAuthenticated,
      setIsAuthenticated // <=>setIsAuthenticated: setIsAuthenticated
    }}>
      <HashRouter>
        <NavbarWithRouter />
        <main className="container pt5">
          <Switch>
            <Route
              path="/login"
              component={LoginPage}
            />
            <PrivateRoute
              path="/invoices"
              component={InvoicesPage}
            />
            <PrivateRoute
              path="/customers"
              component={CustomersPage}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);


import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomersPage = props => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/api/customers/")
      .then(response => response.data["hydra:member"])
      .then(data => setCustomers(data));
  }, []);

  return (
    <>
      <h1>Liste des clients</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center">Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td className="text-center">18</td>
              <td>
                <a href="#">Jean Dupond</a>
              </td>
              <td>j.dupond@symfony.com</td>
              <td>Dupond Bros. Détectives</td>
              <td className="text-center">
                <span className="badge badge-primary">4</span>
              </td>
              <td className="text-center">2400.03 €</td>
              <td>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersPage;

import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import moment from "moment";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger"
};

const STATUS_LABELS = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée"
};

const InvoicesPage = props => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    try {
      const data = await axios
        .get("https://127.0.0.1:8000/api/invoices")
        .then(response => response.data["hydra:member"]);
      setInvoices(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Gestion du changement de page
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;

  const formatDate = str => moment(str).format("DD/MM/YYYY");

  // Pagination des données
  const paginatedInvoices = Pagination.getData(
    invoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <h1>Liste des factures</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Numéro de facture</th>
            <th className="text-center">Référence de facture</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map(invoice => (
            <tr key={invoice.id}>
              <td className="text-center">{invoice.chrono}</td>
              <td className="text-center">{invoice.id}</td>
              <td>
                <a href="#">
                  {invoice.customer.firstName} {invoice.customer.lastName}
                </a>
              </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </td>
              <td className="text-center">
                {invoice.amount.toLocaleString()} €
              </td>
              <td>
                <button className="btn btn-sm btn-primary mr-1">Editer</button>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={invoices.length}
        onPageChanged={handlePageChange}
      />
    </>
  );
};

export default InvoicesPage;

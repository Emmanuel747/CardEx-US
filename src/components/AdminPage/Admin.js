import React from "react";
import { Link } from "react-router-dom";

import CreateCard from "./createCard";
import AllOrders from "./orders";
import './Admin.scss';

const AdminPage = () => {
  
  return (
    <>
      <h1> Admin Future Form Page </h1>
      <h1>Create New Card Listing</h1>
      <CreateCard />
      <AllOrders />
    </>
  );
};

export default AdminPage;

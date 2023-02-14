import React, { useState } from "react";
import { updateOrderStatus } from "../../api";
import './Admin.scss';

const OrderCard = ({ order }) => {
  const { id, products } = order;

  return (
    <div className="Order-Card">
      <h1>Order #{id}</h1>
      {products.map((product, index) => {
        const { card_title, price, card_img } = product;
        return (
          <>
            <h3>{card_title}</h3>
            <h3>${price}</h3>
            <img src={card_img}></img>
          </>
        );
      })}
    </div>
  );
};

export default OrderCard;

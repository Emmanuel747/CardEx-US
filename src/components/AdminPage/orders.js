import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api";
import OrderCard from "./orderCard";
import date from 'date-and-time';
import './Admin.scss';

const AllOrders = ({userTOKEN, formatter}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
         fetch(`api/orders/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userTOKEN}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data, "FACTSSSSSS");
          setOrders(data.data);
          console.log("ORDER UPDATE TO", orders)
        });
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  var dateFormat = require("dateformat");


  let totalPrice = 0;
  let tax = 0.10;
  let grandTotal = 0;

    console.log(orders, "BEFORE");
    const userOrders = orders.map(function (item, index) {
      const { 
        cardId,
        card_title, 
        card_img,
        creation_date,
        description,
        cartId,
        price,
        active,
        userId,
        view_count,
        quantity,
        id,
        orderDate
      } = item;

      let formatedDate = dateFormat(orderDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
      totalPrice = totalPrice + price;
      grandTotal = totalPrice + (totalPrice * tax) + 9.95;

      return ( 
        <div className=" ItemContainer adminOrders d-flex justify-content-between align-items-center mt-3 items rounded" key={index}>
          <div className=" itemInfo d-flex flex-row">
            <img
              className="rounded"
              src={card_img}
              alt={card_title}
            />
            <div className=" itemInfo ml-2">
      
                <span className="font-weight-bold d-block">
                  {card_title}  
                </span>
                <div className="spec" style={{fontSize: "0.8rem"}}>{description}</div>
                <span className="ml-1 orderDate">
                  Order Date: {formatedDate}
                </span>
        
              <div className="spec" style={{fontSize: "0.8rem"}}> Costumer : <b style={{color: 'red'}}>{userId}</b></div>
              <div className="spec" style={{fontSize: "0.8rem"}}> Product ID: <b style={{color: 'red'}}>{cardId}</b></div>
              <div className="spec" style={{fontSize: "0.8rem"}}> Quantity: <b style={{color: 'red'}}>{quantity}</b></div>
            </div>
          </div>
          <div className="itemInfoRight row " >
            <div style={{backgroundColor: 'transparent'}}>
            </div>
            <div className=" priceInfo d-flex flex-row align-items-center">
              <div className=" d-flex ml-5 font-weight-bold"><span></span> {formatter.format(price)}</div>
              <i className="fa fa-trash-o ml-3 text-black-50" />
            </div>
            <div className="d-flex flex-row font-weight-bold">
              <div>
                  <input type="checkbox" id="scales" name="scales" />
                  <label className="ml-1 h6" for="scales">Shipped</label>
                </div>
            </div>
          </div>
        </div>
      )  
    });

  return (
    <>
      <h1 className="orderTitle">All Customer Orders</h1>
      <div className="order-container">
        { userOrders }
      </div>
    </>
  );
};

export default AllOrders;

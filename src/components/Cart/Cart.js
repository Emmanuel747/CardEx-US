import React, { useEffect } from 'react';
import thanosImg from "../../assets/thanosCrown.jpg";
import cardEXLogo from "../../assets/CardEX name.png";
import { getToken, removeItemFromCart, checkoutCart } from "../../api/index";
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoBagCheckOutline } from 'react-icons/io5';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./Cart.scss";

const Cart = ({cart, setCart, userDATA, formatter, userTOKEN, 
  setUserTOKEN, toastWarn, toastGood}) => {

  const guestCart = localStorage.getItem('CardEXGCart');
  let parsedGCart;
  if (guestCart) { parsedGCart = JSON.parse(guestCart); }

  const deleteCartItem =  async (itemID) => {
    console.log("here", userDATA)
    if (userTOKEN) {
      try {
        const res = await removeItemFromCart(itemID, userTOKEN);
        console.log(res, "Hello")
        toastWarn(`Success! Item has been removed.`);
        let updatedCart = cart.filter(item => item.id !== itemID);
        setCart(updatedCart);
      } catch (err) {
        console.log(err);
      }
    } else if  (parsedGCart) {
      parsedGCart = parsedGCart.filter(item => item.id !== itemID);
      console.log(parsedGCart)
      const newGuestCart = JSON.stringify(parsedGCart)
      localStorage.setItem("CardEXGCart", newGuestCart);
      setCart(parsedGCart)
    }
  }

  async function getCart() {
    if (userDATA) {
      fetch(`/api/cart/${userDATA.id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userTOKEN}`,
        }
      })
      .then(res => res.json())
      .then(data => {
        cart = data.data;
        console.log(data, "I AM #1");
        setCart(data.data)
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    }
  }
  useEffect(() => {
    getCart()
  }, []);

  async function checkout() {
    try {
      console.log(userDATA)
      const res = await checkoutCart(userDATA.id);
      console.log("WE WON!", res);
      toastGood(`💖Thank you, for your Order! 🎉🥂🎁`);

    } catch (err) {
      console.log(err);
      toastWarn(`${err}`)
    }
  }

  let totalPrice = 0;
  let tax = 0.10;
  let grandTotal = 0;

    console.log(cart, "BEFORE");
    const cartDivs = cart.map(function (item, index) {
      const { 
        cardId,
        card_title, 
        card_img,
        creation_date,
        description,
        cartId,
        price,
        active,
        quanity,
        userId,
        view_count,
        quantity,
        id
      } = item;
      console.log(item,"<--ID")

      totalPrice = totalPrice + price;
      grandTotal = totalPrice + (totalPrice * tax) + 9.95;

      return ( 
        <div className=" ItemContainer d-flex justify-content-between align-items-center mt-3 items rounded" key={index}>
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
            </div>
          </div>
          <div className="itemInfoRight row " >
            <div style={{backgroundColor: 'transparent'}}>
              <RiDeleteBin6Fill
                className="delBtn" 
                size={24} 
                style={{color: 'red', marginRight: '5px'  }}
                onClick={
                  () => {deleteCartItem(id)}
                }
              />
            </div>
            <div className=" priceInfo d-flex flex-row align-items-center">
              <span className="d-block"> Quantity: {1}</span>
              <div className=" d-flex ml-5 font-weight-bold"><span></span> {formatter.format(price)}</div>
              <i className="fa fa-trash-o ml-3 text-black-50" />
            </div>
          </div>
        </div>
      )  
    });

      return (
      <div className=" cartComponet container mt-5 p-3 rounded cart" >
        {/* <div className=""> */}
          <div className=" outItemCont">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                {/* {ArrowBackIosIcon} */}
                <span className=" contShopping ml-2 p-2" 
                  style={{backgroundColor: '#22222269', borderRadius: "10px"}}
                ><a href="/"
                style={{fontSize: '1rem', fontWeight: 'bold', color: '#faab02', textShadow: '1px 2px 4px black'}}
                > <ArrowBackIosIcon /> Continue Shopping </a></span>
              </div>
              <hr />
              <h4 className="cartPgTitle">{userDATA === "" ? userDATA.username : "Guest"}'s Shopping cart</h4>
              <div className=" cartsubInfo d-flex justify-content-between ">
                <span>You have <b>{cartDivs.length}</b> items in your cart</span>
                <div className="d-flex flex-row align-items-center">
                  <span className="text-black-50">Sort by:</span>
                  <div className="price ml-2">
                    <span className="mr-4">Price</span>
                    <i className="fa fa-angle-down" />
                  </div>
                </div>
              </div>

              {/* Generated Checkout Items */}
              {/* <div className=" ItemContainer d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                <div className=" itemInfo d-flex flex-row">
                  <img
                    className="rounded"
                    src={thanosImg}
                    alt={card_title}
                  />
                  <div className=" itemInfo ml-2">
                    <span className="font-weight-bold d-block">
                      {card_title}  
                    </span>
                    <div className="spec" style={{fontSize: "0.8rem"}}>{description}</div>
                  </div>
                </div>
                <div className=" priceInfo d-flex flex-row align-items-center">
                  <span className="d-block"> Quantity:1</span>
                  <div className=" d-flex ml-5 font-weight-bold"><span>$ </span> {price}</div>
                  <i className="fa fa-trash-o ml-3 text-black-50" />
                </div>
              </div> */}

              <div className="cartItemsContainer"> {cartDivs} </div>

              {/* <div className="  d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                <div className="d-flex flex-row">
                  <img
                    className="rounded"
                    src="https://i.imgur.com/Tja5H1c.jpg"
                    width={40}
                    alt={card_title}
                  />
                  <div className="ml-2">
                    <span className="font-weight-bold d-block">
                      Samsung galaxy Note 10&nbsp;
                    </span>
                    <span className="spec">256GB, Navy Blue</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="d-block">1</span>
                  <span className="d-block ml-5 font-weight-bold">$999</span>
                  <i className="fa fa-trash-o ml-3 text-black-50" />
                </div>
              </div> */}
            </div>
          </div>

          {/* Checkout Card Info */}
          <div className=" ccInfoContainer">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center">
                <span >Payment Information</span>
                <img
                  className="rounded"
                  src={cardEXLogo}
                  alt="Company Logo"
                  width={60}
                />
              </div>
              <span className="type d-block mt-3 mb-1">Card type</span>
              <label className="radio">
                {" "}
                <input
                  type="radio"
                  name="card"
                  defaultValue="payment"
                  defaultChecked
                />{" "}
                <span>
                  <img
                    width={40}
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={40}
                    src="https://img.icons8.com/officel/48/000000/visa.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={40}
                    src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={40}
                    src="https://img.icons8.com/officel/48/000000/paypal.png"
                  />
                </span>{" "}
              </label>
              <div>
                <label className="credit-card-label">Name on card</label>
                <input
                  required
                  type="text"
                  className="form-control credit-inputs"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="credit-card-label">Card number</label>
                <input
                  required
                  type="number"
                  maxLength="16"
                  className="form-control credit-inputs"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="credit-card-label">Date</label>
                  <input
                    required
                    type="number"
                    className="form-control credit-inputs"
                    placeholder="12/24"
                  />
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">CVV</label>
                  <input
                    required
                    type="number"
                    maxLength="3"
                    className="form-control credit-inputs"
                    placeholder={342}
                  />
                </div>
              </div>
              <hr className="line" />

              <div className="subPriceCont">
                <div className=" d-flex justify-content-between information">
                  <span>Subtotal</span>
                  <span> {formatter.format(totalPrice)}</span>
                </div>
                <div className="d-flex justify-content-between information">
                  <span>Shipping</span>
                  <span>$9.95</span>
                </div>
                <div className="d-flex justify-content-between information">
                  <span>Taxes</span>
                  <span> {totalPrice > 0 ? "$" + totalPrice * tax : ""} ({totalPrice > 0 ? tax * 100 + "%" : "-- %"}) </span>
                </div>
                <div className="d-flex justify-content-between information">
                  <span>Grand Total</span>
                  <span style={{color: '#5dff5dcc'}}> {formatter.format(grandTotal)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block d-flex justify-content-between mt-3"
                type="button"
                onClick={
                  () => {checkout()}
                }
              >
                {/* total price function */}
                <span>${}</span>
                <span>
                 <IoBagCheckOutline size={24} /> Checkout
                </span>
              </button>
            </div>
          </div>
        {/* </div> */}
      </div>   
    );
  // });
};

export default Cart;
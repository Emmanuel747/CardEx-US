import React, { useState } from "react";
import { getAllCards } from "../../api/index";
import { ToastContainer, toast } from 'react-toastify';
import { 
  addItemToCart, getToken, 
  getCart, getCard 
} from "../../api/index";

import "../Cards/Card.scss";

const PlayingCards = ({cards, setCards, reset, 
  cart, setCart, userDATA, setUserDATA, formatter, notifyGood}) => {
  const handleReset = () => {
    reset();
  };

  const notifyBad = (message) => { toast.error(`${message}!`, {position: toast.POSITION.TOP_LEFT})};
  
  const addBtnAnimation = (e) => {
    e.target.classList.add('added');
    setTimeout(function() {
      e.target.classList.remove('added');
    }, 1000);
    console.log(e);
  }

  const addToCart = async (user, cardId, quantity = 1) => {
    try {
      const TOKEN = getToken();
      if (TOKEN) {
          try {
            fetch(`api/cart`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
              },
              body: JSON.stringify({
                userId: user.id,
                cardId: cardId
              }),
            })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setCart(data.activeCart);
            });   
          } catch (error) {
            console.error("Error adding to cart");
            throw error;
          }
        notifyGood('Nice! Product has successfully been added to cart 👉')
      } else {
        let clickedCard = await getCard(cardId);
        cart.push(clickedCard);
        localStorage.setItem("CardEXGCart", JSON.stringify(cart));
        setCart(cart);
        notifyGood('Product Guest has successfully been added to cart, Thank You! 😁👍');
      }
      console.log(cart)
    } catch (err) {
      console.log(err)
      notifyBad(err);
      notifyBad("Sorry, item appears to be Out of Stock!");
    }
  }

  return cards.map((card, index) => {
    const { 
      card_title, 
      card_img,
      creation_date,
      description,
      id,
      price,
      view_count,
      quantity,
      tag_game,
      tag_condition,
      tag_rarity
    } = card;

    return (
      <div className="rootContainer" key={index}>
        <div className="cardContainer" >
          <div className="imgCard col-5 m-0 px-1">
            <img className="img-fluid objectfit pointer" src={card_img} alt="Trading Card" />
          </div>
          <div className="detailsCard col-md-6 col-7">
            <h4> {card_title} </h4>
            <div className="desc"> "{description}" </div>
            
            <div className="itemInfo ">
              <div>Stock-ID #: <i>000{id}</i></div>
              <div>Watchers: <b>{view_count}</b></div>   
              {/* <li>Listing Date: <span>{creation_date}</span></li> */}
            </div>
            <div className="prices">
              <div className="col ">
                <h4 className="m-0 font-weight-bold">
                  <div> {formatter.format(price)} </div>
                </h4>
              </div>
              <div 
                className="row m-0 p-0 font-weight-bold stockTextContainer"
                style={{color: 'green', fontSize: '1rem'}}
              >In stock</div>
            </div>
          </div>
        </div>
        <div className="cartButtons">
          <button id="add-to-cart-button"
            onClick={(e) => {
              addBtnAnimation(e);
              addToCart(userDATA, id);
            }}
          >
            <svg class="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
            <svg class="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
            <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <svg class="tick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>
            <span class="add-to-cart">Add to cart</span>
            <span class="added-to-cart">Added to cart</span>
          </button>
        </div>
        <div data-row={tag_game}/>
        <div data-row={tag_condition}/>
        <div data-row={tag_rarity}/>
      </div>
    );
  });
};

export default PlayingCards;
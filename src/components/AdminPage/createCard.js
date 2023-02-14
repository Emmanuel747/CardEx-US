import React, {useState} from 'react';
import { createCard } from '../../api';
import { ToastContainer, toast, cssTransition } from "react-toastify";
import '../Cards/Card.scss';
import './Admin.scss';



const CreateCard = () => {
    const [card_title, setCardTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [card_img, setImg] = useState("");
    const [quantity, setQuantity] = useState("");

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2,
    });

    const notifyError = (message) => {
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
    const notifySuccess = (message) => {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const resetStates = () => {
      setCardTitle("");
      setDescription("");
      setPrice("");
      setImg("");
      setQuantity("");
    }

  return (
      <form 
      id="createCardForm"
      onSubmit={async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("CardEXtoken")
        await createCard(card_title, description, price, card_img, quantity, token)
          .then((res) => {
            console.log(res);
            notifySuccess("Product created and successfully added to Catalog. 🎉 ☑");
            resetStates();
          })
          .catch((err) => {
            console.log(err);
            notifyError(`Couldn't Add to catalog.${err}`)
          });
      }}>
        <div className="rootContainer">
          <input 
            className="cardInput"
            rows="1" cols="50"
            placeholder="Card Img URL" 
            value={card_img} 
            onChange={(e) => { setImg(e.target.value) }}
            style={{fontSize: '0.8rem', fontWeight: 'bold', background: 'white', borderRadius: '4px', height: '25px'}}

          />
          <span style={{fontSize: '1rem'}}> <b>⬅ Copy and Paste the Product's image URL. {card_img ? "✅" : "❌"} </b></span>
          <div className="cardContainer" >
            
            <div className="imgCard col-5 m-0 px-1">

              <img className="img-fluid objectfit pointer" src={card_img} alt="Trading Card" />
            </div>
            <div className="detailsCard col-md-6 col-7">
              <input  
                className="cardInput" 
                type="text"
                maxLength="60"
                placeholder="Card Title" 
                value={card_title} 
                onChange={(e) => { setCardTitle(e.target.value) }}
                style={{fontSize: '0.8rem', fontWeight: 'bold', background: 'white', borderRadius: '5px', height: '25px'}}
              />
              <span style={{fontSize: '1rem'}}> <b> ⬅Product Title {card_title ? "✅" : "❌"} </b></span>

              <h4> {card_title} </h4>
              <input  
                className="cardInput" 
                type="text" 
                placeholder="Card Title" 
                value={description} 
                onChange={(e) => { setDescription(e.target.value) }}
                style={{fontSize: '0.8rem', fontWeight: 'bold', background: 'white', borderRadius: '5px', height: '25px'}}
              />
              <span style={{fontSize: '1rem'}}> <b>⬅Description {description ? "✅" : "❌"} </b></span>
              <div className="desc"> "{description}" </div>
              
              <div className="itemInfo ">
                <div>Stock-ID #: <i>xxxx</i></div>
                <div>Watchers: <b>xxx</b></div>   
                {/* <li>Listing Date: <span>{creation_date}</span></li> */}
              </div>
              <div className=" prices ">
                <div className="row ">
                  <h4 className="m-0 font-weight-bold">
                    <input 
                      type="number" 
                      placeholder="Price" 
                      value={price} 
                      onChange={(e) => {setPrice(e.target.value)}}
                      style={{fontSize: '0.8rem', fontWeight: 'bold', background: 'white', borderRadius: '5px', height: '25px'}}
                    />
                    <span style={{fontSize: '1rem'}}> <b> ⬅Sale Price {price ? "✅" : "❌"} </b></span>
                    <div> {formatter.format(price)} </div>
                  </h4>
                  <h4 className="m-0 font-weight-bold">
                    <input 
                      required
                      type="number" 
                      min="1"
                      max="999"
                      placeholder="1" 
                      value={quantity} 
                      onChange={(e) => {setQuantity(e.target.value)}}
                      style={{fontSize: '0.8rem', fontWeight: 'bold', background: 'white', borderRadius: '5px', height: '25px', width: '50px'}}
                    />
                    <span style={{fontSize: '1rem'}}> <b> ⬅Quantity {quantity ? "✅" : "❌"} </b></span>
                    <div> [{quantity ? quantity : "--"}] Available to sell </div>
                  </h4>

                </div>
                <div 
                  className="row m-0 p-0 font-weight-bold stockTextContainer"
                  style={{color: 'green', fontSize: '1rem'}}
                > {quantity ? 'In stock' : 'Out of Stock' } </div>
              </div>
            </div>
          </div>
          <div className="cartButtons">
            <button id="add-to-cart-button">
              <svg class="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
              <svg class="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
              <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <svg class="tick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>
              <span class="add-to-cart">Publish Card</span>
              <span class="added-to-cart">Added to cart</span>
            </button>
          </div>
        </div>
      </form>
  )
}

export default CreateCard;
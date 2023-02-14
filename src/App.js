import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import HomeBanner from "./components/Carousel/SlideBanner.js";
import LeftNavBar from "./components/SideBar/SideBar.js";
import PlayingCards from "./components/Cards/Cards";
import Cart from "./components/Cart/Cart";
import { LoginPage, AdminPage } from "./components/index.js";
import CreateCard from "./components/AdminPage/createCard.js";
import OrderCard from "./components/AdminPage/orderCard";
import AllOrders from "./components/AdminPage/orders.js";


import { CSSTransition } from 'react-transition-group'
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllCards,
  userLogin,
  parseUserToken,
} from "./api";


import "./App.css";

const App = () => {
  useEffect(() => {
    document.title = `CardEX\u2122 - US`;
  }, []);

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });

  const notifyWelcome = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  const notifyWelcomeWarn = (message) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  const notifySignup = () =>
    toast.success("Sign Up Successful, redirecting to Home Page!", {
      position: toast.POSITION.TOP_CENTER,
    });
  const notifyLogin = () =>
    toast.success("Welcome back King or Queen, redirecting to Home Page!", {
      position: toast.POSITION.TOP_CENTER,
    });
  const notifyLogout = () =>
    toast.warn("Logged out Successfully, redirecting to Login Page!", {
      position: toast.POSITION.TOP_CENTER,
    });
  
  const token = localStorage.getItem("CardEXtoken");
  const jwt = require("jsonwebtoken");

  const { REACT_APP_JWT_SECRET } = process.env;
  
  const userInfo = () => {
    if (token) {
      return jwt.verify(token, REACT_APP_JWT_SECRET);
    }
  } 
  
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [errMsgText, setErrMsgText] = useState("");
  const [authenticate, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [userDATA, setUserDATA] = useState({});
  const [userTOKEN, setUserTOKEN] = useState(token);
  const sleepyyyyy = userInfo();

  const getStoredCart = () => {
    const guestCart = localStorage.getItem("CardEXGCart");
    const parsedCart = JSON.parse(guestCart);
    if (guestCart) {
      setCart(parsedCart);
    }
  }

  useEffect(() => {
    userInfo();
    retrieveCards();
    async function fetchData() {
      if (token) {
        setIsLoggedIn(true);
      } else {
        getStoredCart();
        const isPrevUser = localStorage.getItem("CardExGuest");
        if (!isPrevUser) {
          notifyWelcome(
            `Welcome, to the Nation's largest Card Trading platform! 
              Founded in 2021 in the heart of Baton Rouge, LA!`
          );
          notifyWelcomeWarn(
            `Our site is still going through some Home Improvements but we 
            look forward to serving you the best we can progress.`
          );
          const guestToken = 'Thank you for visting CardEX-US';
          localStorage.setItem("CardExGuest", guestToken);
        }
      }
    }
    fetchData();
  }, []);

  const retrieveCards = () => {
    getAllCards()
      .then((card) => {
        setCards(card);
        return card;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <Router>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user} 
        logoutAnim={notifyLogout}
        userDATA={sleepyyyyy}
        setUserDATA={setUserDATA}
        cart={cart}
        cards={cards} setCards={setCards}
        resetCards={retrieveCards}
      />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <div className="appContainer">
            <HomeBanner />
            <body className="frontContainer">
              <LeftNavBar />
              <div className="cardsForSaleContainer r">
                <PlayingCards
                  cards={cards}
                  setCards={setCards}
                  reset={retrieveCards}
                  cart={cart} setCart={setCart}
                  userDATA={sleepyyyyy}
                  formatter={formatter}
                  notifyGood={notifyWelcome}
                />
              </div>
            </body>
          </div>
        </Route>
        <Route path="/register">
          <LoginPage
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            setUserDATA={setUserDATA}
            userDATA={sleepyyyyy}
            notifySignup={notifySignup}
            notifyLogin={notifyLogin}
          />
        </Route>
        <Route path="/cart">
          <Cart cart={cart} setCart={setCart} 
            userDATA={sleepyyyyy}
            formatter={formatter} 
            userTOKEN={userTOKEN} setUserTOKEN={setUserTOKEN}
            toastWarn={notifyWelcomeWarn} toastGood={notifyWelcome}        
          />
        </Route>
        <Route path="/admin">
          <h1 style={{backgroundColor: 'red'}}> Admin Page </h1>
          <h1>Create New Card Listing</h1>
          <CreateCard />
          <AllOrders 
            userTOKEN={userTOKEN} 
            formatter={formatter} 
          />
          <h1>No More Orders</h1>
        </Route>
      </Switch>     
    </Router>

  );
}

export default App;

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { BiUser } from 'react-icons/bi'
import {clearToken, getToken } from '../../api/index';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardExLogo from "../../assets/CardEx Logo.png";

import "./Navbar.css";

const Navbar = (
	{isLoggedIn, setIsLoggedIn, 
		user, logoutAnim, userDATA, 
		cart, cards, setCards, resetCards
	}) => {
	const history = useHistory();

	const logOut = () => {
		logoutAnim();
		setIsLoggedIn(false);
		clearToken();
		setTimeout(function() {
			history.push("/register");
		}, 1300);
	}

	const [searchTerm, setSearchTerm] = useState("");
	useEffect(() => {
	}, [cart]);

  const handleSearch = (event) => {
		event.preventDefault();
		if (!searchTerm) { 
			resetCards();
		} else {
			let filteredCards = cards.filter((item) => {
				return item.card_title.toLowerCase().includes(searchTerm.toLowerCase());
			});
			setCards(filteredCards);
		}
	};

	const searchOnChange = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  };

	return (
		<div className="navbarContainer sticky-top">
			<ul class="nav">
				{/* <li id="settings">
					<a href="#"> <FcSettings /> </a>
				</li> */}
				{/* <li><a href="/">
					<img src={CardExLogo} 
						style={{height:"23px"}}
						alt={"CardEx Logo"}
					/></a>
				</li> */}
				<li>
					<a href="/"> 
						<img 
							src={CardExLogo} 
							style={{height:"23px", marginRight:"9px"}}
							alt={"CardEx Logo"}
						/>
					 	CardEx US
					</a>
				</li>
				<li>
					<a href="/sellcards">Sell Cards</a>
				</li>
				<li id="search">
						<form action="" method="get">
							<input type="text" name="search_text" id="search_text" placeholder="Search"
								onChange={(e) => {
									searchOnChange(e)
									handleSearch(e)
								}}
							/>
							<input type="button" name="search_button" id="search_button"
								onClick={handleSearch}
							/>
						</form>
				</li>
				<li id="options">
					<>
						<a href="#"><BiUser size={28} /> { isLoggedIn ? `${userDATA.username}` : "My Account"}</a>
						<ul class="subnav">
							<li><a href="#">User Profile</a></li>
							<li><a href="#">Settings</a></li>
							{ !isLoggedIn ? <li><a href="/register">Login</a></li> : "" }
							{ isLoggedIn ? <li><Link to="#" onClick={logOut} >Logout </Link></li> : ''}
							{user.admin && 
								<li><Link to="/admin"  style={{color: "red"}}>Admin Mgmt.</Link></li>
							}	
						</ul>
					</>	
				</li>
				<li id="options" className="cartList">
					<a href="/cart"> {cart.length} <ShoppingCartIcon /> Cart</a>
					<ul class="subnav cart">
					</ul>
				</li>
			</ul>
			<script src="prefixfree-1.0.7.js" type="text/javascript"></script>
		</div>
	);
}

export default Navbar;
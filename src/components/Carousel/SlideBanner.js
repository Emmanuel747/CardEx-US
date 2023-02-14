import React from "react";
// import ReactDOM from "react-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SlideBanner.scss";

import freeShippingImg from "../../assets/freeShipping.jpg";
import cardMoneyImg from "../../assets/just-collect-value-banner.jpg"
import visaCCBannerImg from "../../assets/VisaCCBanner.png"
import paniniCardImg from "../../assets/Panini Card-Banner.jpg";
import shinnyPokeImg from "../../assets/shinning Fates pokemon-banner.jpg";

const HomeBanner = (props) => {
	return (
		<div className="CarouselContainer">
			<Carousel>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={paniniCardImg}
						alt="First slide"
					/>
					<Carousel.Caption>
						<h3></h3>
						<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={cardMoneyImg}
						alt="Second slide"
					/>
					<Carousel.Caption>
						<h3></h3>
						<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={freeShippingImg}
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3></h3>
						<p></p>
					</Carousel.Caption>
				</Carousel.Item>
				{/* <Carousel.Item>
					<img
						className="visa d-block w-100"
						src={visaCCBannerImg}
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3> We Accept all forms of payment, including PayPal</h3>
						<div className="subMSG"><h6>"Bitcoin, DogeCoin, Money Order and Cash App"</h6></div>
					</Carousel.Caption>
				</Carousel.Item> */}
				<Carousel.Item>
					<img
						className="d-block w-100"
						src={shinnyPokeImg}
						alt="Fourth slide"
					/>
					<Carousel.Caption>
						<h3></h3>
						<p></p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};

export default HomeBanner;
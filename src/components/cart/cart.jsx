//import React from 'react'
import styles from './cart.module.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Cart = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const cartItems = location.state?.cartItems||[];

	const handleBack = () => {
		//navigate back to the previous page
		navigate('/dashboard')
	}

	const handleBuyNow = () => {
		alert("Processing to checkout...");
		navigate('/checkout',{ state: { cartItems}})
	}

  return (
    <div className={styles.cart}>
		<p 
			className={styles.point} 
			onClick={handleBack}
		>&lt;</p>
		<h2 id={styles.h2}>Cart</h2>
		{cartItems.length === 0 ? (<p className={styles.emptycart}>Your cart is empty!</p>):(
			cartItems.map((item, index) => (
				<div key={index} className={styles.cartItems}>
					<div className={styles.priceTag}>
						<img src={item.image} alt={item.name}  id={styles.itemimage}/>
						<div className={styles.tag}>
							<h3>{item.name}</h3>
							<p>price: ${item.price.toLocaleString()}</p>
						</div>
					</div>
					<div className={styles.itemDetails}>
						<p className={styles.features}>
							<strong>Features:</strong>
							<ul>
								<li>Lorem ipsum dolor sit</li>
								<li>amet consectetur adipisicing</li>
								<li>elit, assumenda consectetur</li>
								<li> repudiandae fuga necessitatibus </li>
								<li>illum odio ratione, atque non nesciunt</li>
								<li>cupiditate, vel molestiae quod velit blanditiis </li>
								<li>totam temporibus minus dolore excepturi.</li>
							</ul>
						</p>
						
					</div>
					<div className={styles.promo}>
						<input type="text" placeholder='Enter promo code' required/>
						<button>Apply Code</button>
					</div>
					<button className={styles.buyNowBtn} onClick={handleBuyNow}>Buy now</button>
				</div>
			))
		)}
    </div>
  )
}

export default Cart




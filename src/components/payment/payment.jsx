//import React from 'react'
import styles from './payment.module.css'
import paypal from '../../assets/Group 37.png'
import cards from '../../assets/Group 40.png'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
	const navigate = useNavigate();

	const handleBack  = () => {
		navigate("/checkout")
	 }

  return (
    <div className={styles.payment}>
		<p id={styles.arrow} onClick={handleBack} >&larr;</p>
		<div className={styles.container}>
			<h2>Payment Method</h2>
			<div className={styles.logos}>
				<div className={styles.paypallogo}>
					<img src={paypal} alt="paypal" />
				</div>
				<div className={styles.cardlogo}>
					<img src={cards} alt="pay cards" />
				</div>
			</div>
			<form className={styles.form}>
				<label>Card holder name</label>
				<input type="text" id={styles.input}/>
				<label>Card number</label>
				<input type="number" placeholder='...........'/>
				<div className={styles.cards}>
					<label id={styles.card_label}>Exp</label>
					<input type="number" placeholder='Month/year'/>
					<label id={styles.card_label}>CVV</label>
					<input type="number" />
				</div>
				
				<button id={styles.pay}>Confirm Payment</button>
			</form>
		</div>
    </div>
  )
}

export default Payment

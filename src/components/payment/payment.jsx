//import React from 'react'
import styles from './payment.module.css'
import paypal from '../../assets/Group 37.png'
import cards from '../../assets/Group 40.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Payment = () => {
	const navigate = useNavigate();

	const handleBack  = () => {
		navigate("/checkout")
	}

	const [cardDetails, setCardDetails] = useState({
		cardHolderName: "",
		cardNumber: "",
		expiry: "",
		cvv: "",
	});

	const [error, setError] = useState("");

	//handle input changes
	const handleChange = (e) => {
		setCardDetails({ ...cardDetails,[e.target.name]:e.target.value});
	};

	//validate form inputs 
	const validateInputs = () => {
		const { cardHolderName, cardNumber, expiry, cvv } = cardDetails;

		if (!cardHolderName || !cardNumber || !expiry || !cvv) {
			return "All fields are required"
		}

		if (!/^\d{2}\/\d{2}$/.test(expiry)) {
			return "Expiry must be in MM/YY format."
		}

		if (!/^\d{3}$/.test(cvv)) {
			return "CVV must be 3 digits."
		}

		return "";
	}

	//handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const validationError = validateInputs();

		if (validationError) {
			setError(validationError);
			return;
		};

		setError("");

		//make an api call to process the payment
		console.log("Processing payment with details:", cardDetails);

		alert("Payment successful!")
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
				<input 
					type="text" 
					id={styles.input}
					name='cardHolderName'
					value={cardDetails.cardHolderName}
					onChange={handleChange}
				/>
				<label>Card number</label>
				<input 
					type="text" 
					placeholder='...........'
					name='cardNumber'
					value={cardDetails.cardNumber}
					onChange={handleChange}
					maxLength="16"
					required
				/>
				<div className={styles.cards}>
					<br />
					<label id={styles.card_label}>Exp</label>
					<br /><br />
					<input 
						type="text" 
						placeholder='MM/YY'
						value={cardDetails.expiry}
						onChange={handleChange}
						
					/>
					<br />
					<label id={styles.card_label}>CVV</label>
					<br /><br />
					<input 
						type="text"
						name='cvv'
						value={cardDetails.cvv}
						onChange={handleChange}
						maxLength="4"
						required
					/>
				</div>
				{error && <p style={{color: "red"}}>{error}</p>}
				<button id={styles.pay} type='submit' onClick={handleSubmit}>Confirm Payment</button>
			</form>
		</div>
    </div>
  )
}

export default Payment

import styles from './change.module.css'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../js file/auth'
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const Change = () => {

	const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
	e.preventDefault();
	try {
		await sendPasswordResetEmail(auth, email);
		window.location.href = "/reset"
		toast.success("Password reset link sent to your email",{
			position: "top-center",
		})
	} catch (error) {
		toast.error(error.message)
	}
  }


  return (
	<div className={styles.changepassword_pg}>
		<div className={styles.top}>
			<p id={styles.arrow} onClick={() => navigate(-1)}>&lt;</p>
			<h3 id={styles.topH3}>Change password</h3>
		</div>
		<form 
			onSubmit={handleForgotPassword}
			id={styles.form_pg}
		>
			<label id={styles.form_pg_label}>Email:</label>
			<input 
				type="email" 
				id={styles.form_pg_input}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<button  type="submit" id={styles.form_pg_submitbtn}>Send request</button>
		</form>
	</div>
  )
}

export default Change

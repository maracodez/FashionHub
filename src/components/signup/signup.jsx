//import React from 'react'
import styles from './signup.module.css'
import hideicon from '../../assets/Group 19.png'
import showicon from '../../assets/Group 20.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../js file/auth'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify';




const Signup = () => {
	const navigate = useNavigate()
	//sign in function
  const handleSign  = () => {
     navigate("/signin")
  }


  //to create account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSignup= async (e)=> {
	e.preventDefault();
	if (password !== confirmpassword) {
        toast.error("Passwords do not match.");
        return;
    }
	try {
		await createUserWithEmailAndPassword(auth,email,password, confirmpassword)
		const user = auth.currentUser;
		if(user) {
			await setDoc(doc(db, "users", user.uid), {
				email: user.email,
				name: name,
			});
		}
		console.log(user);
		console.log("user registered successfully");
		window.location.href = "/signin"
		toast.success("user registered successfully",{
			position: "top-center",
		})
	} catch (error) {
		console.log(error.message);
		toast.success(error.message,{
			position: "bottom-center",
		})
	}
  };
		

  return (
		<div className={styles.signup}>
			<div className={styles.sign}>
				<p id={styles.arrow} onClick={() => navigate(-1)}>&lt;</p>
				<div className={styles.head}>
					<h2>Create your free account.</h2>
				</div>
				<form 
					onSubmit={handleSignup}
					className={styles.signup_form_pg}
				>
					<label id={styles.form_label}>Name:</label>
					<input 
						type="text" 
						placeholder='Name'
						id={styles.form_input}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<label id={styles.form_label}>Email:</label>
					<input 
						type="email" 
						placeholder='exmaple@gmail.com'
						id={styles.form_input}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div  className={styles.hidepassword}>
						<label id={styles.form_label}>Password:</label>
						<input
							type="password" 
							id={styles.form_input}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<img src={hideicon} alt="hideicon" id={styles.hideicon}/>
					</div>
					<div className={styles.showpassword}>
						<label id={styles.form_label}>Confirm password:</label>
						<input 
							type="password" 
							id={styles.form_input}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<img src={showicon} alt="" id={styles.showicon}/>
					</div>
					<button 
						id={styles.createacc}
					>Create account</button>
				</form>
				<p id={styles.signinacc}>Already have an account? <a href="#" onClick={handleSign}>Sign in</a></p>
			</div>
		</div>
	)
}

export default Signup
